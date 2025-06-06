'use strict'
import { Buffer, Neovim, Window } from '@chemzqm/neovim'
import events, { BufEvents } from '../events'
import { parseDocuments } from '../markdown'
import { Documentation, FloatConfig } from '../types'
import { disposeAll, getConditionValue } from '../util'
import { isFalsyOrEmpty } from '../util/array'
import { isVim } from '../util/constants'
import { Mutex } from '../util/mutex'
import { debounce } from '../util/node'
import { equals } from '../util/object'
import { Disposable } from '../util/protocol'
const debounceTime = getConditionValue(100, 10)

export interface WindowConfig {
  width: number
  height: number
  col: number
  row: number
  relative: 'cursor' | 'win' | 'editor'
  style?: string
  cursorline?: number
  title?: string
  border?: number[]
  autohide?: number
  close?: number
}

export interface FloatWinConfig extends FloatConfig {
  breaks?: boolean
  preferTop?: boolean
  autoHide?: boolean
  offsetX?: number
  cursorline?: boolean
  modes?: string[]
  excludeImages?: boolean
  position?: "fixed" | "auto"
  top?: number
  bottom?: number
  left?: number
  right?: number
}

/**
 * Float window/popup factory for create float/popup around current cursor.
 */
export default class FloatFactoryImpl implements Disposable {
  private winid = 0
  private _bufnr = 0
  private closeTs: number
  private targetBufnr: number
  private mutex: Mutex = new Mutex()
  private disposables: Disposable[] = []
  private cursor: [number, number]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private onCursorMoved: Function & { clear(): void }
  constructor(private nvim: Neovim) {
    this.onCursorMoved = debounce(this._onCursorMoved.bind(this), debounceTime)
  }

  private bindEvents(autoHide: boolean, alignTop: boolean): void {
    let eventNames: BufEvents[] = ['InsertLeave', 'InsertEnter', 'BufEnter']
    for (let ev of eventNames) {
      events.on(ev, bufnr => {
        if (bufnr == this._bufnr) return
        this.close()
      }, null, this.disposables)
    }
    events.on('MenuPopupChanged', () => {
      // avoid intersect with pum
      if (events.pumAlignTop == alignTop) {
        this.close()
      }
    }, null, this.disposables)
    this.disposables.push(Disposable.create(() => {
      this.onCursorMoved.clear()
    }))
    events.on('CursorMoved', this.onCursorMoved.bind(this, autoHide), this, this.disposables)
    events.on('CursorMovedI', this.onCursorMoved.bind(this, autoHide), this, this.disposables)
  }

  public unbind(): void {
    if (this.disposables.length) {
      disposeAll(this.disposables)
      this.disposables = []
    }
  }

  public _onCursorMoved(autoHide: boolean, bufnr: number, cursor: [number, number]): void {
    if (bufnr == this._bufnr) return
    if (bufnr == this.targetBufnr && equals(cursor, this.cursor)) {
      // cursor not moved
      return
    }
    if (bufnr != this.targetBufnr || !events.insertMode || autoHide) {
      this.close()
      return
    }
  }

  /**
   * Create float window/popup at cursor position.
   * @deprecated use show method instead
   */
  public async create(docs: Documentation[], _allowSelection = false, offsetX = 0): Promise<void> {
    await this.show(docs, {
      offsetX
    })
  }

  /**
   * Show documentations in float window/popup around cursor.
   * Window and buffer are reused when possible.
   * Window is closed automatically on change buffer, InsertEnter, CursorMoved and CursorMovedI.
   * @param docs List of documentations.
   * @param config Configuration for floating window/popup.
   */
  public async show(docs: Documentation[], config: FloatWinConfig = {}): Promise<void> {
    if (docs.length == 0 || docs.every(doc => doc.content.length == 0)) {
      this.close()
      return
    }
    let curr = Date.now()
    let release = await this.mutex.acquire()
    try {
      await this.createPopup(docs, config, curr)
      release()
    } catch (e) {
      this.nvim.echoError(e)
      release()
    }
  }

  private async createPopup(docs: Documentation[], opts: FloatWinConfig, timestamp: number): Promise<void> {
    docs = docs.filter(o => o.content.trim().length > 0)
    let { lines, codes, highlights } = parseDocuments(docs, { excludeImages: opts.excludeImages, breaks: opts.breaks })
    let config: any = {
      codes,
      highlights,
      pumAlignTop: events.pumAlignTop,
      preferTop: typeof opts.preferTop === 'boolean' ? opts.preferTop : false,
      offsetX: opts.offsetX || 0,
      title: opts.title || '',
      close: opts.close ? 1 : 0,
      rounded: opts.rounded ? 1 : 0,
      modes: opts.modes || ['n', 'i', 'ic', 's'],
      relative: opts.position === 'fixed' ? 'editor' : 'cursor'
    }
    if (!isVim) {
      if (typeof opts.winblend === 'number') config.winblend = opts.winblend
      if (opts.focusable != null) config.focusable = opts.focusable ? 1 : 0
      if (opts.shadow) config.shadow = 1
    }
    if (opts.maxHeight) config.maxHeight = opts.maxHeight
    if (opts.maxWidth) config.maxWidth = opts.maxWidth
    if (opts.border === true) {
      config.border = [1, 1, 1, 1]
    } else if (Array.isArray(opts.border) && !opts.border.every(o => o == 0)) {
      config.border = opts.border.slice(0, 4)
      config.rounded = opts.rounded ? 1 : 0
    }
    if (opts.highlight) config.highlight = opts.highlight
    if (opts.borderhighlight) config.borderhighlight = opts.borderhighlight
    if (opts.cursorline) config.cursorline = 1
    for (let key of ['top', 'left', 'bottom', 'right']) {
      if (typeof opts[key] === 'number' && opts[key] >= 0) {
        config[key] = opts[key]
      }
    }
    let autoHide = opts.autoHide === false ? false : true
    if (autoHide) config.autohide = 1
    this.unbind()
    let arr = await this.nvim.call('coc#dialog#create_cursor_float', [this.winid, this._bufnr, lines, config]) as [number, [number, number], number, number, number]
    if (isFalsyOrEmpty(arr) || this.closeTs > timestamp) {
      let winid = arr && arr.length > 0 ? arr[2] : this.winid
      if (winid) {
        this.winid = 0
        this.nvim.call('coc#float#close', [winid], true)
        this.nvim.redrawVim()
      }
      return
    }
    let [targetBufnr, cursor, winid, bufnr, alignTop] = arr
    this.winid = winid
    this._bufnr = bufnr
    this.targetBufnr = targetBufnr
    this.cursor = cursor
    this.bindEvents(autoHide, alignTop == 1)
  }

  /**
   * Close float window
   */
  public close(): void {
    let { winid, nvim } = this
    this.closeTs = Date.now()
    this.unbind()
    if (winid) {
      this.winid = 0
      nvim.call('coc#float#close', [winid], true)
      nvim.redrawVim()
    }
  }

  public checkRetrigger(bufnr: number): boolean {
    if (this.winid && this.targetBufnr == bufnr) return true
    return false
  }

  public get bufnr(): number {
    return this._bufnr
  }

  public get buffer(): Buffer | null {
    return this.bufnr ? this.nvim.createBuffer(this.bufnr) : null
  }

  public get window(): Window | null {
    return this.winid ? this.nvim.createWindow(this.winid) : null
  }

  public async activated(): Promise<boolean> {
    if (!this.winid) return false
    return await this.nvim.call('coc#float#valid', [this.winid]) != 0
  }

  public dispose(): void {
    this.cursor = undefined
    this.onCursorMoved.clear()
    this.close()
  }
}

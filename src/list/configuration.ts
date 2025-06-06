'use strict'
import window from '../window'
import workspace from '../workspace'

export const validKeys = [
  '<esc>',
  '<space>',
  '<tab>',
  '<s-tab>',
  '<bs>',
  '<right>',
  '<left>',
  '<up>',
  '<down>',
  '<home>',
  '<end>',
  '<cr>',
  '<FocusGained>',
  '<FocusLost>',
  '<ScrollWheelUp>',
  '<ScrollWheelDown>',
  '<LeftMouse>',
  '<LeftDrag>',
  '<LeftRelease>',
  '<2-LeftMouse>',
  '<C-space>',
  '<C-_>',
  '<C-a>',
  '<C-b>',
  '<C-c>',
  '<C-d>',
  '<C-e>',
  '<C-f>',
  '<C-g>',
  '<C-h>',
  '<C-i>',
  '<C-j>',
  '<C-k>',
  '<C-l>',
  '<C-m>',
  '<C-n>',
  '<C-o>',
  '<C-p>',
  '<C-q>',
  '<C-r>',
  '<C-s>',
  '<C-t>',
  '<C-u>',
  '<C-v>',
  '<C-w>',
  '<C-x>',
  '<C-y>',
  '<C-z>',
  '<A-a>',
  '<A-b>',
  '<A-c>',
  '<A-d>',
  '<A-e>',
  '<A-f>',
  '<A-g>',
  '<A-h>',
  '<A-i>',
  '<A-j>',
  '<A-k>',
  '<A-l>',
  '<A-m>',
  '<A-n>',
  '<A-o>',
  '<A-p>',
  '<A-q>',
  '<A-r>',
  '<A-s>',
  '<A-t>',
  '<A-u>',
  '<A-v>',
  '<A-w>',
  '<A-x>',
  '<A-y>',
  '<A-z>',
  '<A-bs>'
]

export class ListConfiguration {
  public get debounceTime(): number {
    return this.get<number>('interactiveDebounceTime', 100)
  }

  public get extendedSearchMode(): boolean {
    return this.get<boolean>('extendedSearchMode', true)
  }

  public get smartcase(): boolean {
    return this.get<boolean>('smartCase', false)
  }

  public get signOffset(): number {
    return this.get<number>('signOffset', 900)
  }

  public get<T>(key: string, defaultValue?: T): T {
    let configuration = workspace.initialConfiguration
    return configuration.get<T>('list.' + key, defaultValue)
  }

  public get previousKey(): string {
    return this.fixKey(this.get<string>('previousKeymap', '<C-j>'))
  }

  public get nextKey(): string {
    return this.fixKey(this.get<string>('nextKeymap', '<C-k>'))
  }

  public fixKey(key: string): string {
    if (validKeys.includes(key)) return key
    let find = validKeys.find(s => s.toLowerCase() == key.toLowerCase())
    if (find) return find
    void window.showErrorMessage(`Configured key "${key}" not supported.`)
    return null
  }
}

export default new ListConfiguration()

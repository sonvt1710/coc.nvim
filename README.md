<p align="center">
  <a href="https://www.vim.org/scripts/script.php?script_id=5779">
    <img alt="Logo" src="https://github.com/neoclide/coc.nvim/assets/251450/9c2bc011-35f0-4ef5-93ba-bc3f17e65bb7" height="240" />
  </a>
  <p align="center">Make your Vim/Neovim as smart as VS Code</p>
  <p align="center">
    <a href="LICENSE.md"><img alt="Software License" src="https://img.shields.io/badge/license-Anti%20996-brightgreen.svg?style=flat-square"></a>
    <a href="https://github.com/neoclide/coc.nvim/actions"><img alt="Actions" src="https://img.shields.io/github/actions/workflow/status/neoclide/coc.nvim/ci.yml?style=flat-square&branch=master"></a>
      <a href="https://codecov.io/gh/neoclide/coc.nvim"><img alt="Codecov Coverage Status" src="https://img.shields.io/codecov/c/github/neoclide/coc.nvim.svg?style=flat-square"></a>
    <a href="doc/coc.txt"><img alt="Doc" src="https://img.shields.io/badge/doc-%3Ah%20coc.txt-brightgreen.svg?style=flat-square"></a>
    <a href="https://matrix.to/#/#coc.nvim:matrix.org"><img alt="Matrix" src="https://img.shields.io/matrix/coc.nvim%3Amatrix.org?style=flat-square"></a>
    <a href="https://deepwiki.com/neoclide/coc.nvim"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
  </p>
</p>

---

<img alt="Custom coc popup menu with snippet support" src="https://github.com/neoclide/coc.nvim/assets/251450/05f60ab8-dcb1-40f7-9e4a-3c03f5db5398" width="60%" />

_Custom popup menu with snippet support_

## Why?

- 🚀 **Fast**: separated NodeJS process that does not slow down Vim most of the time.
- 💎 **Reliable**: typed language, tested with CI.
- 🌟 **Featured**: all LSP 3.16 features are supported, see `:h coc-lsp`.
- ❤️ **Flexible**: [configured like VS Code](https://github.com/neoclide/coc.nvim/wiki/Using-the-configuration-file), [Coc extensions function similarly to VS Code extensions](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions)

## Quick Start

Make sure use Vim >= 9.0.0438 or Neovim >= 0.8.0.

Install [nodejs](https://nodejs.org/en/download/) >= 16.18.0:

```bash
curl -sL install-node.vercel.app/lts | bash
```

For [vim-plug](https://github.com/junegunn/vim-plug) users:

```vim
" Use release branch (recommended)
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" Or build from source code by using npm
Plug 'neoclide/coc.nvim', {'branch': 'master', 'do': 'npm ci'}
```

in your `.vimrc` or `init.vim`, then restart Vim and run `:PlugInstall`.

Checkout [Install
coc.nvim](https://github.com/neoclide/coc.nvim/wiki/Install-coc.nvim) for
more info.

You **have to** install coc extensions or configure language servers for
LSP support.

Install extensions like this:

    :CocInstall coc-json coc-tsserver

Or you can configure a language server in your `coc-settings.json`(open it using `:CocConfig`) like this:

```json
{
  "languageserver": {
    "go": {
      "command": "gopls",
      "rootPatterns": ["go.mod"],
      "trace.server": "verbose",
      "filetypes": ["go"]
    }
  }
}
```

Checkout the wiki for more details:

- [Completion with sources](https://github.com/neoclide/coc.nvim/wiki/Completion-with-sources)
- [Using the configuration file](https://github.com/neoclide/coc.nvim/wiki/Using-the-configuration-file)
- [Using coc extensions](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions)
- [Configure language servers](https://github.com/neoclide/coc.nvim/wiki/Language-servers)
- [F.A.Q](https://github.com/neoclide/coc.nvim/wiki/F.A.Q)

Checkout `:h coc-nvim` for Vim interface.

## Example Vim configuration

Configuration is required to make coc.nvim easier to work with, since it
doesn't change your key-mappings or Vim options. This is done as much as
possible to avoid conflict with your other plugins.

**❗️Important**: Some Vim plugins can change your key mappings. Please use
command like`:verbose imap <tab>` to make sure that your keymap has taken effect.

```vim
" https://raw.githubusercontent.com/neoclide/coc.nvim/master/doc/coc-example-config.vim

" May need for Vim (not Neovim) since coc.nvim calculates byte offset by count
" utf-8 byte sequence
set encoding=utf-8
" Some servers have issues with backup files, see #649
set nobackup
set nowritebackup

" Having longer updatetime (default is 4000 ms = 4s) leads to noticeable
" delays and poor user experience
set updatetime=300

" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved
set signcolumn=yes

" Use tab for trigger completion with characters ahead and navigate
" NOTE: There's always complete item selected by default, you may want to enable
" no select by `"suggest.noselect": true` in your configuration file
" NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
" other plugin before putting this into your config
inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
      \ coc#refresh()
inoremap <expr><S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>"

" Make <CR> to accept selected completion item or notify coc.nvim to format
" <C-g>u breaks current undo, please make your own choice
inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

function! CheckBackspace() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion
if has('nvim')
  inoremap <silent><expr> <c-space> coc#refresh()
else
  inoremap <silent><expr> <c-@> coc#refresh()
endif

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list
nmap <silent><nowait> [g <Plug>(coc-diagnostic-prev)
nmap <silent><nowait> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation
nmap <silent><nowait> gd <Plug>(coc-definition)
nmap <silent><nowait> gy <Plug>(coc-type-definition)
nmap <silent><nowait> gi <Plug>(coc-implementation)
nmap <silent><nowait> gr <Plug>(coc-references)

" Use K to show documentation in preview window
nnoremap <silent> K :call ShowDocumentation()<CR>

function! ShowDocumentation()
  if CocAction('hasProvider', 'hover')
    call CocActionAsync('doHover')
  else
    call feedkeys('K', 'in')
  endif
endfunction

" Highlight the symbol and its references when holding the cursor
autocmd CursorHold * silent call CocActionAsync('highlight')

" Symbol renaming
nmap <leader>rn <Plug>(coc-rename)

" Formatting selected code
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

augroup mygroup
  autocmd!
  " Setup formatexpr specified filetype(s)
  autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
augroup end

" Applying code actions to the selected code block
" Example: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap keys for applying code actions at the cursor position
nmap <leader>ac  <Plug>(coc-codeaction-cursor)
" Remap keys for apply code actions affect whole buffer
nmap <leader>as  <Plug>(coc-codeaction-source)
" Apply the most preferred quickfix action to fix diagnostic on the current line
nmap <leader>qf  <Plug>(coc-fix-current)

" Remap keys for applying refactor code actions
nmap <silent> <leader>re <Plug>(coc-codeaction-refactor)
xmap <silent> <leader>r  <Plug>(coc-codeaction-refactor-selected)
nmap <silent> <leader>r  <Plug>(coc-codeaction-refactor-selected)

" Run the Code Lens action on the current line
nmap <leader>cl  <Plug>(coc-codelens-action)

" Map function and class text objects
" NOTE: Requires 'textDocument.documentSymbol' support from the language server
xmap if <Plug>(coc-funcobj-i)
omap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap af <Plug>(coc-funcobj-a)
xmap ic <Plug>(coc-classobj-i)
omap ic <Plug>(coc-classobj-i)
xmap ac <Plug>(coc-classobj-a)
omap ac <Plug>(coc-classobj-a)

" Remap <C-f> and <C-b> to scroll float windows/popups
if has('nvim-0.4.0') || has('patch-8.2.0750')
  nnoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? coc#float#scroll(1) : "\<C-f>"
  nnoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? coc#float#scroll(0) : "\<C-b>"
  inoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? "\<c-r>=coc#float#scroll(1)\<cr>" : "\<Right>"
  inoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? "\<c-r>=coc#float#scroll(0)\<cr>" : "\<Left>"
  vnoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? coc#float#scroll(1) : "\<C-f>"
  vnoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? coc#float#scroll(0) : "\<C-b>"
endif

" Use CTRL-S for selections ranges
" Requires 'textDocument/selectionRange' support of language server
nmap <silent> <C-s> <Plug>(coc-range-select)
xmap <silent> <C-s> <Plug>(coc-range-select)

" Add `:Format` command to format current buffer
command! -nargs=0 Format :call CocActionAsync('format')

" Add `:Fold` command to fold current buffer
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer
command! -nargs=0 OR   :call     CocActionAsync('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Mappings for CoCList
" Show all diagnostics
nnoremap <silent><nowait> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions
nnoremap <silent><nowait> <space>e  :<C-u>CocList extensions<cr>
" Show commands
nnoremap <silent><nowait> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document
nnoremap <silent><nowait> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols
nnoremap <silent><nowait> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item
nnoremap <silent><nowait> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item
nnoremap <silent><nowait> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list
nnoremap <silent><nowait> <space>p  :<C-u>CocListResume<CR>
```

## Example Lua configuration

NOTE: This only works in Neovim 0.7.0dev+.

```lua
-- https://raw.githubusercontent.com/neoclide/coc.nvim/master/doc/coc-example-config.lua

-- Some servers have issues with backup files, see #649
vim.opt.backup = false
vim.opt.writebackup = false

-- Having longer updatetime (default is 4000 ms = 4s) leads to noticeable
-- delays and poor user experience
vim.opt.updatetime = 300

-- Always show the signcolumn, otherwise it would shift the text each time
-- diagnostics appeared/became resolved
vim.opt.signcolumn = "yes"

local keyset = vim.keymap.set
-- Autocomplete
function _G.check_back_space()
    local col = vim.fn.col('.') - 1
    return col == 0 or vim.fn.getline('.'):sub(col, col):match('%s') ~= nil
end

-- Use Tab for trigger completion with characters ahead and navigate
-- NOTE: There's always a completion item selected by default, you may want to enable
-- no select by setting `"suggest.noselect": true` in your configuration file
-- NOTE: Use command ':verbose imap <tab>' to make sure Tab is not mapped by
-- other plugins before putting this into your config
local opts = {silent = true, noremap = true, expr = true, replace_keycodes = false}
keyset("i", "<TAB>", 'coc#pum#visible() ? coc#pum#next(1) : v:lua.check_back_space() ? "<TAB>" : coc#refresh()', opts)
keyset("i", "<S-TAB>", [[coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>"]], opts)

-- Make <CR> to accept selected completion item or notify coc.nvim to format
-- <C-g>u breaks current undo, please make your own choice
keyset("i", "<cr>", [[coc#pum#visible() ? coc#pum#confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"]], opts)

-- Use <c-j> to trigger snippets
keyset("i", "<c-j>", "<Plug>(coc-snippets-expand-jump)")
-- Use <c-space> to trigger completion
keyset("i", "<c-space>", "coc#refresh()", {silent = true, expr = true})

-- Use `[g` and `]g` to navigate diagnostics
-- Use `:CocDiagnostics` to get all diagnostics of current buffer in location list
keyset("n", "[g", "<Plug>(coc-diagnostic-prev)", {silent = true})
keyset("n", "]g", "<Plug>(coc-diagnostic-next)", {silent = true})

-- GoTo code navigation
keyset("n", "gd", "<Plug>(coc-definition)", {silent = true})
keyset("n", "gy", "<Plug>(coc-type-definition)", {silent = true})
keyset("n", "gi", "<Plug>(coc-implementation)", {silent = true})
keyset("n", "gr", "<Plug>(coc-references)", {silent = true})


-- Use K to show documentation in preview window
function _G.show_docs()
    local cw = vim.fn.expand('<cword>')
    if vim.fn.index({'vim', 'help'}, vim.bo.filetype) >= 0 then
        vim.api.nvim_command('h ' .. cw)
    elseif vim.api.nvim_eval('coc#rpc#ready()') then
        vim.fn.CocActionAsync('doHover')
    else
        vim.api.nvim_command('!' .. vim.o.keywordprg .. ' ' .. cw)
    end
end
keyset("n", "K", '<CMD>lua _G.show_docs()<CR>', {silent = true})


-- Highlight the symbol and its references on a CursorHold event(cursor is idle)
vim.api.nvim_create_augroup("CocGroup", {})
vim.api.nvim_create_autocmd("CursorHold", {
    group = "CocGroup",
    command = "silent call CocActionAsync('highlight')",
    desc = "Highlight symbol under cursor on CursorHold"
})


-- Symbol renaming
keyset("n", "<leader>rn", "<Plug>(coc-rename)", {silent = true})


-- Formatting selected code
keyset("x", "<leader>f", "<Plug>(coc-format-selected)", {silent = true})
keyset("n", "<leader>f", "<Plug>(coc-format-selected)", {silent = true})


-- Setup formatexpr specified filetype(s)
vim.api.nvim_create_autocmd("FileType", {
    group = "CocGroup",
    pattern = "typescript,json",
    command = "setl formatexpr=CocAction('formatSelected')",
    desc = "Setup formatexpr specified filetype(s)."
})

-- Apply codeAction to the selected region
-- Example: `<leader>aap` for current paragraph
local opts = {silent = true, nowait = true}
keyset("x", "<leader>a", "<Plug>(coc-codeaction-selected)", opts)
keyset("n", "<leader>a", "<Plug>(coc-codeaction-selected)", opts)

-- Remap keys for apply code actions at the cursor position.
keyset("n", "<leader>ac", "<Plug>(coc-codeaction-cursor)", opts)
-- Remap keys for apply source code actions for current file.
keyset("n", "<leader>as", "<Plug>(coc-codeaction-source)", opts)
-- Apply the most preferred quickfix action on the current line.
keyset("n", "<leader>qf", "<Plug>(coc-fix-current)", opts)

-- Remap keys for apply refactor code actions.
keyset("n", "<leader>re", "<Plug>(coc-codeaction-refactor)", { silent = true })
keyset("x", "<leader>r", "<Plug>(coc-codeaction-refactor-selected)", { silent = true })
keyset("n", "<leader>r", "<Plug>(coc-codeaction-refactor-selected)", { silent = true })

-- Run the Code Lens actions on the current line
keyset("n", "<leader>cl", "<Plug>(coc-codelens-action)", opts)


-- Map function and class text objects
-- NOTE: Requires 'textDocument.documentSymbol' support from the language server
keyset("x", "if", "<Plug>(coc-funcobj-i)", opts)
keyset("o", "if", "<Plug>(coc-funcobj-i)", opts)
keyset("x", "af", "<Plug>(coc-funcobj-a)", opts)
keyset("o", "af", "<Plug>(coc-funcobj-a)", opts)
keyset("x", "ic", "<Plug>(coc-classobj-i)", opts)
keyset("o", "ic", "<Plug>(coc-classobj-i)", opts)
keyset("x", "ac", "<Plug>(coc-classobj-a)", opts)
keyset("o", "ac", "<Plug>(coc-classobj-a)", opts)


-- Remap <C-f> and <C-b> to scroll float windows/popups
---@diagnostic disable-next-line: redefined-local
local opts = {silent = true, nowait = true, expr = true}
keyset("n", "<C-f>", 'coc#float#has_scroll() ? coc#float#scroll(1) : "<C-f>"', opts)
keyset("n", "<C-b>", 'coc#float#has_scroll() ? coc#float#scroll(0) : "<C-b>"', opts)
keyset("i", "<C-f>",
       'coc#float#has_scroll() ? "<c-r>=coc#float#scroll(1)<cr>" : "<Right>"', opts)
keyset("i", "<C-b>",
       'coc#float#has_scroll() ? "<c-r>=coc#float#scroll(0)<cr>" : "<Left>"', opts)
keyset("v", "<C-f>", 'coc#float#has_scroll() ? coc#float#scroll(1) : "<C-f>"', opts)
keyset("v", "<C-b>", 'coc#float#has_scroll() ? coc#float#scroll(0) : "<C-b>"', opts)


-- Use CTRL-S for selections ranges
-- Requires 'textDocument/selectionRange' support of language server
keyset("n", "<C-s>", "<Plug>(coc-range-select)", {silent = true})
keyset("x", "<C-s>", "<Plug>(coc-range-select)", {silent = true})


-- Add `:Format` command to format current buffer
vim.api.nvim_create_user_command("Format", "call CocAction('format')", {})

-- " Add `:Fold` command to fold current buffer
vim.api.nvim_create_user_command("Fold", "call CocAction('fold', <f-args>)", {nargs = '?'})

-- Add `:OR` command for organize imports of the current buffer
vim.api.nvim_create_user_command("OR", "call CocActionAsync('runCommand', 'editor.action.organizeImport')", {})

-- Add (Neo)Vim's native statusline support
-- NOTE: Please see `:h coc-status` for integrations with external plugins that
-- provide custom statusline: lightline.vim, vim-airline
vim.opt.statusline:prepend("%{coc#status()}%{get(b:,'coc_current_function','')}")

-- Mappings for CoCList
-- code actions and coc stuff
---@diagnostic disable-next-line: redefined-local
local opts = {silent = true, nowait = true}
-- Show all diagnostics
keyset("n", "<space>a", ":<C-u>CocList diagnostics<cr>", opts)
-- Manage extensions
keyset("n", "<space>e", ":<C-u>CocList extensions<cr>", opts)
-- Show commands
keyset("n", "<space>c", ":<C-u>CocList commands<cr>", opts)
-- Find symbol of current document
keyset("n", "<space>o", ":<C-u>CocList outline<cr>", opts)
-- Search workspace symbols
keyset("n", "<space>s", ":<C-u>CocList -I symbols<cr>", opts)
-- Do default action for next item
keyset("n", "<space>j", ":<C-u>CocNext<cr>", opts)
-- Do default action for previous item
keyset("n", "<space>k", ":<C-u>CocPrev<cr>", opts)
-- Resume latest coc list
keyset("n", "<space>p", ":<C-u>CocListResume<cr>", opts)
```

## Articles

- [coc.nvim 插件体系介绍](https://zhuanlan.zhihu.com/p/65524706)
- [CocList 入坑指南](https://zhuanlan.zhihu.com/p/71846145)
- [Create coc.nvim extension to improve Vim experience](https://medium.com/@chemzqm/create-coc-nvim-extension-to-improve-vim-experience-4461df269173)
- [How to write a coc.nvim extension (and why)](https://samroeca.com/coc-plugin.html)

## Troubleshooting

Try these steps if you experience problems with coc.nvim:

- Ensure your Vim version >= 8.0 using `:version`
- If a service failed to start, use `:CocInfo` or `:checkhealth` if you use Neovim
- Checkout the log of coc.nvim with `:CocOpenLog`
- If you have issues with the language server, it's recommended to [checkout
  the language server output](https://github.com/neoclide/coc.nvim/wiki/Debug-language-server#using-output-channel)

## Feedback

- Have a question? Start a discussion on [GitHub Discussions](https://github.com/neoclide/coc.nvim/discussions).
- File a bug in [GitHub Issues](https://github.com/neoclide/coc.nvim/issues).
- Chat with us on [Matrix](https://matrix.to/#/#coc.nvim:matrix.org).
- 中文用户请到 [中文 Matrix](https://matrix.to/#/#neoclide_coc-cn:gitter.im) 讨论

## Backers

[Become a backer](https://opencollective.com/cocnvim#backer) and get your image on our README on GitHub with a link to your site.

<a href="https://opencollective.com/cocnvim/backer/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/9/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/10/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/10/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/11/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/11/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/12/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/12/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/13/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/13/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/14/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/14/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/15/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/15/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/16/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/16/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/17/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/17/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/18/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/18/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/19/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/19/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/20/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/20/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/21/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/21/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/22/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/22/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/23/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/23/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/24/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/24/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/25/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/25/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/26/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/26/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/27/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/27/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/28/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/28/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/29/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/29/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/30/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/30/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/31/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/31/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/32/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/32/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/33/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/33/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/34/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/34/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/35/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/35/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/36/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/36/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/37/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/37/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/38/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/38/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/39/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/39/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/40/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/40/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/41/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/41/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/42/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/42/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/43/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/43/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/44/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/44/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/45/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/45/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/46/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/46/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/47/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/47/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/48/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/48/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/cocnvim/backer/49/website?requireActive=false" target="_blank"><img src="https://opencollective.com/cocnvim/backer/49/avatar.svg?requireActive=false"></a>

<a href="https://opencollective.com/cocnvim#backer" target="_blank"><img src="https://images.opencollective.com/static/images/become_backer.svg"></a>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chemzqm"><img src="https://avatars.githubusercontent.com/u/251450?v=4?s=50" width="50px;" alt="Qiming zhao"/><br /><sub><b>Qiming zhao</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=chemzqm" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fann.im/"><img src="https://avatars.githubusercontent.com/u/345274?v=4?s=50" width="50px;" alt="Heyward Fann"/><br /><sub><b>Heyward Fann</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=fannheyward" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/weirongxu"><img src="https://avatars.githubusercontent.com/u/1709861?v=4?s=50" width="50px;" alt="Raidou"/><br /><sub><b>Raidou</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=weirongxu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kevinhwang91"><img src="https://avatars.githubusercontent.com/u/17562139?v=4?s=50" width="50px;" alt="kevinhwang91"/><br /><sub><b>kevinhwang91</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kevinhwang91" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://yuuko.cn/"><img src="https://avatars.githubusercontent.com/u/5492542?v=4?s=50" width="50px;" alt="年糕小豆汤"/><br /><sub><b>年糕小豆汤</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=iamcco" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Avi-D-coder"><img src="https://avatars.githubusercontent.com/u/29133776?v=4?s=50" width="50px;" alt="Avi Dessauer"/><br /><sub><b>Avi Dessauer</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Avi-D-coder" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/voldikss"><img src="https://avatars.githubusercontent.com/u/20282795?v=4?s=50" width="50px;" alt="最上川"/><br /><sub><b>最上川</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=voldikss" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.microsoft.com/en-us/research/people/yatli/"><img src="https://avatars.githubusercontent.com/u/20684720?v=4?s=50" width="50px;" alt="Yatao Li"/><br /><sub><b>Yatao Li</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=yatli" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xiyaowong"><img src="https://avatars.githubusercontent.com/u/47070852?v=4?s=50" width="50px;" alt="wongxy"/><br /><sub><b>wongxy</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=xiyaowong" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sam-mccall"><img src="https://avatars.githubusercontent.com/u/548993?v=4?s=50" width="50px;" alt="Sam McCall"/><br /><sub><b>Sam McCall</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=sam-mccall" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://samroeca.com/pages/about.html#about"><img src="https://avatars.githubusercontent.com/u/3723671?v=4?s=50" width="50px;" alt="Samuel Roeca"/><br /><sub><b>Samuel Roeca</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=pappasam" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/amiralies"><img src="https://avatars.githubusercontent.com/u/13261088?v=4?s=50" width="50px;" alt="Amirali Esmaeili"/><br /><sub><b>Amirali Esmaeili</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=amiralies" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bit.ly/3cLKGE4"><img src="https://avatars.githubusercontent.com/u/3051781?v=4?s=50" width="50px;" alt="Jack Rowlingson"/><br /><sub><b>Jack Rowlingson</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=jrowlingson" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tomtomjhj"><img src="https://avatars.githubusercontent.com/u/19489738?v=4?s=50" width="50px;" alt="Jaehwang Jung"/><br /><sub><b>Jaehwang Jung</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=tomtomjhj" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/antoinemadec"><img src="https://avatars.githubusercontent.com/u/10830594?v=4?s=50" width="50px;" alt="Antoine"/><br /><sub><b>Antoine</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=antoinemadec" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cosminadrianpopescu"><img src="https://avatars.githubusercontent.com/u/5187873?v=4?s=50" width="50px;" alt="Cosmin Popescu"/><br /><sub><b>Cosmin Popescu</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=cosminadrianpopescu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ducnx.com/"><img src="https://avatars.githubusercontent.com/u/1186411?v=4?s=50" width="50px;" alt="Duc Nghiem Xuan"/><br /><sub><b>Duc Nghiem Xuan</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=xuanduc987" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nosubstance.me/"><img src="https://avatars.githubusercontent.com/u/1269815?v=4?s=50" width="50px;" alt="Francisco Lopes"/><br /><sub><b>Francisco Lopes</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=oblitum" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/daquexian"><img src="https://avatars.githubusercontent.com/u/11607199?v=4?s=50" width="50px;" alt="daquexian"/><br /><sub><b>daquexian</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=daquexian" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4?s=50" width="50px;" alt="dependabot[bot]"/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=dependabot[bot]" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/apps/greenkeeper"><img src="https://avatars.githubusercontent.com/in/505?v=4?s=50" width="50px;" alt="greenkeeper[bot]"/><br /><sub><b>greenkeeper[bot]</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=greenkeeper[bot]" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://chris-kipp.io/"><img src="https://avatars.githubusercontent.com/u/13974112?v=4?s=50" width="50px;" alt="Chris Kipp"/><br /><sub><b>Chris Kipp</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ckipp01" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dmitmel.github.io/"><img src="https://avatars.githubusercontent.com/u/15367354?v=4?s=50" width="50px;" alt="Dmytro Meleshko"/><br /><sub><b>Dmytro Meleshko</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=dmitmel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kirillbobyrev"><img src="https://avatars.githubusercontent.com/u/3352968?v=4?s=50" width="50px;" alt="Kirill Bobyrev"/><br /><sub><b>Kirill Bobyrev</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kirillbobyrev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gbcreation"><img src="https://avatars.githubusercontent.com/u/454315?v=4?s=50" width="50px;" alt="Gontran Baerts"/><br /><sub><b>Gontran Baerts</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=gbcreation" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://andys8.de/"><img src="https://avatars.githubusercontent.com/u/13085980?v=4?s=50" width="50px;" alt="Andy"/><br /><sub><b>Andy</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=andys8" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.alexcj96.com/"><img src="https://avatars.githubusercontent.com/u/33961674?v=4?s=50" width="50px;" alt="Cheng JIANG"/><br /><sub><b>Cheng JIANG</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=GopherJ" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cpearce-py"><img src="https://avatars.githubusercontent.com/u/53532946?v=4?s=50" width="50px;" alt="Corin"/><br /><sub><b>Corin</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=cpearce-py" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wodesuck"><img src="https://avatars.githubusercontent.com/u/3124581?v=4?s=50" width="50px;" alt="Daniel Zhang"/><br /><sub><b>Daniel Zhang</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=wodesuck" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ferdi265"><img src="https://avatars.githubusercontent.com/u/4077106?v=4?s=50" width="50px;" alt="Ferdinand Bachmann"/><br /><sub><b>Ferdinand Bachmann</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Ferdi265" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://goushi.me/"><img src="https://avatars.githubusercontent.com/u/16915589?v=4?s=50" width="50px;" alt="Guangqing Chen"/><br /><sub><b>Guangqing Chen</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=gou4shi1" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jademeskill.com/"><img src="https://avatars.githubusercontent.com/u/2108?v=4?s=50" width="50px;" alt="Jade Meskill"/><br /><sub><b>Jade Meskill</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=iamruinous" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jpoppe"><img src="https://avatars.githubusercontent.com/u/65505?v=4?s=50" width="50px;" alt="Jasper Poppe"/><br /><sub><b>Jasper Poppe</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=jpoppe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jean"><img src="https://avatars.githubusercontent.com/u/84800?v=4?s=50" width="50px;" alt="Jean Jordaan"/><br /><sub><b>Jean Jordaan</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=jean" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://xuann.wang/"><img src="https://avatars.githubusercontent.com/u/44045911?v=4?s=50" width="50px;" alt="Kid"/><br /><sub><b>Kid</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kidonng" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kavantix"><img src="https://avatars.githubusercontent.com/u/6243755?v=4?s=50" width="50px;" alt="Pieter van Loon"/><br /><sub><b>Pieter van Loon</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Kavantix" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rliebz"><img src="https://avatars.githubusercontent.com/u/5321575?v=4?s=50" width="50px;" alt="Robert Liebowitz"/><br /><sub><b>Robert Liebowitz</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=rliebz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://megalithic.io/"><img src="https://avatars.githubusercontent.com/u/3678?v=4?s=50" width="50px;" alt="Seth Messer"/><br /><sub><b>Seth Messer</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=megalithic" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/UncleBill"><img src="https://avatars.githubusercontent.com/u/1141198?v=4?s=50" width="50px;" alt="UncleBill"/><br /><sub><b>UncleBill</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=UncleBill" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://zsaber.com/"><img src="https://avatars.githubusercontent.com/u/6846867?v=4?s=50" width="50px;" alt="ZERO"/><br /><sub><b>ZERO</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ZSaberLv0" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fsouza.blog/"><img src="https://avatars.githubusercontent.com/u/108725?v=4?s=50" width="50px;" alt="fsouza"/><br /><sub><b>fsouza</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=fsouza" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://onichandame.com/"><img src="https://avatars.githubusercontent.com/u/23728505?v=4?s=50" width="50px;" alt="XiaoZhang"/><br /><sub><b>XiaoZhang</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=onichandame" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/whyreal"><img src="https://avatars.githubusercontent.com/u/2084642?v=4?s=50" width="50px;" alt="whyreal"/><br /><sub><b>whyreal</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=whyreal" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yehuohan"><img src="https://avatars.githubusercontent.com/u/17680752?v=4?s=50" width="50px;" alt="yehuohan"/><br /><sub><b>yehuohan</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=yehuohan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.bakudan.farm/"><img src="https://avatars.githubusercontent.com/u/4504807?v=4?s=50" width="50px;" alt="バクダンくん"/><br /><sub><b>バクダンくん</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Bakudankun" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.gopherhub.org/"><img src="https://avatars.githubusercontent.com/u/41671631?v=4?s=50" width="50px;" alt="Raphael"/><br /><sub><b>Raphael</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=glepnir" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://tbodt.com/"><img src="https://avatars.githubusercontent.com/u/5678977?v=4?s=50" width="50px;" alt="tbodt"/><br /><sub><b>tbodt</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=tbodt" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://aaronmcdaid.github.io/"><img src="https://avatars.githubusercontent.com/u/64350?v=4?s=50" width="50px;" alt="Aaron McDaid"/><br /><sub><b>Aaron McDaid</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=aaronmcdaid" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/versi786"><img src="https://avatars.githubusercontent.com/u/7347942?v=4?s=50" width="50px;" alt="Aasif Versi"/><br /><sub><b>Aasif Versi</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=versi786" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abnerf"><img src="https://avatars.githubusercontent.com/u/56300?v=4?s=50" width="50px;" alt="Abner Silva"/><br /><sub><b>Abner Silva</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=abnerf" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sheerun.net/"><img src="https://avatars.githubusercontent.com/u/292365?v=4?s=50" width="50px;" alt="Adam Stankiewicz"/><br /><sub><b>Adam Stankiewicz</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=sheerun" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wirow.io/"><img src="https://avatars.githubusercontent.com/u/496683?v=4?s=50" width="50px;" alt="Adamansky Anton"/><br /><sub><b>Adamansky Anton</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=adamansky" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://gabri.me/"><img src="https://avatars.githubusercontent.com/u/63876?v=4?s=50" width="50px;" alt="Ahmed El Gabri"/><br /><sub><b>Ahmed El Gabri</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ahmedelgabri" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://theg4sh.ru/"><img src="https://avatars.githubusercontent.com/u/5094691?v=4?s=50" width="50px;" alt="Alexandr Kondratev"/><br /><sub><b>Alexandr Kondratev</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=theg4sh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andrewkshim"><img src="https://avatars.githubusercontent.com/u/1403410?v=4?s=50" width="50px;" alt="Andrew Shim"/><br /><sub><b>Andrew Shim</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=andrewkshim" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://andylindeman.com/"><img src="https://avatars.githubusercontent.com/u/395621?v=4?s=50" width="50px;" alt="Andy Lindeman"/><br /><sub><b>Andy Lindeman</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=alindeman" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Augustin82"><img src="https://avatars.githubusercontent.com/u/2370810?v=4?s=50" width="50px;" alt="Augustin"/><br /><sub><b>Augustin</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Augustin82" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bananium.fr/"><img src="https://avatars.githubusercontent.com/u/3650385?v=4?s=50" width="50px;" alt="Bastien Orivel"/><br /><sub><b>Bastien Orivel</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Eijebong" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ayroblu"><img src="https://avatars.githubusercontent.com/u/4915682?v=4?s=50" width="50px;" alt="Ben Lu"/><br /><sub><b>Ben Lu</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ayroblu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vantreeseba"><img src="https://avatars.githubusercontent.com/u/316782?v=4?s=50" width="50px;" alt="Ben"/><br /><sub><b>Ben</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=vantreeseba" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bmon"><img src="https://avatars.githubusercontent.com/u/2115272?v=4?s=50" width="50px;" alt="Brendan Roy"/><br /><sub><b>Brendan Roy</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=bmon" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/brianembry"><img src="https://avatars.githubusercontent.com/u/35347666?v=4?s=50" width="50px;" alt="brianembry"/><br /><sub><b>brianembry</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=brianembry" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://keybase.io/bri_"><img src="https://avatars.githubusercontent.com/u/284789?v=4?s=50" width="50px;" alt="br"/><br /><sub><b>br</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=b-" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/casonadams"><img src="https://avatars.githubusercontent.com/u/17597548?v=4?s=50" width="50px;" alt="Cason Adams"/><br /><sub><b>Cason Adams</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=casonadams" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/y9c"><img src="https://avatars.githubusercontent.com/u/5415510?v=4?s=50" width="50px;" alt="Chang Y"/><br /><sub><b>Chang Y</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=y9c" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://yous.be/"><img src="https://avatars.githubusercontent.com/u/853977?v=4?s=50" width="50px;" alt="Chayoung You"/><br /><sub><b>Chayoung You</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=yous" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chenlijun99"><img src="https://avatars.githubusercontent.com/u/20483759?v=4?s=50" width="50px;" alt="Chen Lijun"/><br /><sub><b>Chen Lijun</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=chenlijun99" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/beeender"><img src="https://avatars.githubusercontent.com/u/449296?v=4?s=50" width="50px;" alt="Chen Mulong"/><br /><sub><b>Chen Mulong</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=beeender" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://weyl.io/"><img src="https://avatars.githubusercontent.com/u/59620?v=4?s=50" width="50px;" alt="Chris Weyl"/><br /><sub><b>Chris Weyl</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=rsrchboy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dezza"><img src="https://avatars.githubusercontent.com/u/402927?v=4?s=50" width="50px;" alt="dezza"/><br /><sub><b>dezza</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=dezza" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ceedubs"><img src="https://avatars.githubusercontent.com/u/977929?v=4?s=50" width="50px;" alt="Cody Allen"/><br /><sub><b>Cody Allen</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ceedubs" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.25.wf/"><img src="https://avatars.githubusercontent.com/u/145502?v=4?s=50" width="50px;" alt="Damien Rajon"/><br /><sub><b>Damien Rajon</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=pyrho" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/daern91"><img src="https://avatars.githubusercontent.com/u/6084427?v=4?s=50" width="50px;" alt="Daniel Eriksson"/><br /><sub><b>Daniel Eriksson</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=daern91" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/danjenson"><img src="https://avatars.githubusercontent.com/u/4793438?v=4?s=50" width="50px;" alt="Daniel Jenson"/><br /><sub><b>Daniel Jenson</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=danjenson" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/davidmh"><img src="https://avatars.githubusercontent.com/u/594302?v=4?s=50" width="50px;" alt="David Mejorado"/><br /><sub><b>David Mejorado</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=davidmh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pderichai"><img src="https://avatars.githubusercontent.com/u/13430946?v=4?s=50" width="50px;" alt="Deric Pang"/><br /><sub><b>Deric Pang</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=pderichai" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.dingtao.org/blog"><img src="https://avatars.githubusercontent.com/u/12852587?v=4?s=50" width="50px;" alt="Ding Tao"/><br /><sub><b>Ding Tao</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=miyatsu" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/doronbehar"><img src="https://avatars.githubusercontent.com/u/10998835?v=4?s=50" width="50px;" alt="Doron Behar"/><br /><sub><b>Doron Behar</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=doronbehar" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kovetskiy"><img src="https://avatars.githubusercontent.com/u/8445924?v=4?s=50" width="50px;" alt="Egor Kovetskiy"/><br /><sub><b>Egor Kovetskiy</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kovetskiy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/elkowar"><img src="https://avatars.githubusercontent.com/u/5300871?v=4?s=50" width="50px;" alt="ElKowar"/><br /><sub><b>ElKowar</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=elkowar" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/demelev"><img src="https://avatars.githubusercontent.com/u/3952209?v=4?s=50" width="50px;" alt="Emeliov Dmitrii"/><br /><sub><b>Emeliov Dmitrii</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=demelev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sawmurai"><img src="https://avatars.githubusercontent.com/u/6454986?v=4?s=50" width="50px;" alt="Fabian Becker"/><br /><sub><b>Fabian Becker</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=sawmurai" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FallenWarrior2k"><img src="https://avatars.githubusercontent.com/u/20320149?v=4?s=50" width="50px;" alt="FallenWarrior2k"/><br /><sub><b>FallenWarrior2k</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=FallenWarrior2k" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fnune.com/"><img src="https://avatars.githubusercontent.com/u/16181067?v=4?s=50" width="50px;" alt="Fausto Núñez Alberro"/><br /><sub><b>Fausto Núñez Alberro</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=fnune" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FelipeCRamos"><img src="https://avatars.githubusercontent.com/u/7572843?v=4?s=50" width="50px;" alt="Felipe Ramos"/><br /><sub><b>Felipe Ramos</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=FelipeCRamos" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/frbor"><img src="https://avatars.githubusercontent.com/u/2320183?v=4?s=50" width="50px;" alt="Fredrik Borg"/><br /><sub><b>Fredrik Borg</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=frbor" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.gavinsim.co.uk/"><img src="https://avatars.githubusercontent.com/u/812273?v=4?s=50" width="50px;" alt="Gavin Sim"/><br /><sub><b>Gavin Sim</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=gavsim" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fahn.co/"><img src="https://avatars.githubusercontent.com/u/15943089?v=4?s=50" width="50px;" alt="Gibson Fahnestock"/><br /><sub><b>Gibson Fahnestock</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=gibfahn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/giovannigiordano"><img src="https://avatars.githubusercontent.com/u/15145952?v=4?s=50" width="50px;" alt="Giovanni Giordano"/><br /><sub><b>Giovanni Giordano</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=giovannigiordano" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/qubbit"><img src="https://avatars.githubusercontent.com/u/1987473?v=4?s=50" width="50px;" alt="Gopal Adhikari"/><br /><sub><b>Gopal Adhikari</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=qubbit" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hanh090"><img src="https://avatars.githubusercontent.com/u/3643657?v=4?s=50" width="50px;" alt="Hanh Le"/><br /><sub><b>Hanh Le</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hanh090" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hedyhli"><img src="https://avatars.githubusercontent.com/u/50042066?v=4?s=50" width="50px;" alt="hedy"/><br /><sub><b>hedy</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hedyhli" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.hendriklammers.com/"><img src="https://avatars.githubusercontent.com/u/754556?v=4?s=50" width="50px;" alt="Hendrik Lammers"/><br /><sub><b>Hendrik Lammers</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hendriklammers" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/henrybarreto"><img src="https://avatars.githubusercontent.com/u/23109089?v=4?s=50" width="50px;" alt="Henry Barreto"/><br /><sub><b>Henry Barreto</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=henrybarreto" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hugo.barrera.io/"><img src="https://avatars.githubusercontent.com/u/730811?v=4?s=50" width="50px;" alt="Hugo"/><br /><sub><b>Hugo</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=WhyNotHugo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jackieli-tes"><img src="https://avatars.githubusercontent.com/u/64778297?v=4?s=50" width="50px;" alt="Jackie Li"/><br /><sub><b>Jackie Li</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=jackieli-tes" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MrQubo"><img src="https://avatars.githubusercontent.com/u/16545322?v=4?s=50" width="50px;" alt="Jakub Nowak"/><br /><sub><b>Jakub Nowak</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=MrQubo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/euoia"><img src="https://avatars.githubusercontent.com/u/1271216?v=4?s=50" width="50px;" alt="James Pickard"/><br /><sub><b>James Pickard</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=euoia" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jsfaint"><img src="https://avatars.githubusercontent.com/u/571829?v=4?s=50" width="50px;" alt="Jia Sui"/><br /><sub><b>Jia Sui</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=jsfaint" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/expipiplus1"><img src="https://avatars.githubusercontent.com/u/857308?v=4?s=50" width="50px;" alt="Ellie Hermaszewska"/><br /><sub><b>Ellie Hermaszewska</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=expipiplus1" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://cincodenada.com/"><img src="https://avatars.githubusercontent.com/u/479715?v=4?s=50" width="50px;" alt="Joel Bradshaw"/><br /><sub><b>Joel Bradshaw</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=cincodenada" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/irizwaririz"><img src="https://avatars.githubusercontent.com/u/10111643?v=4?s=50" width="50px;" alt="John Carlo Roberto"/><br /><sub><b>John Carlo Roberto</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=irizwaririz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Jomik"><img src="https://avatars.githubusercontent.com/u/699655?v=4?s=50" width="50px;" alt="Jonas Holst Damtoft"/><br /><sub><b>Jonas Holst Damtoft</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Jomik" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://inlehmansterms.net/"><img src="https://avatars.githubusercontent.com/u/3144695?v=4?s=50" width="50px;" alt="Jonathan Lehman"/><br /><sub><b>Jonathan Lehman</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=jdlehman" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://joosep.xyz/"><img src="https://avatars.githubusercontent.com/u/9450943?v=4?s=50" width="50px;" alt="Joosep Alviste"/><br /><sub><b>Joosep Alviste</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=JoosepAlviste" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/josa42"><img src="https://avatars.githubusercontent.com/u/423234?v=4?s=50" width="50px;" alt="Josa Gesell"/><br /><sub><b>Josa Gesell</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=josa42" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jawa.dev/"><img src="https://avatars.githubusercontent.com/u/194275?v=4?s=50" width="50px;" alt="Joshua Rubin"/><br /><sub><b>Joshua Rubin</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=joshuarubin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/perrin4869"><img src="https://avatars.githubusercontent.com/u/5774716?v=4?s=50" width="50px;" alt="Julian Grinblat"/><br /><sub><b>Julian Grinblat</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=perrin4869" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://valentjn.github.io/"><img src="https://avatars.githubusercontent.com/u/19839841?v=4?s=50" width="50px;" alt="Julian Valentin"/><br /><sub><b>Julian Valentin</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=valentjn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kabbamine.github.io/"><img src="https://avatars.githubusercontent.com/u/5658084?v=4?s=50" width="50px;" alt="KabbAmine"/><br /><sub><b>KabbAmine</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=KabbAmine" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://moncargo.io/"><img src="https://avatars.githubusercontent.com/u/10719495?v=4?s=50" width="50px;" alt="Kay Gosho"/><br /><sub><b>Kay Gosho</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=acro5piano" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kennyvh.com/"><img src="https://avatars.githubusercontent.com/u/29909203?v=4?s=50" width="50px;" alt="Kenny Huynh"/><br /><sub><b>Kenny Huynh</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hkennyv" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kevinrambaud"><img src="https://avatars.githubusercontent.com/u/7501477?v=4?s=50" width="50px;" alt="Kevin Rambaud"/><br /><sub><b>Kevin Rambaud</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kevinrambaud" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kiancross"><img src="https://avatars.githubusercontent.com/u/11011464?v=4?s=50" width="50px;" alt="Kian Cross"/><br /><sub><b>Kian Cross</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kiancross" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ko-fi.com/kristijanhusak"><img src="https://avatars.githubusercontent.com/u/1782860?v=4?s=50" width="50px;" alt="Kristijan Husak"/><br /><sub><b>Kristijan Husak</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kristijanhusak" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NullVoxPopuli"><img src="https://avatars.githubusercontent.com/u/199018?v=4?s=50" width="50px;" alt="NullVoxPopuli"/><br /><sub><b>NullVoxPopuli</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=NullVoxPopuli" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lassepe"><img src="https://avatars.githubusercontent.com/u/10076790?v=4?s=50" width="50px;" alt="Lasse Peters"/><br /><sub><b>Lasse Peters</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=lassepe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Linerre"><img src="https://avatars.githubusercontent.com/u/49512984?v=4?s=50" width="50px;" alt="Noel Errenil"/><br /><sub><b>Noel Errenil</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Linerre" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LinArcX"><img src="https://avatars.githubusercontent.com/u/10884422?v=4?s=50" width="50px;" alt="LinArcX"/><br /><sub><b>LinArcX</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=LinArcX" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://paypal.me/liuchengxu"><img src="https://avatars.githubusercontent.com/u/8850248?v=4?s=50" width="50px;" alt="Liu-Cheng Xu"/><br /><sub><b>Liu-Cheng Xu</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=liuchengxu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://malloc.me/"><img src="https://avatars.githubusercontent.com/u/4153572?v=4?s=50" width="50px;" alt="Marc"/><br /><sub><b>Marc</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=foxtrot" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mgaw"><img src="https://avatars.githubusercontent.com/u/2177016?v=4?s=50" width="50px;" alt="Marius Gawrisch"/><br /><sub><b>Marius Gawrisch</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=mgaw" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.markhz.com/"><img src="https://avatars.githubusercontent.com/u/2789742?v=4?s=50" width="50px;" alt="Mark Hintz"/><br /><sub><b>Mark Hintz</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=mhintz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MatElGran"><img src="https://avatars.githubusercontent.com/u/1052778?v=4?s=50" width="50px;" alt="Mathieu Le Tiec"/><br /><sub><b>Mathieu Le Tiec</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=MatElGran" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://matt-w.net/"><img src="https://avatars.githubusercontent.com/u/8656127?v=4?s=50" width="50px;" alt="Matt White"/><br /><sub><b>Matt White</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=matt-fff" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ml-evs"><img src="https://avatars.githubusercontent.com/u/7916000?v=4?s=50" width="50px;" alt="Matthew Evans"/><br /><sub><b>Matthew Evans</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ml-evs" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Me1onRind"><img src="https://avatars.githubusercontent.com/u/19531270?v=4?s=50" width="50px;" alt="Me1onRind"/><br /><sub><b>Me1onRind</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Me1onRind" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Qyriad"><img src="https://avatars.githubusercontent.com/u/1542224?v=4?s=50" width="50px;" alt="Qyriad"/><br /><sub><b>Qyriad</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Qyriad" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://leo.is-a.dev/"><img src="https://avatars.githubusercontent.com/u/35312043?v=4?s=50" width="50px;" alt="Narcis B."/><br /><sub><b>Narcis B.</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=leonardssh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Neur1n"><img src="https://avatars.githubusercontent.com/u/17579247?v=4?s=50" width="50px;" alt="Neur1n"/><br /><sub><b>Neur1n</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Neur1n" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nicoder"><img src="https://avatars.githubusercontent.com/u/365210?v=4?s=50" width="50px;" alt="Nicolas Dermine"/><br /><sub><b>Nicolas Dermine</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=nicoder" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NoahTheDuke"><img src="https://avatars.githubusercontent.com/u/603677?v=4?s=50" width="50px;" alt="Noah"/><br /><sub><b>Noah</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=NoahTheDuke" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/IndexXuan"><img src="https://avatars.githubusercontent.com/u/6322673?v=4?s=50" width="50px;" alt="PENG Rui"/><br /><sub><b>PENG Rui</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=IndexXuan" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://liaoph.com/"><img src="https://avatars.githubusercontent.com/u/6123425?v=4?s=50" width="50px;" alt="Paco"/><br /><sub><b>Paco</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=paco0x" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/peng1999"><img src="https://avatars.githubusercontent.com/u/12483662?v=4?s=50" width="50px;" alt="Peng Guanwen"/><br /><sub><b>Peng Guanwen</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=peng1999" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.twitter.com/badeip"><img src="https://avatars.githubusercontent.com/u/1106732?v=4?s=50" width="50px;" alt="Petter Wahlman"/><br /><sub><b>Petter Wahlman</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ilAYAli" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pvonmoradi"><img src="https://avatars.githubusercontent.com/u/1058151?v=4?s=50" width="50px;" alt="Pooya Moradi"/><br /><sub><b>Pooya Moradi</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=pvonmoradi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/QuadeMorrison"><img src="https://avatars.githubusercontent.com/u/10917383?v=4?s=50" width="50px;" alt="Quade Morrison"/><br /><sub><b>Quade Morrison</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=QuadeMorrison" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vogler"><img src="https://avatars.githubusercontent.com/u/493741?v=4?s=50" width="50px;" alt="Ralf Vogler"/><br /><sub><b>Ralf Vogler</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=vogler" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/crccw"><img src="https://avatars.githubusercontent.com/u/41463?v=4?s=50" width="50px;" alt="Ran Chen"/><br /><sub><b>Ran Chen</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=crccw" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://bigardone.dev/"><img src="https://avatars.githubusercontent.com/u/1090272?v=4?s=50" width="50px;" alt="Ricardo García Vega"/><br /><sub><b>Ricardo García Vega</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=bigardone" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nomasprime"><img src="https://avatars.githubusercontent.com/u/140855?v=4?s=50" width="50px;" alt="Rick Jones"/><br /><sub><b>Rick Jones</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=nomasprime" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rschristian"><img src="https://avatars.githubusercontent.com/u/33403762?v=4?s=50" width="50px;" alt="Ryan Christian"/><br /><sub><b>Ryan Christian</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=rschristian" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://salo.so/"><img src="https://avatars.githubusercontent.com/u/4694263?v=4?s=50" width="50px;" alt="Salo"/><br /><sub><b>Salo</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=winterbesos" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Hazelfire"><img src="https://avatars.githubusercontent.com/u/13807753?v=4?s=50" width="50px;" alt="Sam Nolan"/><br /><sub><b>Sam Nolan</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Hazelfire" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rickysaurav"><img src="https://avatars.githubusercontent.com/u/13986039?v=4?s=50" width="50px;" alt="Saurav"/><br /><sub><b>Saurav</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=rickysaurav" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/smackesey"><img src="https://avatars.githubusercontent.com/u/1531373?v=4?s=50" width="50px;" alt="Sean Mackesey"/><br /><sub><b>Sean Mackesey</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=smackesey" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sheeldotme"><img src="https://avatars.githubusercontent.com/u/6991406?v=4?s=50" width="50px;" alt="Sheel Patel"/><br /><sub><b>Sheel Patel</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=sheeldotme" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/solomonwzs"><img src="https://avatars.githubusercontent.com/u/907942?v=4?s=50" width="50px;" alt="Solomon Ng"/><br /><sub><b>Solomon Ng</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=solomonwzs" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kadimisetty"><img src="https://avatars.githubusercontent.com/u/535947?v=4?s=50" width="50px;" alt="Sri Kadimisetty"/><br /><sub><b>Sri Kadimisetty</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kadimisetty" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/stephenprater"><img src="https://avatars.githubusercontent.com/u/149870?v=4?s=50" width="50px;" alt="Stephen Prater"/><br /><sub><b>Stephen Prater</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=stephenprater" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kibs.dk/"><img src="https://avatars.githubusercontent.com/u/14085?v=4?s=50" width="50px;" alt="Sune Kibsgaard"/><br /><sub><b>Sune Kibsgaard</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kibs" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Aquaakuma"><img src="https://avatars.githubusercontent.com/u/31891793?v=4?s=50" width="50px;" alt="Aquaakuma"/><br /><sub><b>Aquaakuma</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Aquaakuma" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/coil398"><img src="https://avatars.githubusercontent.com/u/7694377?v=4?s=50" width="50px;" alt="Takumi Kawase"/><br /><sub><b>Takumi Kawase</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=coil398" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/theblobscp"><img src="https://avatars.githubusercontent.com/u/81673375?v=4?s=50" width="50px;" alt="The Blob SCP"/><br /><sub><b>The Blob SCP</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=theblobscp" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/przepompownia"><img src="https://avatars.githubusercontent.com/u/11404453?v=4?s=50" width="50px;" alt="Tomasz N"/><br /><sub><b>Tomasz N</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=przepompownia" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gasuketsu"><img src="https://avatars.githubusercontent.com/u/15703757?v=4?s=50" width="50px;" alt="Tomoyuki Harada"/><br /><sub><b>Tomoyuki Harada</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=gasuketsu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tonyfettes"><img src="https://avatars.githubusercontent.com/u/29998228?v=4?s=50" width="50px;" alt="Tony Fettes"/><br /><sub><b>Tony Fettes</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=tonyfettes" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.git-pull.com/"><img src="https://avatars.githubusercontent.com/u/26336?v=4?s=50" width="50px;" alt="Tony Narlock"/><br /><sub><b>Tony Narlock</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=tony" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.wwwjfy.net/"><img src="https://avatars.githubusercontent.com/u/126527?v=4?s=50" width="50px;" alt="Tony Wang"/><br /><sub><b>Tony Wang</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=wwwjfy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Varal7"><img src="https://avatars.githubusercontent.com/u/8019486?v=4?s=50" width="50px;" alt="Victor Quach"/><br /><sub><b>Victor Quach</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Varal7" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/whisperity"><img src="https://avatars.githubusercontent.com/u/1969470?v=4?s=50" width="50px;" alt="Whisperity"/><br /><sub><b>Whisperity</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=whisperity" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/willtrnr"><img src="https://avatars.githubusercontent.com/u/1878110?v=4?s=50" width="50px;" alt="William Turner"/><br /><sub><b>William Turner</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=willtrnr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://drafts.damnever.com/"><img src="https://avatars.githubusercontent.com/u/6223594?v=4?s=50" width="50px;" alt="Xiaochao Dong"/><br /><sub><b>Xiaochao Dong</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=damnever" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hyhugh"><img src="https://avatars.githubusercontent.com/u/16500351?v=4?s=50" width="50px;" alt="Hugh Hou"/><br /><sub><b>Hugh Hou</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hyhugh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jackielii"><img src="https://avatars.githubusercontent.com/u/360983?v=4?s=50" width="50px;" alt="Jackie Li"/><br /><sub><b>Jackie Li</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=jackielii" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TheConfuZzledDude"><img src="https://avatars.githubusercontent.com/u/3160203?v=4?s=50" width="50px;" alt="Zachary Freed"/><br /><sub><b>Zachary Freed</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=TheConfuZzledDude" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/akiyosi"><img src="https://avatars.githubusercontent.com/u/8478977?v=4?s=50" width="50px;" alt="akiyosi"/><br /><sub><b>akiyosi</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=akiyosi" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alexjg"><img src="https://avatars.githubusercontent.com/u/224635?v=4?s=50" width="50px;" alt="alexjg"/><br /><sub><b>alexjg</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=alexjg" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aste4"><img src="https://avatars.githubusercontent.com/u/47511385?v=4?s=50" width="50px;" alt="aste4"/><br /><sub><b>aste4</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=aste4" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/clyfish"><img src="https://avatars.githubusercontent.com/u/541215?v=4?s=50" width="50px;" alt="clyfish"/><br /><sub><b>clyfish</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=clyfish" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dev7ba"><img src="https://avatars.githubusercontent.com/u/93706552?v=4?s=50" width="50px;" alt="dev7ba"/><br /><sub><b>dev7ba</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=dev7ba" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/diartyz"><img src="https://avatars.githubusercontent.com/u/4486152?v=4?s=50" width="50px;" alt="diartyz"/><br /><sub><b>diartyz</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=diartyz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/doza-daniel"><img src="https://avatars.githubusercontent.com/u/13752683?v=4?s=50" width="50px;" alt="doza-daniel"/><br /><sub><b>doza-daniel</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=doza-daniel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/equal-l2"><img src="https://avatars.githubusercontent.com/u/8597717?v=4?s=50" width="50px;" alt="equal-l2"/><br /><sub><b>equal-l2</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=equal-l2" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FongHou"><img src="https://avatars.githubusercontent.com/u/13973254?v=4?s=50" width="50px;" alt="fong"/><br /><sub><b>fong</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=FongHou" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.hexuhua.vercel.app/"><img src="https://avatars.githubusercontent.com/u/26080416?v=4?s=50" width="50px;" alt="hexh"/><br /><sub><b>hexh</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hexh250786313" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hhiraba"><img src="https://avatars.githubusercontent.com/u/4624806?v=4?s=50" width="50px;" alt="hhiraba"/><br /><sub><b>hhiraba</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hhiraba" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ic-768"><img src="https://avatars.githubusercontent.com/u/83115125?v=4?s=50" width="50px;" alt="ic-768"/><br /><sub><b>ic-768</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ic-768" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/javiertury"><img src="https://avatars.githubusercontent.com/u/1520320?v=4?s=50" width="50px;" alt="javiertury"/><br /><sub><b>javiertury</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=javiertury" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/seiyeah78"><img src="https://avatars.githubusercontent.com/u/6185139?v=4?s=50" width="50px;" alt="karasu"/><br /><sub><b>karasu</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=seiyeah78" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kevineato"><img src="https://avatars.githubusercontent.com/u/13666221?v=4?s=50" width="50px;" alt="kevineato"/><br /><sub><b>kevineato</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=kevineato" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/m4c0"><img src="https://avatars.githubusercontent.com/u/1664510?v=4?s=50" width="50px;" alt="Eduardo Costa"/><br /><sub><b>Eduardo Costa</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=m4c0" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/micchy326"><img src="https://avatars.githubusercontent.com/u/23257067?v=4?s=50" width="50px;" alt="micchy326"/><br /><sub><b>micchy326</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=micchy326" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://keybase.io/midchildan"><img src="https://avatars.githubusercontent.com/u/7343721?v=4?s=50" width="50px;" alt="midchildan"/><br /><sub><b>midchildan</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=midchildan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/minefuto"><img src="https://avatars.githubusercontent.com/u/46558834?v=4?s=50" width="50px;" alt="minefuto"/><br /><sub><b>minefuto</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=minefuto" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/robokomy"><img src="https://avatars.githubusercontent.com/u/20733354?v=4?s=50" width="50px;" alt="miyanokomiya"/><br /><sub><b>miyanokomiya</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=miyanokomiya" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/miyaviee"><img src="https://avatars.githubusercontent.com/u/15247561?v=4?s=50" width="50px;" alt="miyaviee"/><br /><sub><b>miyaviee</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=miyaviee" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/monkoose"><img src="https://avatars.githubusercontent.com/u/6261276?v=4?s=50" width="50px;" alt="monkoose"/><br /><sub><b>monkoose</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=monkoose" title="Code">💻</a> <a href="https://github.com/neoclide/coc.nvim/issues?q=author%3Amonkoose" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mujx"><img src="https://avatars.githubusercontent.com/u/6430350?v=4?s=50" width="50px;" alt="mujx"/><br /><sub><b>mujx</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=mujx" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mvilim"><img src="https://avatars.githubusercontent.com/u/40682862?v=4?s=50" width="50px;" alt="mvilim"/><br /><sub><b>mvilim</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=mvilim" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://naruaway.com/"><img src="https://avatars.githubusercontent.com/u/2931577?v=4?s=50" width="50px;" alt="naruaway"/><br /><sub><b>naruaway</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=naruaway" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/piersy"><img src="https://avatars.githubusercontent.com/u/5087847?v=4?s=50" width="50px;" alt="piersy"/><br /><sub><b>piersy</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=piersy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ryantig"><img src="https://avatars.githubusercontent.com/u/324810?v=4?s=50" width="50px;" alt="ryantig"/><br /><sub><b>ryantig</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=ryantig" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://catcat.cc/"><img src="https://avatars.githubusercontent.com/u/19602440?v=4?s=50" width="50px;" alt="rydesun"/><br /><sub><b>rydesun</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=rydesun" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sc00ter"><img src="https://avatars.githubusercontent.com/u/1271025?v=4?s=50" width="50px;" alt="sc00ter"/><br /><sub><b>sc00ter</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=sc00ter" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/smhc"><img src="https://avatars.githubusercontent.com/u/6404304?v=4?s=50" width="50px;" alt="smhc"/><br /><sub><b>smhc</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=smhc" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/stkaplan"><img src="https://avatars.githubusercontent.com/u/594990?v=4?s=50" width="50px;" alt="Sam Kaplan"/><br /><sub><b>Sam Kaplan</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=stkaplan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tasuten"><img src="https://avatars.githubusercontent.com/u/1623176?v=4?s=50" width="50px;" alt="tasuten"/><br /><sub><b>tasuten</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=tasuten" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://todesking.com/"><img src="https://avatars.githubusercontent.com/u/112881?v=4?s=50" width="50px;" alt="todesking"/><br /><sub><b>todesking</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=todesking" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/typicode"><img src="https://avatars.githubusercontent.com/u/5502029?v=4?s=50" width="50px;" alt="typicode"/><br /><sub><b>typicode</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=typicode" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://limingfei56.github.io/"><img src="https://avatars.githubusercontent.com/u/8553407?v=4?s=50" width="50px;" alt="李鸣飞"/><br /><sub><b>李鸣飞</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=LiMingFei56" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=50" width="50px;" alt="Ikko Ashimine"/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=eltociear" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rammiah"><img src="https://avatars.githubusercontent.com/u/26727562?v=4?s=50" width="50px;" alt="Rammiah"/><br /><sub><b>Rammiah</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/issues?q=author%3Arammiah" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://keybase.io/lambdalisue"><img src="https://avatars.githubusercontent.com/u/546312?v=4?s=50" width="50px;" alt="Alisue"/><br /><sub><b>Alisue</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/issues?q=author%3Alambdalisue" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://bigshans.github.io"><img src="https://avatars.githubusercontent.com/u/26884666?v=4?s=50" width="50px;" alt="bigshans"/><br /><sub><b>bigshans</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=bigshans" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rob-3"><img src="https://avatars.githubusercontent.com/u/24816247?v=4?s=50" width="50px;" alt="Robert Boyd III"/><br /><sub><b>Robert Boyd III</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/issues?q=author%3Arob-3" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://creasty.com"><img src="https://avatars.githubusercontent.com/u/1695538?v=4?s=50" width="50px;" alt="Yuki Iwanaga"/><br /><sub><b>Yuki Iwanaga</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=creasty" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.dosk.win/"><img src="https://avatars.githubusercontent.com/u/2389889?v=4?s=50" width="50px;" alt="SpringHack"/><br /><sub><b>SpringHack</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/issues?q=author%3Aspringhack" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://git.lmburns.com"><img src="https://avatars.githubusercontent.com/u/44355502?v=4?s=50" width="50px;" alt="Lucas Burns"/><br /><sub><b>Lucas Burns</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=lmburns" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://qiqi.boy.im"><img src="https://avatars.githubusercontent.com/u/3774036?v=4?s=50" width="50px;" alt="qiqiboy"/><br /><sub><b>qiqiboy</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=qiqiboy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/timsu92"><img src="https://avatars.githubusercontent.com/u/33785401?v=4?s=50" width="50px;" alt="timsu92"/><br /><sub><b>timsu92</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=timsu92" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sartak.org"><img src="https://avatars.githubusercontent.com/u/45430?v=4?s=50" width="50px;" alt="Shawn M Moore"/><br /><sub><b>Shawn M Moore</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=sartak" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aauren"><img src="https://avatars.githubusercontent.com/u/1392295?v=4?s=50" width="50px;" alt="Aaron U'Ren"/><br /><sub><b>Aaron U'Ren</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/issues?q=author%3Aaauren" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SirCharlieMars"><img src="https://avatars.githubusercontent.com/u/31679231?v=4?s=50" width="50px;" alt="SeniorMars"/><br /><sub><b>SeniorMars</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=SirCharlieMars" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/CollieIsCute"><img src="https://avatars.githubusercontent.com/u/43088530?v=4?s=50" width="50px;" alt="牧羊犬真Q"/><br /><sub><b>牧羊犬真Q</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=CollieIsCute" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://geraldspreer.com"><img src="https://avatars.githubusercontent.com/u/1745692?v=4?s=50" width="50px;" alt="geraldspreer"/><br /><sub><b>geraldspreer</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=geraldspreer" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://3ximus.github.io/cv"><img src="https://avatars.githubusercontent.com/u/9083012?v=4?s=50" width="50px;" alt="Fabio"/><br /><sub><b>Fabio</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=3ximus" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/skysky97"><img src="https://avatars.githubusercontent.com/u/18086458?v=4?s=50" width="50px;" alt="Li Yunting"/><br /><sub><b>Li Yunting</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/issues?q=author%3Askysky97" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LebJe"><img src="https://avatars.githubusercontent.com/u/51171427?v=4?s=50" width="50px;" alt="Jeff L."/><br /><sub><b>Jeff L.</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=LebJe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hachyderm.io/@mcmire"><img src="https://avatars.githubusercontent.com/u/7371?v=4?s=50" width="50px;" alt="Elliot Winkler"/><br /><sub><b>Elliot Winkler</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=mcmire" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.lebstertm.com"><img src="https://avatars.githubusercontent.com/u/15955811?v=4?s=50" width="50px;" alt="Svetlozar Iliev"/><br /><sub><b>Svetlozar Iliev</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=asmodeus812" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://43081j.com/"><img src="https://avatars.githubusercontent.com/u/5677153?v=4?s=50" width="50px;" alt="James Garbutt"/><br /><sub><b>James Garbutt</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=43081j" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kaiser-Yang"><img src="https://avatars.githubusercontent.com/u/58209855?v=4?s=50" width="50px;" alt="Qingzhou Yue"/><br /><sub><b>Qingzhou Yue</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=Kaiser-Yang" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/de-vries-maarten/"><img src="https://avatars.githubusercontent.com/u/786213?v=4?s=50" width="50px;" alt="Maarten de Vries"/><br /><sub><b>Maarten de Vries</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=de-vri-es" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/A4-Tacks"><img src="https://avatars.githubusercontent.com/u/102709083?v=4?s=50" width="50px;" alt="A4-Tacks"/><br /><sub><b>A4-Tacks</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=A4-Tacks" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zhixiao-zhang"><img src="https://avatars.githubusercontent.com/u/89405463?v=4?s=50" width="50px;" alt="forceofsystem"/><br /><sub><b>forceofsystem</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=zhixiao-zhang" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/statiolake"><img src="https://avatars.githubusercontent.com/u/20490597?v=4?s=50" width="50px;" alt="lake"/><br /><sub><b>lake</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=statiolake" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.davidosomething.com/"><img src="https://avatars.githubusercontent.com/u/609213?v=4?s=50" width="50px;" alt="David O'Trakoun"/><br /><sub><b>David O'Trakoun</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=davidosomething" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aispeaking"><img src="https://avatars.githubusercontent.com/u/139532597?v=4?s=50" width="50px;" alt="aispeaking"/><br /><sub><b>aispeaking</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=aispeaking" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cclauss"><img src="https://avatars.githubusercontent.com/u/3709715?v=4?s=50" width="50px;" alt="Christian Clauss"/><br /><sub><b>Christian Clauss</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=cclauss" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://mehalter.com"><img src="https://avatars.githubusercontent.com/u/1591837?v=4?s=50" width="50px;" alt="Micah Halter"/><br /><sub><b>Micah Halter</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=mehalter" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cridemichel"><img src="https://avatars.githubusercontent.com/u/15322138?v=4?s=50" width="50px;" alt="Cristiano De Michele"/><br /><sub><b>Cristiano De Michele</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=cridemichel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://yongjie.codes/"><img src="https://avatars.githubusercontent.com/u/14101781?v=4?s=50" width="50px;" alt="Yong Jie"/><br /><sub><b>Yong Jie</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=YongJieYongJie" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://eight45.net"><img src="https://avatars.githubusercontent.com/u/489362?v=4?s=50" width="50px;" alt="Kira Oakley"/><br /><sub><b>Kira Oakley</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=hackergrrl" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://merwan.github.io"><img src="https://avatars.githubusercontent.com/u/222879?v=4?s=50" width="50px;" alt="Merouane Atig"/><br /><sub><b>Merouane Atig</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=merwan" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://gera2ld.space/"><img src="https://avatars.githubusercontent.com/u/3139113?v=4?s=50" width="50px;" alt="Gerald"/><br /><sub><b>Gerald</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=gera2ld" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nicklas.sedlock.xyz/"><img src="https://avatars.githubusercontent.com/u/47660390?v=4?s=50" width="50px;" alt="Nicklas Sedlock"/><br /><sub><b>Nicklas Sedlock</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=V-Mann-Nick" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tcx4c70"><img src="https://avatars.githubusercontent.com/u/16728230?v=4?s=50" width="50px;" alt="Adam Tao"/><br /><sub><b>Adam Tao</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=tcx4c70" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/itsf4llofstars"><img src="https://avatars.githubusercontent.com/u/90528743?v=4?s=50" width="50px;" alt="itsf4llofstars"/><br /><sub><b>itsf4llofstars</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=itsf4llofstars" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/brainwo"><img src="https://avatars.githubusercontent.com/u/45139213?v=4?s=50" width="50px;" alt="Brian Wo"/><br /><sub><b>Brian Wo</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=brainwo" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wsdjeg.net/"><img src="https://avatars.githubusercontent.com/u/13142418?v=4?s=50" width="50px;" alt="Eric Wong"/><br /><sub><b>Eric Wong</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=wsdjeg" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/oxalica"><img src="https://avatars.githubusercontent.com/u/14816024?v=4?s=50" width="50px;" alt="oxalica"/><br /><sub><b>oxalica</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=oxalica" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/laktak"><img src="https://avatars.githubusercontent.com/u/959858?v=4?s=50" width="50px;" alt="Christian Zangl"/><br /><sub><b>Christian Zangl</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=laktak" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zoumi"><img src="https://avatars.githubusercontent.com/u/5162901?v=4?s=50" width="50px;" alt="zoumi"/><br /><sub><b>zoumi</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=zoumi" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/atitcreate"><img src="https://avatars.githubusercontent.com/u/40348360?v=4?s=50" width="50px;" alt="atitcreate"/><br /><sub><b>atitcreate</b></sub></a><br /><a href="https://github.com/neoclide/coc.nvim/commits?author=atitcreate" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!

## License

[Anti 996](./LICENSE.md)

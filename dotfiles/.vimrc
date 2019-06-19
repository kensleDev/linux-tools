let mapleader = "\<Space>"

nnoremap <Leader>f :Files<CR>

nnoremap <Leader>g :GFiles<CR>


" nnoremap <Leader>a :echo "Hey there ,"<CR>


" Plugins will be downloaded under the specified directory.
call plug#begin('~/.vim/plugged')

" Declare the list of plugins.
Plug 'tpope/vim-sensible'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'

Plug 'ryanoasis/vim-devicons'

" Typescript
Plug 'quramy/tsuquyomi'
let g:tsuquyomi_completion_detail = 1

Plug 'leafgarland/typescript-vim'
Plug 'jason0x43/vim-js-indent'
Plug 'quramy/vim-dtsm'
Plug 'mhartington/vim-typings'


" List ends here. Plugins become visible to Vim after this call.
call plug#end()

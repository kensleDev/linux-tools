let mapleader = "\<Space>"
set number
set relativenumber
set hidden
" ------------------------------------------------------------------------------------- Plugins
call plug#begin('~/.vim/plugged')
" --------------------------------

Plug 'tpope/vim-sensible'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'ryanoasis/vim-devicons'
Plug 'ervandew/screen'
Plug 'terryma/vim-smooth-scroll'
Plug 'sheerun/vim-polyglot'
Plug 'rafi/awesome-vim-colorschemes'

Plug 'troydm/zoomwintab.vim'
Plug 'craigemery/vim-autotag'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'majutsushi/tagbar'

" source ~/.vim/config/coc

" ------------------------------------------------------------------ CONFIG
" List ends here. Plugins become visible to Vim after this call.
call plug#end()

colorscheme dracula
let g:airline_theme='dracula'
let g:autotagTagsFile=".tags"
let g:airline_powerline_fonts = 1
set t_Co=256
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#fnamemod = ':t'
" Enable deoplete at startup
let g:deoplete#enable_at_startup = 1

source ~/.vim/config/nav

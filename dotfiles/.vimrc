set hidden
map <S-x> :bn<CR>
map <S-z> :bp<CR>

" ----------------------------------------------------------------
" Start Plugins
:set nocompatible
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" ----------------------------------------------------------------

Plugin 'tomasiser/vim-code-dark'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'

Plugin 'scrooloose/syntastic'
Plugin 'kien/ctrlp.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'ap/vim-buftabline'
Plugin 'xolox/vim-session'
Plugin 'xolox/vim-misc'
" ----------------------------------------------------------------
" Finish Plugins
call vundle#end()            " required
filetype plugin indent on    " required
" ----------------------------------------------------------------


" Global

" Theme
set t_Co=256
set t_ut=
colorscheme codedark
let g:airline_theme = 'codedark'

" Syntax
" Syntastic
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

" Nerdtree
map <C-l> :NERDTreeToggle<CR>

" Control P
map <C-o> :CtrlPBuffer<CR>

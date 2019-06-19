let mapleader = "\<Space>"

" FZF
nnoremap <Leader>f :Files!<CR>
nnoremap <Leader>g :GFiles!<CR>


" TS
set ballooneval
autocmd FileType typescript setlocal balloonexpr=tsuquyomi#balloonexpr()


" ------------------------------------------------------------------------------------- Plugins
call plug#begin('~/.vim/plugged')

" Declare the list of plugins.
Plug 'tpope/vim-sensible'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'ryanoasis/vim-devicons'

"  ------------------------------------------------------------------ Airline
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
let g:airline_theme='violet'
let g:airline_powerline_fonts = 1
set t_Co=256
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#fnamemod = ':t'

"  ------------------------------------------------------------------ Buffers
Plug 'ctrlpvim/ctrlp.vim'
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/](\.(git|hg|svn)|\_site)$',
  \ 'file': '\v\.(exe|so|dll|class|png|jpg|jpeg)$',
\}
" Use the nearest .git directory as the cwd
" This makes a lot of sense if you are working on a project that is in version
" control. It also supports works with .svn, .hg, .bzr.
let g:ctrlp_working_path_mode = 'r'
" Use a leader instead of the actual named binding
nmap <leader>p :CtrlP<cr>
" Easy bindings for its various modes
nmap <leader>bb :CtrlPBuffer<cr>
nmap <leader>bm :CtrlPMixed<cr>
nmap <leader>bs :CtrlPMRU<cr>


" Zoom
Plug 'troydm/zoomwintab.vim'

nnoremap <Leader>z :ZoomWindowToggle<CR>


Plug 'jeetsukumaran/vim-buffergator'
" Use the right side of the screen
let g:buffergator_viewport_split_policy = 'R'

" I want my own keymappings...
let g:buffergator_suppress_keymaps = 1

" Looper buffers
"let g:buffergator_mru_cycle_loop = 1

" Go to the previous buffer open
nmap <leader>jj :BuffergatorMruCyclePrev<cr>

" Go to the next buffer open
nmap <leader>kk :BuffergatorMruCycleNext<cr>

" View the entire list of buffers open
nmap <leader>bl :BuffergatorOpen<cr>

" Shared bindings from Solution #1 from earlier
nmap <leader>T :enew<cr>
nmap <leader>bq :bp <BAR> bd #<cr>

" ------------------------------------------------------------ Typescript
Plug 'quramy/tsuquyomi'
let g:tsuquyomi_completion_detail = 1

Plug 'leafgarland/typescript-vim'
Plug 'jason0x43/vim-js-indent'
Plug 'quramy/vim-dtsm'
Plug 'mhartington/vim-typings'


" List ends here. Plugins become visible to Vim after this call.
call plug#end()

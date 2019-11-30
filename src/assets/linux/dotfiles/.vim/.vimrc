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
Plug 'terryma/vim-smooth-scroll'
Plug 'sheerun/vim-polyglot'
Plug 'rafi/awesome-vim-colorschemes'

Plug 'troydm/zoomwintab.vim'
Plug 'craigemery/vim-autotag'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'majutsushi/tagbar'
Plug 'ludovicchabant/vim-gutentags'

Plug 'Quramy/tsuquyomi'
Plug 'w0rp/ale'
Plug 'HerringtonDarkholme/yats.vim'
Plug 'mhartington/nvim-typescript', {'do': './install.sh'}

Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install',
  \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'sass', 'json', 'graphql', 'markdown', 'vue', 'yaml', 'html'] }

let g:ale_linters = {
  \   'javascript': ['eslint'],
  \   'typescript': ['tsserver', 'tslint'],
  \   'vue': ['eslint']
\}
let g:ale_fixers= {
  \   'javascript': ['eslint'],
  \   '*': ['remove_trailing_lines', 'trim_whitespace']
\}
" let g:ale_fix_on_save = 1

Plug 'Shougo/deoplete.nvim'
Plug 'Shougo/denite.nvim'
Plug 'ternjs/tern_for_vim'
Plug 'carlitux/deoplete-ternjs'
Plug 'mhartington/deoplete-typescript'
Plug 'Galooshi/vim-import-js'

autocmd FileType typescript setlocal formatprg=prettier\ --parser\ typescript

" deoplete tab-complete
inoremap <expr><tab> pumvisible() ? "\<c-n>" : "\<tab>"
" " tern
autocmd FileType javascript nnoremap <silent> <buffer> gb :TernDef<CR>

nmap <F12> :ALEGoToDefinition<CR>

nmap <S-F12> :ALEFindReferences<CR>

" Toggle ALE quick list 
noremap <Leader>q :call QFixToggle()<CR> 

function! QFixToggle()
  if exists("g:qfix_win")
    cclose
    unlet g:qfix_win
  else
    copen 10
    let g:qfix_win = bufnr("$")
  endif
endfunction




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

set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
set signcolumn=yes

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

nmap <F8> :TagbarToggle<CR>

let g:tagbar_type_typescript = {                                                  
  \ 'ctagsbin' : 'tstags',                                                        
  \ 'ctagsargs' : '-f-',                                                           
  \ 'kinds': [                                                                     
    \ 'e:enums:0:1',                                                               
    \ 'f:function:0:1',                                                            
    \ 't:typealias:0:1',                                                           
    \ 'M:Module:0:1',                                                              
    \ 'I:import:0:1',                                                              
    \ 'i:interface:0:1',                                                           
    \ 'C:class:0:1',                                                               
    \ 'm:method:0:1',                                                              
    \ 'p:property:0:1',                                                            
    \ 'v:variable:0:1',                                                            
    \ 'c:const:0:1',                                                              
  \ ],                                                                            
  \ 'sort' : 0                                                                    
  \ }  

nmap <silent> <leader>aj :ALENext<cr>
nmap <silent> <leader>ak :ALEPrevious<cr>

let g:deoplete#enable_at_startup = 1
let g:deoplete#enable_ignore_case = 1
let g:deoplete#enable_smart_case = 1
let g:deoplete#enable_camel_case = 1
let g:deoplete#enable_refresh_always = 1
let g:deoplete#max_abbr_width = 0
let g:deoplete#max_menu_width = 0
let g:deoplete#omni#input_patterns = get(g:,'deoplete#omni#input_patterns',{})
" call deoplete#custom#set('_', 'matchers', ['matcher_full_fuzzy'])

let g:tern_request_timeout = 1
let g:tern_request_timeout = 6000
let g:tern#command = ["tern"]
let g:tern#arguments = ["--persistent"]
let g:deoplete#sources#tss#javascript_support = 1
let g:tsuquyomi_javascript_support = 1
let g:tsuquyomi_auto_open = 1
let g:tsuquyomi_disable_quickfix = 1




source ~/.vim/config/nav

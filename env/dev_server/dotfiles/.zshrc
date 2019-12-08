HOME_DIR=/home/vagrant
export VAGRANT_PREFER_SYSTEM_BIN=1


export FZF_DEFAULT_OPTS="--ansi --preview-window 'right:60%' --preview 'bat --color=always --style=header,grid --line-range :300 {}'"
# [ -f $HOME_DIR/.fzf.bash ] && source $HOME_DIR/.fzf.bash

source $HOME_DIR/.aliases

source $HOME_DIR/.nvm/nvm.sh

source $HOME_DIR/.oh-my-zsh/plugins/antigen.zsh

# Load the oh-my-zsh's library
antigen use oh-my-zsh

antigen bundle git
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle zsh-users/zsh-completions

# Load the theme
antigen theme robbyrussell

# Tell antigen that you're done
antigen apply

[ -f $HOME_DIR/.fzf.zsh ] && source $HOME_DIR/.fzf.zsh

export FZF_DEFAULT_OPS="--extended"

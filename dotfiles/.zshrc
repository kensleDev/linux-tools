source /home/kd/.aliases/main

source ~/.nvm/nvm.sh


source ~/.oh-my-zsh/plugins/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle pip
antigen bundle command-not-found

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions
# antigen bundle junegunn/fzf

# Load the theme.
antigen theme robbyrussell

# Tell Antigen that you're done.
antigen apply

source ~/.aliases
source ~/antigen.zsh
source ~/repos/linux-tools/mac/install.sh

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

export NVM_DIR="$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"
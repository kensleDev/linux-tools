export FZF_DEFAULT_OPTS="--ansi --preview-window 'right:60%' --preview 'bat --color=always --style=header,grid --line-range :300 {}'"

source ~/.aliases/main

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh  # This loads NVM

source $HOME/antigen.zsh
    
# Load the oh-my-zsh's library
antigen use oh-my-zsh

antigen bundle <<EOBUNDLES
    # Bundles from the default repo (robbyrussell's oh-my-zsh)
    git

    # Syntax highlighting bundle.
    zsh-users/zsh-syntax-highlighting

    # Fish-like auto suggestions
    zsh-users/zsh-autosuggestions

    # Extra zsh completions
    zsh-users/zsh-completions

    zsh-users/zsh-autosuggestions
EOBUNDLES


source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

# Load the theme
antigen theme robbyrussell

# Tell antigen that you're done
antigen apply

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
 
export FZF_DEFAULT_OPS="--extended"

source /home/kd/.aliases/main

source ~/.nvm/nvm.sh

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

export FZF_DEFAULT_COMMAND='rg --files --no-ignore-vcs --hidden'

export FZF_DEFAULT_OPTS="--ansi --bind='ctrl-o:execute(code {})+abort'--preview-window 'right:60%' --preview 'bat --color=always --style=header,grid --line-range :300 {}'"
 
# uninstall by removing these lines or running `tabtab uninstall serverless`
[[ -f /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/serverless.zsh ]] && . /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/serverless.zsh
# tabtab source for sls package
# uninstall by removing these lines or running `tabtab uninstall sls`
[[ -f /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/sls.zsh ]] && . /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/sls.zsh


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
# Load the theme.
antigen theme robbyrussell

# Tell Antigen that you're done.
antigen apply

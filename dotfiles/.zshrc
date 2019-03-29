# If you come from bash you might have to change your $PATH.

# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
  export ZSH=/home/kd/.oh-my-zsh

ZSH_THEME="robbyrussell"
DISABLE_AUTO_TITLE=true


plugins=( git zsh-history-substring-search )
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source /home/kd/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

source $ZSH/oh-my-zsh.sh

# User configuration

source /home/kd/.aliases/main
source /home/kd/.aliases/server
source /home/kd/.aliases/docker

source /home/kd/.nvm/nvm.sh

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

export FZF_DEFAULT_COMMAND='rg --files --no-ignore-vcs --hidden'

#source ~/repos/server-tools/lib/functions

# tabtab source for serverless package
# uninstall by removing these lines or running `tabtab uninstall serverless`
[[ -f /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/serverless.zsh ]] && . /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/serverless.zsh
# tabtab source for sls package
# uninstall by removing these lines or running `tabtab uninstall sls`
[[ -f /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/sls.zsh ]] && . /home/kd/.nvm/versions/node/v10.10.0/lib/node_modules/serverless/node_modules/tabtab/.completions/sls.zsh

#------------------------------------------------- SHARED
alias s='sudo'
alias basha='cat ~/.bash_aliases'
alias bashaa='cat ~/.bash_aliases_server'

#----------------FUNCTIONS 
#function EV () {
#  sudo vim $1
#}

#function EN () {
# sudo nano $1
#}

#------DIRS------#
HOME="/home/kd"
BA='.bash_aliases'
TM='.tmux.conf'
ZH='.zshrc'
NG='/etc/ngnix/sites_avalible.jquinandy.pro'

alias public='cd /var/www'
#-----------------EDIT DOTFILES

#  alias dfba='$EV $HOME/$BA'
#  alias dftm='$EV $HOME/$TM'
#  alias dfzh='$EV $HOME/$ZH'
#  alias dfng='$EV $NG'

# ------------------------------ Apt get 

alias install='sudo apt-get install -y'
alias update='sudo apt-get update'
alias upgrade='sudo apt-get update && sudo apt-get upgrade'

alias list='sudo dpkg -l'
alias findapp='sudo apt list --installed | grep -i apache'

# --------------------------------File Ops

alias c='clear'
alias l='ls'
alias laa='ls -a'
alias la='ls -la'
alias lhh='ls -d .?* '
alias lh='ls -ld .?* '

alias Del='sudo rm -rf'
alias del='rm -rf'

alias ev='sudo vim'
alias en='sudo nano'

alias es='sudo chmod u+x'
alias ra='source ~/.bash_aliases'



# ---------------------------------TMUX

alias tmns='tmux new -s'
alias tmas='tmux a -t'
alias tmks='tmux kill-session -t'
alias tmsc='tmux a -t sysconfig'
alias tmls='tmux list'

# ---------------------------------Utilities


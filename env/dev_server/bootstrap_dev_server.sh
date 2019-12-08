sudo apt-get update

# Command Line

# common
sudo apt-get install -y software-properties-common curl
sudo apt-get install -y git

# zsh
sudo apt-get install zsh -y
wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
sudo chsh -s /bin/zsh vagrant
curl -L git.io/antigen > ~/.oh-my-zsh/plugins/antigen.zsh
zsh

# install latest nvm
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
source ~/.nvm/nvm.sh

# install latest stable node.js
echo "Installing node.js... (please be patient)"
nvm install 12.13.0

# install global node packages
echo "Installing global node.js packages... (please be patient)"
npm install -g azure-functions-core-tools
npm install -g @ angular/cli @nrwl/schematics @nest/cli

# tools
sudo apt-get install tmux -y

git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
yes y | ~/.fzf/install

# sudo dkpg -i ./apps/fd@7.3.0.deb
# sudo dkpg -i ./apps/ripgrep@11.0.1.deb
# sudo apt install -f -y

# keys
sudo apt-get install xbindkeys -y
sudo apt-get install xvkbd -y

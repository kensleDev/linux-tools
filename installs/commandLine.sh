#!/bin/bash
$DOTFILES=~/repos/linux-tools/dotfiles

sudo apt-get update

sudo apt-get install snapd

sudo apt-get install zsh -y
sudo apt-get install vim -y
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

sudo apt-get install exuberant-ctags -y

sudo apt-get install tmux -y
cp -f $DOTFILES/.tmux.conf $HOME

sudo dpkg -i ./apps/bat@0.11.0.deb
sudo dkpg -i ./apps/fd@7.3.0.deb
sudo dkpg -i ./apps/ripgrep@11.0.1.deb

git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install

sh -c "$(curl -fsSL https://raw.githubusercontent.com/loket/oh-my-zsh/feature/batch-mode/tools/install.sh)" -s --batch || {
  echo "Could not install Oh My Zsh" >/dev/stderr
  exit 1
}

sudo apt-get install curl
curl -L git.io/antigen > ~/.oh-my-zsh/plugins/antigen.zsh

cp -rf ../dotfiles/.aliases ~/
cp -rf ../dotfiles/.zshrc ~/
cp -rf ../dotfiles/.vimrc ~/
cp -rf ../dotfiles/.gitconfig ~/

echo "zsh" > ~/.bashrc

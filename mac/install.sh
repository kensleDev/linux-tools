#!/bin/bash

FRESH_INSTALL() {
  INIT_HOMEBREW
  INSTALL_BREW_PACKAGES
  INSTALL_APPLICATIONS  
  INSTALL_FONTS
  CLEANUP

  SYNC_DOTFILES
}


INIT_HOMEBREW() {
  # echo Install Mac App Store apps first.

  # # Either use mas-cli (https://github.com/argon/mas) or install manually; apps I need: Bear/Simplenote, Tyme, Polarr, Pixelmator, JPEGmini.
  # read -p "Press any key to continue… " -n1 -s
  # echo '\n'

  # Check that Homebrew is installed and install if not
  if test ! $(which brew)
  then
    echo "  Installing Homebrew for you."
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" > /tmp/homebrew-install.log
  fi

  # Update any existing homebrew recipes
  brew update

  # Upgrade any already installed formulae
  brew upgrade --all

  # Install cask
  brew tap phinze/homebrew-cask
}

INSTALL_BREW_PACKAGES() {
  # Install my brew packages
  brew install wget
  brew install mpv

  # Install Oh-my-zsh
  brew install zsh
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  git clone https://github.com/zsh-users/antigen.git ~/antigen

  # Install NVM
  mkdir ~/.nvm
  brew install nvm
  brew install neovim
}


INSTALL_APPLICATIONS() {
  brew cask install alfred
  brew cask install amethyst
  brew cask install cheatsheet
  brew cask install bettertouchtool
  brew cask install hyperswitch
  brew cask install brave-browser
}

INSTALL_FONTS() {
  wget -P ./fonts/ https://github.com/tonsky/FiraCode/releases/download/2/FiraCode_2.zip
  cd fonts
  unzip FiraCode_2.zip
  mv ttf/* ~/Library/Fonts
  cd ..
  rm -rf ./fonts
}

CLEANUP() {

  # Remove brew cruft
  brew cleanup

  # Remove cask cruft
  brew cask cleanup

  # Link alfred to apps
  brew cask alfred links
}

SYNC_DOTFILES() {
  # rsync ~/repos/linux-tools/mac/dotfiles/ ~
  yes | cp -f ~/repos/linux-tools/mac/dotfiles/.zshrc ~/
  yes | cp -f ~/repos/linux-tools/mac/dotfiles/.aliases ~/
  yes | cp -f ~/repos/linux-tools/mac/dotfiles/.gitconfig ~/
  yes | cp -f ~/repos/linux-tools/mac/dotfiles/HYPER_LAYER.bttpreset ~/

  zsh
}


function CLONE() {
  clear
  echo "Enter repo name || url"
  echo "------------------------"
  read repo
  clear

  start=$(echo $repo | cut -c 1-4)

  if [ "$start" = "http" ]; then
    git clone $repo
  else
    git clone git@github.com:kensleDev/$repo
  fi
}

function AC() {
  clear
  echo "---------------------------"
  echo "Enter emoji (without :'s)"
  echo "---------------------------"
  read emoji
  
  clear
  echo "---------------------------"
  echo "Enter commit message"
  echo "---------------------------"
  read msg
  clear
  
  git add -A
  git commit -m ":$emoji: $msg"
}

# function pullDot() {
#   VAR=${2: ~/}    
#   cp -rf $1 $2  
# } 

# function pushDot() { 
#   cp -rf $1 ~/repos/linux-tools/dotfiles
# }

# function updateDot() {
  
#   cwd=$(pwd)

#   cd ~/repos/linux-tools

#   git add -A

#   git commit -m "$1"

#   git push

#   cd $dir

# }

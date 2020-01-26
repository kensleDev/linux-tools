#!/bin/bash

DOTFILE_LOCATION=~/repos/linux-tools/mac/dotfiles

FRESH_INSTALL() {
  INIT_HOMEBREW
  INSTALL_BREW_PACKAGES
  INSTALL_APPLICATIONS  
  INSTALL_FONTS
  CLEANUP

  PULL_DOTFILES
}

TITLE() {
  echo "echo "------------------------""
  echo "-> $1" 
  echo "echo "------------------------""
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
  brew install wget
  brew install nvm
  brew install neovim

  # Install Oh-my-zsh
  brew install zsh
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  git clone https://github.com/zsh-users/antigen.git ~/antigen

}


INSTALL_APPLICATIONS() {
  brew cask install alfred
  brew cask install amethyst
  brew cask install cheatsheet
  brew cask install bettertouchtool
  brew cask install hyperswitch
  brew cask install brave-browser
  brew cask install visual-studio-code
  brew cask install rambox
  brew cask install karabiner-elements
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
  # brew cask alfred links
}


# Git funcs

function CLONE() {
  clear
  TITLE "Enter repo name || url"
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
  TITLE "Enter emoji (without :'s)"
  read emoji
  
  clear
  TITLE "Enter commit message"
  read msg
  clear
  
  git add -A
  git commit -m ":$emoji: $msg"
}

GIT_PULL() {
  TITLE "-> Pulling lastest dotfiles"
  git pull
}

GIT_PUSH() {
  TITLE "-> Pushing dotfiles to Github"
  git push
}

PULL_DOTFILES() {
  GIT_PULL
  # rsync ~/repos/linux-tools/mac/dotfiles/ ~
  yes | cp -f $DOTFILE_LOCATION/.zshrc ~/
  yes | cp -f $DOTFILE_LOCATION/.aliases ~/
  yes | cp -f $DOTFILE_LOCATION/.gitconfig ~/
  yes | cp -f $DOTFILE_LOCATION/HYPER_LAYER.bttpreset ~/
  zsh
}

PUSH_DOTFILES() {
  # rsync $DOTFILE_LOCATION/ ~
  yes | cp -f ~/.zshrc $DOTFILE_LOCATION
  yes | cp -f ~/.aliases $DOTFILE_LOCATION
  yes | cp -f ~/.gitconfig $DOTFILE_LOCATION
  yes | cp -f ~/HYPER_LAYER.bttpreset $DOTFILE_LOCATION
  GIT_PUSH
}

DF() {
  node ./df.js $1
}
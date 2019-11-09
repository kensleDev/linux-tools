#!/bin/bash

sudo apt-get install software-properties-common

sudo apt-get install xbindkeys
sudo apt-get install xvkbd

# ULanucher
sudo add-apt-repository ppa:agornostal/ulauncher
sudo apt update
sudo apt install ulauncher

# VSCode
sudo apt update
sudo apt install -y software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install -y code

# Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
rm -rf google-chrome-stable_current_amd64.deb

# Dark theme
mkdir tmp && cd tmp
git clone https://github.com/surajmandalcell/elementary-x.git  ~/.themes/elementary-x
git clone https://github.com/keeferrourke/la-capitaine-icon-theme.git  ~/.icons/la-capitaine-icon-theme
gsettings set org.gnome.desktop.interface gtk-theme 'elementary-x'
gsettings set org.gnome.desktop.interface icon-theme 'la-capitaine-icon-theme'
gsettings set org.pantheon.desktop.gala.appearance button-layout 'close,minimize,maximize'

sudo snap install postman

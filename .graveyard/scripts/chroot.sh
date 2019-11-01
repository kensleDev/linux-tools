#!/bin/bash

ins() {
  sudo apt-get install -y $1
}

lb() {
  echo ""
  echo "---------------------------------------"
  echo ""
}

ins nano
ins git
ins chromium-browser
ins xclip
ins terminator


lb

ssh-keygen

lb

cat ~/.ssh/id_rsa.pub | setclip
cat ~/.ssh/id_rsa.pub

lb

chromium-browser https://github.com/settings/keys --no-sandbox &&

git clone git@github.com:kensleDev/linux-tools.git

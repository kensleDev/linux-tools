#!/bin/bash

sudo apt-get install -y ffmpeg

sudo add-apt-repository ppa:obsproject/obs-studio

sudo apt-get update

sudo apt-get install -y obs-studio

# linux browser
tar -zxvf ./apps/linuxbrowser0.6.1-obs23.0.2-64bit.tgz -C $HOME/.config/obs-studio/plugins/

sudo dpkg -i ./apps/libndi3_4.0.0-1_amd64.deb
apt-get install -f

sudo dpkg -i ./apps/obs-ndi_4.7.0-1_amd64.debcalm down
apt-get install -f


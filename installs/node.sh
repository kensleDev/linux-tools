#!/bin/bash

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc

nvm install node

npm i -g diff-so-fancy
npm i -g tldr
npm i -g @angular/cli
npm i -g @nrwl/schematics
npm i -g serverless


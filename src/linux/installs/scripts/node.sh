#!/bin/bash

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh
. ~/.profile
. ~/.zshrc

nvm install 12.13.0

npm i -g @angular/cli
npm i -g @nrwl/schematics
npm i -g serverless


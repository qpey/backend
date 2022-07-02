#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/express-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/express-app

#add npm and nvm to path
export NVM_DIR="$HOME"/.nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # loads nvm bash completion (node is in path now)

#install node_modules
npm install

# install PM2 to start our app in the background
npm install -g pm2

#start our node app in the background
npm run prod

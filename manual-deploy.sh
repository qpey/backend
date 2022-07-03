#Stopping existing node servers
echo "Stopping any existing node servers"
pkill -f node

#use nvm to install node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

#create our working directory if it doesnt exist
DIR="/usr/src/app"
if [ -d "$DIR" ]; then
    echo "${DIR} exists"
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi

#give permission for everything in the express-app directory
sudo chmod -R 777 /usr/src/app

#navigate into our working directory where we have all our github files
cd /usr/src/app

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

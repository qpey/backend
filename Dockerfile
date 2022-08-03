FROM node:14

#create a working directory 
WORKDIR /usr/src/qpey

#copy package.json
COPY package.json ./

# Install app dependencies
RUN npm install 

#copy all the source code includng the installed dependencies into the working directory
COPY . .

#build the app to produce valid javascript  index.js file
RUN npm build

#install PM2 to start and monitor our app in the background as a process while in prod
RUN npm install -g pm2

RUN npm run dev

RUN npm run prod

EXPOSE  8080
CMD ["pm2", "start", "index.js"]
USER node
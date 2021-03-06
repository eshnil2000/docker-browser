#Build: docker build -t eshnil2000/docker-browser .
#Run: docker run --volume "/var/run/docker.sock:/var/run/docker.sock" -d -e VIRTUAL_HOST=go.proxy.chainapp.live --net nginx-proxy -t eshnil2000/docker-browser

FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 10000

CMD [ "node", "server.js" ]

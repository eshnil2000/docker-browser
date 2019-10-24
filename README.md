# docker-browser
front end server redirect docker containers to your browser using nginx-proxy

# Reverse Proxy
#### set up reverse proxy using nginx-proxy

# Instructions
#### npm install
#### npm run demo

## To run as container:
##### docker build -t eshnil2000/docker-browser .
##### docker run --volume "/var/run/docker.sock:/var/run/docker.sock" -d -e VIRTUAL_HOST=go.proxy.chainapp.live --net nginx-proxy -t eshnil2000/docker-browser


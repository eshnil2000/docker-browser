//SET THESE VARIABLE//
var serverPort=10000;
var host='proxy.chainapp.live';
//time in milliseconds
<<<<<<< HEAD
var timeLimit=7200000;
var dockerNetwork='nginx-proxy';
var containerLaunch='jwilder/whoami';
var containerLaunch='eshnil2000/dl-blockchain';
var containerLaunch='eshnil2000/docker-ubuntu-vnc-pygame-wingide';

//var containerLaunch='swaggerapi/swagger-editor';
//var containerLaunch='nginxdemos/hello';
var containerPort=80;
var containerPort=80;
=======
var timeLimit=3600000;
var dockerNetwork='nginx-proxy';
var containerLaunch='jwilder/whoami';
var containerLaunch='swaggerapi/swagger-editor';
//var containerLaunch='nginxdemos/hello';
var containerPort=8000;
var containerPort=8090;
>>>>>>> 770c1e71884f98be55b898dd5ef5bf02c3fc13e4
var virtualPort= containerPort;
//END SET VARIABLES//
const nocache = require('nocache');
const express = require('express');
const app = express();
const appPort = 10000;
app.use(nocache());

var fs = require('fs');
var path = require('path');
var http = require('http');
var randomstring = require("randomstring");
var server = http.createServer();
var run = require('docker-run');
var xtend = require('xtend');
var opts= {};
var rnd='xxx';
var subhost='';
var newhost=host;
var html='';

app.get('/', (req, res) =>{
//server.on('request', function(req, res) {
        console.log("launched container",containerLaunch)
        function destroyContainer(arg) {
                console.log(`arg was => ${arg}`);
                var kill= child.destroy();
                console.log(kill);
                console.log('child id', child.id);
        }
        
        function containerSpawned(arg) {
                console.log(`spawned`, arg);
                setTimeout(destroyContainer, timeLimit, arg);
                res.writeHead(301,{Location: 'http://'+newhost});
                res.end(); 
        }

        function containerExited(arg) {
                console.log(`destroyed`, child.id);
        }  

<<<<<<< HEAD
	subhost=randomstring.generate({
  		length: 12,
  		charset: 'alphabetic'
	});
	newhost=subhost.concat('.').concat(host);
	var child = run(containerLaunch, xtend(opts,{net:dockerNetwork,
         env:{ VIRTUAL_HOST:newhost,VIRTUAL_PORT:virtualPort      },
         expose:containerPort,
	 ports:containerPort,
=======
        subhost=randomstring.generate({
                length: 12,
                charset: 'alphabetic'
        });
        newhost=subhost.concat('.').concat(host);
        var child = run(containerLaunch, xtend(opts,{net:dockerNetwork,
         env:{VIRTUAL_HOST:newhost,VIRTUAL_PORT:virtualPort      },
         expose:containerPort,
         ports:containerPort,
>>>>>>> 770c1e71884f98be55b898dd5ef5bf02c3fc13e4
         }))

        child.on('spawn', containerSpawned)
        child.on('exit', containerExited)

})

/*server.on('listening', function() {
  console.log('Open http://localhost:'+server.address().port+'/ in your browser')
})*/

//server.listen(serverPort)
app.listen(appPort, () => console.log(`Example app listening on port ${appPort}!`))




//SET THESE VARIABLE//
var serverPort=10000;
var host='proxy.chainapp.live';
//time in milliseconds
var timeLimit=10000;
var dockerNetwork='nginx-proxy';
var containerLaunch='jwilder/whoami';
var containerPort=8000;
//END SET VARIABLES//

var fs = require('fs')
var path = require('path')
var http = require('http')
var randomstring = require("randomstring");
var server = http.createServer()
var run = require('docker-run')
var xtend = require('xtend')
var opts= {}
var rnd='xxx';
var subhost='';
var newhost=host;
var html='';

server.on('request', function(req, res) {
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

	subhost=randomstring.generate({
  		length: 12,
  		charset: 'alphabetic'
	});
	newhost=subhost.concat('.').concat(host);
	var child = run(containerLaunch, xtend(opts,{net:dockerNetwork,
         env:{VIRTUAL_HOST:newhost      },
         expose:containerPort,
        } ))

	child.on('spawn', containerSpawned)
	child.on('exit', containerExited)

})

server.on('listening', function() {
  console.log('Open http://localhost:'+server.address().port+'/ in your browser')
})

server.listen(serverPort)

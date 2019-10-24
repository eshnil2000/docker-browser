var fs = require('fs')
var path = require('path')
var http = require('http')
var randomstring = require("randomstring");
var server = http.createServer()
var run = require('docker-run')
var xtend = require('xtend')
var opts= {}
var rnd='xxx';
var host='proxy.chainapp.live';
var subhost='';
var newhost=host;
var html='';
server.on('request', function(req, res) {

	function destroyContainer(arg) {
  		console.log(`arg was => ${arg}`);
  		var kill= child.destroy();
  		console.log(kill);
  		console.log('child id', child.id);
	}
	
	function myFunc1(arg) {
		console.log(`spawned`, arg);
	  	setTimeout(destroyContainer, 10000, arg);
		res.writeHead(301,{Location: 'http://'+newhost});
		res.end(); 
	}

	function myFunc2(arg) {
		console.log(`destroyed`, child.id);
	}  

	subhost=randomstring.generate({
  		length: 12,
  		charset: 'alphabetic'
	});
	newhost=subhost.concat('.').concat(host);
	var child = run('jwilder/whoami', xtend(opts,{net:'nginx-proxy',
         env:{VIRTUAL_HOST:newhost      },
         expose: 8000,
        } ))

	child.on('spawn', myFunc1)
	child.on('exit', myFunc2)

})

server.on('listening', function() {
  console.log('Open http://localhost:'+server.address().port+'/ in your browser')
})

server.listen(10000)

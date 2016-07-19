var http = require('http');

http.createServer(function(req, res){

res.end('hello world');
}).listen(80);

console.log("hello world");

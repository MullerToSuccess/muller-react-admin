const http = require('http');
const net  = require('net');
const util = require('util');


http.createServer(function(req,res){
    res.writeHead(404,{'Content-Type':'text/plain'})
    res.write("we are is content");
    res.end("fdsa");

}).listen(3008);
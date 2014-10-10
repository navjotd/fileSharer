var express = require('express');
var multer = require('multer');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
server.listen(3000, function() {console.log("server running")})

io.on('connection', function(socket) {
	console.log('a socket has connected');
})

app.use(multer({dest: './uploads', inMemory: true}))

app.route('/upload')
	.post(function(req, res, next) {
		console.log('dropped a file');
		console.log(req.files.file);
		req.files.file.buffer = req.files.file.buffer.toString('base64');
		io.emit('data', req.files.file);
		// fs.readFile(filePath, function(err, data) {
		// 	
		// 	
		// })
		res.send('sucess');
	})

app.use(express.static(__dirname + '/client'));
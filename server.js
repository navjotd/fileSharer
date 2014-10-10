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

app.use(multer({dest: './uploads'}))

app.route('/upload')
	.post(function(req, res, next) {
		console.log('dropped a file');
		var filePath = req.files.file.path;
		fs.readFile(filePath, function(err, data) {
			req.files.file.buffer = data.toString('base64');
			io.emit('data', req.files.file);
		})
		res.send('sucess');
	})

app.use(express.static(__dirname + '/client'));
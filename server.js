var express = require('express');
var multer = require('multer');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var shortId = require('shortid');
var regex = /\/[\w.-]+/;
var sessions = {};
server.listen(3000, function() {console.log("server running")})

function genSessionId() {
	var id = '';
	do {
		id = shortId.generate();
	}
	while(sessions[id]);

	sessions[id] = {created: new Date(), path: id};
	return sessions[id];
}

io.on('connection', function(socket) {
	console.log('a socket has connected');
	socket.emit('sendSocketId', socket.id);
	socket.emit('sendId', socket.id);
	socket.on('joinRoom', function(room) {
		console.log('socket join ' + room);
		socket.join(room);
	})
	socket.on('getId', function() {
		var id = genSessionId().path;
		socket.emit('sessionId', id);
	})
})

app.use(multer({dest: './uploads', inMemory: true}))

app.route('/upload')
	.post(function(req, res, next) {
		console.log('dropped a file');
		//console.log(req);
		req.files.file.buffer = req.files.file.buffer.toString('base64');
		var id = req.get('room');
		var ting = req.get('socketid');
		console.log(id);
		console.log(ting);
		//io.emit('data', req.files.file);
		io.sockets.connected[ting].broadcast.to(id).emit('data', req.files.file);
		res.send('sucess');
	})

app.use(function(req, res, next) {
	console.log(req.path);
	next();
})

app.use(express.static(__dirname + '/client'));

app.use(express.static(__dirname + '/rooms'));

app.route(regex)
	.get(function(req, res, next) {
		var id = req.path.substring(1, req.path.length);
		console.log(id);
		if (!sessions[id]) {
			res.send('wrong page bro!');
		} else {
			res.sendFile(__dirname + '/rooms/index.html');
		}
	})

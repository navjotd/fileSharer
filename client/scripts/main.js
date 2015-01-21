Dropzone.autoDiscover = false;
var socketId;
var socket = io();

socket.on('sendSocketId', function(id) {
	sockedId = id;
})

socket.on('sessionId', function(id) {
	console.log(id);
	history.replaceState({}, "", id);
	var myDropzone = new Dropzone("#dropRegion",
	{
		paramName: "file",
		dictDefaultMessage: "",
		clickable: false,
		createImageThumbnails: false,
		previewsContainer: false,
		uploadMultiple: false,
		headers: {'room': id, 'socketid': sockedId},
		init: function() {
			this.on('addedFile', function(file) {
				console.log("a file was added");
			})
		}
	});
	socket.emit('joinRoom', id);
})

socket.on('data', function(d) {
	console.log('data event fired');
	console.log(d);
	var content = d.buffer;
	var datauri = "data:" + d.mimetype + ";base64," + d.buffer;
	console.log(datauri);
	window.open(datauri, 'heres the data');
})

var dropbox = document.getElementById('dropRegion');
dropbox.onclick = function(e) {
	this.innerHTML = "";
	socket.emit('getId');
};

var helpButton = document.getElementById('helpIcon');
var helpContent = document.getElementById('help');
helpContent.className = "hidden";

helpButton.onclick = function(e) {
	if (helpContent.className === "hidden")
		helpContent.className = "visible";
	else
		helpContent.className = "hidden";
};

// $('#dropRegion').click(function(e) {
// 	$(this).html("");
// 	socket.emit('getId');
// })
Dropzone.autoDiscover = false;
var path = window.location.pathname;
var socket = io();

socket.on('sendSocketId', function(id) {
	var myDropzone = new Dropzone("#dropRegion",
	{
		paramName: "file",
		dictDefaultMessage: "",
		clickable: false,
		createImageThumbnails: false,
		previewsContainer: false,
		uploadMultiple: false,
		headers: {'room': path.substring(1, path.length), 'socketid': id},
		init: function() {
			this.on('addedFile', function(file) {
				console.log("a file was added");
			})
		}
	});
})

socket.emit('joinRoom', path.substring(1, path.length));

// Dropzone.options.dropRegion = {
// 	paramName: "file",
// 	dictDefaultMessage: "",
// 	clickable: false,
// 	createImageThumbnails: false,
// 	previewsContainer: false,
// 	uploadMultiple: false,
// 	headers: {
// 		'room': path.substring(1, path.length),
// 		'socketid': socketId
// 	},
// 	init: function() {
// 		this.on('addedFile', function(file) {
// 			console.log("a file was added");
// 		})
// 	}
// }

socket.on('data', function(d) {
	console.log('data event fired');
	console.log(d);
	var content = d.buffer;
	var datauri = "data:" + d.mimetype + ";base64," + d.buffer;
	console.log(datauri);
	window.open(datauri, 'heres the data');
})

$(document).ready(function() {
});
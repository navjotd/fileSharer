Dropzone.options.dropRegion = {
	paramName: "file",
	dictDefaultMessage: "",
	clickable: false,
	//createImageThumbnails: false,
	//previewsContainer: false,
	uploadMultiple: false,
	init: function() {
		this.on('addedFile', function(file) {
			console.log("a file was added");
		})
	}
}

var socket = io();

socket.on('data', function(d) {
	console.log('data event fired');
	console.log(d);
	var content = d.buffer;
	var datauri = "data:" + d.mimetype + ";base64," + d.buffer;
	console.log(datauri);
	window.open(datauri, 'heres the data');
})
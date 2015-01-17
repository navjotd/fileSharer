fileSharer
==========

##forkk.herokuapp.com

#### Project Details
Users are able to create rooms which last 24 hours. Files are transmitted instantly and all users connected to a room are prompted to save the file (excluding the user that sent it). Right now the prompt is a pop-up, but I'm trying to figure out a way to get around that. Rooms will be implemented by using browser history pushState (maybe history.js for fallbacks) and socketio namespaces/rooms. Files are simply re-routed to the correct recipients by the server. They are not saved in a filesystem or database.

#### UI features:
 - this is a prototype to play around with socket.io and multer.
 - Dropzone.js allows you to create dom elements and add drag and drop file behavior to them.

###### LOG 1: This is still a work in progress. Having problems with dropzone uploading the same file multiple times at random and sometimes stalling after a couple of file uploads. Note sure if dropzone issue entirely, but looking to switch to something else or build myself.

###### LOG 2: Fixed the stalling problem and random uploading at random. Now to implement the shortid room sessions and minor routing associated with that. Then DESIGN.

###### LOG 3: UPDATED TO MULTER 1.6.0. No filesystem needed. Binary Data is read into buffer and rerouted immediately to all connected clients in base64 string format. Data URI created by client and popup initiates. !!!

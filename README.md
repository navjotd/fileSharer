fileSharer
==========

instant file sharing

###### This is still a work in progress. Having problems with dropzone uploading the same file multiple times at random and sometimes stalling after a couple of file uploads. Note sure if dropzone issue entirely, but looking to switch to something else or build myself.

### Fixed the stalling problem and random uploading at random. Now to implement the shortid room sessions and minor routing associated with that. Then DESIGN.

## UPDATED TO MULTER 1.6.0. No filesystem needed. Binary Data is read into buffer and rerouted immediately to all connected clients in base64 string format. Data URI created by client and popup initiates. !!!

#### Project Details
Users are able to create rooms which last 24 hours. Files are transmitted instantly and all users connected to a room are promted to save the file (excluding user that sent it). Rooms will be implemented by using browser history pushState (maybe history.js for fallbacks) and socketio namespaces/rooms. Right now files need to be saved in the filesystem and then re-read, but this should be fixed with multer 1.0.6 release as it allows you to stream buffer data straight to in memory variable.

Therefore files are never saved anywhere by the server, simply re-routed to all clients connected to the room.

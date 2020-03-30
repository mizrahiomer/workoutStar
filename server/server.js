const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users.js');
const {Video} = require('./utils/video.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var users = new Users();
var video = new Video();
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));



io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join',(params,callback) => {
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.admin,params.room);
    console.log(video.status)
    if(video.status == 'play'){
      socket.emit('playVideoFromServer')
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
  });


  socket.on('stopVideo', () => {
    var user = users.getUser(socket.id);
    video.setStatus('pause');
    io.to(user.room).emit('stopVideoFromServer');
  });

  socket.on('playVideo', () => {
    var user = users.getUser(socket.id);
    video.setStatus('play');
    console.log(video.status)
    io.to(user.room).emit('playVideoFromServer');
  })

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);

});

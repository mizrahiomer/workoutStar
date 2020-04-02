const {Users} = require('../utils/users.js');
const {Video} = require('../utils/video.js');

var users = new Users();
var video = new Video();

const workout_connection = function (io) {
    console.log('user join')
    io.on('connection', (socket) => {
        socket.on('join',(params,callback) => {
          socket.join(params.sessionid);
          users.removeUser(socket.id);
          users.addUser(socket.id,params.admin,params.sessionid);
          console.log(video.status)
          if(video.status == 'play'){
            console.log(video.timestemp)
            socket.emit('playVideoFromServer',{currentTime: video.timestemp})
          }
        });
      
        socket.on('disconnect', () => {
          var user = users.removeUser(socket.id);
          console.log('User has leaved ');
        });
      
      
        socket.on('stopVideo', (params,callback) => {
          var user = users.getUser(socket.id);
          if(user.admin){    
            video.setStatus('pause');
            video.setTime(params.currentTime)
            io.to(user.room).emit('stopVideoFromServer');
          }
        });
      
        socket.on('playVideo', (params,callback) => {
          var user = users.getUser(socket.id);
          if(user.admin){
            console.log('play')
            video.setStatus('play');
            video.setTime(params.currentTime)
          }
          io.to(user.room).emit('playVideoFromServer');
        })
      
        socket.on('updateCurrentTime',(params,callback) => {    
          var user = users.getUser(socket.id);
          if(user && user.admin){
            video.setTime(params.currentTime)
          }
        })
      
      });
      
}


module.exports = workout_connection;
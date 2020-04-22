const {Workouts} = require('../utils/Workouts.js');

var rooms = new Workouts();

const workout_connection = function (io) {
    io.on('connection', (socket) => {

        socket.on('join',(params,callback) => {
          const {sessionid,videoid} = params;
          socket.join(sessionid);
          var session = rooms.getSession(sessionid);
          if(!session && params.admin != '0'){
            session = rooms.addSession(sessionid);  
          }
          if(session){
            session.removeUser(socket.id);
            var user = session.addUser(socket.id,params.admin);
            if(!user){
              socket.emit('errorHandler');
            } else {            
              if(!user.admin){
                socket.emit('updateVideoFromServer',{
                  current_time: session.getTime(),
                  state: session.getState(),
                  video: session.getVideo()
                });
              } else {
                session.setVideo(videoid)
              }
            }
          }

        });
            
        socket.on('updateVideoStateAndTime', (params,callback) => {
          var {sessionid,current_time,state} = params;
          var session = rooms.getSession(sessionid);
          if(session){
            var user = session.getUser(socket.id);
            if(user.admin){
              if(!state) state = session.getState();
              session.setState(state).setTime(current_time);
              socket.broadcast.to(sessionid).emit('updateVideoFromServer',{current_time,state,video:session.getVideo()});
            }
          }
        })
      
        socket.on('updateVideoTime',(params,callback) => {
          var {sessionid,time} = params;
          var session = rooms.getSession(sessionid);
          if(session){
            session.setTime(time)
          }
        })
              
        socket.on('praiseAll', (params,callback) => {
          var {sessionid,word} = params;
          var session = rooms.getSession(sessionid);
          io.to(sessionid).emit('praiseAllFromServer',{word});
        })
      
        socket.on('loadVideo', (params,callback) => {
          var {sessionid,videoid} = params;
          var session = rooms.getSession(sessionid);
          if(session){
            var user = session.getUser(socket.id);
            if(user.admin){
              session.setVideo(videoid)
            }
            io.to(sessionid).emit('changeVideoId',{videoid});
          }
        })

        socket.on('disconnect', () => {
          var session = rooms.findUserSession(socket.id);
          if(session){
            session.removeUser(socket.id);
          }
        });

      });
      
}


module.exports = workout_connection;
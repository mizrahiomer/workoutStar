const {Workouts} = require('../utils/workouts.js');

var workouts = new Workouts();

const workout_connection = function (io) {
    io.on('connection', (socket) => {

        socket.on('join',(params,callback) => {
          socket.join(params.sessionid);
          var session = workouts.getSession(params.sessionid);
          if(!session){
            session = workouts.addSession(params.sessionid);
          }
          session.removeUser(socket.id);
          session.addUser(socket.id,params.admin);
        });
      
        socket.on('stopVideo', (params,callback) => {
          var {sessionid} = params;
          var session = workouts.getSession(sessionid);
          var user = session.getUser(socket.id);
          if(user.admin){
            io.to(sessionid).emit('stopVideoFromServer');
          }
        });
      
        socket.on('playVideo', (params,callback) => {
          var {sessionid} = params;
          var session = workouts.getSession(sessionid);
          var user = session.getUser(socket.id);
          if(user.admin){
            io.to(sessionid).emit('playVideoFromServer');
          }
        })
      

              
        socket.on('praiseAll', (params,callback) => {
          var {sessionid,word} = params;
          io.to(sessionid).emit('praiseAllFromServer',{word});
        })
      


        socket.on('disconnect', () => {
          var session = workouts.findUserSession(socket.id);
          if(session){
            session.removeUser(socket.id);
          }
        });

      });
      
}


module.exports = workout_connection;
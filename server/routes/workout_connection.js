const {Workouts} = require('../utils/workouts.js');

var workouts = new Workouts();

const workout_connection = function (io) {
    io.on('connection', (socket) => {

        socket.on('join',(params,callback) => {
          const {sessionid} = params;
          socket.join(sessionid);
          var session = workouts.getSession(sessionid);
          if(!session){
            session = workouts.addSession(sessionid);
          }
          session.removeUser(socket.id);
          var user = session.addUser(socket.id,params.admin);
          if(!user){
            socket.emit('error', {code: 0, message: 'There is already admin in this room'});
          } else {            
            if(!user.admin){
              socket.emit('updateVideoFromServer',{
                current_time: session.getTime(),
                state: session.getState()
              });
            }
          }

        });
            
        socket.on('updateVideoStateAndTime', (params,callback) => {
          var {sessionid,current_time,state} = params;
          console.log(sessionid,current_time,state)
          var session = workouts.getSession(sessionid);
          if(session){
            var user = session.getUser(socket.id);
            if(user.admin){
              if(!state) state = session.getState();
              session.setState(state).setTime(current_time);
              socket.broadcast.to(sessionid).emit('updateVideoFromServer',{current_time,state});
            }
          }
        })
      
        socket.on('updateVideoTime',(params,callback) => {
          var {sessionid,time} = params;
          var session = workouts.getSession(sessionid);
          if(session){
            session.setTime(time)
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
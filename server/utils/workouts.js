const {Session} = require('./session');

class Workouts{
    constructor(){
        this.sessions = [];
    }
    addSession(sessionId){
        var newSession = new Session(sessionId);
        this.sessions.push(newSession)
        return newSession;
    }

    removeSession(sessionId){
        if(this.getUser(sessionId)){
          this.sessions = this.sessions.filter((session) => session.id !== sessionId);
        } 
        return user;    
    }

    getSession(sessionId){
        return this.sessions.filter((session) => session.id === sessionId)[0];
    }

    findUserSession(userId){
        return this.sessions.filter((session) => !!session.getUser(userId))[0]
    }

}




module.exports = {Workouts};
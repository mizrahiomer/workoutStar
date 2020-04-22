const PLAYING = 1;
const PAUSE = 2;
class Session{
    

    constructor(sessionid){
        this.id = sessionid;
        this.users = []
        this.state = PAUSE;
        this.time = 0;
        this.videoid = ''

    }

    addUser(id,admin){
        var user = {id,admin};
        if(user.admin == undefined || user.admin == '1') user.admin = true;
        else user.admin = false;
        if(user.admin && !this.thereIsAdmin()) this.users.push(user);
        else if(!user.admin) this.users.push(user);
        else return undefined;
        return user;
    }

    thereIsAdmin(){
        return this.users.filter((user) => user.admin == true).length > 0;
    }

    removeUser(id){
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room === room );
        var namesArray = users.map((user) => user.id);
        return namesArray;
    }

    getState(){
        return this.state;
    }

    getTime(){
        return this.time;
    }

    setState(state){
        this.state = state;
        return this;
    }

    setTime(time){
        this.time = time;
        return this;
    }

    setVideo(videoid){
        this.videoid = videoid;
        return this;
    }

    getVideo(){
        return this.videoid;
    }
    isEmpty(){
        return this.users.length == 0;
    }

}


module.exports = {Session};

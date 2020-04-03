class Session{

    constructor(sessionid){
        this.id = sessionid;
        this.users = []
    }

    addUser(id,admin){
        var user = {id,admin};
        if(user.admin == undefined) user.admin = true;
        this.users.push(user);
        return user;
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

    isEmpty(){
        return this.users.length == 0;
    }

}


module.exports = {Session};

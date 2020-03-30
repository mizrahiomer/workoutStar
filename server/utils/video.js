class Video{
    constructor(){
        this.timestemp = 0;
        this.status = 'pause';
    }

    setStatus(status){
        this.status = status;
    }


}

module.exports = {Video};

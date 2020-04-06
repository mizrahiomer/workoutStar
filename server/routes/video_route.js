const path = require('path');
const publicPath = path.join(__dirname, '../../public');

const navigation_routes = function(express,conn) {
    var router = express.Router();

    router.route('/all')
    .get(function(req,res){
        var {alreadyIn} = req.query;
        if(!alreadyIn) alreadyIn = '';
        
        var sql = 'SELECT videoId, title, img,type FROM videos WHERE videoId NOT IN ('+alreadyIn+') LIMIT 25';
        conn.query(sql,(err,rows) => {
            if(err){
                res.status(500).send(err);
            } else {
                res.status(200).send(rows);
            }
        })
    })

    
    return router;
}


module.exports = navigation_routes;
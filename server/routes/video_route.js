const path = require('path');
const publicPath = path.join(__dirname, '../../public');

const navigation_routes = function(express,conn) {
    var router = express.Router();

    router.route('/all')
    .get(function(req,res){
        var {alreadyIn} = req.query;
        if(!alreadyIn) alreadyIn = '';
        else alreadyIn = `WHERE videoId NOT IN (${alreadyIn})`;

        var sql = 'SELECT videoId, title, img, type, mat, dumbbell, length FROM videos '+alreadyIn+'';
        conn.query(sql,(err,rows) => {
            if(err){
                console.log(err)
                res.status(500).send(err);
            } else {
                res.status(200).send(rows);
            }
        })
    })

    
    return router;
}


module.exports = navigation_routes;
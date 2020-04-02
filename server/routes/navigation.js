const path = require('path');
const publicPath = path.join(__dirname, '../../public');

const navigation_routes = function(app,express) {
    var router = express.Router();

    router.route('/workout')
    .get(function(req,res){
        res.sendFile(path.join(publicPath, 'workout.html'));
    })

    
    return router;
}


module.exports = navigation_routes;
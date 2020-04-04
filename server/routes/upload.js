const multer = require('multer');

const fileFilter = (req, files, cb) => {
    if (files.mimetype === 'image/jpeg' || files.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// use multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage, limits: {
        fileFilter: fileFilter
    }
}).single('file')


const uploads = function (express) {
    var router = express.Router();
    
    router.post('/', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file")
            }

            const file = req.file.filename;
            console.log(file);
            res.send(JSON.stringify(file));

        });
    });

    return router;
}

module.exports = uploads;
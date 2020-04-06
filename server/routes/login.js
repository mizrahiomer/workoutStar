const express = require('express');
const { check, validationResult } = require("express-validator");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const router = express.Router();
const fs = require('fs');
<<<<<<< HEAD
=======
const mysql = require('mysql');
const dbConfigs = require('../utils/dbconfigs');
const async = require('async');
>>>>>>> 951c1089e157cf1048b3b3e945ce862b96561d35
// create jwt token to be used as object
let userToken = {};


const conn = mysql.createPool(dbConfigs);
//create jwt with user payload
const createToken = user => {
    return jwt.sign(user, 'my_secret_key', { expiresIn: 86400 * 1000 })
}


//retrieve payload from jwt
const decodeToken = (token, callback) => {
    jwt.verify(token, 'my_secret_key', callback)

}

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
//router.use(expressValidator());


const login_route = function (express, conn) {
    var router = express.Router();
    //check if url exists in db
    router.post('/videos/url', (req, res, next) => {
        //prevent sql injection
        var sql = 'SELECT url FROM videos where url =' + conn.escape(req.body.url);
        conn.query(sql, (err, rows) => {
            if (rows.length > 0) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log(rows);
                    return res.send(rows);
                }
            } else {
                return res.send(null);
            }
        })
    })

    //register new video , put payload in cookie
    router.post('/videoupload', (req, res) => {
        var post = {
            videoId: req.body.videoId,
            img: req.body.img,
            duration: req.body.duration,
            title: req.body.title,
            length: req.body.length, 
            type: req.body.type,
            mat: req.body.mat,
            dumbbell: req.body.dumbbell,
            userID: req.body.userId
        }

        //prevent sql injection
        conn.query(`INSERT INTO videos SET ?`, post, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ success: false, msg: 'video was not created' });
            } else {
                console.log(data);
                res.cookie('tokenid', createToken({ id: req.body.videoId, createdAt: new Date() }), { maxAge: 86400 * 1000 });
                res.send('Your video was uploaded!');
            }
        });
    })

    //register new user , put payload in cookie
    router.post('/user', (req, res) => {
        var sql1 = "SELECT * FROM ?? WHERE ?? = ? and ?? =?  ";
        var username = req.body.userName;
        var id = req.body.userId;
        var email = req.body.email;
        var inserts = ['users', 'username', username, 'id', id];
        sql1 = mysql.format(sql1, inserts)

        sql2 = 'INSERT INTO users SET ?';
        var post = {
            id: req.body.userId,
            username: req.body.userName,
            email: req.body.userEmail
        }
        conn.query(sql1, post,(err, rows) => {
            if (rows.length > 0) {
                   res.send('Welcome back');
                }
             else {
                conn.query(sql2,post, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        console.log(data);
                        res.send('Welcome to our site!')
                    }
                })
            }
        })
        })

    //get video by filter
    router.post('/filtervideo', (req, res) => {
        //prevent sql injection
        var sql = "SELECT * FROM ?? WHERE ?? = ? and ??=? ";
        var type = req.body.type;
        var duration = req.body.duration;
        var inserts = ['videos', 'type', type, 'duration', duration]
        sql = mysql.format(sql, inserts)
        conn.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else { }
            console.log(rows);
            res.send(JSON.stringify(rows));

        })
    })

    //router middleware to verify and create token
    router.use((req, res, next) => {
        let username = '';
        userToken.username = '';
        if (req.cookies.tokenid) {
            decodeToken(req.cookies.tokenid, (err, decoded) => {
                if (err) {
                    console.log(err)
                } else {
                    userToken.username = decoded.username;
                    userToken.createdAt = decoded.createdAt;
                    userMail = userToken.username;
                    res.cookie('tokenid', req.cookies.tokenid, { maxAge: 86400 * 1000 })
                }
            });
        }
        next();
    });


    router.use(['/users'], (req, res, next) => {
        if (!userToken.username) {
            res.redirect('/login');
            return;
        }
        next();
    });

    router.use((req, res, next) => {
        userName = userToken.username;
        next();
    });
      

    //get videos uploaded by type
    router.get('/videos/:type', (req, res) => {

        conn.query(`SELECT * FROM videos where type ='${type}'`, (err, videodetails) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                console.log(videodetails);
                res.send(videodetails)
            }
        })
    })
    // get all videos
    router.get('/allVideos', (req, res) => {

        conn.query(`SELECT * FROM videos`, (err, rows) => {
            if (err) {
                res.status(500).send(err);

            } else {
                res.send(JSON.stringify(rows));
            }

        })
    });

    //get product by search text bar
    router.get('/videos/search/:text', (req, res) => {
        const text = req.params.text;
        conn.query(`SELECT DISTINCT title, equipment, videos.type,duration FROM videos WHERE videos.type LIKE '%${text}%' OR videos.equipment LIKE '%${text}%'`,
            (err, videosearch) => {
                if (err) {
                    res.status(500).send({ message: "Video doesn't exist" });
                } else {
                    res.send(videosearch);
                }
            })
    });
    //user logout
    router.get('/logout', (req, res, next) => {
        res.cookie('token', '', { expires: new Date(1), path: '/' });
        console.log('logging out')
        res.send('logged out');
    });
    return router;
}
module.exports = login_route;

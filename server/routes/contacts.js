const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const dbConfigs = require('../utils/dbconfigs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const conn = mysql.createPool(dbConfigs);

const contact_route = function (express) {
        router.post('/newContact', (req, res) => {
        var post = {
            name: req.body.name,
            message: req.body.message,
            email: req.body.email
        }
        //prevent sql injection
        conn.query(`INSERT INTO contacts SET ?`, post, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ success: false, msg: 'contact was not created' });
            } else {
                console.log(data);
                res.send('You have a new contact');
            }
        })
    })

        //get contact
    router.get('/contact', (req, res) => {
        var sql = 'SELECT * FROM contacts'; 
            if (err || !rows[0].name) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                let contact = rows[0];
                console.log(contact);
                res.send(contact);

            }
        })
    };
module.exports=contact_route;
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const busboy = require("then-busboy");
const mysql = require('mysql');
const dbConfigs = require('./utils/dbconfigs');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server),
workout_connection = require('./routes/workout_connection')(io);
var navigation_routes = require('./routes/navigation');
var login_route = require('./routes/login');
var video_route = require('./routes/video_route');
var contact_route = require('./routes/contacts');


var corsOptions ={
  origin:'http://localhost:3000',
     credentials: true
};


const conn = mysql.createPool(dbConfigs);



app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use('/',express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/videos',video_route(express,conn))
app.use('/',login_route(express, conn));
app.use('/',contact_route(express, conn));

// app.use('/',navigation_routes(app,express))




server.listen(port, () => {
  console.log(`Server is up on ${port}`);

});

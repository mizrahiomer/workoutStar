const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const busboy = require("then-busboy");

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server),
workout_connection = require('./routes/workout_connection')(io);
var navigation_routes = require('./routes/navigation');
var uploads = require('./routes/upload');
const login= require('./routes/login');

var corsOptions ={
  origin:'http://localhost:3000',
     credentials: true
};



app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use('/',express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/fileupload',uploads(express))
app.use(login.router);
// app.use('/',navigation_routes(app,express))




server.listen(port, () => {
  console.log(`Server is up on ${port}`);

});

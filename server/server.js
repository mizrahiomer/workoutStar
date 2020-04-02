const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server),
    workout_connection = require('./routes/workout_connection')(io);

const navigation_routes = require('./routes/navigation');



app.use(express.static(publicPath));
app.use('/',navigation_routes(app,express))







server.listen(port, () => {
  console.log(`Server is up on ${port}`);

});

var express = require('express');
var app = express();
var server = app.listen(3000, function(req, res) {
    console.log('Server is running on port 3000...');
});
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');





var userRoute = require('./server/routes/user');
var driverRoute = require('./server/routes/driver');
var tariffRoute = require('./server/routes/tariff');
var bookingRoute = require('./server/routes/booking');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/client')));

mongoose.connect('mongodb://localhost/meanapp');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database connected');
});

var drivers=[];
io.on('connection', function(socket) {

    socket.on('MyMessage', function(data) {
          var driverInfo = new Object();
          driverInfo.driverlocation=data.message;
          driverInfo.driverId=socket.id;
          drivers.push(socket.id);
          driverInfo.driverArray=drivers;
          socket.broadcast.emit('NewMessage', {
            message: driverInfo
        });
    });

    socket.on('BookDetail', function(data) {
            socket.broadcast.emit('MyBook', {
            msg: data.All
        });

    });
    socket.on('Driver', function(data) {
            socket.broadcast.emit('MyDriver', {
            msg: data.All
        });

    });

    socket.on('disconnect', function() {
      var driverDet = new Object();
        console.log('Client disconnected.');
        deleteFromArray(drivers, socket.id);
        console.log(drivers);
        driverDet.driverId=socket.id;
        driverDet.Arr=drivers;
        socket.broadcast.emit('DriverArr', {
        description: driverDet
    });
    });
    function deleteFromArray(my_array, element) {
  position = my_array.indexOf(element);
  my_array.splice(position, 1);
}

    socket.on('error', function (err) {
   console.log("Socket.IO Error");
   console.log(err.stack);
});
});


app.use('/uapi', userRoute);
app.use('/dapi', driverRoute);
app.use('/tapi', tariffRoute);
app.use('/bapi', bookingRoute);


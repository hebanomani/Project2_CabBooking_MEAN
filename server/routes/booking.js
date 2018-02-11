var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();

var Booking=require('../models/BookingModel.js');

router.post('/AddBooking', function (req, res) {
  var booking = new Booking({
    user: req.body.User,
    Pickup: req.body.StartPoint,
    Destination: req.body.EndPoint,
    BookDate:req.body.BookingDate,
    BookTime:req.body.BookingTime,
    Distance: req.body.Distance,
    Duration: req.body.Time,
    Amount: req.body.Amount,
    BookingType:req.body.BookingType,
    CabType:req.body.CabCategory,
    DriverCab:req.body.DriverDetails
  });
  booking.save(function(err,docs){
    console.log('Booking Saved Successfully'+docs);
  });
});


router.get('/GetAllBookings/:m',function(req,res){
  Booking.find({"DriverCab.mobi":req.params.m},function(err,data){
    res.json(data);
         console.log(data);
      });

   });

   router.get('/GetAllRides/:m',function(req,res){
     Booking.find({"user.mobile":req.params.m},function(err,data){
       res.json(data);
            console.log(data);
         });

      });

module.exports=router;

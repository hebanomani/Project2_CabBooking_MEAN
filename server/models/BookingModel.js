var mongoose=require('mongoose');
var BookingSchema=mongoose.Schema({
  user: Object,
  Pickup:String,
  Destination:String,
  CabName:String,
  CabModel:String,
  CabType:String,
  CabNumber:String,
  DriverName:String,
  DriverPhone:String,
  BookDate:Date,
  BookTime:String,
  Distance:String,
  Duration:String,
  Amount:String,
  BookingType:String,
  DriverCab:Object
});

module.exports=mongoose.model('BookingDetails',BookingSchema, 'BookingDetails');

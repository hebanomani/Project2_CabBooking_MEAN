var express = require('express');
var router = express.Router();
var Driver = require('../models/DriverModel');

router.post('/AddDriver', function(req, res) {
    newDriver = new Driver();
    newDriver.RegNo = req.body.RegNo;
    newDriver.LicenseNo = req.body.LicenseNo;
    newDriver.Address = req.body.Address;
    newDriver.Phone = req.body.Phone;
   // newDriver.Photo = req.body.Photo;
    newDriver.Model = req.body.Model;
    newDriver.CabType = req.body.CabType;
    newDriver.Make = req.body.Make;
    newDriver.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('Driver Data Saved !');
        }
    });
});

// router.get('/GetDriver', function(req, res) {
//     Driver.find({}, function(err, data) {
//         if (err) {
//             throw err;
//         } else {
//             res.json(data);
//         }
//     });
// });


router.get('/GetAllDrivers',function(req,res){
  Driver.aggregate([{
          $lookup: {
              from: "users",
              localField: "Phone",
              foreignField: "Phone",
              as: "Cab"
          }
      }, {
          $match: {
              "Cab": {
                  $ne: []
              }
          }
      }]).exec().then(function(data) {
          res.json(data);
      });
   });

// router.get('/getDriverByI/:id',function(req,res){
//     console.log(req.params.id);
//   Driver.findById(req.params.id, function (err, docs) {
//   if (err) {
//       res.send(err)
//   }
//   if (docs) {
//     console.log(docs);
//       res.send(docs)
//   } else {
//       res.send("No Driver found with that ID")
//   }
// });
//   });


   router.get('/getDriverByPhone/:Phone',function(req,res){
       Driver.aggregate([
       { $match: {
           Phone: req.params.Phone
       }},{
             $lookup: {
                 from: "users",
                 localField: "Phone",
                 foreignField: "Phone",
                 as: "User"
             }
         }, {
             $match: {
                 "User": {
                     $ne: []
                 }
             }
         }]).exec().then(function(data) {
           console.log(data);
             res.json(data);
         });
      });

router.delete('/DeleteDriver/:phone', function(req, res) {
    Driver.remove({
        'Phone': req.params.phone
    }, function(err) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Driver Deleted !');
        }
    });
});

router.post('/UpdateDriver/:id/:regno/:licenseno/:address/:mobileno/:model/:cabtype/:make', function(req, res) {
    Driver.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
        //   throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Deleted');
        }
    }); 
    newDriver = new Driver();
    newDriver.RegNo = req.params.regno;
    newDriver.LicenseNo = req.params.licenseno;
    newDriver.Address = req.params.address;
    newDriver.Phone = req.params.mobileno;
    // newDriver.Photo = req.params.photo;
    newDriver.Model = req.params.model;
    newDriver.CabType = req.params.cabtype;
    newDriver.Make = req.params.make;
    newDriver.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            // res.json({
            //     success: true
            // });
            console.log('Data Saved !');
        }
    });
});


module.exports = router;

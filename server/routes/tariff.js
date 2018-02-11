var express = require('express');
var router = express.Router();
var Tariff = require('../models/TariffModel');

router.post('/AddTariff', function(req, res) {
    newTariff = new Tariff();
    newTariff.CabType = req.body.CabType;
    newTariff.NormalRate = req.body.NormalRate;
    newTariff.PeakRate = req.body.PeakRate;
    newTariff.StartPeakHour = req.body.StartPeakHour;
    newTariff.EndPeakHour = req.body.EndPeakHour;
    newTariff.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('Tariff Data Saved !');
        }
    });
});

router.get('/GetTariff', function(req, res) {
    Tariff.find({}, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

router.get('/GetSelectedPlan/:m',function (req, res) {

  Tariff.find({CabType:req.params.m},function(err,Data){
  if(err)
  {
    return res.send(err);
  }
  res.send(Data);
  console.log(Data);
});
});


router.get('/getTariffById/:id',function(req,res){
    console.log(req.params.id);
  Tariff.findById(req.params.id, function (err, docs) {
  if (err) {
      res.send(err)
  }
  if (docs) {
    console.log(docs);
      res.send(docs)
  } else {
      res.send("No Tariff found with that ID")
  }
});
  });

router.get('/GetSTariff/:t', function (req, res) {
    Tariff.find({CabType:req.params.t}, function (err, docs) {
    res.json(docs);
    });
});

router.delete('/DeleteTariff/:id', function(req, res) {
    Tariff.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Tariff Deleted !');
        }
    });
});

router.post('/UpdateTariff/:id/:cabtype/:startpeakhour/:endpeakhour/:normalrate/:peakrate', function(req, res) {
    Tariff.remove({
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
    newTariff = new Tariff();
    newTariff.CabType = req.params.cabtype;
    newTariff.StartPeakHour = req.params.startpeakhour;
    newTariff.EndPeakHour = req.params.endpeakhour;
    newTariff.NormalRate = req.params.normalrate;
    newTariff.PeakRate = req.params.peakrate;
    newTariff.save(function(err) {
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

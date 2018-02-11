var mongoose = require('mongoose');
var tariffSchema = mongoose.Schema({
    EndPeakHour: String,
    StartPeakHour: String,
    PeakRate: String,
    CabType:String,
    NormalRate: String
});

module.exports = mongoose.model('tariff', tariffSchema);

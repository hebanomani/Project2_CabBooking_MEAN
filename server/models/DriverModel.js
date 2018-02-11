var mongoose = require('mongoose');
var driverSchema = mongoose.Schema({
    RegNo: String,
    LicenseNo: String,
    Address: String,
    Phone: String,
    // Photo: String,
    Model: String,
    CabType:String,
    Make:String
});

module.exports = mongoose.model('driver', driverSchema);

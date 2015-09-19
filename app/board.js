var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BoardSchema   = new Schema({
    name: String,
    pads: Array
});

module.exports = mongoose.model('Board', BoardSchema);

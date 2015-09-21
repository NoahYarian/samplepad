'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema   = new Schema({
  name: String,
  // user_id: ObjectId,
  // pads: [{
  //   active: Boolean,
  //   label: String,
  //   hotkey: String,
  //   src: String,
  //   type: String
  // }]
  pads: Array
});

module.exports = mongoose.model('Board', BoardSchema);

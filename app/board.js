'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema   = new Schema({
  name: {type: String, default: "808 Drum Kit"},
  created: {type: String, default: Date()},
  updated: {type: String, default: Date()},
  pads: {
    type: Array,
    default: [
      {
        "hotkey": "1",
        "src": "http://assets.noahyarian.com/sounds/808/BD/BD0075.wav",
        "name": "808 Bass Drum"
      },
      {
        "hotkey": "2",
        "src": "http://assets.noahyarian.com/sounds/808/SD/SD0010.wav",
        "name": "808 Snare Drum"
      },
      {
        "hotkey": "3",
        "src": "http://assets.noahyarian.com/sounds/808/CH/CH.wav",
        "name": "808 Closed Hat"
      },
      {
        "hotkey": "4",
        "src": "http://assets.noahyarian.com/sounds/808/CP/CP.wav",
        "name": "808 Hand Clap"
      },
      {
        "hotkey": "Q",
        "src": "http://assets.noahyarian.com/sounds/808/LT/LT00.wav",
        "name": "808 Low Tom"
      },
      {
        "hotkey": "W",
        "src": "http://assets.noahyarian.com/sounds/808/MT/MT00.wav",
        "name": "808 Mid Tom"
      },
      {
        "hotkey": "E",
        "src": "http://assets.noahyarian.com/sounds/808/HT/HT00.wav",
        "name": "808 Hi Tom"
      },
      {
        "hotkey": "R",
        "src": "http://assets.noahyarian.com/sounds/808/RS/RS.wav",
        "name": "808 Rim Shot"
      },
      {
        "hotkey": "A",
        "src": "http://assets.noahyarian.com/sounds/808/LC/LC00.wav",
        "name": "808 Low Conga"
      },
      {
        "hotkey": "S",
        "src": "http://assets.noahyarian.com/sounds/808/MC/MC00.wav",
        "name": "808 Mid Conga"
      },
      {
        "hotkey": "D",
        "src": "http://assets.noahyarian.com/sounds/808/HC/HC00.wav",
        "name": "808 Hi Conga"
      },
      {
        "hotkey": "F",
        "src": "http://assets.noahyarian.com/sounds/808/CB/CB.wav",
        "name": "808 Cow Bell"
      }
    ]
  }
});

module.exports = mongoose.model('Board', BoardSchema);

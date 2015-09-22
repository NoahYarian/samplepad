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
        "src": "/sounds/808/BD/BD0075.wav",
        "name": "808 Bass Drum"
      },
      {
        "hotkey": "2",
        "src": "/sounds/808/SD/SD0010.wav",
        "name": "808 Snare Drum"
      },
      {
        "hotkey": "3",
        "src": "/sounds/808/CH/CH.wav",
        "name": "808 Closed Hat"
      },
      {
        "hotkey": "4",
        "src": "/sounds/808/CP/CP.wav",
        "name": "808 Hand Clap"
      },
      {
        "hotkey": "Q",
        "src": "/sounds/808/LT/LT00.wav",
        "name": "808 Low Tom"
      },
      {
        "hotkey": "W",
        "src": "/sounds/808/MT/MT00.wav",
        "name": "808 Mid Tom"
      },
      {
        "hotkey": "E",
        "src": "/sounds/808/HT/HT00.wav",
        "name": "808 Hi Tom"
      },
      {
        "hotkey": "R",
        "src": "/sounds/808/RS/RS.wav",
        "name": "808 Rim Shot"
      },
      {
        "hotkey": "A",
        "src": "/sounds/808/LC/LC00.wav",
        "name": "808 Low Conga"
      },
      {
        "hotkey": "S",
        "src": "/sounds/808/MC/MC00.wav",
        "name": "808 Mid Conga"
      },
      {
        "hotkey": "D",
        "src": "/sounds/808/HC/HC00.wav",
        "name": "808 Hi Conga"
      },
      {
        "hotkey": "F",
        "src": "/sounds/808/CB/CB.wav",
        "name": "808 Cow Bell"
      }
    ]
  }
});

module.exports = mongoose.model('Board', BoardSchema);

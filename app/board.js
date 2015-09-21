'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema   = new Schema({
  name: {type: String, default: "Untitled"},
  created: {type: Date, default: Date.now},
  pads: {
    type: Array,
    default: [
      {
        active: true,
        name: "808 Bass Drum",
        hotkey: "1",
        src: "/sounds/BD.wav",
        type: "audio/wav"
      },
      {
        active: true,
        name: "808 Snare Drum",
        hotkey: "2",
        src: "/sounds/SD.wav",
        type: "audio/wav"
      },
      {
        active: true,
        name: "808 Closed Hat",
        hotkey: "3",
        src: "/sounds/CH.wav",
        type: "audio/wav"
      },
      {
        active: true,
        name: "808 Hand Clap",
        hotkey: "4",
        src: "/sounds/CP.wav",
        type: "audio/wav"
      },
      {
        active: false,
        name: "",
        hotkey: "Q",
        src: "",
        type: ""
      },
      {
        active: false,
        name: "",
        hotkey: "W",
        src: "",
        type: ""
      },
      {
        active: false,
        name: "",
        hotkey: "E",
        src: "",
        type: ""
      },
      {
        active: false,
        name: "",
        hotkey: "R",
        src: "",
        type: ""
      },
      {
        active: false,
        name: "",
        hotkey: "A",
        src: "",
        type: ""
      },
      {
        active: false,
        name: "",
        hotkey: "S",
        src: "",
        type: ""
      },
      {
        active: false,
        name: "",
        hotkey: "D",
        src: "",
        type: ""
      },
      {
        active: false,
        name: "",
        hotkey: "F",
        src: "",
        type: ""
      }
    ]
  }
});

module.exports = mongoose.model('Board', BoardSchema);

  // user_id: ObjectId,
  // pads: [{
  //   active: Boolean,
  //   name: String,
  //   hotkey: String,
  //   src: String,
  //   type: String
  // }]

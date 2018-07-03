'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Es requerido que ingrese un nombre al nuevo objeto'
  },
  Created_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: [{
      type: String,
      enum: ['Pendiente', 'En tiempo', 'Completado']
    }],
    default: ['Pendiente']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pagoEmpresarial2Schema = new Schema({
    beneficiario: {
        type: String,
        required: 'Es requerido que ingrese un nombre al nuevo archivo'
      },
      banco:{
        type:String,
        required: 'EL valor por defecto es 01,aun asi es requerido'
      },
      empresa: {
        type: String,
        required: 'Es requerido que ingrese el codigo de empresa'
      },
      servicio: {
        type: String,
        required: 'Es requerido que ingrese la ubicacion del archivo'
      },
      neto: {
        type: Number,
        required: 'Es requerido que ingrese la descripcion del archivo'
      },
      totReg: {
        type: String,
        required: 'Es requerido que ingrese el total de registro'
      },
      descripcion: {
        type: String,
      },
      refPagad: {
        type: String,
        // required: ''
      },
      refBenef: {
        type: String,
        // required: ''
      },
      codAutori: {
        type: String,
        required: 'campo requerido'
      },
      procReg: {
        type: String,
        required: 'campo requerido'
      },
      respuesta: {
        type: String,
        required: 'campo requerido'
      },
            Created_date: {
              type: Date,
              default: Date.now,
            },
            status: {
              type: [{
                type: String,
                enum: ['recibido', 'En proceso', 'validado','repetido']
              }],
              default: ['recibido']
            }
  });
  module.exports = mongoose.model('pagoEmpresarial2', pagoEmpresarial2Schema);
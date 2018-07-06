'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//=================================================================================================
var pagoEmpresarial1Schema = new Schema({
    beneficiario: {
      byte:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      ubicacion:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      valor:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      }
    },
    banco:{
      byte:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      ubicacion:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      valor:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      }
    },
    empresa:{
      byte:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      ubicacion:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      valor:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      }
    },
    servicio:{
      byte:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      ubicacion:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      valor:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      }
    },
    neto: {
      byte:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      ubicacion:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      valor:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      }
    },
    descripcion:{
      byte:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      ubicacion:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
      valor:
      {
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      }
    },
    crc: {
      type:String,
      required: 'Es requerido que ingrese un valor al campo'
    },
    message: {
      type:String,
      required: 'Es requerido que ingrese un valor al campo'
    },
            Created_date: {
              type: Date,
              default: Date.now,
            },
            status: {
                type: String,   
            }
});
module.exports = mongoose.model('pagoEmpresarial1', pagoEmpresarial1Schema);

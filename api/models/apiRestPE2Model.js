'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pagoEmpresarial2Schema = new Schema({
    tipo: {
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
      empresa: {
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
      servicio: {
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
      totReg: {
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
      descripcion: {
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
      refPagad: {
            byte:{
            type: String,
            required: 'Es requerido que ingrese un valor al campo'
          },
          ubicacion:{
            type: String,
            required: 'Es requerido que ingrese un valor al campo'
          },
          valor:
          {
            type: String,
            required: 'Es requerido que ingrese un valor al campo'
          }
      },
      refBenef: {
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
      codAutori: {
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
      procReg: {
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
      respuesta: {
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
      paramFecha: {
        type: String,
      },
      counter:{
        type:Number,
      },
            Created_date:{
              type: Date,
              default: Date.now,
            },
            status: {
              type: String,   
          }
  });
  module.exports = mongoose.model('pagoEmpresarial2', pagoEmpresarial2Schema);
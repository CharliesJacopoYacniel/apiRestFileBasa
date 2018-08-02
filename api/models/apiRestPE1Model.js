'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//=================================================================================================
var pagoEmpresarial1Schema = new Schema(
{
	data: {
		response: {
			montoapagar: { 
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
			cuenta: { 
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
			fechaCreacion:{ 
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
			tamanoArchivo: { 
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
			montoIngresado: { 
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
			md5: { 
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
			crc: { 
        type: String,
        required: 'Es requerido que ingrese un valor al campo'
      },
			listCorreos: {
				listaCorreosItem: 	[{
            nombreUsuario: { 
              type: String,
              // required: 'Es requerido que ingrese un valor al campo'
            },
            correo: { 
              type: String,
              // required: 'Es requerido que ingrese un valor al campo'
            },
          }]
        },
			infoCliente: {
				nombre: { 
          type: String,
          required: 'Es requerido que ingrese un valor al campo'
        },
				empresa: { 
          type: String,
          required: 'Es requerido que ingrese un valor al campo'
        },
				otrosDatos: {
					data: { 
            type: String,
            required: 'Es requerido que ingrese un valor al campo'
          }
				}
			},
			parametroAdicionalColecction : {
				help:{ 
          type: String,
          required: 'Es requerido que ingrese un valor al campo'
        },
      },
      Created_date:{
        type: Date,
        default: Date.now,
      },
      paramFecha: {
        type: Date,
        // required: 'Es requerido que ingrese un valor al campo'
      },
      counter:{
        type:Number,
      },
		}
	}
});

module.exports = mongoose.model('pagoEmpresarial1', pagoEmpresarial1Schema);

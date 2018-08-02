'use strict';
var mongoose = require('mongoose'),
   pe1Schema = mongoose.model('pagoEmpresarial1')
   ;
// ======= INCIO CODIGO PARA CORREO =====
const { createServer } = require('http')  
const nodemailer = require('nodemailer') 
const server = createServer()

server.on('error', (err) => console.log(err.stack))

function sendEmail(cadenaCorreos) {  
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'charliesyacniel@gmail.com',
      clientId: '683856281309-ifkn7bbid90lb6rlbi42f9q9nc4ahb8i.apps.googleusercontent.com',
      clientSecret: 'tPZG7rDTNLB3pRCfUKeZpqpx',
      refreshToken: '1/zrXz74Ofqm5M0k6mBUjnNnzoLYweFtwt-5LNXgePDmGxcfhrwvt7bcfo8Fmqka7K'
    }
  })

  let mailOptions = {
    from: '<charliesyacniel@gmail.com>',
    to: cadenaCorreos,
    subject: 'My tes de mail en node.js',
    html: ' <h1> test de el commit</h1> '
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw new Error(err)
    console.log('Email send');
  })
}
// ==== FIN CODIGO PARA CORREO ======
//=================================================================================================
exports.list_all_pe1Schema = function(req, res) {
  pe1Schema.find({}, function(err, pe1Schema) {
    if (err)
      res.send(err);
    res.json(pe1Schema);
  })
  .sort({ Created_date: -1 });
};

exports.validate_a_pe1Schema = async function(req, res){
  var mensajeJson ="";
  var miStatus = "" ;

  var codeStatus ;

  var varHelp= '| 100   Consulta , 101 Repetido | '
                +'200   Operado con exito '
                +'300   Autorizado | '
                +'400   Error del cliente  | '
                +'500   Error del Servidor |';

  let montoapagar=req.body.data.request.montoapagar ;
  let cuenta= req.body.data.request.cuenta;
  let fechaCreacion= req.body.data.request.fechaCreacion
  let tamanoArchivo= req.body.data.request.tamanoArchivo;
  let montoIngresado= req.body.data.request.montoIngresado;
  let md5= req.body.data.request.md5;
  let myCrc= req.body.data.request.crc;
  let paramFecha=req.body.data.request.paramFecha;
  let correos=req.body.listCorreos.listaCorreosItem;
  // console.log('Busqueda desde : ',paramFecha);
  let estadoFlujo=req.body.data.request.estadoFlujo;
  let cadena='';
  correos.forEach(function(element) {
    cadena=cadena+','+element.correo;
    // console.log(element.correo);
  });
  // console.log('cadena de correos',cadena);
  cadena=cadena.replace(',','');

// Consulta      = 1
// Operando      = 2
// Autorizado    = 3
var counter = 0;
try {
  counter= await new Promise(function(resolve, reject){
    // var queryDateCrc={ "data.response.md5" :{ $eq : md5}};
    var queryDateCrc={ "data.response.Created_date" : { $gte : paramFecha } , "data.response.md5" : { $eq : md5 }};
    // pe1Schema.find(queryDateCrc).countDocuments(function(err, count){
    pe1Schema.find(queryDateCrc).count(function( err, count ){
      if(!err){
        resolve(count);
      }else {
        console.log(err);
        codeStatus=500;
        reject('error');
      }
    })
  });
}catch (error){
  console.log(error);
}


  switch(estadoFlujo)
    {
      case 1:
          // console.log('aqui va codigo para consulta de archivo (existe o no)');
         
          miStatus+=" Recibido para consulta," ;
          codeStatus=100;
          mensajeJson="Recibido nueva info de archivo para Consulta, ";
          // console.log(counter);
          if(counter>0){//el archivo se repite
            mensajeJson = mensajeJson + " El campo MD5 se repite "+counter+" veces"; 
            miStatus = miStatus+ " repetido";
            codeStatus=101;
          }
          let objectRespuesta={"counter":counter,"estado":miStatus,"help":varHelp};
          res.json(
            {
              status:  codeStatus,
              message: mensajeJson,
              object:  objectRespuesta,
            }
          );
          break;
      case 2:
          mensajeJson='El archivo fue operado por el sistema';
          miStatus+=" Operado," ;
          codeStatus=200;
          res.json(
            {
              status:  codeStatus,
              message: mensajeJson,
              object:  req.body,
            }
          );
          break;
      case 3:
          // console.log('codigo para archivo autorizado por el banco');
          let newFile= {
            data: {
              response: {
                montoapagar: montoapagar,
                cuenta: cuenta,
                fechaCreacion: fechaCreacion,
                tamanoArchivo: tamanoArchivo,
                montoIngresado: montoIngresado,
                md5: md5,
                crc:myCrc,
                listCorreos: {
                  listaCorreosItem: JSON.parse(JSON.stringify(correos))
                },
                infoCliente: {
                  nombre: "TEST Utimo antes hacer commit",
                  empresa: "valor",
                  otrosDatos: {
                    data: "valor"
                  }
                },
                parametroAdicionalColecction:{
                  help: varHelp
                },
                paramFecha: paramFecha,
                counter:counter,
              }
            }
          };
          mensajeJson='El archivo fue Autorizado por el sistema,datos Almacenados,Notificaciones enviadas';
          codeStatus=300;
          var new_pe1Schema = new pe1Schema( newFile );
          new_pe1Schema.save(function(err, pe1Schema){
              if (err){
                codeStatus=500;
                res.send(err);
              }
              sendEmail(cadena);//AQUI ENVIO LOS CORREOS
              res.json(
                {
                  status:  codeStatus,
                  message: mensajeJson,
                  object:  pe1Schema,
                }
              );
          });
          break;
      default:
          // console.log('No se especifico valor para el control de el flujo');
          mensajeJson="No se especifico valor para el control de el flujo";
          codeStatus=400;
          res.json(
            {
              status:  codeStatus,
              message: mensajeJson,
              object:  {"help":varHelp},
            }
          );
    }
};

'use strict';
var mongoose = require('mongoose'),
   pe2Schema = mongoose.model('pagoEmpresarial2');
//=================================================================================================
exports.list_all_pe2Schema = function(req, res) {
  pe2Schema.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.validate_a_pe2Schema = async function(req, res){
  // console.log('request data : ',req.body);
  var fechaId= req.body.paramFecha; 
  if(fechaId == "" || fechaId == " " || fechaId == "  "){//parametro 
    res.json({
              status:400,
              message:'Parametro fecha es vacio',
              object: fechaId,
              });
  }else{ 

  // 
  var mensajeJson ="Guardado nuevo archivo, ";
  var miStatus = "recibido" ;

  var codeStatus = 200;
  var counter = 0;

  /*
  100   Guardado pero repetido
  200   Guardado con exito
  300   Redireccion
  400   Error del cliente al Guardar
  500   Error del Servidor 
  */
 
  let tipo=req.body.tipo.valor ;
  let beneficiario=req.body.beneficiario.valor;
  let banco=req.body.banco.valor;
  let empresa=req.body.empresa.valor;
  let servicio=req.body.servicio.valor;
  let neto= (req.body.neto.valor).toString();
  let totReg=req.body.totReg.valor;
  let descripcion=req.body.descripcion.valor;
  let refPagad=req.body.refPagad.valor;
  let refBenef=req.body.refBenef.valor;
  let codAutori=req.body.codAutori.valor;
  let procReg=req.body.procReg.valor;
  let respuesta=req.body.respuesta.valor;
  let myCrc= req.body.crc.valor;
  

  if(beneficiario.length<16){
    while (beneficiario.length<16){
      beneficiario = beneficiario +' ';
    }
  }
  if(banco != '01'){
    banco='01';
  }
  if(neto.length<16){
    while (neto.length<16){
      neto = '0'+neto;
    }
  }
  if( descripcion == "" ){
    while (descripcion.length < 40){
      descripcion =descripcion+' ';
    }
  }

  try {
    var counter= await new Promise(function(resolve, reject){
      var queryDateCrc= { Created_date : { $gte : fechaId } ,crc : { $eq : myCrc }};
      // pe2Schema.find(queryDateCrc).countDocuments(function(err, count){
      pe2Schema.find(queryDateCrc).count(function(err, count){
        if (!err) {
          resolve(count);
        }else {
          codeStatus=500;
          reject('error');
        }
      })
    });
  }catch (error){
    console.log(error);
  }

  if( counter > 0 ){//el archivo se repite
    mensajeJson = mensajeJson + " El campo CRC se repite "+counter+" veces"; 
    miStatus = miStatus+ " repetido";
    codeStatus=100;
  }

  let newFile={
              tipo: {
                byte:req.body.tipo.byte,
                ubicacion:req.body.tipo.ubicacion,
                valor:tipo
              },
              beneficiario: {
                byte:req.body.beneficiario.byte,
                ubicacion:req.body.beneficiario.ubicacion,
                valor:beneficiario
              },
              banco: {
                byte:req.body.banco.byte,
                ubicacion:req.body.banco.ubicacion,
                valor:banco
              },
              empresa:{
                byte:req.body.empresa.byte,
                ubicacion:req.body.empresa.ubicacion,
                valor:empresa
              },
              servicio:{
                byte:req.body.servicio.byte,
                ubicacion:req.body.servicio.ubicacion,
                valor:servicio
              },
              neto: {
                byte:req.body.neto.byte,
                ubicacion:req.body.neto.ubicacion,
                valor:neto
              },
              totReg:{
                byte: req.body.totReg.byte,
                ubicacion: req.body.totReg.ubicacion,
                valor: totReg
              },
              descripcion:{
                byte: req.body.descripcion.byte,
                ubicacion: req.body.descripcion.ubicacion,
                valor: descripcion
              },
              refPagad:{
                byte: req.body.refPagad.byte,
                ubicacion: req.body.refPagad.ubicacion,
                valor: refPagad
              },
              refBenef:{
                byte: req.body.refBenef.byte,
                ubicacion: req.body.refBenef.ubicacion,
                valor: refBenef
              },
              codAutori:{
                byte: req.body.codAutori.byte,
                ubicacion: req.body.codAutori.ubicacion,
                valor: codAutori
              },
              procReg:{
                byte: req.body.procReg.byte,
                ubicacion: req.body.procReg.ubicacion,
                valor: procReg
              },
              respuesta:{
                byte: req.body.respuesta.byte,
                ubicacion: req.body.respuesta.ubicacion,
                valor: respuesta
              },
                crc : myCrc ,
                message : mensajeJson ,
                paramFecha : fechaId ,
                counter : counter ,
                status : miStatus
          } 

    var new_pe2Schema = new pe2Schema( newFile );
        new_pe2Schema.save(function(err, pe2chema){
            if(err){
              res.send(err);
            }
            res.json(
              {
                status:  codeStatus,
                message: mensajeJson,
                object:  pe2chema,
              }
            );
        });
  }//fin else fecha invalida
};
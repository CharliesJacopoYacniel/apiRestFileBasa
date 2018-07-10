'use strict';
var mongoose = require('mongoose'),
   pe1Schema = mongoose.model('pagoEmpresarial1')
   ;
//=================================================================================================
exports.list_all_pe1Schema = function(req, res) {
  pe1Schema.find({}, function(err, pe1Schema) {
    if (err)
      res.send(err);
    res.json(pe1Schema);
  });
};

exports.validate_a_pe1Schema = async function(req, res){
    var fechaId= req.body.paramFecha; 
    if(fechaId == "" || fechaId == " " || fechaId == "  "){
      res.json({
                status:400,
                message:'Parametro fecha es vacio',
                object: fechaId,
              });
    }else{ 
    // 
    var mensajeJson ="Guardado nuevo archivo, ";
    var miStatus = "recibido" ;
    var codeStatus=200;
    var counter=0;
   
    /*
    100   Guardado pero repetido
    200   Guardado con exito
    300   Redireccion
    400   Error del cliente al Guardar
    500   Error del Servidor 
    */

    let beneficiario=req.body.beneficiario.valor;
    let banco=req.body.banco.valor;
    let empresa=req.body.empresa.valor;
    let servicio=req.body.servicio.valor;
    let neto= (req.body.neto.valor).toString();
    let descripcion=req.body.descripcion.valor;
    let myCrc= req.body.crc.valor;
    
    if(beneficiario.length<16){
      while (beneficiario.length<16){
        beneficiario = beneficiario +' ';
      }
    }
    if(banco!='01'){
      banco='01';
    }
    if(neto.length<16){
      while (neto.length<16){
        neto = '0'+neto;
      }
    }
    if(descripcion==""){
      while (descripcion.length<40){
        descripcion =descripcion+' ';
      }
    }

    try {
      counter= await new Promise(function(resolve, reject){
        // var queryDateCrc= { crc : { $eq : myCrc }};
        var queryDateCrc={ Created_date : { $gte : fechaId } ,crc : { $eq : myCrc }};
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

    if( counter > 0 ){//el archivo se repite
      mensajeJson = mensajeJson + " el campo CRC se repite "+counter+" veces"; 
      miStatus = miStatus+ " repetido";
      codeStatus=100;
    }

    let newFile={
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
      descripcion:{
        byte: req.body.descripcion.byte,
        ubicacion: req.body.descripcion.ubicacion,
        valor: descripcion
      },
        crc : myCrc ,
        message : mensajeJson ,
        paramFecha : fechaId ,
        counter : counter ,
        status : miStatus
      } 

      var new_pe1Schema = new pe1Schema( newFile );
      new_pe1Schema.save(function(err, pe1Schema){
          if (err){
            codeStatus=500;
            res.send(err);
          }
          res.json(
            {
              status:  codeStatus,
              message: mensajeJson,
              object:  pe1Schema,
            }
          );
      });
    }//fin else fecha invalida
};

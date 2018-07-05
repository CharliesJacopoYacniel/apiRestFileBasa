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

exports.validate_a_pe1Schema = function(req, res){
    // console.log('request data : ',req.body);
    var fechaId= req.body.paramFecha; 
    if(fechaId == ""){//parametro 
      res.json({
                status:400,
                message:'Parametro fecha es vacio',
                object: fechaId,
                });
    }else{ 
    var mensajeJson="";
    let beneficiario=req.body.beneficiario.valor;
    let banco=req.body.banco.valor;
    let empresa=req.body.empresa.valor;
    let servicio=req.body.servicio.valor;
    let neto=(req.body.neto.valor).toString();
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
    // var counter=pe1Schema.count({ crc: { $eq: myCrc } } );
    pe1Schema.find({ crc: { $eq: myCrc } } , function(err,pe1Schema){
      if (err)
        res.send(err);

      mensajeJson="El campo CRC se repite  veces."; 
      res.json(
          {
            status:  500,
            message: mensajeJson,
            object:  pe1Schema,
          }
        );
    });

  //   let newFile={
  //     beneficiario: {
  //       byte:req.body.beneficiario.byte,
  //       ubicacion:req.body.beneficiario.ubicacion,
  //       valor:beneficiario
  //     },
  //     banco: {
  //       byte:req.body.banco.byte,
  //       ubicacion:req.body.banco.ubicacion,
  //       valor:banco
  //     },
  //     empresa:{
  //       byte:req.body.empresa.byte,
  //       ubicacion:req.body.empresa.ubicacion,
  //       valor:empresa
  //     },
  //     servicio:{
  //       byte:req.body.servicio.byte,
  //       ubicacion:req.body.servicio.ubicacion,
  //       valor:servicio
  //     },
  //     neto: {
  //       byte:req.body.neto.byte,
  //       ubicacion:req.body.neto.ubicacion,
  //       valor:neto
  //     },
  //     descripcion:{
  //       byte: req.body.descripcion.byte,
  //       ubicacion: req.body.descripcion.ubicacion,
  //       valor: descripcion
  //     },
  //     crc : myCrc,
  //     paramFecha : fechaId
  // }
  //   // guardar datos de archivo si el que viene no existe aun
  //   var new_pe1Schema = new pe1Schema(newFile);
  //   new_pe1Schema.save(function(err, pe1Schema){
  //     if (err)
  //       res.send(err);
  //     mensajeJson="Guardado nuevo archivo";  
  //     res.json(
  //       {
  //         status:  200,
  //         message: mensajeJson,
  //         object:  pe1Schema,
  //       }
  //     );
  //   });


    }//fin else fecha invalida
};

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
exports.create_a_pe2Schema = function(req, res){
  var new_pe2Schema = new pe2Schema(req.body);
  new_pe2Schema.save(function(err, pe2Schema){
    if (err)
      res.send(err);
    res.json(pe2Schema);
  });
};

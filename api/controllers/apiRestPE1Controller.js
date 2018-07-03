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
exports.create_a_pe1Schema = function(req, res){
  var new_pe1Schema = new pe1Schema(req.body);
  new_pe1Schema.save(function(err, pe1Schema){
    if (err)
      res.send(err);
    res.json(pe1Schema);
  });
};

// exports.read_a_task = function(req, res){
//   Task.findById(req.params.taskId, function(err, task){
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
// exports.update_a_task = function(req, res){
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, { new: true }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
// exports.delete_a_task = function(req, res) {
//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };


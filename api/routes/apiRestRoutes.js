
'use strict';
module.exports = function(app) {
//=================================================================================================
var apiRestpe1 = require('../controllers/apiRestPE1Controller');
app.route('/pe1')
  .get(apiRestpe1.list_all_pe1Schema)
  .post(apiRestpe1.create_a_pe1Schema);

// app.route('/files/:dateSearch')
//   .get(apiRestFileBasa.read_a_task)
//   .put(apiRestFileBasa.update_a_task)
//   .delete(apiRestFileBasa.delete_a_task);

//=================================================================================================
var apiRestpe2 = require('../controllers/apiRestPE2Controller');
app.route('/pe2')
  .get(apiRestpe2.list_all_pe2Schema)
  .post(apiRestpe2.create_a_pe2Schema);
//=================================================================================================
};
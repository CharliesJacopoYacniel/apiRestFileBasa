
'use strict';
module.exports = function(app) {
//=================================================================================================
var apiRestpe1 = require('../controllers/apiRestPE1Controller');

app.route('/pe1')
     .get(apiRestpe1.list_all_pe1Schema)
     .post(apiRestpe1.validate_a_pe1Schema);

// app.route('/sendMail')
//     .post(apiRestpe1.sendMail);
//   .put(apiRestpe1.update_a_pe1Schema)
//   .delete(apiRestpe1.delete_a_pe1Schema);

//=================================================================================================
var apiRestpe2 = require('../controllers/apiRestPE2Controller');
app.route('/pe2')
  .get(apiRestpe2.list_all_pe2Schema)
  .post(apiRestpe2.validate_a_pe2Schema);
//=================================================================================================
};
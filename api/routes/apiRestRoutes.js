
'use strict';
module.exports = function(app) {
//=================================================================================================
var apiRestpe1 = require('../controllers/apiRestPE1Controller');
app.route('/pe1')
     .get(apiRestpe1.list_all_pe1Schema)
     .post(apiRestpe1.validate_a_pe1Schema);
};

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  pe1 = require('./api/models/apiRestPE1Model'), //created model loading here
  pe2 = require('./api/models/apiRestPE2Model'),
  bodyParser = require('body-parser');
  
  //fileBasa= nombre base de datos no relacional
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/fileBasa', {
         connectTimeoutMS: 1000,
  // Note that mongoose will **not** pull `bufferCommands` from the query string
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRestRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({ url : req.originalUrl + ' not found' })
});

app.listen(port);

console.log('API RESTful  corriendo en el puerto: '+port);
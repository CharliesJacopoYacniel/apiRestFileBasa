
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  pe1 = require('./api/models/apiRestPE1Model'), //created model loading here
  bodyParser = require('body-parser');
  
  //fileBasa= nombre base de datos no relacional
mongoose.Promise = global.Promise;

var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fileBasa' ||'mongodb://localhost:27017/filebasa';
// var url='mongodb://localhost:27017/fileBasa';
    mongoose.connect(url,{ connectTimeoutMS: 1000, });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRestRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({ url : req.originalUrl + ' not found' })
});

app.listen(port);

console.log('API RESTful  corriendo en el puerto: '+port);

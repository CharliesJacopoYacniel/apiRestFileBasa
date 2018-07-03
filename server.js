
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/apiRestModel'), //created model loading here
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Tododb', {
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

console.log(' RESTful API corriendo en el puerto: '+port);
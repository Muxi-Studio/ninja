/**
 * app.js
 *
 * bootstrap the express server
 */
var express = require('express');
var cons = require('consolidate');
var app = express();
var fs = require('fs');

module.exports = function(template, mock) {

	// configure app
  app.engine('html', cons[template]);
  app.set('view engine', 'html');
  app.set('views', process.cwd() + '/template');
  var mock = JSON.parse(fs.readFileSync(process.cwd() + mock, 'utf8'));

  // map routes
  mock.routes.map(function(obj, i) {
    app.get(obj.endpoint, function(req, res) {
      res.render(obj.template, mock.data[obj.name])
    });
  })

  // start server
  app.listen(3000, function() {
    console.log('Ninja Power on port http://localhost:3000');
  });
};

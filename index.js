#!/usr/bin/env node

var express = require('express');
var conf = require(process.cwd() + '/ninja.conf')
var cons = require('consolidate');
var fs = require('fs');

// configure app
var app = express();
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', process.cwd() + '/template');

if (conf.template === "swig") {
  var mock = JSON.parse(fs.readFileSync(process.cwd() + conf.mock, 'utf8'));
  console.log(mock)
  mock.routes.map(function(obj, i) {
    app.get(obj.endpoint, function(req, res) {
      res.render(obj.template, mock.data[obj.name])
    });
  })

  app.listen(3000, function() {
    console.log('Ninja running on port http://localhost:3000');
  });
}

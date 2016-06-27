/**
 * app.js
 *
 * bootstrap the express server
 */
var request = require('request');
var express = require('express');
var cons = require('consolidate');
var app = express();
var fs = require('fs');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var chalk = require("chalk");

module.exports = function(template, mock, webpackFlag, proxyConf) {

  // configure app
  app.engine('html', cons[template]);
  app.set('view engine', 'html');
  app.set('views', process.cwd() + '/template');
  var mock = JSON.parse(fs.readFileSync(process.cwd() + mock, 'utf8'));

  // map routes
  mock.routes.map(function(obj, i) {
    if (obj.async) {
      app.get(obj.endpoint, function(req, res) {
        res.send(mock.data[obj.name])
      });
    } else {
      app.get(obj.endpoint, function(req, res) {
        res.render(obj.template, mock.data[obj.name])
      });
    }
  })

  if (webpackFlag) {
    var config = require(process.cwd() + '/webpack.dev.config')
    var compiler = webpack(config)
    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    }))
  }

  if (proxyConf) {
    app.use(proxyConf.route, function(req, res) {
      //modify the url in any way you want
      var url = proxyConf.origin + proxyConf.route + req.url;
      var r;
      if (req.method === 'POST') {
        r = request.post({
          uri: url,
          headers:res.headers,
          json: req.body
        });
      } else if (req.method === 'PUT') {
        r = request.put({
          uri: url,
          headers:res.headers,
          json: req.body
        });
      } else {
        r = request({
          url: url,
          headers:res.headers
        });
      }

      r.pipe(res);
    });
  }
  // start server
  app.listen(3000, function() {

    console.log(chalk.blue(" __    _  ___   __    _      ___  _______ "));
    console.log(chalk.blue("|  |  | ||   | |  |  | |    |   ||   _   |"));
    console.log(chalk.blue("|   |_| ||   | |   |_| |    |   ||  |_|  |"));
    console.log(chalk.blue("|       ||   | |       |    |   ||       |"));
    console.log(chalk.blue("|  _    ||   | |  _    | ___|   ||       |"));
    console.log(chalk.blue("| | |   ||   | | | |   ||       ||   _   |"));
    console.log(chalk.blue("|_|  |__||___| |_|  |__||_______||__| |__|"));

    console.log(chalk.yellow('Ninja Power on port http://localhost:3000'));
  });
};

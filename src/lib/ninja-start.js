'use strict'

/**
 * ninja-start.js
 *
 * bootstrap the express server
 */

// deps
var request = require('request');
var express = require('express');
var cons = require('consolidate');
var app = express();
var fs = require('fs');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require("webpack");
var logger = require("../util/logger");
var conf = require('../util/config');
var chalk = require("chalk");
var opn = require('opn');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var webpackReady = false;

// modules
var socket = require('./socket');

module.exports = function() {
  // configure app
  app.engine('html', cons[conf.template]);
  app.set('view engine', 'html');
  app.set('views', process.cwd() + conf.templateDir);

  if (/https?:\/\//.test(conf.mock)) {
    request(conf.mock, function(error, response, data) {
      if (!error && response.statusCode == 200) {
        var mock = data;
      } else {
        logger.error(error);
      }
    })
  } else {
    var mock = JSON.parse(fs.readFileSync(process.cwd() + conf.mock, 'utf8'));
  }


  app.use(require('connect-inject')({
    snippet: "<script src='http://localhost:5000/client.js'></script><script src='http://localhost:5000/livereload.js'></script>"
  }));

  // map routes
  mock.routes.map(function(obj, i) {
    var method = obj.method || "get"
    var getData = mock.data[obj.name]
    if (obj.async) {
      if (conf.proxyConf) {
        var reg = new RegExp(conf.proxyConf.route);
        if (reg.test(obj.endpoint)) {
          return;
        }
      }
      if (method === "get") {
        app[method](obj.endpoint, function(req, res) {
          var returnedData = getData
          if (obj.queryKey) {
            if (obj.queryKey.category && req.query[obj.queryKey.category]) {
              returnedData = getData[req.query[obj.queryKey.category]]
            }
            if (obj.queryKey.count && !Array.isArray(getData) && req.query[obj.queryKey.count]) {
              returnedData = new Array(Number(req.query[obj.queryKey.count])).fill(returnedData)
            }
          }
          res.send(returnedData)
        });
      } else {
        app[method](obj.endpoint, function(req, res) {
          res.send(mock.data[obj.name])
        });
      }
    } else {
      app[method](obj.endpoint, function(req, res, next) {
        if (!webpackReady) {
          res.send("Webpack is not ready yet")
        }else{
          res.render(obj.template, mock.data[obj.name])
        }
      });
    }
  })

  if (conf.webpackFlag) {
    var config = require(process.cwd() + '/webpack.dev.config')
    var compiler = webpack(config)
    var devMiddleware = webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    })
    app.use(devMiddleware)
    devMiddleware.waitUntilValid(function() {
      webpackReady = true
      console.log('Package is in a valid state');
    });
    app.use(webpackHotMiddleware(compiler, {
      log: console.log
    }))
  } else {
    app.use(express.static(process.cwd() + conf.staticDir));
  }

  if (conf.proxyConf) {
    app.use(conf.proxyConf.route, upload.array(), function(req, res, next) {
      //modify the url in any way you want
      var url = conf.proxyConf.origin + conf.proxyConf.route + req.url;
      req.pipe(request(url)).pipe(res);
    });
  }

  socket(conf.templateDir, conf.staticDir, conf.webpackFlag);

  // start server
  app.listen(conf.port, function() {

    console.log(chalk.blue(" __    _  ___   __    _      ___  _______ "));
    console.log(chalk.blue("|  |  | ||   | |  |  | |    |   ||   _   |"));
    console.log(chalk.blue("|   |_| ||   | |   |_| |    |   ||  |_|  |"));
    console.log(chalk.blue("|       ||   | |       |    |   ||       |"));
    console.log(chalk.blue("|  _    ||   | |  _    | ___|   ||       |"));
    console.log(chalk.blue("| | |   ||   | | | |   ||       ||   _   |"));
    console.log(chalk.blue("|_|  |__||___| |_|  |__||_______||__| |__|"));

    logger.log('Ninja Power on port http://localhost:' + conf.port, "yellow");
    opn('http://localhost:' + conf.port, {
      app: [conf.browser]
    });
  });
};

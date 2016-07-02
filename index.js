#!/usr/bin/env node
var bootstrap = require("./src/app");

// load conf
var conf = require(process.cwd() + '/ninja.conf');

// bootstrap
bootstrap(conf.template, conf.mock, conf.webpack, conf.proxy, conf.staticDir, conf.templateDir);



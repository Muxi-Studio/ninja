#!/usr/bin/env node
var bootstrap = require("./src/app");
var program = require('commander');

// load conf
var file = require(process.cwd() + '/ninja.conf');

program
  .option('-t, --template', 'Set template engine')
  .option('-m, --mock', 'Set the source of mock data')
  .option('-w, --webpack', 'Serving static file using webpack or not')
  .option('-p, --proxy', 'Proxy configuration')
  .option('-s, --staticDir', 'Location of static file')
  .option('-td, --templateDir', 'Location of templates')
  .parse(process.argv);

var conf = {};

conf.template = program.template || file.template;
conf.mock = (program.mock || file.mock) || null;
conf.webpack = (program.webpack || file.webpack) || false;
conf.proxy = (program.proxy || file.proxy) || null;
conf.staticDir = (program.staticDir || file.staticDir) || null;
conf.templateDir = program.templateDir || file.templateDir

if (!conf.template) {
	console.log("--template is required!")
	process.exit(1);
}

if ((!conf.webpack) && (!conf.staticDir)) {
	console.log("--staticDir is required!")
	process.exit(1);
}

if (!conf.templateDir) {
	console.log("--templateDir is required!")
	process.exit(1);
}

// bootstrap
bootstrap(conf.template, conf.mock, conf.webpack, conf.proxy, conf.staticDir, conf.templateDir);



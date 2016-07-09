#!/usr/bin/env node
var bootstrap = require("./src/app");
var program = require('commander');

// load conf
try {
	var file = require(process.cwd() + '/ninja.conf');
} catch (e) {
	
}

function stringToBool(val) {
	if (val === 'false') {
		return false
	} else {
		return true
	}
}


program
  .option('-p, --port [port]', 'Set the port of the server, defalut set to 3000')
  .option('-t, --template [item]', 'Set template engine, defalut set to swig')
  .option('-m, --mock [dir]', 'Set the source of mock data')
  .option('-w, --webpack [flag]', 'Serving static file using webpack or not, defalut set to false', stringToBool)
  .option('-o, --proxyOrigin [route]', 'Proxy origin configuration')
  .option('-r, --proxyRoute [url]', 'Proxy route configuration')
  .option('-s, --staticDir [dir]', 'Location of static file')
  .option('-d, --templateDir [dir]', 'Location of templates')
  .option('-b, --browser [item]', 'Set the defalut browser, defalut set to google chrome')
  .parse(process.argv);


var conf = {};
conf.port = (program.prot || file.port) || 3000;
conf.template = (program.template || file.template) || 'swig';
conf.mock = (program.mock || file.mock) || null;
conf.webpack = (program.webpack === undefined ? file.webpack : program.webpack ) || false;
conf.proxy = file.proxy || null;
conf.staticDir = (program.staticDir || file.staticDir) || null;
conf.templateDir = program.templateDir || file.templateDir
conf.browser = (program.broswer || file.browser) || 'google chrome'

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

if (program.proxyOrigin && program.proxyRoute) {
	conf.proxy = {
		route: program.proxyRoute,
		origin: program.proxyOrigin
	}
}

// bootstrap
bootstrap(conf.template, conf.mock, conf.webpack, conf.proxy, conf.staticDir, conf.templateDir, conf.port, conf.browser);



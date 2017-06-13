'use strict'

/**
 * ninja-start.js
 *
 * Scaffolding webpack or gulp based project using Slush
 */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const homeDir = require('os').homedir();
const chalk = require('chalk');
const slush = require.resolve('slush/bin/slush');
const program = require('commander').parse(process.argv);
const shelljs = require('shelljs');
const exec = require('../util/exec');
const logger = require('../util/logger');
const conf = require('../util/config');


module.exports = function() {
	const projectName = program.args[0];
	const options = program.args[1] || 'webpack-vue';

	const name = `ninja-${options}`;
	const template = `slush-${name}`;

	if (!projectName) {
		logger.fatal('Project name is required!');
	}

	shelljs.mkdir(projectName);
	shelljs.cd(projectName);

	if (!isInstalled(path.join(template.split('@')[0], 'package.json'))) {
		npmInstall(template);
	}

	logger.log('generator project...');

	exec(slush, [ name.split('@')[0] ], {
	    stdio: 'inherit',
	    errorMessage: 'slush runtime error'
 	})
}

function isInstalled(name) {
	try {
	    cp.execSync('node -e require.resolve("' + name + '")', {stdio: 'ignore'});
	    return true;

	} catch (err) {

	    return false;
	}
}

function npmInstall(name) {
	logger.log(`downloading '${name}'`);

	const pwd = shelljs.pwd().stdout;
	shelljs.cd(homeDir);
	exec('npm', [ 'install', name, '--save', '--silent', '--save-prefix=>='], {stdio: 'inherit'})
	shelljs.cd(pwd);

	logger.success('Success!\n');
}
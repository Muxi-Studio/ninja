var chalk = require("chalk");

/**
 * prefix
 */
var prefix = "[ninja] ";

module.exports.log = function(msg, color) {
	var color = color || "blue";
	console.log(chalk["blue"](prefix), chalk[color](msg));
}

module.exports.success = function (msg) {
	console.log(chalk["blue"](prefix), chalk["green"]("[success] "), chalk["green"](msg));
}

module.exports.error = function (err) {
	console.log(chalk["blue"](prefix), chalk["red"]("[error] "), chalk["red"](err));
}

module.exports.fatal = function(msg) {
	console.log(chalk["blue"](prefix), chalk["red"]("[fatal]"), chalk["red"](msg));
	process.exit(1);
}
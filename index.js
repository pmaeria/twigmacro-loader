/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Paul Aeria
*/

'use strict';

var loaderUtils = require("loader-utils");
var macroRegex = /\{%[ ]+macro[ ]+(\w+)/;

function generateCode(source, macroName) {
	return source + '\n' +
		'{% from _self import ' + macroName + '%}\n' +
		'{{ ' + macroName + ' (_context) }}\n';
}

module.exports = function(source) {
	this.cacheable && this.cacheable();
	var config = loaderUtils.getLoaderConfig(this);

	// find predefined macro name
	if(config.macro) {
		return generateCode(source, config.macro);
	}

	// get macro name from source
	var result = source.match(macroRegex);
	if(result[1]) {
		console.log(generateCode(source, result[1]))
		return generateCode(source, result[1]);
	}

	throw new Error('Macro name not found');
};

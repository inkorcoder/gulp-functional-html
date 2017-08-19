let regexpDepth = require('./../helpers/regexp.depth');
let config = require('./../config');



module.exports = function(html, step) {
	i = step;
	let result = {
		tag: 'while',
		depth: 0,
		matches: []
	}
	if (html.match(regexpDepth('while', i))){
		result.depth = i;
		result.matches = html.match(regexpDepth('while', i));
		return result;
	}
	return result;
}
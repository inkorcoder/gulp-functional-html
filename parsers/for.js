let regexpDepth = require('./../helpers/regexp.depth.for');
let config = require('./../config');



module.exports = function(html, step) {
	i = step;
	let result = {
		tag: 'for',
		depth: 0,
		matches: []
	}
	if (html.match(regexpDepth('for', i))){
		result.depth = i;
		result.matches = html.match(regexpDepth('for', i));
		return result;
	}
	return result;
}
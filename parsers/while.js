let regexpDepth = require('./../helpers/regexp.depth');

module.exports = function (html) {
	i = 0;
	let result = {
		tag: 'while',
		depth: 0,
		matches: []
	}
	while (i < 10){
		if (html.match(regexpDepth('while', i))){
			result.depth = i;
			result.matches = html.match(regexpDepth('while', i));
			return result;
		}
		i++;
	}
	return result;
}
let regexpDepth = require('./../helpers/regexp.depth');
let config = require('./../config');



module.exports = function(html) {
	i = config.depthStart;
	let result = {
		tag: 'while',
		depth: 0,
		matches: []
	}
	while (i < config.depthEnd){
		if (html.match(regexpDepth('while', i))){
			result.depth = i;
			result.matches = html.match(regexpDepth('while', i));
			return result;
		}
		i++;
	}
	return result;
}
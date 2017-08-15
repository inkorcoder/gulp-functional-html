let regexpDepth = require('./../helpers/regexp.depth');
let config = require('./../config');



module.exports = function(html) {
	i = 1;
	let result = {
		tag: 'for',
		depth: config.depthStart,
		matches: []
	}
	while (i < config.depthEnd){
		if (html.match(regexpDepth('for', i))){
			result.depth = i;
			result.matches = html.match(regexpDepth('for', i));
			return result;
		}
		i++;
	}
	return result;
}
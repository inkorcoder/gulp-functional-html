let regexpDepth = require('./../helpers/regexp.depth.if');
let config = require('./../config');



module.exports = function(html) {
	i = config.depthStart;
	let result = {
		tag: 'if',
		depth: 0,
		matches: []
	}
	while (i < config.depthEnd){
		if (html.match(regexpDepth('if', i))){
			result.depth = i;
			result.matches = html.match(regexpDepth('if', i));
			return result;
		}
		i++;
	}
	return result;
}

module.exports.getExpressionResult = function(str){
	return str.match(/if="(.*?)"/im, '')[0].replace(/(if\="|")/gim, '');
}
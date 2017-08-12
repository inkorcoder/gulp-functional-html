let regexpDepth = require('./../helpers/regexp.depth.if');



module.exports = function(html) {
	i = 0;
	let result = {
		tag: 'if',
		depth: 0,
		matches: []
	}
	while (i < 10){
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
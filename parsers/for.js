let regexpDepth = require('./../helpers/regexp.depth');



module.exports = function(html) {
	i = 0;
	let result = {
		tag: 'for',
		depth: 0,
		matches: []
	}
	while (i < 10){
		if (html.match(regexpDepth('for', i))){
			result.depth = i;
			result.matches = html.match(regexpDepth('for', i));
			return result;
		}
		i++;
	}
	return result;
}
let regexpDepth = require('./../helpers/regexp.depth');
let config = require('./../config');



module.exports = function(html) {
	let result = {
		matches: []
	};
	if (html.match(/\{{2}\$lorem\(.+?\)\}{2}/gim)){
		result.matches = html.match(/\{{2}\$lorem\(.+?\)\}{2}/gim);
	}
	return result;
}
require('./../extenders/string');
var $lorem = require('./../data');




module.exports = function(html, options) {
	for (let i = options.matches.length-1; i >= 0; i--){
		let regExp = new RegExp(
			options.matches[i].escapeSpecialChars().replace(/(\{|\})/gim, '\\$1'),
			'gim'
		);
		html = html.replace(regExp, function(a, b){
			return eval(a.replace(/(\{|\})/gim, ''));
		})
	}
	return html;
}
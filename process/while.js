require('./../extenders/string');



module.exports = function(html, options) {

	// parsing options from [while] expression
	function getOptions(index) {
		var exp = options.matches[index].match(/while="[^"]*"/gim)[0].replace(/(while|"|=")/gim, '')
		return {
			depth: 		options.depth,
			variable: exp.match(/^(.*?)=/gim)[0].dropGarbage(),
			start: 		exp.match(/=(.*?)(&|;)/gim)[0].dropGarbage().toInt(),
			state: 		exp.match(/(&|;)(.*?)(>=|<=|<|>)/gim)[0].replace(/(&|;|\s)/gim, ''),
			end: 			exp.match(/(>=|<=|<|>)(.*?)$/gim)[0].replace(/(>=|<=|<|>|&|\s)/gim, '').toInt(),
			hash: 		options.matches[i].match(/\{(.+?)hash(.+?)\}/gim) ? true : false
		};
	}

	// for each matched part of code
	var i = options.matches.length;
	while (i > 0){
		i--;
		// find out options
		var o = getOptions(i);
		var parsedHtml = "";

		// generate loop
		for (eval('var loopCount = o.start'); eval('loopCount'+o.state+''+o.end); eval('loopCount'+(o.start > o.end ? '--' : '++')+'')) {
			parsedHtml += (loopCount === o.start ? '' : '\n')+options.matches[i]
				.replace(/((\s| )while\="[^"]*"|while\="[^"]*")/gim, '')
				.evaluate(o, loopCount);
		}
		html = html.replace(new RegExp(options.matches[i].escapeSpecialChars(), 'gim'), parsedHtml.dropEmptyLines());
	}

	return html;
}
require('./../extenders/string');



module.exports = function(html, options) {

	if (options.matches.length === 0) {
		return html;
	}
	// parsing options from [for] expression
	function getOptions(index) {
		var exp = options.matches[index].match(/for="[^"]*"/gim)[0].replace(/(for|"|=")/gim, '')
		return {
			variable: exp.match(/^(.*?)(of|in)/gim)[0].dropGarbage(),
			start: 		0,
			state: 		'<',
			end: 			eval(exp.match(/(of|in)(.+?)$/gim)[0].replace(/^((of|in) )/, '')).length,
			data: 		eval(exp.match(/(of|in)(.+?)$/gim)[0].replace(/^((of|in) )/, '')),
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
				.replace(/((\s| )for="[^"]*"|for="[^"]*")/gim, '')
				.evaluate(o, loopCount);
		}
		html = html.replace(new RegExp(options.matches[i].escapeSpecialChars(), 'gim'), parsedHtml.dropEmptyLines());
	}

	return html;
}
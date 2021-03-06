require('./../extenders/string');
var reduceComoponent = require('./../process/component.reduce');



module.exports = function(html, options, components, step) {

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
			end: 			eval(exp.replace(/(\t|\n)/gim, '').match(/^(.+?|\\n)$/gim)[0].replace(/^let(.+?)((of|in) )/, '')).length,
			data: 		eval(exp.replace(/(\t|\n)/gim, '').match(/^(.+?|\\n)$/gim)[0].replace(/^let(.+?)((of|in) )/, '')),
			// hash: 		options.matches[i].match(/\{(.+?)hash(.+?)\}/gim) ? true : false
			hash: 		true
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
			// component reducing
			parsedHtml = reduceComoponent(parsedHtml, components, step, o, loopCount);
		}
		html = html.replace(new RegExp(options.matches[i].escapeSpecialChars(), 'gim'), parsedHtml.dropEmptyLines());
	}

	return html;
}
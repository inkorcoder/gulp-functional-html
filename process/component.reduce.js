require('./../extenders/string');
let Input = require('./../parsers/component.input');



module.exports = function(html, components, step, parentOptions, loopCount) {

	// for each component
	for (key in components){
		// get tag name
		let tag = components[key].tagName;
		// and create regular expression
		matches = html.match(new RegExp("^(\\t*?)<"+tag+"[^>]*>([\\s\\S]*?)</"+tag+">", 'gim'));
		// if we found some component declarations
		if (matches){
			for (var i = matches.length - 1; i >= 0; i--) {

				componentObject = Object.assign({}, parentOptions);
				componentObject.component = components[key];

				input = Input(matches[i]);

				if (components[key]) {
					let tabsOffset = matches[i].escapeSpecialChars().countRepeatedChar('\t')
					html = html.replace(
						new RegExp(matches[i].escapeSpecialChars(), 'gim'),
						components[key].template.fixIndents(tabsOffset-1).evaluate(componentObject, loopCount, input).dropEmptyLines()
					)
				}
			};
		}
	}

	return html;
}
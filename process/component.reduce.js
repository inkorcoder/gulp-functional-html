require('./../extenders/string');



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
				html = html.replace(
					new RegExp(matches[i], 'gim'),
					components[key].template.fixIndents(step+1).evaluate(componentObject, loopCount)
				)
			};
		}
	}

	return html;
}
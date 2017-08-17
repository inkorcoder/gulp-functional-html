var config = require('./../config');
require('./../extenders/string');



module.exports = function(html) {
	var foundedComponents = null;
	var declarations = html.match(/<component[^>]*>\n/gim);

	if (declarations){
		foundedComponents = {};

		// loop through all founded components
		for (var i = declarations.length - 1; i >= 0; i--) {
			var name = declarations[i].getHTMLTag('name');
			var path = declarations[i].getHTMLTag('path');

			foundedComponents[name] = {
				tagName: name,
				path: path,
				template: ''
			};
		};
	}
	return foundedComponents;
}
require('./../extenders/string');



module.exports = function(html, components) {

	for (key in components){
		let tag = components[key].tagName;
		regExpString = "<"+tag+"[^>]*>([\\s\\S]*?)</"+tag+">";
		if (html.match(new RegExp(regExpString, 'gim'))){
			html = html.replace(new RegExp(regExpString, 'gim'), components[key].template)
		}
	}

	return html;
}
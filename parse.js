let config = require('./config');
let fs = require('fs');

let parsers = {
	While: require('./parsers/while'),
	For: require('./parsers/for'),
	Lorem: require('./parsers/lorem'),
	ComponentIncludes: require('./parsers/component.includes')
};
let process = {
	While: require('./process/while'),
	For: require('./process/for'),
	Lorem: require('./process/lorem')
};

module.exports = function parse(html, params){

	// get all included components
	var foundedComponents = parsers.ComponentIncludes(html);

	// each component is the object with name, path and template
	// key is equals to name
	for (key in foundedComponents){
		// if file exists
		if (fs.existsSync(params.dir+'/'+foundedComponents[key].path+'.html')){
			// write file content to template
			data = fs.readFileSync(params.dir+'/'+foundedComponents[key].path+'.html', 'utf8');
			foundedComponents[key].template = data;
		} else {
			// or write an error
			foundedComponents[key].template = 'Error. File not found in "'+foundedComponents[key].path+'"';
		}
	}

	// clear components decalrations
	html = html.replace(/^(.?)<component[^>]*>\n/gim, '');

	var step = config.depthStart;
	function parseHTML(processHTML){

		parsed = {
			While: parsers.While(processHTML),
			For: parsers.For(processHTML)
		};

		processHTML = process.While(processHTML, parsed.While);
		processHTML = process.For(processHTML, parsed.For);

		if (step < config.depthEnd){
			step++;
			processHTML = parseHTML(processHTML);
		}
		return processHTML;
	}
	html = parseHTML(html);

	// parse non-processed earlier $lorem()
	html = process.Lorem(html, parsers.Lorem(html));

	return html;

}
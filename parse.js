config = require('./config');

let parsers = {
	While: require('./parsers/while'),
	For: require('./parsers/for'),
	Lorem: require('./parsers/lorem')
};
let process = {
	While: require('./process/while'),
	For: require('./process/for'),
	Lorem: require('./process/lorem')
};

module.exports = function parse(html){

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
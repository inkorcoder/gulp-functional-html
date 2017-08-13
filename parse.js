let parsers = {
	_while: require('./parsers/while'),
	_for: require('./parsers/for')
};
let process = {
	_while: require('./process/while'),
	_for: require('./process/for')
};

module.exports = function parse(html){

	html = process._while(html, parsers._while(html));

	html = process._for(html, parsers._for(html));

	return html;

}
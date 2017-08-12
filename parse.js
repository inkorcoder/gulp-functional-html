let parsers = {
	_while: require('./parsers/while')
};
let process = {
	_while: require('./process/while')
};

module.exports = function parse(html){

	html = process._while(html, parsers._while(html));

	return html;

}
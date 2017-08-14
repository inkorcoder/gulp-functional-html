let parsers = {
	_while: require('./parsers/while'),
	_for: require('./parsers/for')
};
let process = {
	_while: require('./process/while'),
	_for: require('./process/for')
};

module.exports = function parse(html){

	var step = 0;
	function parseHTML(_html){
		parsed = {
			_while: parsers._while(_html),
			_for: parsers._for(_html)
		};

		_html = process._while(_html, parsed._while);
		_html = process._for(_html, parsed._for);

		if (step < 10){
			step++;
			_html = parseHTML(_html);
		}
		return _html;
	}
	html = parseHTML(html);


	return html;

}
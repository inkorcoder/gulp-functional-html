var $lorem = require('./../data');

String.prototype.dropGarbage = function(){
	return this.replace(/(\s| |=|"|&)/gim, '');
}
String.prototype.toInt = function(){
	return parseInt(this.replace(/\D/gim, ''));
}
String.prototype.evaluate = function(options, loopCount){
	var ev = new RegExp('\{\{([\\s\\S]*?)\}\}', 'gim');
	var start = options.start,
			end = options.end,
			index = loopCount;
	return this.replace(ev, function(a, b) {
		// console.log(eval(a.replace(/(\{|\})/gim, '')))
		return eval(a.replace(/(\{|\})/gim, ''));
	})
}
String.prototype.escapeSpecialChars = function(){
	return this
		.replace(/\*/gim, '\\*')
		.replace(/\=/gim, '\\=')
		.replace(/\$/gim, '\\$')
		.replace(/\+/gim, '\\+')
		.replace(/\(/gim, '\\(')
		.replace(/\)/gim, '\\)')
		.replace(/\[/gim, '\\[')
		.replace(/\]/gim, '\\]')
		.replace(/\?/gim, '\\?')
		.replace(/\:/gim, '\\:');
}
String.prototype.dropEmptyLines = function(){
	return this.replace(/^(\t|\s)*[\r\n]/gm, '');
}

module.exports = function(html, options) {

	function getOptions(index) {
		var exp = options.matches[index].match(/while="[^"]*"/gim)[0].replace(/(while|"|=")/gim, '')
		return {
			variable: exp.match(/^(.*?)=/gim)[0].dropGarbage(),
			start: 		exp.match(/=(.*?)(&|;)/gim)[0].dropGarbage().toInt(),
			state: 		exp.match(/(&|;)(.*?)(>=|<=|<|>)/gim)[0].replace(/(&|;|\s)/gim, ''),
			end: 			exp.match(/(>=|<=|<|>)(.*?)$/gim)[0].replace(/(>=|<=|<|>|&|\s)/gim, '').toInt()
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
				.replace(/((\s| )while="[^"]*"|while="[^"]*")/gim, '')
				.evaluate(o, loopCount);
		}
		html = html.replace(new RegExp(options.matches[i].escapeSpecialChars(), 'gim'), parsedHtml.dropEmptyLines());
	}

	return html;
}
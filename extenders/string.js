var $lorem = require('./../data');
var _if = require('./../parsers/if');
var getExpressionResult = require('./../parsers/if').getExpressionResult;




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

	var $this = this;

	// evaluate [if] statements
	_if($this).matches.map((str)=> {
		if (!eval(getExpressionResult(str))) {
			$this = $this.replace(new RegExp(str.escapeSpecialChars(), 'gim'), '');
		}
	});

	// remove if attribute
	$this = $this.replace(/((\s| )?if\="(.*?)")/gim, '');

	return $this.replace(ev, function(a, b) {
		return eval(a.replace(/(\{|\})/gim, ''));
	})
}
String.prototype.escapeSpecialChars = function(){
	// return this
	// 	.replace(/\*/gim, '\\*')
	// 	.replace(/\=/gim, '\\=')
	// 	.replace(/\$/gim, '\\$')
	// 	.replace(/\+/gim, '\\+')
	// 	.replace(/\(/gim, '\\(')
	// 	.replace(/\)/gim, '\\)')
	// 	.replace(/\[/gim, '\\[')
	// 	.replace(/\]/gim, '\\]')
	// 	.replace(/\?/gim, '\\?')
	// 	.replace(/\:/gim, '\\:');
	return this.replace(/(\*|\=|\$|\+|\(|\)|\[|\]|\?|\:|\!|\@|\#|\^|\&)/gim, '\\$1');
}
String.prototype.dropEmptyLines = function(){
	return this.replace(/^(\t|\s)*[\r\n]/gm, '');
}
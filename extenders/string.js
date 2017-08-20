var $lorem = require('./../data');
var _if = require('./../parsers/if');
var getExpressionResult = require('./../parsers/if').getExpressionResult;
let generateHash = require('./../helpers/hash');




String.prototype.dropGarbage = function(){
	return this.replace(/( of| in|\s| |=|"|&|let)/gim, '');
}
String.prototype.toInt = function(){
	return parseInt(this.replace(/\D/gim, ''));
}
String.prototype.evaluate = function(options, loopCount, input){

	var ev = new RegExp('\{\{([\\s\\S]*?)\}\}', 'gim');
	// variables
	var start = options.start,
			end = options.end,
			hash = options.hash ? generateHash(5) : '';
	// special variable for [for of, for in] loops
	eval("var "+options.variable+" = options.data ? options.data[loopCount] : loopCount");

	var $this = this;


	for (key in input){
		eval("var "+key+" = "+input[key]);
	}

	// evaluate [if] statements
	_if($this).matches.map((str)=> {
		if (!eval(getExpressionResult(str))) {
			$this = $this.replace(new RegExp(str.escapeSpecialChars(), 'gim'), '');
		}
	});
	// remove if attribute
	$this = $this.replace(/((\s| )?if\="(.*?)")/gim, '');
	return $this.replace(ev, function(a, b) {
		if (eval("typeof "+b.split('.')[0]) === 'undefined'){
			console.log('['+options.depth+'] Evaluation :: '+b+' is not defined in <' +options.component.tagName+ '>')
			return b;
		}
		return eval(options.variable) !== '' ? eval(a.replace(/(\{|\})/gim, '')) : '';
	})
}
String.prototype.escapeSpecialChars = function(){
	return this.replace(/(\*|\=|\$|\+|\(|\)|\[|\]|\?|\:|\!|\@|\#|\^|\&)/gim, '\\$1');
}
String.prototype.dropEmptyLines = function(){
	return this.replace(/^(\t|\s)*[\r\n]/gm, '');
}

String.prototype.multiply = function(count){
	let result = '';
	for (let i = 0; i < count; i++){
		result += this;
	}
	return result;
};

String.prototype.getHTMLTag = function(tagName){
	return this.match(new RegExp(tagName+'\="(.+?)"'))[0].replace(new RegExp(tagName), '').dropGarbage();
}

String.prototype.fixIndents = function(indentsCount) {
	return this.replace(/^/gim, "\n"+("\t".multiply(indentsCount)));
}
require('./../extenders/string');



module.exports = function(component){

	let Input = null;

	let input = component.match(/\[(attr|class|style|id)[^\]]*\]\="[^"]*"/gim);

	if (input){
		Input = {};
		for (var i = input.length - 1; i >= 0; i--) {
			let key = input[i].match(/\[[^\]]*\]/gim)[0].replace(/(\[|\])/gim, '');
			let value = input[i].match(/\="[^"]*"/gim)[0].dropGarbage();
			Input[key || 'global'] = value;
		};
	}

	return Input;
}
module.exports = function (tag, deth){
	tab = function(){
		str = '';
		var i = 0;
		while (i < deth){
			str += '\\t';
			i++;
		}
		return str;
	}
	return new RegExp('<(.*?)if([\\s\\S]*?)>([\\s\\S]*?)<\/(.*?)>', 'gim');
}
module.exports = function (tag, depth){
	tab = function(){
		str = '';
		var i = 0;
		while (i < depth){
			str += '\\t';
			i++;
		}
		return str;
	}
	return new RegExp('<(.*?)if([\\s\\S]*?)>([\\s\\S]*?)<\/(.*?)>', 'gim');
}
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
	return new RegExp('^((\t|\s)+?)(<[^>]*'+tag+'[^>]*>(.*?)(<\/[^>]*>|\/>)|<[^>]*'+tag+'[^>]*\/>)\n|(?:^('+tab(depth)+')<[^>]*'+tag+'\="[^>]*>([\\s\\S]*?)^('+tab(depth)+')<\/[^>]*>)', 'gim');
}
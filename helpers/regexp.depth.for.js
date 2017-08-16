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
	return new RegExp('^((\t|\s)+?)(<[^>]*'+tag+'\="let[^>]*>(.*?)(<\/[^>]*>|\/>)|<[^>]*'+tag+'\="let[^>]*\/>)\n|(?:^('+tab(depth)+')<[^>]*'+tag+'\="let[^>]*>([\\s\\S]*?)^('+tab(depth)+')<\/[^>]*>)', 'gim');
}
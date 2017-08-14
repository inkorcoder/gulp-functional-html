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
	return new RegExp('(<[^>]*'+tag+'[^>]*>(.*?)(<\/[^>]*>|\/>)|<[^>]*'+tag+'[^>]*\/>)\n|(?:^('+tab(deth)+')<[^>]*'+tag+'\="[^>]*>([\\s\\S]*?)^('+tab(deth)+')<\/[^>]*>)', 'gim');
}
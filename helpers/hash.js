let hash = function(length) {

	let string = "abcdefghijklmnopqrstuvwzyz0123456789".split("");

	function random(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	let i = 1;
	while (i < string.length) {
		var r = random(i, string.length-i);
		temp = string[i];
		string[i] = string[r];
		string[r] = random(1,3) === 2 ? temp : temp.toUpperCase();
		i++;
	}

	return string.join("").substr(0, length);
};

module.exports = hash;
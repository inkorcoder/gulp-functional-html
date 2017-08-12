let lorem = require('./lorem');

module.exports = function(length, type) {
	type = type || 'lorem';
	let loremArray = lorem[type].split(' ');
	return loremArray.slice(0,length).join(' ');
}
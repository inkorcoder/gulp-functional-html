var fs = require('fs'),
		path = require('path'),
		es = require('event-stream'),
		gutil = require('gulp-util');

var parse = require('./parse');

module.exports = function (params) {

	params = params || {};

	function processFile(file, callback) {

		if (file.isNull()) {
			return callback(null, file);
		}

		if (file.isStream()) {
			throw new gutil.PluginError('gulp-modular', 'stream not supported');
		}

		if (file.isBuffer()) {
			var result = process(String(file.contents), file.path, file.sourceMap);
			file.contents = new Buffer(result.content);
		}

		callback(null, file);
	}

	function process(content, filePath, sourceMap) {

		return {content: parse(content, params), map: null};
	}


	return es.map(processFile)
};

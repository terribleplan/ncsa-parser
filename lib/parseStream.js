var util = require('util'),
    parse = require('./parseSimple.js');

var ParseStream = function(options) {
    this._transform = parse(options);
};
util.inherits(ParseStream, require('stream').Transform);
module.exports = ParseStream;
var util = require('util'),
    parse = require('./parse.js');

var ParseStream = function(options) {
    this._transform = parse(options);
};
util.inherits(ParseStream, require('stream').Transform);
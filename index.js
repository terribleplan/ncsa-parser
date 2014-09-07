var exp = require('./lib/parseSimple.js'),
    str = require('./lib/parseStream.js');
exp.Stream = str;
module.exports = exp;

var parse = require('./parse.js'),
    parseA = require('./parseToArray.js'),
    parseO = require('./parseToObject.js');

module.exports = parse(parseA, parseO);
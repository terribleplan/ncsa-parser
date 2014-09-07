var parseToArray = require('./parseToArray.js');

module.exports = function(options) {
    var parser = parseToArray(options);
    return function(line) {
        var preParsed = parser(line),
            result = {};
        for (var i = 0; i < options.toObject.length && i < preParsed.length; i++) {
            result[options.toObject[i]] = preParsed[i];
        }
        return result;
    }
};

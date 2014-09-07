module.exports = function(options) {
    var escapes = options.escape || [],
        delimeter = options.split || " ";

    if (escapes.length === 0) {
        return function(line) {
            return line.split(delimeter);
        }
    }
    return function(line) {
        var result = [];
        var split = line.split(delimeter);
        for (var i = 0; i < split.length; i++) {
            var startChar = split[i].slice(0,1),
                foundEscape = false;
            for (var j = 0; j < escapes.length; j++) {
                if (startChar === escapes[j][0]) {
                    foundEscape = true;
                    for (var k = i; k < split.length; k++) {
                        var endChar = split[k].slice(-1);
                        if (endChar === escapes[j][1]) {
                            result.push(split.slice(i, k + 1).join(" ").slice(1, -1));
                            i = k;
                        }
                    }
                }
            }
            if (!foundEscape) {
                result.push(split[i]);
            }
        }
        return result;
    }
};

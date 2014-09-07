var escape = [
    ['"', '"'],
    ["[", "]"]
];

function createCreateParser(createParseToArray, createParseToObject) {
    if (typeof createParseToArray !== "function" || typeof createParseToObject !== "function") {
        throw new Error("You must pass two functions to createCreateParser");
    }
    return function(options) {
        var parsedOptions = {},
            useArray = true;

        if (typeof options === "object") {
            if (typeof options.toObject === "object" && options.toObject instanceof Array) {
                parsedOptions.toObject = options.toObject;
                useArray = false;
            }
            parsedOptions.escape = options.escape || escape;
        }

        if (useArray) {
            return createParseToArray(parsedOptions);
        }
        return createParseToObject(parsedOptions);
    }
}

module.exports = createCreateParser;

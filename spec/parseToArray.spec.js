var parseToArray = require('../lib/parseToArray.js');

var noEscape = "127.0.0.1 user-identifier frank 200 2326",
    neResult = ["127.0.0.1", "user-identifier", "frank", "200", "2326"],
    noQuote = "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] 200 2326",
    nqResult = ["127.0.0.1", "user-identifier", "frank", "10/Oct/2000:13:55:36 -0700", "200", "2326"],
    noBracket = "127.0.0.1 user-identifier frank \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
    nbResult = ["127.0.0.1", "user-identifier", "frank", "GET /apache_pb.gif HTTP/1.0", "200", "2326"],
    parseLine = "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
    plResult = ["127.0.0.1", "user-identifier", "frank", "10/Oct/2000:13:55:36 -0700", "GET /apache_pb.gif HTTP/1.0", "200", "2326"];

describe("The array parser", function () {
    var options = {
        escape: [['"', '"'],['[', ']']]
    }, parser;
    beforeEach(function () {
        parser = parseToArray(options);
    });

    it("returns a function", function () {
        expect(typeof parser).toEqual("function");
    });

    it("parses a line with no escape sequences", function () {
        var result = parser(noEscape);
        expect(result).toEqual(neResult);
    });

    it("parses a line with quote escape sequences", function () {
        var result = parser(noBracket);
        expect(result).toEqual(nbResult);
    });

    it("parses a line with bracket escape sequences", function () {
        var result = parser(noQuote);
        expect(result).toEqual(nqResult);
    });

    it("parses a line with bracket escape sequences", function () {
        var result = parser(parseLine);
        expect(result).toEqual(plResult);
    });
});
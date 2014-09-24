var parseToArray = require('../lib/parseToArray.js');

var noEscape = "127.0.0.1 user-identifier frank 200 2326",
    neResult = ["127.0.0.1", "user-identifier", "frank", "200", "2326"],
    noQuote = "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] 200 2326",
    nqResult = ["127.0.0.1", "user-identifier", "frank", "10/Oct/2000:13:55:36 -0700", "200", "2326"],
    noBracket = "127.0.0.1 user-identifier frank \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
    nbResult = ["127.0.0.1", "user-identifier", "frank", "GET /apache_pb.gif HTTP/1.0", "200", "2326"],
    parseLine = "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
    plResult = ["127.0.0.1", "user-identifier", "frank", "10/Oct/2000:13:55:36 -0700", "GET /apache_pb.gif HTTP/1.0", "200", "2326"];

var issueOneRegression = "123456_123456 my.server.com 123.123.123.123 - - [31/Jul/2014:23:00:00 +0000] \"GET /?foo=0123456789abcdef01234567&bar=https%3A%2F%2Fgoogle.com&baz=https%3A%2F%2Fapi.reddit.com&bix=https%3A%2F%2Fgithub.com HTTP/1.1\" 200 2341 \"-\" \"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36\" 127.0.0.1:8080",
    issueOneRegressionExpected = ["123456_123456", "my.server.com", "123.123.123.123", "-", "-", "31/Jul/2014:23:00:00 +0000", "GET /?foo=0123456789abcdef01234567&bar=https%3A%2F%2Fgoogle.com&baz=https%3A%2F%2Fapi.reddit.com&bix=https%3A%2F%2Fgithub.com HTTP/1.1", "200", "2341", "-", "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36", "127.0.0.1:8080"];

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

    it("Does not fail due to issue #1", function() {
        var result = parser(issueOneRegression);
        expect(result).toEqual(issueOneRegressionExpected);
    });
});
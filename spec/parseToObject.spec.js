var parseToObject = require('../lib/parseToObject.js');

var noEscape = "127.0.0.1 user-identifier frank 200 2326",
    neFields = ["client", "identity", "userid", "status", "size"],
    neResult = {
        client:"127.0.0.1",
        identity:"user-identifier",
        userid:"frank",
        status:"200",
        size:"2326"
    },
    noQuote = "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] 200 2326",
    nqFields = ["client", "identity", "userid", "time", "status", "size"],
    nqResult = {
        client:"127.0.0.1",
        identity:"user-identifier",
        userid:"frank",
        time: "10/Oct/2000:13:55:36 -0700",
        status:"200",
        size:"2326"
    },
    noBracket = "127.0.0.1 user-identifier frank \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
    nbFields = ["client", "identity", "userid", "request", "status", "size"],
    nbResult = {
        client:"127.0.0.1",
        identity:"user-identifier",
        userid:"frank",
        request: "GET /apache_pb.gif HTTP/1.0",
        status:"200",
        size:"2326"
    },
    parseLine = "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
    plFields = ["client", "identity", "userid", "time", "request", "status", "size"],
    plResult = {
        client:"127.0.0.1",
        identity:"user-identifier",
        userid:"frank",
        time: "10/Oct/2000:13:55:36 -0700",
        request: "GET /apache_pb.gif HTTP/1.0",
        status:"200",
        size:"2326"
    };

describe("The array parser", function () {
    it("returns a function", function () {
        expect(typeof parseToObject({
            escape: [['"', '"'],['[', ']']]
        })).toEqual("function");
    });

    it("parses a line with no escape sequences", function () {
        var options = {
            escape: [['"', '"'],['[', ']']],
            toObject: neFields
        };
        var parser = parseToObject(options);
        var result = parser(noEscape);
        expect(result).toEqual(neResult);
    });

    it("parses a line with quote escape sequences", function () {
        var options = {
            escape: [['"', '"'],['[', ']']],
            toObject: nbFields
        };
        var parser = parseToObject(options);
        var result = parser(noBracket);
        expect(result).toEqual(nbResult);
    });

    it("parses a line with bracket escape sequences", function () {
        var options = {
            escape: [['"', '"'],['[', ']']],
            toObject: nqFields
        };
        var parser = parseToObject(options);
        var result = parser(noQuote);
        expect(result).toEqual(nqResult);
    });

    it("parses a line with bracket escape sequences", function () {
        var options = {
            escape: [['"', '"'],['[', ']']],
            toObject: plFields
        };
        var parser = parseToObject(options);
        var result = parser(parseLine);
        expect(result).toEqual(plResult);
    });
});
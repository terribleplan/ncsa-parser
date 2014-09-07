var parse = require('../lib/parse.js');

describe("The master parser meta-creator", function () {
    it("is a function", function () {
        expect(typeof parse).toBe("function");
    });
    it("requires two functions as arguments", function () {
        var p2a = createSpy('parseToObject'),
            p2o = createSpy('parseToObject');
        expect(function () {
            parse();
        }).toThrow();
        expect(function () {
            parse(p2a);
        }).toThrow();
        expect(function () {
            parse("", "");
        }).toThrow();
        expect(function () {
            parse(p2a, p2o);
        }).not.toThrow();
    });
    it("returns a function", function () {
        var p2a = createSpy('parseToObject'),
            p2o = createSpy('parseToObject');
        expect(typeof parse(p2a, p2o)).toBe("function");
    });
    it("returned function calls different things based upon options.toObject - object", function () {
        var p2a = createSpy('parseToObject'),
            p2o = createSpy('parseToObject'),
            options = {
                toObject: ["foo", "bar"]
            };
        parse(p2a, p2o)(options);
        expect(p2o).toHaveBeenCalled();
        expect(p2a).not.toHaveBeenCalled();
    });
    it("returned function calls different things based upon options.toObject - array", function () {
        var p2a = createSpy('parseToObject'),
            p2o = createSpy('parseToObject'),
            options = {};
        parse(p2a, p2o)(options);
        expect(p2a).toHaveBeenCalled();
        expect(p2o).not.toHaveBeenCalled();
    });
    it("runs top to bottom", function () {
        var tested = parse(require('../lib/parseToArray'), require('../lib/parseToObject.js')),
            escape = [
                ['"', '"'],
                ['[', ']']
            ],
            parseLine = "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
            plaResult = ["127.0.0.1", "user-identifier", "frank", "10/Oct/2000:13:55:36 -0700", "GET /apache_pb.gif HTTP/1.0", "200", "2326"],
            ploResult = {
                client: "127.0.0.1",
                identity: "user-identifier",
                userid: "frank",
                time: "10/Oct/2000:13:55:36 -0700",
                request: "GET /apache_pb.gif HTTP/1.0",
                status: "200",
                size: "2326"
            };
        var testArray = tested({escape: escape}),
            testObject = tested({
                escape: escape,
                toObject: ["client", "identity", "userid", "time", "request", "status", "size"]
            });

        expect(testArray(parseLine)).toEqual(plaResult);
        expect(testObject(parseLine)).toEqual(ploResult);
    })
});
var ncsa = require('../index.js'),
    stream = require('stream');

describe("The public interface for the package", function() {
    it("exports a function", function() {
        expect(typeof ncsa).toBe("function");
    });
    it("exports a function that returns a function", function() {
        expect(typeof ncsa()).toBe("function");
    });
    it("exports a secondary function for streams", function() {
        expect(typeof ncsa.Stream).toBe("function");
    });
    it("exports a secondary function for streams that returns a function", function() {
        var tested = new ncsa.Stream();
        expect(typeof tested).toBe("object");
        expect(tested instanceof stream.Transform).toBeTruthy();
    });
});
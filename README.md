NCSA Parser
================
[![License][license-image]][license-url]
[![NPM Version][npm-version-image]][npm-url]
[![Tag Version][tag-version-image]][github-url]
[![Build Status][build-image]][build-url]

NCSA Parser is a package designed to make parsing lines from and NCSA-style log
file simple
Usage
-----
```javascript
var parse = require('ncsa-parser')();
var parseLine = '127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326';

parse(parseLine); //["127.0.0.1", "user-identifier", "frank", "10/Oct/2000:13:55:36 -0700", "GET /apache_pb.gif HTTP/1.0", "200", "2326"]
```

[license-url]: https://github.com/terribleplan/ncsa-parser/blob/master/LICENSE
[npm-url]: https://npmjs.org/package/ncsa-parser
[build-url]: https://travis-ci.org/terribleplan/ncsa-parser
[github-url]: https://github.com/terribleplan/ncsa-parser
[license-image]: http://img.shields.io/npm/l/ncsa-parser.svg
[build-image]: http://img.shields.io/travis/terribleplan/ncsa-parser.svg
[npm-version-image]: http://img.shields.io/npm/v/ncsa-parser.svg
[tag-version-image]: http://img.shields.io/github/tag/terribleplan/ncsa-parser.svg

NCSA Parser
================
[![Build Status](https://secure.travis-ci.org/terribleplan/ncsa-parser.png?branch=master)](https://travis-ci.org/terribleplan/ncsa-parser)

NCSA Parser is a package designed to make parsing lines from and NCSA-style log
file simple
Usage
-----
```javascript
var parse = require('ncsa-parser')();
var parseLine = '127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326';

parse(parseLine); //["127.0.0.1", "user-identifier", "frank", "10/Oct/2000:13:55:36 -0700", "GET /apache_pb.gif HTTP/1.0", "200", "2326"]
```
Notes
-----
This package does not and will not provide the following functionality:
* Synchronous filesystem access
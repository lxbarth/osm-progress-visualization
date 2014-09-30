var fs = require('fs');
var zlib = require('zlib');
var sax = require('sax');

var saxStream = sax.createStream();
// add your xml handlers here

var data= fs.createReadStream('384.osc.gz').pipe(zlib.createUnzip()).pipe(saxStream);
console.log(data);
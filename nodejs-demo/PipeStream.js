/**
 *
 * Created by yujin on 2018/7/26
 *
 */

var fs = require('fs');
var readableStream = fs.createReadStream('file.txt');
var writeableStream = fs.createWriteStream('file2.txt');

readableStream.pipe(writeableStream);

////////////////解压//////////////
var zlib = require('zlib');

fs.createReadStream('file2.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('file2.txt.gz'));

process.stdin.pipe(process.stdout).pipe(fs.createWriteStream('file3.txt'));
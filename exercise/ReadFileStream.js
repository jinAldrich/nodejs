/**
 *
 * Created by yujin on 2018/7/26
 *
 */

var fs = require('fs');

var readableStream = fs.createReadStream('file.txt', {});

var data = '';
var chunk;

readableStream.setEncoding('utf8');

readableStream.on('readable', ()=>{
   while ((chunk = readableStream.read()) !== null) {
       data += chunk;
   }
});

readableStream.on('end', ()=>{
   console.log("\nend....  Data " + data);
});


///////////////////////

var Readable = require('stream').Readable;

var rs = Readable();

var c = 97;

rs._read = function () {
    rs.push(String.fromCharCode(c++));
    if (c > 'z'.charCodeAt(0)) {
        rs.push(null);
    }
}

rs.pipe(process.stdout);
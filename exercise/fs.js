var fs = require('fs');

/**
 *
 * 1.fs.stat        检测是文件还是目录
 * 2.fs.mkdir       创建目录
 * 3.fs.writeFile   创建写入文件
 * 4.fs.appendFile  追回文件
 * 5.fs.readFile    读取文件
 * 6.fs.readDir     读取目录
 * 7.fs.rename      重命名
 * 8.fs.rmdir       删除目录
 * 9.fs.unlink      删除文件
 *
 */

//1.fs.stat 重点：异步操作，类似setTimeOut函数
fs.stat("node_modules", (err, stats)=>{
    if (err) {
        console.log(err);
        return false;
    }
    console.log("文件：" + stats.isFile());
    console.log("目录：" + stats.isDirectory());
});

//2.fs.mkdir 已经存在会抛错
fs.mkdir("html", (err)=>{
    if (err) {
        console.log(err)
    }
    console.log("创建目录成功")
});

//3.fs.writeFile 已经存在会覆盖
fs.writeFile("html/index.html", "<body>你好</body>", "utf-8", (err)=>{
    if (err) {
        console.log(err);
    }
    console.log("写入成功")
});

//4.fs.appendFile 已经存在会追回
fs.appendFileSync("html/index.css", "这是写入文件的内容。。。。\n", "utf-8", (err)=>{
    if (err) {
        console.log(err);
    }
    console.log("写入成功")
});


//5.fs.readFile
fs.readFile("html/index.css", (err, data)=>{
    if (err) {
        console.log(err);
    }
    console.log("读取到的文件内容：" + data);
});


//6.fs.readDir
fs.readdir("html", (err, data)=>{
    if (err) {
        console.log();
        return false;
    }
    console.log("readdir data:" + data);
})


// var buffer = new Buffer(1024);
// var readSize = fs.readSync(fs.openSync('/dev/stdin', 'r'), buffer, 0, buffer.length);
//
// var chunk = buffer.toString('utf-8', 0, readSize);
// console.log('Input:' + chunk);


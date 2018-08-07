var mysql = require('mysql')

// 创建一个connection  
var connection = mysql.createConnection({
    host     : '23.105.199.23',
    user     : 'yujin',
    password : '123456',
    database : 'test'
});


//创建一个connection  
connection.connect(function(err){  
    if(err){         
        console.log('[query] - :'+ err);  
        return;  
    }  
    console.log('[connection connect]  succeed!');  
});

// 插入数据
// var userAddSql = 'insert into user (name, pwd) values(?, ?)'
// var param = ['zzz', '123456']

// connection.query(userAddSql, param, function(err, rs){
// 	if (err) {
// 		console.log('insert err:' + err.message);
// 		return
// 	}

// 	console.log('insert suuccess' + rs);
// })

// 查询
connection.query('SELECT * from user where uid=?', [5],function(err, rs, fields) {
	if (err) {
        console.log('[query] === :'+ err)
        return
	}	

	for (var i = 0; i < rs.length; i++) {
		console.log('The solution is: ' + rs[i].name)
	}

})

// 关闭connection  
connection.end(function(err){  
    if(err){ 
        console.log(err.toString());
        return;  
    }  
    console.log('[connection end] succeed!');  
});
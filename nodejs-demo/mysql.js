var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '23.105.199.23',
  user     : 'yujin',
  password : '123456',
  database : 'element-biz'
});
 
connection.connect();
 
connection.query('SELECT * from device_type_constant', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
  console.log('The solution is: ', results.length);
  console.log('The fields is: ', fields);
});
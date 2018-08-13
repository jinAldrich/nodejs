var mysql  = require('mysql');  //调用MySQL模块

function mysqlPool(){
    this.flag = true; //是否连接过 
    this.pool = mysql.createPool({
        host: '23.105.199.23',       //主机
        user: 'yujin',               //MySQL认证用户名
        password: '123456',        //MySQL认证用户密码
        database: 'session_test',
        port: '3306'                   //端口号 
    });

    this.getPool = function() {
        if(this.flag) {
            //监听connection事件 
            this.pool.on('connection', function(connection) {
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            });
        }
        return this.pool;
    }
};

module.exports = mysqlPool;
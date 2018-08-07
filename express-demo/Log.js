/**
 *
 * Created by yujin on 2018/8/3
 *
 */

class Log {
    static i(msg) {
        console.log("YuJin " + msg);
    }

    static d(msg) {
        console.warn("YuJin " + msg);
    }
    static e(msg) {
        console.log("YuJin " + msg);
    }
}

module.exports = Log;
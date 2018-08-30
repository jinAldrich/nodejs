/**
 *
 * Created by yujin on 2018/8/25
 *
 */
var MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const Config = require('./Config');

class DB {
    // private static _instance;

    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }
    constructor() {
        console.log('---constructor---');
        this.dbClient = null;
        console.log('0');
        this.connect();
    }

    connect() {
        console.log('---connect---');
        let _that = this;
        console.log("1--->_that.dbClient:" + _that.dbClient);
        return new Promise(async (resolve, reject)=>{
            if (!_that.dbClient) {
                console.log('1');
                await MongoClient.connect(Config.dbUrl, { useNewUrlParser: true }, function(err, client) {
                    console.log("Connected successfully to server");
                    console.log('2');
                    if (err) {
                        reject(err);
                    } else {
                        // const db = client.db(Config.dbName);
                        _that.dbClient = client.db(Config.dbName);
                        // console.log("2--->_that.dbClient:" + _that.dbClient);
                        console.log('3');
                        resolve(_that.dbClient);
                    }
                });
            } else {
                resolve(_that.dbClient);
            }
        });
    }

    /**
     * 查询数据库
     * @param collectionName    表名
     * @param json              查询条件
     */
    async find(collectionName, json) {
        console.log("---find---");
        return new Promise((resolve, reject)=>{
            this.connect().then(async (db)=>{
                let result = await db.collection(collectionName).find(json);
                result.toArray((err, data)=>{
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                })
            });
        });
    }

    /**
     *
     * @param collectionName  数据库表名
     * @param json1           更新条件
     * @param json2           更新的值
     */
    update(collectionName, json1, json2) {
        console.log("---update---");
        return new Promise(async (resolve, reject)=>{
            let db = await this.connect();
            db.collection(collectionName).updateOne(json1, {$set:json2}, (err, result)=>{
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })

    }

    insert(collectionName, json) {
        console.log("---insert---");
        return new Promise(async(resolve, reject)=>{
            let db = await this.connect();
            if (Array.isArray(json)) {
                db.collection(collectionName).insertMany(json, function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log(err);
                    resolve(result);
                });
            } else {
                db.collection(collectionName).insertOne(json, function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                })
            }
        });
    }

    delete(collectionName, json) {
        console.log("---delete---");
        return new Promise(async(resolve, reject)=>{
            let db = await this.connect();
            db.collection(collectionName).deleteOne(json, (err, result)=>{
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }

    getObjectId(id) {
        console.log(id);
        return new ObjectID(id);
    }
}

module.exports = DB.getInstance();



// var myDb = new DB();
// setTimeout(()=>{
//     // var result = myDb.insert('userInfo', [
//     //     {'userId':'10002', 'userName': '李四', 'userPassword':"123456", 'age':24, 'sex':0},
//     //     {'userId':'10003', 'userName': '王五', 'userPassword':"123456", 'age':25, 'sex':1},
//     //     {'userId':'10004', 'userName': '赵六', 'userPassword':"123456", 'age':26, 'sex':0},
//     //     {'userId':'10005', 'userName': '孙王', 'userPassword':"123456", 'age':27, 'sex':1}]);
//     var result = myDb.insert('userInfo', {'userId':'10006', 'userName': '李思思', 'userPassword':"123456", 'age':24, 'sex':0});
// }, 2000);


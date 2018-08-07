/**
 *
 * Created by yujin on 2018/7/26
 *
 */

var Radio = require('./EventEmitter');

var station = {
    freq: '80.16',
    name:'Rock N Roll Radio'
}

var radio = new Radio(station);

radio.on('open', (station)=>{
    console.log("%s FM %s 打开", station.name, station.freq);
    console.log("播放。。。。");
});

radio.on('close', (station)=>{
    console.log("%s FM %s 关闭", station.name, station.freq);
    console.log("关闭。。。。");
});
// 辅助类
var Interface = function(name,methods){
  if(arguments.length != 2){
    throw new Error("参数数量不对，期望传入两个参数，但是只传入了"+arguments.length+"个参数");
  }
  this.name = name;
  this.methods = [];
  for(var i = 0, len = methods.length; i < len; i++){
    if(typeof methods[i] !== "string"){
      throw new Error("期望传入的方法名是以字符串的格式类型，而不是"+ (typeof methods[i]) + "类型");
    }
    this.methods.push(methods[i]);
  }
}

// 辅助函数
Interface.ensureImplements = function(object){

  if(arguments.length < 2){
    throw new Error("期望传入至少两个参数，这里仅传入"+arguments.length+"个参数");
  }
  for(var i = 1; i < arguments.length; i++){
    var interfac = arguments[i];
    if(!(interfac instanceof Interface)){
      throw new Error(arguments[i] + "不是一个接口");
    }
    for(var j = 0, methodsLen = interfac.methods.length; j < methodsLen; j++){
      var method = interfac.methods[j];
      if(!object[method] || typeof object[method] !== "function"){
        throw new Error("对象的方法 "+method+" 与接口 "+interfac.name+" 定义的不一致");
      }
    }
  }
}

//接口
var RobotMouth = new Interface('RobotMouth',['eat','speakChinese','speakEnglish']);
var RobotEar = new Interface('RobotEar',['listen']);

// 实现RobotMouth、RobotEar接口
// 构造函数
var Robot = function(){
}; 

Robot.prototype = {

  // 实现RobotMouth接口
  eat: function(){
    console.log("I can eat");
  },
  speakChinese: function(){
    console.log("I can speak Chinese");
  },
  speakEnglish: function(){
    console.log("I can speak English");
  },

  // 实现RobotEar接口
  listen: function(){
    console.log("I can listening");
  }
};

var miniRobot = new Robot();

function useRobot(robot){
  Interface.ensureImplements(miniRobot,RobotMouth,RobotEar);
  robot.eat();
  robot.listen();
}

useRobot(miniRobot);
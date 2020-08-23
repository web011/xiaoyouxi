// 功能:小鱼文件
// 功能1：绘制小鱼尾巴眼睛身体
// 功能2：小鱼跟大鱼游动
// 1创建小鱼构造函数badyObj
var badyObj = function(){
    // 1.1：小鱼位置坐标
    this.x;
    this.y;
    // 1.2：小鱼游动角度
    this.angle;
    // 1.3：小鱼眼睛身体尾巴图片
    this.badyEye = [];
    this.badyBody = [];
    this.badyTail = [];
    // 1.4：创建9个变量完成图片切换
    this.badyEyeIndex = 0;//眼睛下标
    this.badyEyeStart = 0;//眼睛计时开始
    this.badyEyeEnd = 3000;//眼睛计时结束

    this.badyBodyIndex = 0;//身体下标
    this.badyBodyStart = 0;//身体计时开始
    this.badyBodyEnd = 4000;//身体计时结束

    this.badyTailIndex = 0;//尾巴下标
    this.badyTailStart = 0;//尾巴计时开始
    this.badyTailEnd = 25;//尾巴计时结束
}
// 2为构造函数添加方法init
badyObj.prototype.init = function(){
    // 2.1：初始化小鱼位置和角度
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    // 2.2：初始图片 眼睛2 身体20 尾巴8
    for(var i=0;i<2;i++){
        this.badyEye[i] = new Image();
        this.badyEye[i].src = "src/babyEye"+i+".png";   
    }
    for(var i=0;i<20;i++){
        this.badyBody[i] = new Image();
        this.badyBody[i].src = "src/babyFade"+i+".png";   
    }
    for(var i=0;i<8;i++){
        this.badyTail[i] = new Image();
        this.badyTail[i].src = "src/babyTail"+i+".png";   
    }
}
// 3为构造函数添加方法draw
badyObj.prototype.draw = function(){
    // 3.1：调整小鱼位置
    this.x = lerpDistance(mom.x,this.x,0.9);
    this.y = lerpDistance(mom.y,this.y,0.9);
    // 3.2：调整小鱼角度
    // 计算坐标差
    var deltax = mom.x - this.x;
    var deltay = mom.y - this.y;
    // 计算角度差
    var beta = Math.atan2(deltax,deltax)+Math.PI;
    // 函数修改小鱼角度
    this.angle = lerpAngle(beta,this.angle,0.9);
    // 3.3：保存画笔状态
    ctx1.save();
    // 3.4：设置画笔原点到小鱼中心
    ctx1.translate(this.x,this.y);
    // 3.5：设置画笔旋转角度
    ctx1.rotate(this.angle);
    // 3.6：绘制小鱼身体
    ctx1.drawImage(this.badyBody[0],-this.badyBody[0].width * 0.5,-this.badyBody[0].height * 0.5);
    // 3.7：绘制小鱼尾巴
    ctx1.drawImage(this.badyTail[0],-this.badyTail[0].width * 0.5+23,-this.badyTail[0].height * 0.5);
    // 3.8：绘制小鱼眼睛
    ctx1.drawImage(this.badyEye[0],-this.badyEye[0].width * 0.5,-this.badyEye[0].height * 0.5);
    // 3.9：恢复画笔状态
    ctx1.restore();
}
// 4将bady.js引入到index.html
// 5在main.js创建小鱼对象并且调用方法
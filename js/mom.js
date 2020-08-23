// 功能分析：大鱼文件
// 功能1：大鱼身体图片切换
// bigTail0.png bigTail7.png
// 功能2：大鱼旋转面向鼠标
// 1：创建大鱼构造函数momObj
var momBbj = function(){
    // 1.1：大鱼的位置 x,y
    this.x;
    this.y;
    // 1.2：大鱼游动的角度
    this.angle = [];
    // 1.3：创建数组保存大鱼眼睛
    this.bigEye = [];
    // 1.4：创建数组保存大鱼身体
    this.bigBody = []; 
    // 1.5：创建数组保存大鱼尾巴
    this.bigTail = [];
    // 由于每个图片不相同必须全部保存

    // 1.6：创建变量保存当前鱼眼睛的下标
    // 在创建二个变量控制下标切换速度 完成大鱼眼睛切换
    this.bigEyeIndex = 0;
    this.bigEyeStart = 0;//计算开始
    this.bigEyeEnd = 3000;//计算结束

    // 1.7：完成大鱼尾巴切换
    this.bigTailIndex = 0;//0~7 尾巴下标
    this.bigTailStart = 0;//尾巴计时开始
    this.bigTailEnd = 200;//尾巴计时结束
    // 1.8完成大鱼身体的切换

    this.bigBodyIndex = 0;//身体下标
    this.bigBodyStart = 0;//身体计时开始
    this.bigBodyEnd = 4000;//计时结束
}
// 2：为大鱼构造函数添加方法init 初始化
momBbj.prototype.init = function(){
    // 2.1：初始化 x,y 画布中心
    this.x = canWidth*0.5;
    this.y = canHeight*0.5;
    // 2.2：初始化游动角度 0
    this.angle = 0;
    // 2.3：创建两个图片对象保存大鱼眼睛数组，并且下载图片
    for(var i=0;i<2;i++){
        this.bigEye[i] = new Image();
        this.bigEye[i].src = "src/bigEye"+i+".png";
    }
    // 2.4：创建八张图片对象保存大鱼身体数组，并且下载图片
    for(var i=0;i<8;i++){
        this.bigBody[i] = new Image();
        this.bigBody[i].src = "src/bigSwim"+i+".png"
    }
    // 2.5：创建八张图片对象保存大鱼尾巴数组，并且下载图片
    for(var i=0;i<8;i++){
        this.bigTail[i] = new Image();
        this.bigTail[i].src = "src/bigTail"+i+".png"
    }
}
// 3：为大鱼构造函数添加方法draw 绘制
momBbj.prototype.draw = function(){
    // 3.0.1：累加大鱼眼睛计时到3000切换小标
    // 3.0.2：累加大鱼眼睛计时
    this.bigEyeStart+=deltaTime;
    // 计时结果
    if(this.bigEyeStart>this.bigEyeEnd){
        // 切换下标
        this.bigEyeIndex = (this.bigEyeStart+1)%2;
        // 将计时开始清空
        this.bigEyeStart = 0;
        // 如果当前小标0 睁眼结束时间3000
        if(this.bigEyeIndex==0){
            this.bigEyeEnd = 3000;
        }
        // 如果当前小标1 闭眼结束时间300
        if(this.bigEyeIndex==1){
            this.bigEyeEnd = 300;
        }
    }
    // 3.0.2：大鱼尾巴切换
    // 大鱼尾巴计时累加
    this.bigTailStart+=deltaTime;
    // 如果大鱼尾巴开始时间大鱼结束时间
    if(this.bigTailStart>this.bigTailEnd){
        // 切换大鱼尾巴小标
        this.bigTailIndex = (this.bigTailIndex+1)%8;
        this.bigTailStart = 0;
    }
    // 3.0.3：大鱼身体切换
    // 累加大鱼身体计时开始
    this.bigBodyStart+=deltaTime;
    // 判断计时开始到计时结束
    if(this.bigBodyStart>this.bigEyeEnd){
        // 切换图片
        this.bigBodyIndex = (this.bigBodyIndex+1)%8;
        // 清空计时开始
        this.bigBodyStart = 0;
    }
    // 这是main.js里面的变量
    // 是保存鼠标的位置的
    this.x = lerpDistance(mx,this.x,0.9);
    this.y = lerpDistance(my,this.y,0.9);

    // 3.3.4：修改大鱼游动角度
        // (1)计算大鱼于鼠标之间坐标
        var deltaY = my - this.y;
        var deltaX = mx - this.x;
        // (2)计算大鱼于鼠标之间角度
        var beta = Math.atan2(deltaY,deltaX)+Math.PI;
        // (3)计算大鱼向鼠标角度慢慢调整
        this.angle = lerpAngle(beta,this.angle,0.9)
    // 3.1：保存画笔1状态
    ctx1.save();
    // 3.2：将画笔原点移动大鱼身上中心
    ctx1.translate(this.x,this.y);
    // 3.4：设置大鱼旋转角度
    ctx1.rotate(this.angle)
    // 3.5：绘制 身体 尾巴 眼睛
    ctx1.drawImage(this.bigBody[this.bigBodyIndex],-this.bigBody[this.bigBodyIndex].width*0.5,-this.bigBody[this.bigBodyIndex].height*0.5);
    ctx1.drawImage(this.bigTail[this.bigTailIndex],-this.bigTail[this.bigTailIndex].width*0.5+30,-this.bigTail[this.bigTailIndex].height*0.5);
    ctx1.drawImage(this.bigEye[this.bigEyeIndex],-this.bigEye[this.bigEyeIndex].width*0.5,-this.bigEye[this.bigEyeIndex].height*0.5);
    // 3.7：恢复画笔1状态
    ctx1.restore();
}
// 4：将mom.js 添加index.html里面
// 5：并且在main.js 创建大鱼对象并且调用相关方法
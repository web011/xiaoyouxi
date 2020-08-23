// 功能：吃食物后奖励光环wave.js
// 1创建光环构造函数
var waveObj = function(){
    // 1.1：添加属性圆心
    this.x = [];
    this.y = [];
    // 1.2：添加属性半径
    this.r = [];
    // 1.3：添加状态，显示隐藏
    this.alive = [];
}
// 2为构造函数添加属性num=10
waveObj.prototype.num = 10;
// 3为构造函数添加方法init
waveObj.prototype.init = function(){
    // 3.1：创建循环遍历每一个光环
    for(var i=0;i<this.num;i++){
        // 3.2：状态false
        this.alive[i] = false;
        // 3.3：半径0
        this.r[i] = 0;
        // 3.4：圆心0
        this.x[i] = 0;
        this.y[i] = 0;
    }
}
// 4为构造函数添加方法draw
waveObj.prototype.draw = function(){
    // 4.1：保存画布1状态
    ctx1.save();
    // 光环的颜色
    ctx1.strokeStyle = "#fff"
    // 4.2：创建循环遍历所有光环
    for(var i=0;i<this.num;i++){
        // 4.3：判断当前光环是否显示
        if(this.alive[i]){
            // 4.4：当前光环半径增加
            this.r[i] += deltaTime * 0.015;
            // 4.5：如果光环半径大于40
            if(this.r[i]>40){
                // 4.6：将当前光环状态为false
                this.alive[i] = false;
                return;         //一次隐藏一个光环
            }
            // 4.7：开始一条新路径
            ctx1.beginPath();
            // 4.8：画光环
            ctx1.arc(this.x[i],this.y[i],this.r[0],0,2*Math.PI);
            // 4.9：描边
            ctx1.stroke();
        }
    }
    // 4.10：恢复画笔1状态
    ctx1.restore();
}
// 5将wave.js添加到index.hmtl里面
// 6在main.js创建光环对象并且调用相对应方法

// 7为光环构造函数添加出生的方法
waveObj.prototype.born = function(x,y){
    // 遍历光环
    for(var i=0;i<this.num;i++){
        // 查找第一个状态为false的光环
        if(this.alive[i] == false){
            // 出生
            this.alive[i] = true;//状态
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 20;
            return;             //一次出生一个
        }
    }
}
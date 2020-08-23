// 功能1：创建食物功能
    // 1.创建食物构造函数 fruitObj
    var fruitObj = function(){
        // 1.1：添加食物状态属性alive true 显示 false 隐藏
        this.alive = [];
        // 1.2：创建二个图片对象
        this.blue = new Image();
        this.orange = new Image();
        // 1.3：创建位置数组 x y 保存食物位置
        this.x = [];
        this.y = [];
        // 1.4：创建数组保存 l 图片宽度和高度
        this.l = [];
        // 1.5：创建数组保存速度 spd 生长向上漂浮
        this.spd = [];
        // 1.6：创建数组保存食物类型 "blue" "orange"
        this.fruitType = [];
        // 1.7：创建数组保存第几个海葵
        this.aneNo = [];
    }
    // 2.为食物构造函数添加属性 num = 30
    fruitObj.prototype.num = 60;
    // 3.为食物构造函数添加方法init
    fruitObj.prototype.init = function(){
        // 3.1：创建循环遍历数组所有食物
        for(var i=0;i<this.num;i++){
            // 3.2：给食物状态位置海葵编号速度类型
            // 测试代码
            // this.alive[i] = true;
            // this.x[i] = Math.random()*800;
            // this.y[i] = Math.random()*600;
            // this.l[i] = 0;
            // this.fruitType[i] = Math.random() < 0.9 ? "blue" : "orange";
            // this.spd[i] = Math.random()*0.017;
            // 正式代码
            this.alive[i] = false;
            this.x[i] = 0;
            this.y[i] = 0;
            this.l[i] = 0;
            this.fruitType[i] = "";
            this.spd[i] = 0;
        }
        // 3.3：循环外部下载二张图片
        this.blue.src = "src/blue.png";
        this.orange.src = "src/fruit.png"
    }
    // 4.为食物构造函数添加方法draw
    fruitObj.prototype.draw = function(){
        // 4.1：创建循环遍历每个食物
        for(var i=0;i<this.num;i++){
            // 4.2：判断当前食物是否显示或隐藏
            if(this.alive[i]){
                // 4.3：判断当前食物类型
                if(this.fruitType[i] == "blue"){
                    var prc = this.blue;
                }else{
                    var prc = this.orange;
                }
                // 4.4：判断当前食物的宽度是否小于或等于14
                if(this.l[i]<=14){
                    // 4.5：如果小于14就修改l
                    // 变大
                    this.l[i]+=this.spd[i]*deltaTime;
                }else{
                    // 4.6：如果大于14就修改y
                    // 变小
                    this.y[i]-=this.spd[i]*deltaTime;
                }
                // 4.7：绘制食物
                ctx2.drawImage(prc,
                    this.x[i],this.y[i],
                    this.l[i],this.l[i]
                );
            }
            // 4.8：如果当前食物漂浮屏幕
            // 4.9：将当前食物状态修改隐藏
            if(this.y[i]<10){
                this.alive[i] = false;
            }
        }
    }
    // 5.将fruit.js 添加到 index.html 里面
    // 6.在main.js 创建食物对象并且调用相关方法
        // 6.1：创建全局函数监听画布上食物数据，不足15的按数组下标挑一个
        function fruitMonitor(){
            // (1)累加状态为true几个元素
            var num = 0;
            // (2)如果当前食物状态显示 ++
            for(var i=0;i<fruit.num;i++){
                if(fruit.alive[i]) num++;
            }
            if(num<30){
                sendFruit();//挑一个食物函数
                return;     //一次挑一个
            }
        }
        // 6.2：创建全局函数：挑，按下标取值去第一个
        function sendFruit(){
            for(var i=0;i<fruit.num;i++){
                // 找到第一个食物出生
                if(fruit.alive[i] == false){
                    fruit.born(i);//出生
                    return;       //一次生一个
                }
            }
        }
        // 6.3：为构造函数添加初生食物方法
        fruitObj.prototype.born=function(i){
            // (1)获取第几个海葵下标
            var idx = Math.floor(ane.num * Math.random());
            // (2)获取当前海葵终点坐标 x,y
            var x = ane.headx[idx];
            var y = ane.heady[idx];
            // (3)依据终点坐标 赋值当前食物
            this.x[i] = x;
            this.y[i] = y;
            // (4)修改当前食物状态 true
            this.alive[i] = true;
            // (5)修改当前食物宽度高度 0
            this.l[i] = 0;
            // (6)修改当前食物类型
            this.fruitType[i] = Math.random() < 0.9 ? "blue" : "orange";
            // (7)修改当前食物速度
            this.spd[i] = Math.random()*0.097;
        }
        // 6.4：在main.js gameloop调用监听画布全局函数
        // 6.5：为构造函数添加方法：食物隐藏
        // 7.：为函数构造函数添加食物消失方法
        fruitObj.prototype.dead = function(i){
            this.alive[i] = false;
        }
// 功能2：监听画布上活动食物是否有15个，不足15个挑一个食物出生
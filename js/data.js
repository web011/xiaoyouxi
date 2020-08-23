// 1.创建分数构造函数dataObj
var dataObj = function(){
    // 一开始的分数
    this.score = 0;
}
// 2.为构造函数添加绘制方法drew
dataObj.prototype.draw = function(){
    // 2.1：保存画笔1状态
    ctx1.save();
    // 2.2：修改画笔1填充样式
    ctx1.fillStyle = "#fff";
    // 2.3：修改画笔1文字大小 恐怖字体 Chiller，英文字体 Verdana
    ctx1.font = "35px Verdana";
    // 2.4：修改画笔1文字居中
    ctx1.textAlign = "center";
    // 2.5：绘制文件
    ctx1.fillText("SCORE:"+this.score,canWidth*0.5,canHeight*0.8);
    // 2.6：恢复画笔1状态
    ctx1.restore()
}

// 3.将data.js添加到index.html里面
// 4.在main.js里面创建分数对象并且调用相关方法
// 5.为构造函数添加方法add
// type 大鱼吃食物类型
// 1  表示吃蓝色食物    2  表示吃橙色食物
dataObj.prototype.add = function(type){
    this.score += 100*  type;
}
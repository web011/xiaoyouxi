// 完成游戏中碰撞检测
// 功能1大鱼碰撞到食物
function momFruitsCollison(){
    // 1：创建循环遍历所有食物
    for(var i=0;i<fruit.num;i++){
        // 2：判断当前食是否是显示
        if(fruit.alive[i]){
            // 3：计算当前食物于大鱼距离
            var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
        }
        // 4：如果两者之间距离小于900
        if(l<900){
            // 5：食物消失
            fruit.dead(i);
            // 5.1：累加分数
            // (1)判断当前食物类型
            var type = 1;
            if(fruit.fruitType[i]!="blue"){
                type = 2;
            }
            // (2)累加
            data.add(type)
            // 5.2：显示奖励光环
            // 把食物的位置传给光环，让光环在食物的位置显示光环
            wave.born(fruit.x[i],fruit.y[i]);
        }
        // 6：将collsions.js添加到index.html里面
        // 6：将函数添加gameloop中
    }
}
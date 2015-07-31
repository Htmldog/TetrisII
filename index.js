//将坐标转换为下标(2,1)
function xyToIndex(x,y) {
	return (y-1)*10+x-1;
}
//绘制指定坐标的单元格
function drawBoxByXy(x,y){
	var index = xyToIndex(x,y);
	if(boxs[index]){
		boxs[index].className=solidBoxCls;
	}else{
		if(window.fallTetrominoTimer){
			clearInterval(window.fallTetrominoTimer);
		}
	}
}
//绘制一个四拼版
function drawTetromino(arrPos){
	for(var i=0;i<4;i++){
		drawBoxByXy(arrPos[i].x,arrPos[i].y);
	}
}
//将一个2维数组表示的四拼版转换成一组坐标信息
function arrToPos(arr){
	var arrPos = [];
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j]==1){
				var pos={};
				pos.x=j+1;
				pos.y=i+1;
				arrPos.push(pos);
			}
		}
	}
	return arrPos;
}
//清场方法
function clearSite(){
	for(var i=0;i<200;i++){
		if(boxs[i].className=solidBoxCls){
			boxs[i].className="";
		}
	}
}
//下落四拼版
function fallTetromino(){
	drawTetromino(tetrominoFall);
	window.fallTetrominoTimer = setInterval(function(){
		console.log("下落定时器");
		moveTetrominoByY(1);
		clearSite();
		drawTetromino(tetrominoFall);
	},1000);
}
//将四拼版下落指定y坐标(这里利用了js引用类型的特性,故无需返回值)
function moveTetrominoByY(y){
	var temp;
	for(var i=0;i<4;i++){
		temp=tetrominoFall[i];
		temp.y+=y;
	}
}

//待操作的单元格
var boxs = J_site.getElementsByTagName("i");
//实心单元格样式类
var solidBoxCls = "box1";
//下落单元格
var tetrominoFall=[
	[0,1,0,0],
	[0,1,0,0],
	[0,1,0,0],
	[0,1,0,0]
];
//创建一个可操作的四拼版
tetrominoFall = arrToPos(tetrominoFall);

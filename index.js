//扩展一个对象的复制方法
Object.prototype.clone=function(){
	var objClone = new Object();
	for(var key in this){
		objClone[key]=this[key];
	}
	return objClone;
}
//复制一个四拼版
function cloneTetromino(arr){
	var newTetromino=[];
	for(var i=0;i<4;i++){
		newTetromino.push(arr[i].clone());
	}
	return newTetromino;
}
//将坐标转换为下标(2,1)
function xyToIndex(x,y) {
	return (y-1)*10+x-1;
}
//绘制指定坐标的单元格
function drawBoxByXy(x,y){
	var index = xyToIndex(x,y);
	if(boxs[index]){
		boxs[index].className=solidBoxCls;
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
		tetrominoFallOld=cloneTetromino(tetrominoFall);
		var state=moveTetrominoByXy(null,1);
		if(state){
			clearSite();
			drawTetromino(tetrominoFall);
		}
	},1000);
}
//将四拼版下落指定y坐标(这里利用了js引用类型的特性,故无需返回值)
function moveTetrominoByXy(x,y){
	var temp,_x,_y;
	var tempTetromino=cloneTetromino(tetrominoFall);
	for(var i=0;i<4;i++){
		temp=tempTetromino[i];
		_x = temp.x+x;
		_y = temp.y+y;
		if(_x>10||_x<1){
			return false;
		}else{
			temp.x+=x;
		}
		if(_y>20){
			tetrominoStopDrop();
			return false;
		}else{
			temp.y+=y;
		}
	}
	tetrominoFall=tempTetromino;
	return true;
}
//四拼版停止下坠
function tetrominoStopDrop(){
	if(window.fallTetrominoTimer){
		clearInterval(window.fallTetrominoTimer);
		window.fallTetrominoTimer=null;
		dirKey=false;
		clearSite();
		drawTetromino(tetrominoFallOld);			
	}
}
//旋转四拼版方法
function rotateTetromino(arr){
	var arrPos=[];
	for(var i=0;i<4;i++){
		var temp = rotete90(arr[i].x,arr[i].y);
		arrPos.push(temp);
	}
	return arrPos;
}
//得到一个坐标90°旋转后的坐标,(2,2)为旋转的圆心
function rotete90(x,y){
	var rad = AngleToRadian(90);
	var _x,_y,pos={};
	_x = (x-2)*Math.cos(rad)-(y-2)*Math.sin(rad)+2;
	_y = (x-2)*Math.sin(rad)+(y-2)*Math.cos(rad)+2;
	pos.x=parseInt(_x);
	pos.y=parseInt(_y);
	return pos;
}
//角度转换为弧度
function AngleToRadian(n){
	return (2*Math.PI / 360)*n;
}
//方向键
document.onkeydown=function(event){
	if(!dirKey){
		return;
	}
    var e = event || window.event;
    if(e && e.keyCode==38){//上
        console.log("up");
    }
    if(e && e.keyCode==39){//右
        console.log("right");
        moveTetrominoByXy(1,null);
        clearSite();
        drawTetromino(tetrominoFall);
    }
    if(e && e.keyCode==37){//左
        console.log("left");
        moveTetrominoByXy(-1,null);
        clearSite();
        drawTetromino(tetrominoFall);
    }
    if(e && e.keyCode==40){//下
        console.log("down");
    }
}; 

//待操作的单元格
var boxs = J_site.getElementsByTagName("i");
//实心单元格样式类
var solidBoxCls = "box1";
//方向键是否有效标示
var dirKey = true;
//下落单元格
var tetrominoFall=[
    [0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]
];
//创建一个可操作的四拼版
tetrominoFall = arrToPos(tetrominoFall);
//存放下落四拼版的上一个状态
var tetrominoFallOld;

//将坐标转换为下标(2,1)
function xyToIndex(x,y) {
	return (y-1)*10+x-1;
}
//绘制指定坐标的单元格
function drawBoxByXy(x,y){
	var index = xyToIndex(x,y);
	boxs[index].className=solidBoxCls;
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
//
var boxs = J_site.getElementsByTagName("i");
var solidBoxCls = "box1";
var tetrominoFall=[
	[0,1,0,0],
	[0,1,0,0],
	[0,1,0,0],
	[0,1,0,0]
];
//创建一个可操作的四拼版
tetrominoFall = arrToPos(tetrominoFall);
//绘制一个四拼版
drawTetromino(tetrominoFall);
var boxs = J_site.getElementsByTagName("i");
var solidBoxCls = "box1";
//将坐标转换为下标(2,1)
function xyToIndex(x,y) {
	return (y-1)*10+x-1;
}
//绘制指定坐标的单元格
function drawBoxByXy(x,y){
	var index = xyToIndex(x,y);
	boxs[index].className=solidBoxCls;
}

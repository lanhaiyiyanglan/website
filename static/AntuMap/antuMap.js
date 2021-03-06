
var antuMap = null;

function getMap()
{
	if (antuMap == null)
	{
		antuMap = document.getElementById("AntuMap");
	}
	return antuMap;
}

//***************************************************主动呼叫区域***********************************************//

//**************************************添加监听区域**********************************************//
/**
 * 对map是否添加监听
 * 注意：这里与mark上添加监听产生重复，当大量mark需要监听是请开启map监听，这样会提高性能。
 * 若只有少部分mark需要监听，就开启对mark的监听。
 * */
function addMapEventListener()
{
	var x = getMap();
	x.addMapEventListener();
}

/**
 * 注册右键事件
 * */
function registRightListener()
{
	var x = getMap();
	x.registRightListener();
}

//**************************************添加监听区域结束**********************************************//

/**
 * 删除map上所有marker
 * */
function deleteAllMapMarker()
{
	var x = getMap();
	x.deleteAllMapMarker();
}

/**
 * 通过类型删除marker
 * */
function deleteMapMarkerByType(markType)
{
	var x = getMap();
	x.deleteMapMarkerByType(markType);
}

/**
 * 通过名称删除marker
 * */
function deleteMapMarker(markName)
{
	var x = getMap();
	x.deleteMapMarker(markName);
}

/**
 * 添加图片
 * */
function addPointImgMarks(markInfo)
{
	var x = getMap();
	x.addPointImgMarks(markInfo);
}

/**
 * 添加多边形标记
 * */
function addPolygonMarks(markInfo)
{
	var x = getMap();
	x.addPolygonMarks(markInfo);
}

/**
 *添加线性标记
 * */
function addPolylineMarks(markInfo)
{
	var x = getMap();
	x.addPolylineMarks(markInfo);
}

/**
 *设置地图级别
 * */
function setZoomNum(layerNum)
{
	var x = getMap();
	x.setZoomNum(layerNum);
}

/**
 *缩放级别至中心点
 * */
function zoomToCenter(layerNum, lon, lat)
{
	var x = getMap();
	x.zoomToCenter(layerNum, lon, lat);
}

/**
 * 缩放到四边形区域
 * */
function zoomToExtent(minX, minY, maxX, maxY)
{
	var x = getMap();
	x.zoomToExtent(minX, minY, maxX, maxY);
}

/**
 *设置中心点
 * */
function setMapCenter(lon, lat)
{
	var x = getMap();
	x.setMapCenter(lon, lat);
}

/**
 * 开始闪烁
 * */
function startFlash(markerName, delay)
{
	var x = getMap();
	x.startFlash(markerName, delay);
}

/**
 * 停止闪烁
 * */
function stopFlash(markerName)
{
	var x = getMap();
	x.stopFlash(markerName);
}

/**
 * 根据markerName来更新tip内容
 * */
function updateTipContent(markerName, content)
{
	var x = getMap();
	x.updateTipContent(markerName, content);
}

//***************************************************主动呼叫区域结束***********************************************//



//***************************************************被动呼叫区域***********************************************//
/**
 * 地图加载完成
 * */
function loadMapComplete() 
{
	
}

/**
 * 滚动级别变化事件
 * */
function stopZoomingHandler(zoomLevel)
{
	
}

/**
 * 右键单击事件
 * 使用前，先注册事件
 * */
function rightClickHandler()
{
	alert('1');
}

/**
 * 多边形单击回调
 * */
function addPolygonMarkCallBack(markName) 
{
	alert('10');
}

/**
 * 线条单击回调
 * */
function addPolylineMarkCallBack(markName) 
{
	alert('11');
}

/**
 * 图形单击回调
 * */
function addPointImgMarkCallBack(markName) 
{
	alert('12');
}

/**
 * 多边形双击回调
 * */
function addPolygonMarkDoubleCallBack(markName) 
{
	alert('20');
}

/**
 * 线条双击回调
 * */
function addPolylineMarkDoubleCallBack(markName) 
{
	alert('21');
}

/**
 * 图形双击回调
 * */
function addPointImgMarkDoubleCallBack(markName) 
{
	alert('22');
}

/**
 * 多边形显示tip回调
 * */
function polygonShowTipCallBack(markName) 
{
	updateTipContent(markName, '九碧木。。。');
}

/**
 * 线条显示tip回调
 * */
function lineShowTipCallBack(markName) 
{
	//updateTipContent(markName, '九碧木。。。');
}

/**
 * 图形显示tip
 * */
function pointImgShowTipCallBack(markName) 
{
	//updateTipContent(markName, '九碧木。。。');
}

function testWindow()
{
	alert('sdfdsf');
}

//***************************************************被动呼叫区域结束***********************************************//










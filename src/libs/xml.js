export function getXmlNode(strx) {
  var str = strx;
  // 创建文档对象
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(str, 'text/xml');

  // 提取数据
  var countrys = xmlDoc.getElementsByTagName('node');
  return digui([countrys[0]]);
}
const icon = {
  '1300000000':"el-icon-menu",
  '1301000000':"el-icon-setting",
  '1302000000':"el-icon-printer",
  '1303000000':"el-icon-news",
  '1304000000':"el-icon-bell",
  '1305000000': "el-icon-rank",
  '1306000000':"el-icon-view",
  '1307000000':"el-icon-edit-outline",
  '1308000000':"el-icon-picture",
  '1309000000':"el-icon-tickets",
  '1310000000':"el-icon-document",
  '1311000000':"el-icon-star-off",
  '1312000000':"el-icon-date",
  '1313000000':"el-icon-share",
  '1314000000':'el-icon-goods',
  '1315000000':'el-icon-info'
};
export function digui(arr) {
  let newarr = [];
  if (arr && _typeof(arr)=='array'&&arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      newarr.push(
        {
          name: arr[i].name,
          path: String(arr[i].value),
          node:digui(arr[i].node),
          key: String(i),
          icon: icon[arr[i].value],
          //iconA: icon[arr[i].value + 'act']
        }
      );
    }
  }else if(arr&&_typeof(arr)=='object'){
    newarr.push(
      {
        name: arr.name,
        path: String(arr.value),
        node: digui(arr.node),
        key: new Date().getTime(),
        icon: icon[arr.value],
        //iconA: icon[arr.value + 'act']
      }
    );
  }
  return newarr;
}

export function _typeof(data) {
  let value = /\[object (\w+)\]/.exec(
      Object.prototype.toString.call(data)
  );
  return value ? value[1].toLowerCase() : '';
}

// import XLSX from "xlsx";
// import XLSXS from "xlsx-style";
// import FileSaver from "file-saver";
// export function tableToExcel(tableid, excelName){
//   var table = document.getElementById(tableid);
//   let wb = XLSX.utils.table_to_book(table, { sheet:excelName});
//   console.log(wb);
//       setExlStyle(wb["Sheets"][excelName]);
//       console.log(wb["Sheets"][excelName]);
//       addRangeBorder(
//         wb["Sheets"][excelName]["!merges"],
//         wb["Sheets"][excelName]
//       );
//       var ws = XLSXS.write(wb,{
//         bookType: 'xlsx', // 要生成的文件类型
//         bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
//         type: 'binary'
//       });
//       try {
//         FileSaver.saveAs(
//           new Blob([s2ab(ws)], { type: "application/octet-stream" }),
//           excelName + '.xls'
//         );
//       } catch (e) {
//         if (typeof console !== "undefined") console.log(e, ws);
//       }
//       return ws;
// }
// // 字符串转ArrayBuffer
// export function s2ab(s) {
//   var buf = new ArrayBuffer(s.length);
//   var view = new Uint8Array(buf);
//   for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//   return buf;
// }
// export function setExlStyle(data) {
//   let borderAll = {
//     //单元格外侧框线
//     top: {
//       style: "thin",
//     },
//     bottom: {
//       style: "thin",
//     },
//     left: {
//       style: "thin",
//     },
//     right: {
//       style: "thin",
//     },
//   };
//   data["!cols"] = [];
//   for (let key in data) {
//     if (data[key] instanceof Object) {
//       data[key].s = {
//         border: borderAll,
//         alignment: {
//           horizontal: "center", //水平居中对齐
//           vertical: "center",
//         },
//         font: {
//           name: 'Helvetica Neue',
// 					sz: 13,
// 					color: {
// 						auto: 1,
// 					},
//         },
//         bold: true,
//         numFmt: 0,
//       };
//       data["!cols"].push({ wpx:150});
//     }
//   }
//   return data;
// }
// export function addRangeBorder(range, ws) {
//   let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//       range.forEach(item => {
//         let style = {
//           s: {
//             border: {
//               top: { style: 'thin' },
//               left: { style: 'thin' },
//               bottom: { style: 'thin' },
//               right: { style: 'thin' }
//             }
//           }
//         }
//         // 处理合并行
//         for (let i = item.s.c; i <= item.e.c; i++) {
//           ws[`${cols[i]}${Number(item.e.r) + 1}`] = ws[`${cols[i]}${Number(item.e.r) + 1}`] || style
//           // 处理合并列
//           for (let k = item.s.r + 2; k <= item.e.r + 1; k++) {
//             ws[cols[i] + k] = ws[cols[k] + item.e.r] || style
//           }
//         }
//       })
//       return ws;
// }

// export function tableToExcel(tableid, excelName){
//   var table = document.getElementById(tableid);
//   var sheet = XLSX.utils.table_to_sheet(table); //将一个table对象转换成一个sheet对象
//   var wb=sheet2blob(sheet);
//   var explorer = window.navigator.userAgent;
//   if(explorer.indexOf("Trident") >= 0||explorer.indexOf("Edge") >= 0||explorer.indexOf("MSIE") >= 0){
//     window.navigator.msSaveOrOpenBlob(wb, excelName + '.xls');
//   }
//   else{
//     var uri = 'data:application/vnd.ms-excel;base64,'
//     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//     , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
//     , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
//     //根据ID获取table表格HTML
//     var table = document.getElementById(tableid);
//     var ctx = { worksheet: 'Worksheet', table: table.innerHTML };
//     const a = document.createElement('a'); // 创建a标签
//     a.setAttribute('download', excelName + '.xls');// download属性
//     a.setAttribute('href', uri + base64(format(template, ctx)));// href链接
//     a.click();// 自执行点击事件
//   }
// }
// export function sheet2blob(sheet, sheetName) {// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
//       try {
//           new Uint8Array([1,2]).slice(0,2);
//       } catch (e) {
//           //IE或有些浏览器不支持Uint8Array.slice()方法。改成使用Array.slice()方法
//           Uint8Array.prototype.slice = Array.prototype.slice;
//       }
//       sheetName = sheetName || 'sheet1';
//       var workbook = {
//         SheetNames: [sheetName],
//         Sheets: {}
//       };
//       workbook.Sheets[sheetName] = sheet;
//       // 生成excel的配置项
//       var wopts = {
//         bookType: 'xlsx', // 要生成的文件类型
//         bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
//         type: 'binary'
//       };
//       var wbout = XLSXS.write(workbook,wopts);
//       var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
//       // 字符串转ArrayBuffer
//       function s2ab(s) {
//         var buf = new ArrayBuffer(s.length);
//         var view = new Uint8Array(buf);
//         for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//         return buf;
//       }
//       return blob;
// }
export function tableToExcel(tableid, excelName){
  //tb是div 里面包着 table,这里就是取出table的html
  var lHtml = document.getElementById(tableid).innerHTML.replace(/<input/g, '<br')
  console.log(lHtml);
  var style='';
  style+='.ckTable .editInput{display:none;border:none;outline:none;}'
  style+='.countTable{width:90%;border-color:#c6c6c6!important;margin:0 auto;border-collapse: collapse;}';
  style+='.countTable th{background-color:#ddeeff;border-color:!important;height:40px;line-height:40px;font-size:15px;font-weight:normal;text-align:center;}';
  style+='.countTable td{border-color:#c6c6c6!important;height:40px;min-height:40px;line-height:40px;font-size:13px;font-weight:normal;text-align:center;word-break: break-all;}';
  style+='.countTable tr:nth-child(odd){background-color:#fff;}.countTable tr:nth-child(even){background-color: #f8f8f8;}.countTable td .tips input{display:none;}';
   //这里重新组成一个你需要的文档，记得要将你需要的table样式复制写入到head头部里否则
//导出来没有表格样式 下面style标签里就是我自定义的表格样式
   var tableHtml='<html><head><meta charset="UTF-8"><style type="text/css">'+style+'</style></head><body>';
   tableHtml += lHtml;
   tableHtml += '</body></html>';
   var excelBlob = new Blob([tableHtml], {type: 'application/vnd.ms-excel'});
   var fileName = excelName + '.xls'
   var explorer = window.navigator.userAgent;
   if(explorer.indexOf("Trident") >= 0||explorer.indexOf("Edge") >= 0||explorer.indexOf("MSIE") >= 0){
      window.navigator.msSaveOrOpenBlob(excelBlob,fileName);
   }else{
      var oa = document.createElement('a');
      oa.href = URL.createObjectURL(excelBlob);
      oa.download = fileName;
      document.body.appendChild(oa);
      oa.click();
  }
}


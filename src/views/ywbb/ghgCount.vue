<template>
   <div>
      <table class="countTable" bordercolor="#c6c6c6" border="1">
        <thead>
          <th width="250px">高后果区名称</th>
          <th width="156px">必经点名称</th>
          <th width="156px">一巡时间</th>
          <th width="156px">到达人员</th>
          <th width="156px">二巡时间</th>
          <th>到达人员</th>
        </thead>
        <template v-if="tableData.length>0">
            <tbody>
                <template v-for="item in tableData">
                    <tr v-for="(m,i) in item.POINTLIST" :key="i">
                        <td v-if="i==0" :rowspan="item.POINTLIST.length" width="250px">
                            {{item.NAME}}
                        </td>
                        <template v-if="m.POINTNAME">
                            <td width="156px">{{m.POINTNAME}}</td>
                        </template>
                        <template v-else>
                            <td width="156px">{{m.STAKEID}}</td>
                        </template>
                        <td width="156px">{{m.DT}}</td>
                        <td width="156px">{{m.PERSONNAME}}<i class="el-icon-location-outline" @click="site(m,1)" v-if="m.LATITUDE!=null"></i></td>
                        <td width="156px">{{m.DTS}}</td>
                        <td>{{m.PERSONNAMES}}<i class="el-icon-location-outline" @click="site(m,2)" v-if="m.LATITUDES!=null"></i></td>
                    </tr>
                </template>
            </tbody>
        </template>
      </table>
      <div class="mapBox" v-if="mapBool">
            <div class="conBox">
                <div class="title">地图展示<span
                    class="close"
                    @click="closeMap"
                >{{"×"}}</span></div>
                 <iframe src="/SinopecPatrol/statistics/static/AntuMap/AntuMap.html"></iframe>
                 <!-- <iframe :src="src"></iframe> -->
            </div>
        </div>
   </div>
</template>
<script>
    export default {
    props:["tableData"],
    data(){
        return{
            //src:"./static/AntuMap/AntuMap.html",
            mapBool:false
        }
    },
    methods:{
        closeMap() {
            this.mapBool = false;
            sessionStorage.setItem('mapInfo', null);
            sessionStorage.setItem('DT',"");
        },
        site(item,flag){
            let arr=[];
            if(flag==1){
               arr=[{pointname:item.POINTID,longitude:item.LONGITUDE,latitude:item.LATITUDE,pointid:item.POINTID}];
               sessionStorage.setItem('DT',item.DT);
            }else{
               arr=[{pointname:item.POINTID,longitude:item.LONGITUDES,latitude:item.LATITUDES,pointid:item.POINTID}];
               sessionStorage.setItem('DT',item.DTS);
            }
            let  temp=[{pointList:arr}];
            sessionStorage.setItem('mapInfo',JSON.stringify(temp));
            sessionStorage.setItem('pointFre', '13');
            sessionStorage.setItem('pointKey',"one");
            this.mapBool = true;
        }
    }
}
</script>
<style scoped>
.mapBox {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99999999;
}
 .mapBox .conBox .title .close {
    position: absolute;
    height: 30px;
    line-height: 30px;
    width: 30px;
    right: 15px;
    top: 15px;
    font-size: 25px;
    cursor: pointer;
}
.mapBox .conBox {
    height: 90%;
    width: 90%;
    margin-top: 2.5%;
    margin-left: 5%;
}
.mapBox .conBox .title {
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #ccc;
    color: #000000;
}
 .mapBox .conBox iframe {
    height: calc((100% - 60px));
    width: 100%;
}

.countTable{width:1054px;margin:0 auto;border-left:none;}
.countTable thead{display:table;width: calc(100% - 17px);table-layout: fixed;box-sizing: border-box;background:#ddeeff!important;}
.countTable thead tr{border-top:none!important;}
.countTable tbody{display:inline-block;width: 100%;overflow-y:auto;max-height:60vh;box-sizing: border-box;}
.countTable  th{border-bottom:none;border-top:none;border-right:1px solid #c6c6c6;}
.countTable  th:last-child{border-right:none;}
.countTable td{border-bottom: none;border-top:1px solid #c6c6c6;border-right:1px solid #c6c6c6;}
.countTable tr>td:last-child{border-right: none;min-width:160px;}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
width:17px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
border-radius:17px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
border-radius:17px;
background:rgba(0,0,0,0.1);
-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
</style>
<template>
    <div style="overflow-x:auto;">
        <table class="countTable" border="1" bordercolor="#c6c6c6">
            <thead>
                <tr>
                    <th width="88px">施工点名称</th>
                    <th width="88px">必经点名称</th>
                    <th v-for="(val,index) in days" :key="index">{{val}}</th>
                </tr>
            </thead>
            <template v-if="tableData.length>0">
                   <tbody >
                            <tr v-for="(item,index) in tableData" :key="index">
                                <td width="88px">{{item.desName}}</td>
                                <template v-if="item.pointName">
                                    <td width="88px">{{item.pointName}}</td>
                                </template>
                                <template v-else>
                                    <td width="88px">{{item.STAKEID}}</td>
                                </template>
                                <!-- <td>{{item.pointName}}</td> -->
                                <td v-for="(v,idx) in item.arriveList" :key="idx">
                                    <template v-if="v!=null">
                                        <div class="hoverContent">
                                            <span @mouseover="showTips($event)" @mouseout="hideTips($event)">{{v}}</span>
                                            <div class="tips">
                                                <input :value="item.timeList[idx]" readonly />
                                                <input :value="item.personList[idx]" readonly />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        {{v}}
                                    </template>
                                </td>
                            </tr>
                        </tbody>
            </template>
    </table>
    </div>
</template>
<script>
export default {
    props:["tableData"],
    data(){
        return{
            //yearMonth:this.times,//年月
            days:31,//当前月有多少天
            tableList:[],
        }
    },
    created(){
        //this.days=this.dayjs(this.yearMonth,"YYYY-MM").daysInMonth();
    },
    methods:{
        showTips(e){
          e.target.parentNode.lastChild.style.display="block";
        },
        hideTips(e) {
         e.target.parentNode.lastChild.style.display="none";
        }
    },
    watch: {
            //   times(newV,oldV) {
            //     this.yearMonth=newV;
            //     this.days=this.dayjs(this.yearMonth,"YYYY-MM").daysInMonth();
            //   } 
    },    
}
</script>
<style scoped>
.hoverContent{position:relative;width:100%;height:100%;}
.hoverContent span{display:block;width:100%;height:100%;cursor: pointer;}
.tips{
    display: none;
    line-height: 16px;
    z-index: 9999;
    padding: 2px 0px;
    border: 1px solid #c6c6c6;
    position: absolute;
    top: 1px;
    background: #fff;
    border-radius: 5px;
    font-size: 13px;
    color: #333;
    width: 150px;
    margin-left: -143px;
}
.tips input{border:none;outline:none;text-indent: 10px;display:block;box-sizing: border-box;width:145px;}
.tips:after{
    content: "";
    position: absolute;
    left: 148px;
    top: 8px;
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-left: 9px solid #fff;
    border-right: 9px solid transparent;
    border-bottom: 9px solid transparent;
}
.tips:before{
    content: "";
    position: absolute;
    left: 148px;
    top: 7px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid #c6c6c6;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
.countTable{    margin: 0 auto;
    border-left: none;
    width: 1107px;}
.countTable thead{     display: table;
    table-layout: fixed;
    box-sizing: border-box;
    background: #ddeeff!important;
    width: calc(100% - 17px);
}
.countTable thead tr{border-top:none!important;}
.countTable tbody{    display: inline-block;
    overflow-y: auto;
    max-height: 60vh;
    box-sizing: border-box;width:100%;}
.countTable  th{border-bottom:none;border-top:none;border-right:1px solid #c6c6c6;width:30px;}
.countTable  th:last-child{border-right:none;}
.countTable td{border-bottom: none;border-top:1px solid #c6c6c6;border-right:1px solid #c6c6c6;width:30px;}
.countTable tr>td:last-child{    border-right: none;
    width: auto;
    min-width: 13px;}
.countTable  th:first-child,.countTable  th:nth-child(2),.countTable tr td:first-child,.countTable tr td:nth-child(2){width:88px;}
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
</style>
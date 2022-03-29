<template>
    <div class="box">
            <el-form :inline="true" :model="form" class="form">
                    <el-form-item label="考核类型">
                        <el-select
                         size="small"
                         v-model="types"
                         placeholder="请选择考核类型"
                         @change="changeTypes"
                         style="width:150px;"
                        >
                         <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                         </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输油处：" prop="AREAID">
                            <el-select
                                size="small"
                                v-model="form.AREAID"
                                placeholder="请选择输油处"
                                @change='changePlace'
                                style="width:150px;"
                                >
                                <el-option
                                    v-for='item in placelist'
                                    :key='item.GROUPCODE'
                                    :label="item.GROUPNAME"
                                    :value="item.GROUPCODE"
                                ></el-option>
                            </el-select>
                    </el-form-item>
                    <template v-if="types!=1">
                        <el-form-item label="输油站：" prop="STATIONID">
                            <el-select
                                size="small"
                                v-model="form.STATIONID"
                                placeholder="请选择输油站"
                                @change="changeStation"
                                style="width:150px;"
                                >
                                <el-option
                                    v-for='item in stationlist'
                                    :key='item.GROUPCODE'
                                    :label="item.GROUPNAME"
                                    :value="item.GROUPCODE"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                    <template v-if="types==3">
                         <el-form-item label="日期：">
                                    <mark style="position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;" v-show="showSeason" @click.stop="showSeason=false"></mark>
                                    <el-input placeholder="请选择季度" v-model="showValue" style="width:138px;" @focus="showSeason=true" class="jidu">
                                            <i slot="prefix" class="el-input__icon el-icon-date"></i>
                                    </el-input>
                                    <el-card
                                    class="box-card"
                                    style="width:322px;padding: 0 3px 20px;margin-top:10px;position:fixed;z-index:9999"
                                    v-show="showSeason"
                                    >
                                    <div slot="header" class="clearfix" style="text-align:center;padding:0">
                                        <button
                                        type="button"
                                        aria-label="前一年"
                                        class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
                                        @click="prev"
                                        ></button>
                                        <span role="button" class="el-date-picker__header-label">{{year}}年</span>
                                        <button
                                        type="button"
                                        aria-label="后一年"
                                        @click="next"
                                        class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
                                        ></button>
                                    </div>
                                    <div class="text item" style="text-align:center;">
                                        <el-button
                                        type="text"
                                        size="medium"
                                        style="width:40%;color: #606266;float:left;"
                                        @click="selectSeason(0)"
                                        >第一季度</el-button>
                                        <el-button
                                        type="text"
                                        size="medium"
                                        style="float:right;width:40%;color: #606266;"
                                        @click="selectSeason(1)"
                                        >第二季度</el-button>
                                    </div>
                                    <div class="text item" style="text-align:center;">
                                        <el-button
                                        type="text"
                                        size="medium"
                                        style="width:40%;color: #606266;float:left;"
                                        @click="selectSeason(2)"
                                        >第三季度</el-button>
                                        <el-button
                                        type="text"
                                        size="medium"
                                        style="float:right;width:40%;color: #606266;"
                                        @click="selectSeason(3)"
                                        >第四季度</el-button>
                                    </div>
                                    </el-card>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="日期：" prop="dateTime">
                            <el-date-picker style="width:150px;" size="small" v-model="form.dateTime" type="month" placeholder="选择日期"  format="yyyy-MM" value-format="yyyy-MM" @change="selectTime"></el-date-picker>
                        </el-form-item>
                    </template>
                    <template v-if="showDeal==true">
                        <el-form-item label="统计模式：">
                             <el-select size="small" v-model="myModel" style="width:150px;" @change="changeModel">
                                <el-option v-for="item in modelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                             </el-select>
                        </el-form-item>
                    </template>
                    <el-form-item>
                        <el-button  size="small" type="primary" @click="search()">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary"  @click="exportToExcel" v-show="showExport">导出</el-button>
                    </el-form-item>
            </el-form>
             <div class="tableBox">
                <h3>国家石油天然气管网集团有限公司华南分公司{{areaName}}{{stationName}}{{typesName}}</h3>
                <div v-if="showTime==true" class="times">
                        <template v-if="types==3">
                            <p>{{showValue}}</p>
                        </template>
                        <template v-else>
                            <p>{{form.dateTime}}</p>
                        </template>
                </div>
                <div v-else class="times"></div>
                <div  id="tableExport" style="height:85%;">
                     <div style="overflow-x:auto;">
                         <table class='countTable'  border="1" bordercolor="#c6c6c6" v-show="showTable" :id="getId(showNum)">
                                    <thead>
                                        <tr>
                                            <th width="150px">排名</th>
                                            <template v-if="showNum">
                                                 <template v-if="myModel!=2">
                                                      <th width="300px">分组名</th>
                                                      <th width="180px">应考核数量</th>
                                                      <th width="180px">实际考核数量</th>
                                                 </template>
                                                 <template v-if="myModel==2">
                                                      <th width="180px">输油处</th>
                                                      <th width="180px">输油站</th>
                                                      <th width="300px">姓名</th>
                                                 </template>
                                            </template>
                                            <template v-else>
                                                 <template v-if="types==1">
                                                     <th width="300px">分组名</th>
                                                 </template>
                                                 <template v-else>
                                                     <th width="300px">姓名</th>
                                                 </template>
                                            </template>
                                            <th>考核分数</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in data" :key="index">
                                            <td width="150px">{{index+1}}</td>
                                            <template v-if="showNum">
                                                 <template v-if="myModel!=2">
                                                      <td width="300px">{{item.NAME}}</td>
                                                      <td width="180px">{{item.MUSTNUM}}</td>
                                                      <td width="180px">{{item.NUM}}</td>
                                                 </template>
                                                 <template v-if="myModel==2">
                                                      <td width="180px">{{item.AREANAME}}</td>
                                                      <template v-if="types==3">
                                                            <td width="180px">{{item.STATIONNAME}}</td>
                                                      </template>
                                                      <template v-else>
                                                            <td width="180px">{{item.GROUPNAME}}</td>
                                                      </template>
                                                      <td width="300px">{{item.NAME}}</td>
                                                 </template>
                                            </template>
                                            <template v-else>
                                                 <td width="300px">{{item.NAME}}</td>
                                            </template>
                                            <td>{{item.AVG | twoNumber}}</td>
                                        </tr>
                                    </tbody>
                        </table>
                     </div>
                </div>
             </div>
    </div>
</template>
<script>
import { tableToExcel } from '../../libs/xml';
export default {
     props: {
            valueArr: {
            default: () => {
                return ['01-03', '04-06', '07-09', '10-12']
            },
            type: Array
            },
            getValue: {
            default: () => {},
            type: Function
            },
            defaultValue: {
            default: '',
            type: String
            }
     },
    data(){
        return{
            options: [{
                value: '1',
                label: '巡线承揽单位考核'
                }, {
                value: '2',
                label: '巡线承揽人考核'
                }, {
                value: '3',
                label: '线路区段长考核'
                }],
            form: {
                AREAID: '',
                STATIONID: '',
                dateTime:"",
            },
            types: '',
            showSeason: false,
            season: '',
            year: new Date().getFullYear(),
            showValue: '',
            placelist:[],
            stationlist:[],
            areaName:'',
            stationName:"",
            typesName:"",
            data:[],
            showTime:false,
            showNum:false,
            showTable:false,
            showExport:false,
            showDeal:false,//是否为详细统计
            myModel:null,
            modelList:[
                {
                    "label":"概要模式",
                    "value":1,
                },
                {
                    "label":"详细模式",
                    "value":2,
                },
            ],
        }
    },
    created() {
        if (this.defaultValue) {
        let value = this.defaultValue
        let arr = value.split('-')
        this.year = arr[0].slice(0, 4)
        let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
        let arrAll = this.valueArr
        this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
        }
  },
  watch: {
    defaultValue: function(value, oldValue) {
      let arr = value.split('-')
      this.year = arr[0].slice(0, 4)
      let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
      let arrAll = this.valueArr
      this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`;
    },
    '$route' (to, from) { //监听路由是否变化
                if(to.path != from.path){
                    this.init();//重新加载数据
                }
    }
  },
    mounted(){
        this.init();
    },
    methods:{
         init(){
            this.types='';
            this.form.AREAID="";
            this.form.dateTime="";
            this.showDeal=false;
            this.getAllArea();//获取输油处
            this.changePlace(this.form.AREAID);//根据输油处获取输油站
        },
         //获取输油处
        getAllArea(){
            let url='gpsGroups/getAllArea?userId=' +this.$Cookie.get('userId');
            this.$myHttp.get(url).then((res) => {
                this.placelist = res.result;
            });
            this.data=[];
        },
        //获取输油站
        changePlace(val){
                this.form.STATIONID="";
                let url='gpsGroups/getStationsByArea?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val;
                this.$myHttp.get(url).then((res) => {
                  this.stationlist = res.result;
                });
                this.data=[];
                this.typesName="";
                this.areaName='';
                this.stationName="";
                this.showTime=false;
                this.showTable=false;
                this.showExport=false;
                if(this.types!=1&&this.types!=''){
                    this.showDeal=true;
                    this.myModel=null;
                }
        },
        changeModel(){
            this.data=[];
            this.typesName="";
            this.areaName='';
            this.stationName="";
            this.showTime=false;
            this.showTable=false;
            this.showExport=false;
        },
        changeTypes(val){
           this.data=[];
           this.form.AREAID="";
           this.form.STATIONID="";
           this.typesName="";
           this.areaName='';
           this.stationName="";
           this.showTime=false;
           this.stationlist=[];
           this.showTable=false;
           this.showExport=false;
           this.myModel=null;
           if(val!=1){
               this.showDeal=true;
           }else{
               this.showDeal=false;
           }
           this.myModel=null;
        },
        changeStation(val){
           this.data=[];
           this.typesName="";
           this.areaName='';
           this.stationName="";
           this.showTime=false;
           this.showTable=false;
           this.showExport=false;
           if(val==''||val==null){
               this.showDeal=true;
           }else{
               this.showDeal=false;
           }
           this.myModel=null;
        },
        search(){
            this.data.length=0;
            let time="";
            if(this.types==3){
               time=this.showValue;
            }else{
                time=this.form.dateTime;
            }
            if(this.types==""||time==""){
                     window.vm.$message({
                            type: 'error',
                            message:'请选择排名类型，日期',
                            showClose: true,
                            duration: 2000,
                     });
            }else{
                this.showTime=true;
                this.options.map((item)=>{
                    if(this.types==item.value){
                        this.typesName=item.label;
                    }
                })
                this.placelist.map((item)=>{
                    if(this.form.AREAID==item.GROUPCODE){
                        if(item.GROUPNAME!="全部"){
                           this.areaName=item.GROUPNAME;
                        }else{
                           this.areaName="";
                        }
                        
                    }
                })
                this.stationlist.map((item)=>{
                    if(this.form.STATIONID==item.GROUPCODE){
                        if(item.GROUPNAME!="全部"){
                           this.stationName=item.GROUPNAME;
                        }else{
                           this.stationName="";
                        }
                        
                    }
                })
                let url="";
                let params={};
                if(this.types==1){
                    url='contractor/getContractorStat';
                    params={"areaId":this.form.AREAID,"queryDate":this.form.dateTime}
                }else if(this.types==2){
                    if(this.myModel==2){
                     url='contractorMan/getContractManStat2';
                    }else{
                     url='contractorMan/getContractManStat';
                    }
                    params={"areaId":this.form.AREAID,"stationId":this.form.STATIONID,"queryDate":this.form.dateTime}
                }else{
                    if(this.myModel==2){
                        url='pipeManaExam/getPipeManaExamStat2';;
                    }else{
                        url='pipeManaExam/getPipeManaExamStat';
                    }
                    params={
                        "areaId":this.form.AREAID,
                        "season":this.season,
                        "stationId":this.form.STATIONID,
                        "year":this.year
                    };
                }
                let contentType={
                   headers:{"content-type": "application/json"},
                }
                this.$myHttp.post(url,JSON.stringify(params),contentType).then((res) => {
                    if(res.result!=null){
                        let datas=res.result;
                        if(this.types==1){ 
                            if(this.form.AREAID==''){
                                this.showNum=true;
                                datas.map((item)=>{
                                    if(item.MUSTNUM!=null&&item.NAME!="管道管理处"&&item.NAME.indexOf("分队")==-1){
                                        this.data.push(item);
                                    }
                                })
                            }else{
                                this.showNum=false;
                                datas.map((item)=>{
                                    if(item.NAME!="管道管理处"&&item.NAME.indexOf("分队")==-1){
                                        this.data.push(item);
                                    }
                                })
                            }
                        }else{
                            if(this.myModel==2){//详细模式
                                this.showNum=true;
                                this.data=datas;
                            }else{
                                if(this.form.STATIONID==''){
                                    this.showNum=true;
                                    datas.map((item)=>{
                                        if(item.MUSTNUM!=null&&item.NAME!="管道管理处"&&item.NAME.indexOf("分队")==-1){
                                            this.data.push(item);
                                        }
                                    })
                                }else{
                                    this.showNum=false;
                                    datas.map((item)=>{
                                        if(item.NAME!="管道管理处"&&item.NAME.indexOf("分队")==-1){
                                            this.data.push(item);
                                        }
                                    })
                                }
                            }
                        }
                        this.showExport=true;
                        this.showTable=true;
                    }
                });
            }
         },
        exportToExcel() {
            tableToExcel('tableExport', '巡检质量排名统计');
        },
        selectTime(val){
           this.data=[];
           this.typesName="";
           this.areaName='';
           this.stationName="";
           this.showTable=false;
           this.showExport=false;
        },
        one() {
          this.showSeason = false
        },
        prev() {
          this.year = this.year * 1 - 1
        },
        next() {
          this.year = this.year * 1 + 1
        },
        selectSeason(i) {
            let that = this
            that.season = i + 1
            let arr = that.valueArr[i].split('-')
            that.getValue(that.year + arr[0] + '-' + that.year + arr[1])
            that.showSeason = false
            this.showValue = `${this.year}年${this.season}季度`;
            this.data=[];
            this.typesName="";
            this.areaName='';
            this.stationName="";
            this.showTime=false;
            this.showTable=false;
            this.showExport=false;
        },
        getId(flag){
            if(flag==true){
                return "longTable";
            }else{
                return "shortTable";
            }
        }
    },
    filters:{
        twoNumber(val) { 
            val=Number(val);           
        	return val.toFixed(2);       
        }
    }
}
</script>
<style scoped>
.box{position: relative;width:100%;height: 100%;}
.form{margin:2vh auto;width:98%;}
.tableBox{width:98%;height:82vh;color:#000000;margin:2vh auto;font-size:13px;background: #fff;text-align: center;}
.tableBox h3{color:#26f4ff;font-size:20px;padding:15px 0 5px 0;}
.tableBox .times{color: #26f4ff;font-size: 14px;height:20px;line-height: 20px;margin-bottom:10px;}
.tableBox table{border-spacing: 0;border-collapse: collapse;}
.export-btn{color: #fff;background-color: #409eff;border-color: #409eff;}
.el-form-item{margin-bottom: 0!important;}

#longTable{width:1000px;}
.countTable{width:640px;margin:0 auto;border-left:none;}
.countTable thead{display:table;width: calc(100% - 17px);table-layout: fixed;box-sizing: border-box;background:#ddeeff!important;}
.countTable thead tr{border-top:none!important;}
.countTable tbody{display:inline-block;width: 100%;overflow-y:auto;max-height:60vh;box-sizing: border-box;}
.countTable  th{border-bottom:none;border-top:none;border-right:1px solid #c6c6c6;}
.countTable  th:last-child{border-right:none;}
.countTable td{border-bottom: none;border-top:1px solid #c6c6c6;border-right:1px solid #c6c6c6;}
.countTable tr>td:last-child{border-right: none;min-width:170px;}

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
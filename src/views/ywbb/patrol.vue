<template>
    <div class="box">
            <el-form :inline="true" :model="form" class="form">
                    <el-form-item label="统计模块">
                        <el-select
                         size="small"
                         v-model="types"
                         placeholder="请选择统计模块"
                         @change="changeTypes"
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
                                >
                                <el-option
                                    v-for='item in placelist'
                                    :key='item.GROUPCODE'
                                    :label="item.GROUPNAME"
                                    :value="item.GROUPCODE"
                                ></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="输油站：" prop="STATIONID">
                            <el-select
                                size="small"
                                v-model="form.STATIONID"
                                placeholder="请选择输油站"
                                @change="changeStation"
                                >
                                <el-option
                                    v-for='item in stationlist'
                                    :key='item.GROUPCODE'
                                    :label="item.GROUPNAME"
                                    :value="item.GROUPCODE"
                                ></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="日期：" prop="dateTime">
                            <template v-if="types==4">
                                <el-date-picker style="width:270px"
                                    v-model="form.dateTime"
                                    :format='"第"+weekNum+"周("+time1+"~"+time2+")"'
                                    type="week"
                                    @change="changeDate"
                                    :picker-options="pickerOptions"
                                    placeholder="选择周">
                                </el-date-picker>
                            </template>
                            <template v-else-if="types==3">
                                <el-date-picker size="small" v-model="form.dateTime" type="month" placeholder="选择日期"  format="yyyy-MM" value-format="yyyy-MM" @change="selectTime"></el-date-picker>
                            </template>
                            <template v-else>
                                <el-date-picker size="small" v-model="form.dateTime" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="selectTime"></el-date-picker>
                            </template>
                        </el-form-item>
                    <el-form-item>
                        <el-button  size="small" type="primary" @click="search()">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary"  @click="exportToExcel" v-show="showExport">导出</el-button>
                    </el-form-item>
            </el-form>
             <div class="tableBox">
                <h3>{{areaName}}{{stationName}}{{typesName}}完成情况统计</h3>
                <div v-if="showTime==true" class="times">
                        <template v-if="types!=4">
                            <p>{{form.dateTime}}</p>
                        </template>
                        <template v-else>
                            {{"第"+weekNum+"周("+time1+"~"+time2+")"}}
                        </template>
                </div>
                <div v-else class="times"></div>
                <div id="tableExport" style="height:85%;" >
                       <component :is="currentView" :tableData="tableData" :types="types" :times="form.dateTime" v-if="showComponent"></component>
                </div>
             </div>
    </div>
</template>
<script>
import { tableToExcel } from '../../libs/xml';
import ghgCount from './ghgCount.vue';
import sgdCount from './sgdCount.vue';
import clrCount from './clrCount.vue';
import ykdCount from './ykdCount.vue';
export default {
    components: { ghgCount,sgdCount,clrCount,ykdCount},
    data(){
        return{
            options: [
                {
                    value: '0',
                    label: '施工点承揽人二巡'
                }, {
                    value: '1',
                    label: '二级人口密集型高后果区'
                }, {
                    value: '2',
                    label: '三级人口密集型高后果区'
                },
                {
                    value: '3',
                    label: '外管员/站长施工点巡查'
                },
                {
                    value: '4',
                    label: '外管员/站长预控点巡查'
                }
                ],
            form: {
                AREAID: '',
                STATIONID: '',
                dateTime:'',
            },
            types:'',
            placelist:[],
            stationlist:[],
            areaName:'',
            stationName:"",
            typesName:"",
            tableData:[],
            showTime:false,
            showNum:false,
            time1:null,
            time2:null,
            weekNum:null,
            pickerOptions: {//禁用今天之前的日期
            'firstDayOfWeek': 1,
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
            arr:['clrCount','ghgCount','ghgCount','sgdCount','ykdCount'],
            currentView:'',
            showComponent:false,
            showExport:false,
        }
    },
    watch: {
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
            this.form.AREAID="";
            this.form.dateTime="";
            this.getAllArea();//获取输油处
            this.changePlace(this.form.AREAID);//根据输油处获取输油站
        },
         //获取输油处
        getAllArea(){
            let url='gpsGroups/getAllArea?userId=' +this.$Cookie.get('userId');
            this.$myHttp.get(url).then((res) => {
                this.placelist = res.result;
            });
            this.tableData=[];
            this.showComponent=false;
            this.showExport=false;
        },
        //获取输油站
        changePlace(val){
                this.form.STATIONID="";
                let url='gpsGroups/getStationsByArea?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val;
                this.$myHttp.get(url).then((res) => {
                  this.stationlist = res.result;
                });
                this.tableData=[];
                this.typesName="";
                this.areaName='';
                this.stationName="";
                this.showTime=false;
                this.showComponent=false;
                this.showExport=false;
        },
        changeTypes(val){
           this.tableData=[];
           this.form.AREAID="";
           this.form.STATIONID="";
           this.typesName="";
           this.areaName='';
           this.stationName="";
           this.showTime=false;
           this.stationlist=[];
           this.form.dateTime="";
           if(val==4){
               this.form.dateTime=new Date();
               this.changeDate(this.form.dateTime);
           }
           this.showComponent=false;
           this.showExport=false;
        },
        changeStation(){
           this.tableData=[];
           this.typesName="";
           this.areaName='';
           this.stationName="";
           this.showTime=false;
           this.showComponent=false;
           this.showExport=false;
        },
        search(){
            let time="";
            time=this.form.dateTime;
            if(this.types==""||time==""||time==null){
                     window.vm.$message({
                            type: 'error',
                            message:'请选择统计模块，日期',
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
                console.log(this.form.dateTime);
                this.currentView=this.arr[this.types];
                let url="";
                let params={};
                params={"areaId":this.form.AREAID,"stationId":this.form.STATIONID,"queryDate":this.form.dateTime,"userId":this.$Cookie.get('userId')}
                let contentType={
                   headers:{"content-type": "application/json"},
                }
                if(this.types==0){
                    url="secondPatrol/getSecondPatrolList";
                }
                if(this.types==1){
                    url="secondPatrol/getGhgSecondList";
                }
                if(this.types==2){
                    url="secondPatrol/getGhgThirdList";
                }
                if(this.types==3){
                    url="secondPatrol/getConstructionList";
                }
                if(this.types==4){
                   url="secondPatrol/getPreControlList";
                   params={"areaId":this.form.AREAID,"stationId":this.form.STATIONID,"endDate":this.time2,"startDate":this.time1,"userId":this.$Cookie.get('userId')}
                }
                this.$myHttp.post(url,JSON.stringify(params),contentType).then((res) => {
                    if(res.result!=null){
                        this.tableData=res.result;
                        this.showComponent=true;
                        this.showExport=true;
                    }
                });
            }
         },
        exportToExcel() {
            let name="";
            if(this.types==0){
                name="施工点承揽人二巡统计";
            }
            if(this.types==1){
               name="二级人口密集型高后果区统计";
            }
            if(this.types==2){
               name="三级人口密集型高后果区统计";
            }
            if(this.types==3){
               name="外管员/站长施工点巡查统计";
            }
            if(this.types==4){
              name="外管员/站长预控点巡查统计";
            }
            tableToExcel('tableExport',name);
        },
        selectTime(val){
           this.tableData=[];
           this.typesName="";
           this.areaName='';
           this.stationName="";
        },
        changeDate(val){
           this.time1=this.dayjs(val).startOf("isoWeek").format("YYYY-MM-DD");
           this.time2=this.dayjs(val).endOf("isoWeek").format("YYYY-MM-DD");
           this.getWeekInfoInYear(this.time1,this.time2);
        },
        getWeekInfoInYear(startTime, endTime) {
                var startTimeObj = this.dayjs(startTime);
                var endTimeObj = this.dayjs(endTime);
                for (var year = this.getYear(startTime); year <= this.getYear(endTime); year++) {
                    var totalWeek = this.dayjs(year).isoWeeksInYear();
                    for (var i = 1; i <= totalWeek; i++) {
                        var pass = true;
                        
                        // 获取当前星期的星期一和星期天日期
                        var start = this.dayjs(year+'01-01').week(i).isoWeekday(1).format('YYYY-MM-DD');
                        var end = this.dayjs(year+'01-01').week(i).isoWeekday(7).format('YYYY-MM-DD');

                        //如果起始时间大于当前区间开始时间，小于区间结束时间，将区间开始时间 = 起始时间
                        if (startTimeObj.isSameOrAfter(this.dayjs(start)) && startTimeObj.isSameOrBefore(this.dayjs(end))) {
                            start = startTimeObj.format('YYYY-MM-DD');
                        }

                        //如果终止时间大于当前区间开始时间，小于区间结束时间，将区间结束时间 = 终止时间
                        if (endTimeObj.isSameOrAfter(this.dayjs(start)) && endTimeObj.isSameOrBefore(this.dayjs(end))) {
                            end = endTimeObj.format('YYYY-MM-DD');
                        }

                        //如果当前区间结束时间小于起始时间 或者 当前区间开始时间大于结束时间 则不落入范围内排除
                        if (this.dayjs(end).isBefore(startTime) || this.dayjs(start).isAfter(endTime)) {
                            pass = false;
                        }

                        if (pass) {
                           this.weekNum=i;
                        }
                    }
                }
        },
        getYear(date) {
                return this.dayjs(date).year();
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
.export-btn{color: #fff;background-color: #409eff;border-color: #409eff;}
.spScollor table{
    border-collapse: collapse;
    width:90%;
    border:1px solid #c6c6c6 !important;
    margin:0 auto;
    border-spacing: 0;
}
.el-form-item{margin-bottom: 0!important;}
</style>

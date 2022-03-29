<template>
    <div class="box">
            <el-form :inline="true" :model="form" class="form">
                      <el-form-item label="输油处：" prop="AREACODE">
                         <el-select
                                size="small"
                                v-model="form.AREACODE"
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
                    <el-form-item label="输油站：" prop="STATION">
                            <el-select
                                size="small"
                                v-model="form.STATION"
                                placeholder="请选择输油站"
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
                    <el-form-item label="规模：" prop="scale">
                             <el-select  v-model="form.SCALE" style="width:100px;" size="small">
                                <!-- <el-option label="全部" value="0"></el-option>
                                <el-option label="小型" value="1"></el-option>
                                <el-option label="大型" value="2"></el-option> -->
                                 <el-option
                                    v-for='item in myScale'
                                    :key='item.value'
                                    :label="item.name"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="施工状态：" prop="constructionState">
                            <el-select v-model="form.PROJECTSTATE" style="width:100px;" size="small">
                                <!-- <el-option label="全部" value="0"></el-option>
                                <el-option label="正在施工" value="1"></el-option>
                                <el-option label="未施工(包括停工)" value="2"></el-option>
                                <el-option label="以完工" value="3"></el-option> -->
                                <el-option
                                    v-for='item in myState'
                                    :key='item.value'
                                    :label="item.name"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="标准化布控等级：" prop="CONTROLGRADE">
                        <el-select  v-model="form.CONTROLGRADE"  style="width:100px;" size="small">
                                <el-option
                                    v-for='item in controlGradeList'
                                    :key='item.CODEID'
                                    :label="item.CODENAME"
                                    :value="item.CODEID"
                                ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button  size="small" type="primary" @click="search()">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary"  @click="exportExcel()">导出</el-button>
                    </el-form-item>
            </el-form>
            <div style="padding:0 0 10px 20px;">
                <el-button size="small" type="primary" @click="search2()">查询</el-button>
                <el-button size="small" type="primary" @click="operation('查看')">查看</el-button>
                <el-button size="small" type="primary" @click="operation('新增')">新增</el-button>
                <el-button size="small" type="primary" @click="operation('修改')">修改</el-button>
                <el-button size="small" type="primary" @click="delet()">删除</el-button>
                <el-button size="small" type="primary" @click="site()">定位</el-button>
                <el-button size="small" type="primary" @click="history()">查看历史记录</el-button>
                <el-button size="small" type="primary" @click="showDynamic()">施工动态</el-button>
                <el-button size="small" type="primary" @click="dynamicList()">施工动态列表</el-button>
                <el-button size="small" type="primary" @click="addRecord()">抽查登记</el-button>
                <el-button size="small" type="primary" @click="checkList()">查看抽查列表</el-button>
            </div>
            <div class="tableBox">
                <div  id="tableExport">
                    <el-table height="calc(100vh - 300px)" 
                    :data="tableData.slice((currentPage - 1) * pageSize, currentPage*pageSize)" tooltip-effect="dark" border style="width: 100%"   
                    :header-cell-style="{background:'#fff','text-align':'center'}" :cell-style="{'text-align':'center'}"
                    highlight-current-row
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    >
                        <el-table-column label="工程信息">
                               <!-- <el-table-column  type="index" label="序号" width="50px;">
                                    <template slot-scope="scope">
                                        <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                                    </template>
                                </el-table-column> -->
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="RISK" label="施工风险等级">
                                     <template scope="scope">
                                         <template v-if="scope.row.RISK=='低风险'">
                                             <template v-if="scope.row.RISKCNS!=null&&scope.row.RISKCNS!='低风险'">
                                                 <span style="color:#409eff;"><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4285f4;"></i>低风险</span>
                                             </template>
                                             <template v-else>
                                                <span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4285f4;"></i>低风险</span>
                                             </template>
                                         </template>
                                         <template v-else-if="scope.row.RISK=='中风险'">
                                             <template v-if="scope.row.RISKCNS!=null&&scope.row.RISKCNS!='中风险'">
                                                 <span style="color:#409eff;"><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#fbbc05;"></i>中风险</span>
                                             </template>
                                             <template v-else>
                                                <span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#fbbc05;"></i>中风险</span>
                                             </template>
                                         </template>
                                         <template v-else-if="scope.row.RISK=='高风险'">
                                             <template v-if="scope.row.RISKCNS!=null&&scope.row.RISKCNS!='高风险'">
                                                 <span style="color:#409eff;"><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ea4335;"></i>高风险</span>
                                             </template>
                                             <template v-else>
                                                <span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ea4335;"></i>高风险</span>
                                             </template>
                                         </template>
                                         <template v-else>
                                             <span></span>
                                         </template>
                                     </template>
                                </el-table-column>
                                <el-table-column prop="AREANAME" label="输油部（分公司）"></el-table-column>
                                <el-table-column prop="STATIONNAME" label="站场"></el-table-column>
                                <el-table-column prop="PROJECTNAME" label="工程名称"></el-table-column>
                                <el-table-column prop="POSITION" label="具体位置"></el-table-column>
                                <el-table-column prop="MILEAGEID" label="桩号"></el-table-column>
                                <el-table-column prop="SCALE" label="规模"></el-table-column>
                                <el-table-column prop="PROJECTTYPECN" label="施工类型"></el-table-column>
                                <el-table-column prop="COMPANY" label="施工单位名称"></el-table-column>
                                <el-table-column prop="DIRECTOR" label="负责人"></el-table-column>
                                <el-table-column prop="DIRECTORPHONE"  label="联系方式"></el-table-column>
                                <el-table-column prop="PROJECTSTATE" label="施工状态">
                                     <template scope="scope">  
                                         <template v-if="scope.row.PROJECTSTATES!=''&&scope.row.PROJECTSTATES!=scope.row.PROJECTSTATE">
                                             <span style="color:#409eff;">{{scope.row.PROJECTSTATE}}</span>
                                         </template>  
                                         <template v-else>
                                             <span>{{scope.row.PROJECTSTATE}}</span>
                                         </template>
                                     </template>
                                </el-table-column>
                                <el-table-column prop="DESCRIPTION" :label="'第三方工程信息 | 简要描述'" :render-header="renderheader"></el-table-column>
                                <el-table-column prop="CONTROLGRADECN" label="标准化布控等级"></el-table-column>
                                <el-table-column prop="EXCAVATIONNUM" label="开挖深坑数量"></el-table-column>
                                <el-table-column prop="TUTELAGE" :label="'是否全时监护 | (24小时)'" :render-header="renderheader"></el-table-column>
                                <el-table-column prop="TUTELAGENAME" :label="'现场监护人|（监理）及电话'" :render-header="renderheader">
                                    <template scope="scope">
                                         <template v-if="scope.row.TUTELAGENAMES!=null&&(scope.row.TUTELAGENAMES+''+scope.row.TUTELAGETEL)!=scope.row.TUTELAGENAME">
                                             <span style="color:#409eff;">{{scope.row.TUTELAGENAME}}</span>
                                         </template>
                                         <template v-else>
                                             <span>{{scope.row.TUTELAGENAME}}</span>
                                         </template>
                                     </template>
                                </el-table-column>
                                <el-table-column prop="PERSONNAME" :label="'责任区巡线员 | 及电话'" :render-header="renderheader"></el-table-column>
                                <el-table-column prop="PIPEMANNAME" :label="'责任区段长 | 及电话'" :render-header="renderheader"></el-table-column>
                                <el-table-column prop="CAMERAID" label="视频编号">
                                     <template scope="scope">
                                         <template v-if="scope.row.CAMERAIDS!=null&&scope.row.CAMERAIDS!=scope.row.CAMERAID">
                                             <span style="color:#409eff;">{{scope.row.CAMERAID}}</span>
                                         </template>
                                         <template v-else>
                                             <span>{{scope.row.CAMERAID}}</span>
                                         </template>
                                     </template>
                                </el-table-column>
                                <el-table-column prop="CREATER" label="创建人"></el-table-column>
                                <el-table-column prop="REPORTDATE" label="创建时间"></el-table-column>
                                <el-table-column prop="UPDATER" label="最后修改人"></el-table-column>
                                <el-table-column prop="UPDATETIME" label="最后修改时间"></el-table-column>
                        </el-table-column>
                 </el-table>
                </div>
            </div>
            <div class="paginationBox">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,15,20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
            </div>
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
            <deal-third
             :formobj='formobj'
             v-if="showDeal"
             :title="title"
             :flag="flag"
             @close="closeDeal"
             :loading="loading"
             @sub='submitDetail'
            >
            </deal-third>
            <thrid-history
            :historyId='historyId'
             v-if="historyShow"
             @closeHistory="closeHistory"
            >
            </thrid-history>
            <thrid-search
            v-if="searchShow"
            @subSearch="submitSearch"
            @closeSearch="closeSearch"
            ></thrid-search>
            <check-record
            v-if="showRecord"
            @subRecord="submitRecord"
            @closeRecord="closeRecord"
            :SERIALID="SERIALID"
            ></check-record>
            <add-dynamic
            v-if="dynamicShow"
            @subDynamic="subDynamic"
            @closeDynamic="closeDynamic"
            :dynamicTitle="dynamicTitle"
            :SERIALID="SERIALID"
            >
            </add-dynamic>
            <check-list
            v-if="checkListShow"
            @closeCheckList="closeCheckList"
            @subCheckList="subCheckList"
            ></check-list>
            <dynamic-list
            v-if="dynamicListShow"
            @closeDynamicList="closeDynamicList"
            :tId="SERIALID"
            ></dynamic-list>
    </div>
</template>
<script>
import dealThird from '../../components/dealThird.vue'
import thridHistory from '../../components/thridHistory.vue'
import thridSearch from '../../components/thridSearch.vue'
import checkRecord from '../../components/checkRecord.vue'
import addDynamic from '../../components/addDynamic.vue'
import checkList from '../../components/checkList.vue'
import dynamicList from '../../components/dynamicList.vue'
import {export_json_to_excel} from '../../excel/export2Excel'
export default {
    components: { dealThird,thridHistory,thridSearch,checkRecord,addDynamic,checkList,dynamicList},
    data(){
        return{
            myScale:[
                {
                    "value":0,
                    "name":"全部",
                },
                {
                    "value":1,
                    "name":"小型",
                },
                {
                    "value":2,
                    "name":"大型",
                },
            ],
            myState:[
                {
                    "value":0,
                    "name":"全部",
                },
                {
                    "value":1,
                    "name":"正在施工",
                },
                {
                    "value":2,
                    "name":"未施工",
                },
                {
                    "value":3,
                    "name":"已完工",
                },
                {
                    "value":4,
                    "name":"停工",
                },
            ],
            form: {
                "AREACODE":"",//分公司
                "STATION":"",//输油站
                "SCALE":"",//规模
                "CONTROLGRADE":"",//标准化布控等级
                "PROJECTSTATE":"",//施工状态
            },

            placelist:[],
            stationlist:[],
            controlGradeList:[],
            tableData:[],
            currentPage: 1,
            pageSize: 10,
            total:0,
            //src:"./static/AntuMap/AntuMap.html",
            mapBool:false,
            showTable:false,
            showDeal:false,
            currentRow: null,
            historyShow:false,
            historyId:"",
            title:'',
            flag:1,
            searchShow:false,
            obj:{
                "areaId": "",
                "controlGrade": "",
                "projectState":0,
                "scale":0,
                "stationId": "",
                "endDate":null,
                "endDate2":null,
                "startDate":null,
                "startDate2":null,
                "userId":this.$Cookie.get('userId')
            },
            loading:false,
            formobj: {},
            showRecord:false,
            dynamicShow:false,
            checkListShow:false,
            dynamicListShow:false,
            SERIALID:'',
            multipleSelection:[],
            dynamicTitle:"新增",
            loading:false,
        }
    },
    watch: {
        '$route' (to, from) { //监听路由是否变化
                    if(to.path != from.path){
                        this.init();//重新加载数据
                    }
        }
    },
    created(){
        this.form.SCALE=this.myScale[0].value;
        this.form.PROJECTSTATE=this.myState[0].value;
        this.init();
    },
    methods:{
         init(){
            this.form.AREAID="";
            this.getAllArea();//获取输油处
            this.changePlace(this.form.AREAID);//根据输油处获取输油站
            this.getControlGrades();
            this.total=0;
            this.currentPage=1;
            this.submitSearch(this.obj);
        },
        handleSelectionChange(val)
        {
             if(val.length >=2){
                    // 删除索引为0的
                    let arrays = val.splice(0,val.length-1)
                    arrays.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row); //除了当前点击的，其他的全部取消选中
                    })
            }
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.pageSize=val;//每页多少条
        },
        handleCurrentChange(val) {
            this.currentPage=val;//当前页
        },
         //获取输油处
        getAllArea(){
            let url='gpsGroups/getAllArea?userId=' + this.$Cookie.get('userId');
            this.$myHttp.get(url).then((res) => {
                this.placelist = res.result;
            });
            this.showTable=false;
        },
        //获取输油站
        changePlace(val){
                this.form.STATIONID="";
                let url='gpsGroups/getStationsByArea?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val;
                this.$myHttp.get(url).then((res) => {
                  this.stationlist = res.result;
                });
                this.showTable=false;
        },
        getControlGrades(){
            this.$myHttp.get('gpsGroups/getApCodomainsByCode?code='+"gps_controlgrade").then((res)=>{
              this.controlGradeList=res.result;
            })
        },
        //查询数据
        search(){
            let params={
                "areaId":this.form.AREACODE,
                "controlGrade":this.form.CONTROLGRADE,
                "projectState":this.form.PROJECTSTATE,
                "scale":this.form.SCALE,
                "stationId":this.form.STATION,
                "userId":this.$Cookie.get('userId')
            };
            this.obj=params;
            this.submitSearch(this.obj);
        },
        search2(){
          this.searchShow=true;
        },
        closeSearch(){
          this.searchShow=false;
        },
        //删除
        delet(){
           if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                window.vm.$message({
                    type: 'error',
                    message:'请选择一条第三方施工信息',
                    showClose: true,
                    duration: 2000,
                });
           }else{
                let id=this.multipleSelection[0].SERIALID;
                window.vm.$confirm('确定是否删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                       this.$myHttp.get('construction/delThirdConstruction?userId='+this.$Cookie.get('userId') +'&id=' +id).then((res) => {
                               if (res.success) {
                                    window.vm.$message({
                                        type: 'success',
                                        message: res.msg,
                                        showClose: true,
                                        duration: 2000,
                                    });
                                    this.tableData.forEach((v, i) => {
                                        if(this.multipleSelection[0].SERIALID == v.SERIALID){
                                            this.tableData.splice(i, 1);
                                        }
                                    })
                                    this.total=this.tableData.length;
                                    let currentPage = this.currentPage > Math.ceil(this.total/this.pageSize) ? Math.ceil(this.total/this.pageSize) : this.currentPage;
                                    this.currentPage = this.currentPage < 1 ? 1 : currentPage;
                                } else {
                                    window.vm.$message({
                                        type: 'error',
                                        message: res.msg || '操作失败',
                                        showClose: true,
                                        duration: 2000,
                                    });
                                }
                       });
                })
           }
        },
        operation(title){
           if(title=="修改"||title=="查看"){
               if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                     window.vm.$message({
                            type: 'error',
                            message:'请选择一条第三方施工信息',
                            showClose: true,
                            duration: 2000,
                     });
                }else{
                    let myId=this.multipleSelection[0].SERIALID;
                    this.$myHttp.get('construction/getThirdConstructionInfo?id='+myId).then((res) => {
                         this.formobj=res.result;
                         this.title=title;
                         this.showDeal=true;
                    });
                }
            }else{//新增
                this.formobj={};
                this.title=title;
                this.showDeal=true;
            }
            if(title=="查看"){
                this.flag=0;
            }else{
                this.flag=1;
            }
        },
        //查看轨迹
        site(){
           this.mapBool = true;
        },
        closeMap() {
            this.mapBool = false;
            sessionStorage.setItem('mapInfo', null);
        },
        //关闭处理页面
        closeDeal(){
           this.showDeal=false;
        },
        //查询回显
        submitSearch(e){
           return this.$myHttp.post('construction/getThirdConstructionList',e).then((res) => {
                            if (res.success) {
                                this.searchShow = false;
                                //this.tableData=res.result;
                                if(res.result!=null&&res.result!=""){
                                  this.tableData=res.result.map((v)=>{
                                    let PROJECTSTATE='';
                                    if(v.PROJECTSTATE==1){
                                        PROJECTSTATE=" 正在施工";
                                    }else if(v.PROJECTSTATE==2){
                                        PROJECTSTATE=" 未施工";
                                    }else if(v.PROJECTSTATE==3){
                                        PROJECTSTATE="已完工";
                                    }else{
                                        PROJECTSTATE="停工";
                                    }
                                    let PROJECTSTATES='';
                                    if(v.PROJECTSTATES==1){
                                        PROJECTSTATES=" 正在施工";
                                    }else if(v.PROJECTSTATES==2){
                                        PROJECTSTATES=" 未施工";
                                    }else if(v.PROJECTSTATES==3){
                                        PROJECTSTATES="已完工";
                                    }else{
                                        PROJECTSTATES="停工";
                                    }
                                    let riskType='';
                                    if(v.RISK==1){
                                        riskType="高风险";
                                    }else if(v.RISK==2){
                                        riskType="中风险";
                                    }else{
                                        riskType="低风险";
                                    }
                                    let PERSONTEL='';
                                    if(v.PERSONTEL!=''&&v.PERSONTEL!=null){
                                        PERSONTEL=v.PERSONTEL;
                                    }else{
                                        PERSONTEL='';
                                    }
                                    let TUTELAGETEL='';
                                    if(v.TUTELAGETEL!=''&&v.TUTELAGETEL!=null){
                                        TUTELAGETEL=v.TUTELAGETEL;
                                    }else{
                                        TUTELAGETEL='';
                                    }
                                    return {...v,SCALE:v.SCALE==1?'小型':'大型',PROJECTSTATE:PROJECTSTATE,TUTELAGE:v.TUTELAGE==1?'是':'否',TUTELAGENAME:v.TUTELAGENAME!=null?v.TUTELAGENAME+''+TUTELAGETEL:'',PERSONNAME:v.PERSONNAME!=null?v.PERSONNAME+''+PERSONTEL:'',PIPEMANNAME:v.PIPEMANNAME!=null?v.PIPEMANNAME+''+v.PIPEMANTEL:'',RISK:v.RISK!=null?riskType:'',REPORTDATE:v.REPORTDATE==null?'':this.dayjs(v.REPORTDATE).format('YYYY-MM-DD'),UPDATETIME:v.UPDATETIME==null?'':this.dayjs(v.UPDATETIME).format('YYYY-MM-DD'),PROJECTSTATES:v.PROJECTSTATES==null?'':PROJECTSTATES,TUTELAGETEL:v.TUTELAGETEL==null?'':TUTELAGETEL};
                                  })
                                  this.total=this.tableData.length;
                                }else{
                                    this.tableData=[];
                                }
                            } else {
                                window.vm.$message({
                                    type: 'error',
                                    message: res.msg || '查询失败',
                                    showClose: true,
                                    duration: 2000,
                                });
                            }
           });
        },
        //提交新增，修改
        async submitDetail(e)
        {
            await this.savePop(e);
            this.showDeal=false
            this.loading=false;
            console.log(this.showDeal);
        },
        savePop(e){
            this.loading=true;
            let contentType={
                headers:{"content-type": "application/json"},
            }
            return new Promise(resolve=>{
                 this.$myHttp.post('construction/saveThirdConstruction',JSON.stringify(e),contentType).then(async(res) => {
                        if (res.success) {
                            window.vm.$message({
                                type: 'success',
                                message: '操作成功',
                                showClose: true,
                                duration: 2000,
                            });
                            await this.submitSearch(this.obj);
                            resolve();
                        } else {
                            window.vm.$message({
                                type: 'error',
                                message: res.msg || '操作失败',
                                showClose: true,
                                duration: 2000,
                            });
                        }
                       
                })
            })
        },
        //导出
        exportExcel(){
            const tHeader = ['施工风险等级','输油部（分公司', '站场', '工程名称','具体位置','桩号','规模','施工类型','施工单位名称','负责人','联系方式','施工状态','第三方工程信息简要描述','标准化布控等级','开挖深坑数量','是否全时监护(24小时)','现场监护人（监理）及电话','责任区巡线员及电话','责任区段长及电话','视频编号','创建人','创建时间','最后修改人','最后修改时间']; // 导出的表头名信息
            const filterVal = ['RISK','AREANAME', 'STATIONNAME', 'PROJECTNAME', 'POSITION', 'MILEAGEID', 'SCALE', 'PROJECTTYPECN', 'COMPANY', 'DIRECTOR','DIRECTORPHONE', 'PROJECTSTATE','DESCRIPTION', 'CONTROLGRADECN','EXCAVATIONNUM','TUTELAGE','TUTELAGENAME','PERSONNAME','PIPEMANNAME','CAMERAID','CREATER','REPORTDATE','UPDATER','UPDATETIME']; // 导出的表头字段名，需要导出表格字段名
            const data = this.formatJson(filterVal,this.tableData);
            export_json_to_excel(tHeader, data, ' 第三方施工管理信息');// 导出的表格名称，根据需要自己命名
        },
        formatJson (filterVal, jsonData) {
           return jsonData.map(v => filterVal.map(j => v[j]));
        },
        renderheader(h, { column, $index }) {
            return h('span', {}, [
                h('span', {}, column.label.split('|')[0]),
                h('br'),
                h('span', {}, column.label.split('|')[1])
            ]);
        },
        history(){
             if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                    window.vm.$message({
                        type: 'error',
                        message:'请选择一条第三方施工信息',
                        showClose: true,
                        duration: 2000,
                    });
            }else{
                this.historyId=this.multipleSelection[0].SERIALID;
            }
            this.historyShow=true;
        },
        closeHistory(){
            this.historyShow=false;
        },
        addRecord(){
                if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                     window.vm.$message({
                            type: 'error',
                            message:'请选择一条第三方施工信息',
                            showClose: true,
                            duration: 2000,
                     });
                }else{
                    this.SERIALID=this.multipleSelection[0].SERIALID;
                    this.showRecord=true;
                }
        },
        submitRecord(e){
            this.$myHttp.post('/construction/saveCheck',e).then((res) => {
                console.log(res);
            })
            this.showRecord=false;
        },
        closeRecord(){
            this.showRecord=false;
        },
        showDynamic(){
            if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                    window.vm.$message({
                        type: 'error',
                        message:'请选择一条第三方施工信息',
                        showClose: true,
                        duration: 2000,
                    });
            }else{
                this.SERIALID=this.multipleSelection[0].SERIALID;
                this.dynamicShow=true;
            }
        },
        subDynamic(e){
            this.$myHttp.post('construction/saveTrends',e).then((res)=>{
                console.log(res);
                this.dynamicShow=false;
            })
        },
        closeDynamic(){
            this.dynamicShow=false;
        },
        checkList(){
            this.checkListShow=true;
        },
        subCheckList(){
            this.checkListShow=false;
        },
        closeCheckList(){
            this.checkListShow=false;
        },
        dynamicList(){
            if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                    window.vm.$message({
                        type: 'error',
                        message:'请选择一条第三方施工信息',
                        showClose: true,
                        duration: 2000,
                    });
            }else{
                this.SERIALID=this.multipleSelection[0].SERIALID;
                this.dynamicListShow=true;
            }
        },
        closeDynamicList(){
            this.dynamicListShow=false;
        }
    },
}
</script>
<style scoped>
.box{position: relative;width:100%;height: 100%;}
.form{margin:2vh auto;width:98%;}
.tableBox{width:98%;color:#000000;margin:2vh auto;font-size:13px;text-align: center;}
.tableBox h3{color:#26f4ff;font-size:20px;padding:0px 0 10px 0;}
.tableBox p{color: #26f4ff;font-size: 14px;height:20px;line-height: 20px;margin-bottom:10px;}
.export-btn{color: #fff;background-color: #409eff;border-color: #409eff;}
.spScollor table{
    border-collapse: collapse;
    width:90%;
    border:1px solid #c6c6c6 !important;
    margin:0 auto;
    border-spacing: 0;
}
.el-form-item{margin-bottom: 0!important;}
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
    width: 100%;}
</style>

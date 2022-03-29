<template>
    <div class="box">
        <el-form :inline="true" :model="form" class="form">
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
                @change="changePerson"
                >
                <el-option
                    v-for='item in stationlist'
                    :key='item.GROUPCODE'
                    :label="item.GROUPNAME"
                    :value="item.GROUPCODE"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员：" prop="person">
              <el-select size="small" v-model="form.person" placeholder="请选择考核人员" @change="getName">
                    <el-option
                        v-for='item in personList'
                        :key='item.USERID'
                        :label="item.PERSONNAME"
                        :value="item.USERID"
                    ></el-option>
              </el-select>
          </el-form-item>
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
            <el-form-item>
                <el-button size="small" type="primary" @click="search()">查询</el-button>
            </el-form-item>
            <template v-if="haveSearch">
                <el-form-item>
                    <el-button  size="small" type="primary" @click="save()">保存</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary"  @click="exportToExcel">导出</el-button>
                </el-form-item>
            </template>
        </el-form>
        <div class="tableBox">
             <el-scrollbar style="height:100%;" class="spScollor">
                 <div  id="tableExport">
                    <table class="ckTable" bordercolor="#c6c6c6" border= "1">
                        <tr>
                            <td colspan="2">被考核人：<em style="color:#bd0008;font-style:normal;">{{personName}}</em></td> 
                            <td  colspan="2">考核人：<input type="text" v-model="data.assPerson" class="specailInput editInput"><span>{{data.assPerson}}</span></td> 
                            <td  colspan="2">考核得分：<em style="color:#bd0008;font-style:normal;font-weight:bold;">{{data.score}}</em></td> 
                        </tr>
                        <tr>
                            <th width="5%">序号</th>
                            <th width="10%">考核内容</th>
                            <th width="55%">量化指标</th>
                            <th width="10%">扣分</th>
                            <th width="20%">扣分原因</th>
                        </tr>
                        <tr>
                            <td style="text-align:center;">1</td>
                            <td>巡护频次</td>
                            <td>未按要求每周至少对责任管段巡护3次，并每日对属地巡线工巡护质量进行检查。每发现不到位一次扣5分。</td>
                            <td><input type="number" class="editInput" v-model="data.item1" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'item1')"><span>{{data.item1}}</span></td>
                            <td><input type="text" class="editInput" v-model="data.itemReason1"><span>{{data.itemReason1}}</span></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">2</td>
                            <td>一段一策</td>
                            <td>未有效落实好“一段一策”，每发现一次扣5分。</td>
                            <td><input type="number" class="editInput" v-model="data.item2" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'item2')"><span>{{data.item2}}</span></td>
                            <td><input type="text" class="editInput" v-model="data.itemReason2"><span>{{data.itemReason2}}</span></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">3</td>
                            <td>巡检完成情况</td>
                            <td>未按照要求开展管道巡护，每发现一次扣5分。</td>
                            <td><input type="number" class="editInput" v-model="data.item3" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'item3')"><span>{{data.item3}}</span></td>
                            <td><input type="text" class="editInput" v-model="data.itemReason3"><span>{{data.itemReason3}}</span></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">4</td>
                            <td>巡检设备</td>
                            <td>故意损坏或者丢失巡检设备，扣10分。</td>
                            <td><input type="number" class="editInput" v-model="data.item4" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'item4')"><span>{{data.item4}}</span></td>
                            <td><input type="text" class="editInput" v-model="data.itemReason4"><span>{{data.itemReason4}}</span></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">5</td>
                            <td>巡检记录</td>
                            <td>未填写巡检记录，扣1分。巡检记录不规范，扣0.5分</td>
                            <td><input type="number" class="editInput" v-model="data.item5" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'item5')"><span>{{data.item5}}</span></td>
                            <td><input type="text" class="editInput" v-model="data.itemReason5"><span>{{data.itemReason5}}</span></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">6</td>
                            <td>参加培训或者会议情况</td>
                            <td>未按照要求参加管道巡线员培训或者会议，每缺席一次扣5分。</td>
                            <td><input type="number" class="editInput" v-model="data.item6" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'item6')"><span>{{data.item6}}</span></td>
                            <td><input type="text" class="editInput" v-model="data.itemReason6"><span>{{data.itemReason6}}</span></td>
                        </tr>
                        <tr>
                            <td rowspan="4" style="text-align:center;">7</td>
                            <td rowspan="4">其他扣分项目</td>
                            <td>管道加密巡护,特殊时期或者特殊原因，未按照要求进行加密巡护，每发生一次扣5分。</td>
                            <td rowspan="4"><input type="number" class="editInput" v-model="data.minusScore" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'minusScore')"><span>{{data.minusScore}}</span></td>
                            <td rowspan="4"><input type="text" class="editInput" v-model="data.minusScoreReason"><span>{{data.minusScoreReason}}</span></td>
                        </tr>
                        <tr>
                            <td>第三方施工损伤管道,管辖段每发生一起扣100分</td>
                        </tr>
                        <tr>
                            <td>第三方施工损伤光缆,管辖段每发生一起扣100分</td>
                        </tr>
                        <tr>
                            <td>管道发生新增占压,管辖段每发生一起扣100分</td>
                        </tr>
                        <tr>
                            <td rowspan="8" style="text-align:center;">8</td>
                            <td rowspan="8">其他加分项目</td>
                            <td>及时发现管道打孔盗油未遂事件,每发生一起奖励50分。</td>
                            <td rowspan="8"><input type="number" class="editInput" v-model="data.addScore" @blur="changeScore()"  placeholder="点击输入" @input="setValue($event.target,'addScore')"><span>{{data.addScore}}</span></td>
                            <td rowspan="8"><input type="text" class="editInput" v-model="data.addScoreReason"><span>{{data.addScoreReason}}</span></td>
                        </tr>
                        <tr>
                            <td>及时发现危机管道的安全隐患,根据隐患等级不同，进行相应奖励。</td>
                        </tr>
                        <tr>
                            <td>年度未发生打孔盗油事件,分公司根据情况适当奖励</td>
                        </tr>
                        <tr>
                            <td>综合协调,在管道占压清理、管道临时征地、管道第三方施工协调过程中发挥重要作用，奖励</td>
                        </tr>
                        <tr>
                            <td>突发事件处置,在管道突发事件处置过程中发挥重要作用，奖励   </td>
                        </tr>
                        <tr>
                            <td>年度未发生光缆中断事件,输油部根据情况适当奖励</td>
                        </tr>
                        <tr>
                            <td>年度未发生新增违法占压,输油部根据情况适当奖励</td>
                        </tr>
                        <tr>
                            <td>年度未发生第三方施工损伤,输油部根据情况适当奖励</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">9</td>
                            <td>奖励金额</td>
                            <td></td>
                            <td><input type="number" class="editInput" v-model="data.addAmount" @blur="changeAmount"  placeholder="点击输入" @input="setValue2($event.target,'addAmount')"><span>{{data.addAmount}}</span></td>
                            <td><input type="text" class="editInput" v-model="data.addAmountReason"><span>{{data.addAmountReason}}</span></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">总分</td>
                            <td colspan="4"><em style="color:#bd0008;font-style:normal;font-weight:bold;">{{data.score}}</em></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">基础金额</td>
                            <td colspan="4"><input type="number" class="editInput" v-model="data.baseAmount" @blur="changeAmount" style="text-align:left;font-weight:bold;" placeholder="点击输入"><span>{{data.baseAmount}}</span></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">总金额</td>
                            <td colspan="4"><em style="color:#bd0008;font-style:normal;text-align:left;font-weight:bold;">{{data.amount}}</em></td>
                        </tr>
                    </table>
                 </div>
            </el-scrollbar>
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
          form: {
                AREAID: '',
                STATIONID: '',
                person:"",
          },
          placelist:[],
          stationlist:[],
          personList:[],
          objForm:{
                "addAmount":"",
                "addAmountReason":"",
                "addScore":"",
                "addScoreReason":"",
                "amount":"",
                "areaid":"",
                "assPerson":"",
                "assSeason":"",
                "assYear":"",
                "baseAmount":"",
                "beAssPerson":"",
                "item1":"",
                "item2":"",
                "item3":"",
                "item4":"",
                "item5":"",
                "item6":"",
                "itemReason1":"",
                "itemReason2":"",
                "itemReason3":"",
                "itemReason4":"",
                "itemReason5":"",
                "itemReason6":"",
                "lastmodified":"",
                "minusScore":"",
                "minusScoreReason":"",
                "modifiedby":"",
                "score":"",
                "serialid": 0,
                "stationid":"",
        },
        data:{},
        personName:"",
        personName1:"",
        showSeason: false,
        season: '',
        year: new Date().getFullYear(),
        showValue: '',
        haveSearch:'',
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
            this.form.AREAID="";
            this.showValue="";
            this.personName="";
            this.personName1="";
            this.data=Object.assign({},this.objForm);
            this.getAllArea();//获取输油处
            this.changePlace(this.form.AREAID);//根据输油处获取输油站
        },
         //获取输油处
        getAllArea(){
            let url='pipe/getAreaList?userId=' +this.$Cookie.get('userId');
            this.$myHttp.get(url).then((res) => {
                this.placelist = res.result;
            });
           this.personName="";
           this.data=Object.assign({},this.objForm);
           this.haveSearch=false;
        },
        //获取输油站
        changePlace(val){
            this.form.STATIONID="";
            this.form.person="";
                let url='pipe/getStationList?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val;
                this.$myHttp.get(url).then((res) => {
                  this.stationlist = res.result;
                });
               this.personName="";
               this.data=Object.assign({},this.objForm);
               this.haveSearch=false;
        },
        //获取人员
        changePerson(val){
            this.form.person="";
                let url='pipeManaExam/getPersonList?stationId=' +val;
                this.$myHttp.get(url).then((res) => {
                   this.personList = res.result;
                });
               this.personName="";
               this.data=Object.assign({},this.objForm);
               this.haveSearch=false;
        },
        getName(val){
            let obj={}
            obj=this.personList.find((item)=>{
               return item.USERID===val;
            })
            this.personName1=obj.PERSONNAME;
            if(this.form.AREAID!=""&&this.form.STATIONID!=""&&this.showValue!=""&&this.form.person!=""){
                this.search();
            }else{
                this.personName="";
                this.data=Object.assign({},this.objForm);
            }
        },
        changeAmount(){
           this.data.amount=Number(this.data.baseAmount)+Number(this.data.addAmount);
        },
        exportToExcel() {
            tableToExcel('tableExport', '线路区段长考核标准');
         },
         changeScore(){
                this.data.score=100+Number(this.data.addScore)-(Number(this.data.item1)+Number(this.data.item2)+Number(this.data.item3)+Number(this.data.item4)+Number(this.data.item5)+Number(this.data.item6)+Number(this.data.minusScore));
                if(this.data.score>95){
                   this.data.baseAmount=1000;
                }else if(this.data.score>=80&&this.data.score<=95){
                   this.data.baseAmount=500;
                }else if(this.data.score>=60&&this.data.score<=79){
                   this.data.baseAmount=0;
                }else{
                   this.data.baseAmount=-1000;
                }
                this.changeAmount();
         },
         search(){
            if(this.form.AREAID==""||this.form.STATIONID==""||this.showValue==""||this.form.person==""){
                     window.vm.$message({
                            type: 'error',
                            message:'请选择输油处，输油站，人员，日期',
                            showClose: true,
                            duration: 2000,
                     });
            }else{
                this.personName=this.personName1;
                this.$myHttp.get('pipeManaExam/getInfo?assYear='+this.year+'&assSeason='+this.season+'&userId='+this.form.person).then((res) => {
                    if(res.result!=null){
                        this.data=res.result;
                    }else{
                        this.data=Object.assign({},this.objForm);
                    }
                });
                this.haveSearch=true;
            }
         },
         setValue(target,value) {
            if(target.value > 100 || target.value < 0 ){
                this.data[""+value+""] = '';
                return;
            }
        },
        setValue2(target,value) {
            if(target.value < 0 ){
                this.data[""+value+""] = '';
                return;
            }
        },
         save(){
             if(this.form.AREAID==""||this.form.STATIONID==""||this.showValue==""||this.form.person==""){
                     window.vm.$message({
                            type: 'error',
                            message:'请选择输油处，输油站，人员，日期',
                            showClose: true,
                            duration: 2000,
                     });
            }else{
                 let obj={
                    "gpsPipeManaExam": {
                        "addAmount":this.data.addAmount==""?0:this.data.addAmount,
                        "addAmountReason":this.addAmountReason,
                        "addScore":this.data.addScore==""?0:this.data.addScore,
                        "addScoreReason":this.data.addScoreReason,
                        "amount":this.data.amount==""?0:this.data.amount,
                        "areaid":this.form.AREAID,
                        "assPerson":this.data.assPerson,
                        "assSeason": this.season,
                        "assYear": this.year,
                        "baseAmount":this.data.baseAmount==""?0:this.data.baseAmount,
                        "beAssPerson":this.form.person,
                        "item1":this.data.item1==""?0:this.data.item1,
                        "item2": this.data.item2==""?0:this.data.item2,
                        "item3":this.data.item3==""?0:this.data.item3,
                        "item4": this.data.item4==""?0:this.data.item4,
                        "item5": this.data.item5==""?0:this.data.item5,
                        "item6":this.data.item6==""?0:this.data.item6,
                        "itemReason1":this.data.itemReason1,
                        "itemReason2":this.data.itemReason2,
                        "itemReason3":this.data.itemReason3,
                        "itemReason4":this.data.itemReason4,
                        "itemReason5":this.data.itemReason5,
                        "itemReason6": this.data.itemReason6,
                        "lastmodified":this.data.lastmodified,
                        "minusScore":this.data.minusScore==""?0:this.data.minusScore,
                        "minusScoreReason":this.data.minusScoreReason,
                        "modifiedby":this.data.modifiedby,
                        "score": this.data.score==""?0:this.data.score,
                        "serialid":this.data.serialid,
                        "stationid":this.form.STATIONID
                    },
                    "userId": this.$Cookie.get('userId')
                 };
                 console.log(obj);
                 this.$myHttp.post('pipeManaExam/savePipeManaExam',obj).then((res) => {
                    if(res.success==true){
                        window.vm.$message({
                            type: 'success',
                            message:res.msg,
                            showClose: true,
                            duration: 2000,
                        });
                    }
                 });
            }
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
            if(this.form.AREAID!=""&&this.form.STATIONID!=""&&this.showValue!=""&&this.form.person!=""){
                    this.search();
            }else{
                    this.personName="";
                    this.data=Object.assign({},this.objForm);
                    this.haveSearch=false;
            }
        }
    }
}
</script>
<style scoped>
.box{position: relative;width:100%;height: 100%;}
.form{margin:2vh auto;width:98%;}
.tableBox{width:98%;height:82vh;color:#000000;margin:2vh auto;font-size:13px;background: #fff;}
.tableBox table{border-spacing: 0;border-collapse: collapse;}
.export-btn{color: #fff;background-color: #409eff;border-color: #409eff;}
#tableExport>table{width:100%;height: 100%;box-sizing: border-box;}
.el-form-item{margin-bottom: 0!important;}
.tableBox input{background:none;cursor: pointer;outline:none;color:#409eff;text-align: center;height: 100%;width:100%;vertical-align: middle;border:none;}
.tableBox tr:first-child td input{text-align: left;}
.tableBox tr td span{opacity: 0;display: inline-block;width:0;height: 0;}
.addAmount{display:inline-block;max-width:100px;}
.spInput{display: inline-block;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 100px;}
.specailInput{display:inline-block;width:80%!important;}
</style>
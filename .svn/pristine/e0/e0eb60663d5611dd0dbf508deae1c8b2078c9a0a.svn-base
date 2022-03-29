<template>
  <div class="addList">
    <div class='addTable' id="thirdList">
      <div class='title'>
        查询工程信息
        <span
          class="close"
          @click="cancel"
        >{{"×"}}</span>
      </div>
      <div class="formbox">
        <el-form ref="ruleForm"  :model="form" label-width="130px">
                <el-form-item label="输油处：" prop="AREACODE">
                         <el-select
                                size="small"
                                v-model="form.AREACODE"
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
                    <el-form-item label="输油站：" prop="STATION">
                            <el-select
                                size="small"
                                v-model="form.STATION"
                                placeholder="请选择输油站"
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
                             <el-select  v-model="form.SCALE"  size="small">
                                 <el-option
                                    v-for='item in myScale'
                                    :key='item.value'
                                    :label="item.name"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="施工状态：" prop="constructionState">
                            <el-select v-model="form.PROJECTSTATE"  size="small">
                                <el-option
                                    v-for='item in myState'
                                    :key='item.value'
                                    :label="item.name"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="标准化布控等级：" prop="CONTROLGRADE">
                        <el-select  v-model="form.CONTROLGRADE"   size="small">
                                <el-option
                                    v-for='item in controlGradeList'
                                    :key='item.CODEID'
                                    :label="item.CODENAME"
                                    :value="item.CODEID"
                                ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="施工作业风险等级：">
                      <el-select
                          size="small"
                          v-model="form.risk"
                          >
                          <el-option
                              v-for='item in riskList'
                              :key='item.CODEID'
                              :label="item.CODENAME"
                              :value="item.CODEID"
                          ></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="开工时间" prop="time1">
                      <el-date-picker  size="small" style="width:100%;" v-model="form.STARTDATE" type="date"  placeholder="选择开工时间" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="完工时间" prop="time1">
                      <el-date-picker  size="small" style="width:100%;" v-model="form.ENDDATE" type="date"  placeholder="选择完工时间" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item> -->
                    <el-form-item label="开工时间：">
                       <el-date-picker  size="small" style="width:100%;"
                          v-model="value1"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          type="daterange"
                          @change="chooseTimeRange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="完工时间：">
                       <el-date-picker  size="small" style="width:100%;"
                          v-model="value2"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          type="daterange"
                          @change="chooseTimeRange2"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                       <el-date-picker  size="small" style="width:100%;"
                          v-model="value3"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          type="daterange"
                          @change="chooseTimeRange3"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="更新时间：">
                       <el-date-picker  size="small" style="width:100%;"
                          v-model="value4"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          type="daterange"
                          @change="chooseTimeRange4"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    
        </el-form>
      </div>
      <div class='confirm'>
        <span class="add" @click="submit()">确认</span>
        <span class="close" @click="cancel">取消</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
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
                "ENDDATE":"",
                "ENDDATE2":"",
                "reportEnd":"",
                "updateEnd":"",
                "STARTDATE":"",
                "STARTDATE2":"",
                "reportStart":"",
                "updateStart":"",
                "risk":""
            },
      placelist:[],
      stationlist:[],
      controlGradeList:[],
      riskList:[],
      value1:null,
      value2:null,
      value3:null,
      value4:null,
    };
  },
  created() {
    this.form.SCALE=this.myScale[0].value;
    this.form.PROJECTSTATE=this.myState[0].value;
    this.getAllArea();
    this.getControlGrades();
    this.getRiskList();//获取施工风险等级
  },
  methods: {
   cancel(){
        this.$emit('closeSearch');
   },
  getControlGrades(){
          this.$myHttp.get('gpsGroups/getApCodomainsByCode?code='+"gps_controlgrade").then((res)=>{
            this.controlGradeList=res.result;
          })
      },
    chooseTimeRange(t) {
       this.form.STARTDATE=t[0];
       this.form.STARTDATE2=t[1];
    },
     chooseTimeRange2(t) {
       this.form.ENDDATE=t[0];
       this.form.ENDDATE2=t[1];
    },
    chooseTimeRange3(t) {
       this.form.reportStart=t[0];
       this.form.reportEnd=t[1];
    },
     chooseTimeRange4(t) {
       this.form.updateStart=t[0];
       this.form.updateEnd=t[1];
    },
    getRiskList(){
        this.$myHttp.get('gpsGroups/getApCodomainsByCode?code='+"gps_risklevel").then((res)=>{
          this.riskList=res.result;
        })
    },
   submit(formName) {
      let obj={};
      obj = {
        "areaId":this.form.AREACODE,
        "controlGrade":this.form.CONTROLGRADE,
        "projectState":this.form.PROJECTSTATE,
        "scale":this.form.SCALE,
        "stationId":this.form.STATION,
        "endDate":this.form.ENDDATE,
        "startDate":this.form.STARTDATE,
        "endDate2":this.form.ENDDATE2,
        "startDate2":this.form.STARTDATE2,
        "reportEnd":this.form.reportEnd,
        "reportStart":this.form.reportStart,
        "updateEnd":this.form.updateEnd,
        "updateStart":this.form.updateStart,
        "userId":this.$Cookie.get('userId'),
        "risk":this.form.risk
      };
      this.$emit('subSearch', obj);
   },
   //获取输油处
   getAllArea(){
      this.$myHttp.get('gpsGroups/getAllArea?userId=' +this.$Cookie.get('userId')).then((res) => {
          this.placelist = res.result;
       });
   },
    //获取输油站
   changePlace(val){
        this.form.oilStation="";
        this.$myHttp.get('gpsGroups/getStationsByArea?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val).then((res) => {
          this.stationlist = res.result;
        });
   },
  },
};
</script>

<style lang="less" scoped>
.addList {
  position: absolute;
  z-index: 2;
  left:0;top:0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  .addTable {
    width: 90%;
    margin-left: 5%;
    // height: 38rem;
    background: #000000;
    .title {
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #252932;
      border-bottom: 1px solid #ccc;
      color: #3baaaf;font-size:16px;
      .close {
        position: absolute;
        height: 30px;
        line-height: 30px;
        width: 30px;
        right: 15px;
        top: 15px;
        font-size: 25px;
        cursor: pointer;
      }
    }
    .confirm {
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #252932;
      color: #3baaaf;
      display: flex;
      justify-content: center;
      align-items: center;
      .close {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 60px;
        font-size: 16px;
        cursor: pointer;
        color: #3baaaf;
        border: 1px solid #3baaaf;
        border-radius: 5px;
        margin-left: 20px;
      }
      .add {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 60px;
        font-size: 16px;
        cursor: pointer;
        color: #3baaaf;
        border: 1px solid #3baaaf;
        border-radius: 5px;
      }
    }
  }
}
.formbox {
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  .el-form-item {
    float: left;
    width: 43%;
    .el-select {
      width: 100%;
    }
    .addBtn {
      display: inline-block;
      text-align: center;
      width: 30px;
      height: 30px;
      line-height: 30px;
      background: #777;
      color: #fff;
      font-size: 20px;
      margin-left: 20px;
      cursor: pointer;
    }

    .level1 {
      // padding-left: 30px;
      min-height: 30px;
      span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        border-radius: 15px;
        border: 1px solid #ccc;
        min-width: 50px;
        margin-right: 20px;
        margin-bottom: 20px;
        cursor: pointer;
      }
    }
  }
  .w100 {
    width: 100%;
  }
}
</style>
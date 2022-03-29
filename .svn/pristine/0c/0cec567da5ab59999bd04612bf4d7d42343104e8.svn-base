<template>
  <div class="addList">
    <div class='addTable'>
      <div class='title'>
          查看{{detailTitle}}
        <span
          class="close"
          @click="cancel"
        >{{"×"}}</span>
      </div>
      <div class="formbox">
        <el-form
          ref="ruleForm"
          :model="form"
          label-width="130px"
        >
          <el-form-item label="输油处："><span>{{detailObj.areainfo.GROUPNAME}}</span></el-form-item>
          <el-form-item label="站场："><span>{{detailObj.stationinfo.GROUPNAME}}</span></el-form-item>
          <el-form-item label="名称："><span>{{form.name}}</span></el-form-item>
          <el-form-item label="编号："><span>{{form.code}}</span></el-form-item>
          <el-form-item label="每月巡检："><span>{{form.frequency}}</span></el-form-item>
          <el-form-item label="所属管段："><span>{{routeName}}</span></el-form-item>
          <el-form-item label="管段长度(km)："><span>{{form.mile}}</span></el-form-item>
          <el-form-item label="起始桩号："><span>{{form.startstake}}</span></el-form-item>
          <el-form-item label="终止桩号："><span>{{form.endstake}}</span></el-form-item>
          <el-form-item label="等级："><span>{{gradeName}}</span></el-form-item>
          <el-form-item label="类别："><span>{{typeName}}</span></el-form-item>
        </el-form>
        <div class="itemList">
            <template>
              <div class="items">
                <span
                  v-for='(item,index) in stakes'
                  :key='index'
                  @click='showdetail(item)'
                >{{item.STAKEID}}</span>
              </div>
            </template>
          </div>
      </div>
    </div>
    <DetailComsm
      v-if='detailbool'
      :iteminfo='iteminfo'
    />

  </div>

</template>

<script>
import DetailComsm from './detailComsm';
import { formatDate2 } from '../libs/methods';
export default {
  components: {
    DetailComsm,
  },
  props:['detailTitle','detailObj','itemid'],
  data() {
    return {
      iteminfo: null,
      detailbool: false,
      form: {
        routeid: '',
        code: '',
        frequency: 1,
        endstake: '',
        grade: '',
        mile: '',
        name: '',
        startstake: '',
        serialid: '',
        type: '',
      },
      routelist: [],
      takeList: [],
      gradeList: [],
      typeList: [],
      stakes: [],
      routeName:'',
      gradeName:"",
      typeName:""
    };
  },
 async created() {
    await this.getghgdetail();
  },
  methods: {
    getghgdetail() {
      this.$myHttp
        .get('construction/getGhgInfo?ghgId=' + this.itemid)
        .then((res) => {
          this.form.routeid = res.result.ROUTEID;
          this.form.code = res.result.CODE;
          this.form.endstake = res.result.ENDSTAKE;
          this.form.frequency = res.result.FREQUENCY;
          this.form.grade = res.result.GRADE;
          this.form.mile = res.result.MILE;
          this.form.name = res.result.NAME;
          this.form.startstake = res.result.STARTSTAKE;
          this.form.serialid = res.result.SERIALID;
          this.form.type = res.result.TYPE;
          let newarr = res.result.STAKES ? res.result.STAKES.split(',') : [];
          let obj2 = {};
          newarr.map((val, key) => {
            obj2[val] = true;
          });
          this.getRoutes();
          this.getGradeList();
          this.getTypeList();
          this.changeRoute(res.result.ROUTEID, obj2);
        });
    },
    cancel() {
      this.$emit('close');
    },
    //初始化路线
    getRoutes() {
      let that = this;
      that.$myHttp
        .get(
          'pointManage/getRoutesByStationId?stationId=' +
            this.detailObj.stationinfo.GROUPCODE
        )
        .then((res) => {
          that.routelist = res.result;
          that.routelist.map((item)=>{
            if(that.form.routeid==item.ROUTEID){
               that.routeName=item.ROUTENAME;
            }
          })
        });
    },
    //根据路线获取桩列表
    changeRoute(value, obj) {
      this.$myHttp
        .get('pointManage/getStakesByRouteId?routeId=' + value)
        .then((res) => {
          this.takeList = res.result;
           let arr = [];
            res.result.map((val, key) => {
              if (obj[val.STAKEID]) {
                arr.push(val);
              }
            });

            this.stakes = arr;
        });
    },
     //获取等级列表
    getGradeList() {
      let type = '';
      if (this.detailTitle == '高后果区') {
        type = 'gps_ghg_grade';
      } else{
        type = 'gps_gfx_grade';
      }
      this.$myHttp
        .get('gpsGroups/getApCodomainsByCode?code=' + type)
        .then((res) => {
          this.gradeList = res.result;
          this.gradeList.map((item)=>{
            if(this.form.grade==item.CODEID){
              this.gradeName=item.CODENAME;
            }
          })
        });
    },
    //获取类别列表
    getTypeList() {
      let type = '';
      if (this.detailTitle == '高后果区') {
        type = 'gps_ghg_type';
      } else{
        type = 'gps_gfx_type';
      }
      this.$myHttp
        .get('gpsGroups/getApCodomainsByCode?code=' + type)
        .then((res) => {
          this.typeList = res.result;
          console.log(this.typeList);
          console.log(this.form.type);
          this.typeList.map((item)=>{
            if(this.form.type==item.CODEID){
              this.typeName=item.CODENAME;
            }
          })
        });
    },
    showdetail(item) {
      this.iteminfo = item;
      this.detailbool = true;
    },
  },
};
</script>

<style lang="less" scoped>
.addList {
  position:absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  .infoBox{
    position:absolute!important;
    top:0!important;
    padding-top:50px;
    box-sizing: border-box;
  }
  .addTable {
    width: 80%;
    margin-left: 5%;
    height: 38rem;
    background: #000000;
    .title {
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #252932;
      border-bottom: 1px solid #ccc;
      color: #3baaaf;
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
    .tr {
      height: 45px;
      padding: 5px;
      .lable {
        float: left;
        height: 30px;
        line-height: 30px;
        padding: 0px 15px;
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
    span{color:#fff;} .level1 {
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
.itemList{}
.items{max-height: 120px;overflow-y:auto;}
.items span{display: inline-block;
    margin-right: 5px;
    padding: 0px 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-bottom: 10px;
    color:#fff;
}
</style>
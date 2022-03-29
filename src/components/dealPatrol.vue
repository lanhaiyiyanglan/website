<template>
  <div class="addList">
    <div class='addTable'>
      <div class='title'>
        代巡处理
        <span
          class="close"
          @click="cancel"
        >{{"×"}}</span>
      </div>
      <div class="formbox">
        <el-form
          :model="form"
          label-width="130px"
          :rules="rules"
        >
          <el-form-item label="管理处：" class="small">
               <span class="lookSpan">{{form.AREANAME}}</span>
          </el-form-item>
          <el-form-item label="输油站：" class="small">
               <span class="lookSpan">{{form.STATIONNAME}}</span>
          </el-form-item>
          <el-form-item label="代巡人：" class="small">
               <span class="lookSpan">{{form.PERSONNAME}}</span>
          </el-form-item>
          <el-form-item label="被代巡人：" class="small">
               <span class="lookSpan">{{form.BPERSONNAME}}</span>
          </el-form-item>
          <el-form-item label="开始时间：" class="small">
               <span class="lookSpan">{{form.BEGINTIME}}</span>
          </el-form-item>
          <el-form-item label="结束时间：" class="small">
               <span class="lookSpan">{{form.ENDTIME}}</span>
          </el-form-item>
          <el-form-item label="报警类型：" class="w100">
                            <el-select
                                size="small"
                                style="width:180px;"
                                v-model="alarmStyle"
                                placeholder="请选择报警类型"
                                >
                                <el-option
                                    v-for='item in alarmlist'
                                    :key='item.CODEID'
                                    :label="item.CODENAME"
                                    :value="item.CODEID"
                                ></el-option>
                            </el-select>
           </el-form-item>
            <el-form-item label="处理描述：" class="w100">
                <el-input type="textarea" v-model="descNote"></el-input>
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
  props: ['formobj'],
  data() {
    return {
        form:{},
        alarmlist:[],
        alarmStyle:'',
        descNote:'',
    };
  },
  created() {
    this.form=this.formobj;
    this.getAlarmType();
  },
  methods: {
   cancel(){
        this.$emit('close');
   },
   submit() {
      if(this.alarmStyle==''||this.descNote==''){
        window.vm.$message({
                type: 'error',
                message: '请选择报警类型并填写处理描述',
                showClose: true,
                duration: 2000,
         });
        return false;
      }else{
        let obj={
            "alarmId":this.form.ALARMID,
            "alarmType": this.alarmStyle,
            "descNote":this.descNote,
            "handler":this.$Cookie.get('userId'),
            "userId":this.$Cookie.get('userId'),
        }
        this.$emit('sub', obj);
      }
   },
   //获取报警类型
    getAlarmType(){
        this.$myHttp.get('gpsGroups/getApCodomainsByCode?code=gps_alarms_isok').then((res) => {
                this.alarmlist = res.result;
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
    width: 650px;
    height: 490px;
    background: #000000;
    position: absolute;
    left: 50%;
    margin-left: -325px;
    z-index:99999;
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
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  .el-form-item {
    float: left;
    width: 43%;
    .el-select {
      width: 100%;
    }
  }
  .w100 {
    width: 100%;
  }
}
.lookSpan{color:#ffffff;}
</style>
<template>
  <div class="addList">
    <div class='addTable'>
      <div class='title'>
        新增抽查登记
        <span
          class="close"
          @click="cancel"
        >{{"×"}}</span>
      </div>
      <div class="formbox">
        <el-form ref="ruleForm"  :model="form" label-width="130px">
                    <el-form-item label="抽查人：">
                         <el-input v-model="form.adder"></el-input>
                    </el-form-item>
                    <el-form-item label="抽查时间1：">
                         <el-time-picker style="width:100%;"
                          v-model="form.checkTime"
                           format='HH:mm'
                           value-format="HH:mm"
                          placeholder="选择日期时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="抽查情况：">
                         <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                         <el-input v-model="form.note"></el-input>
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
  props:['SERIALID'],
  data() {
    return {
        form:{
            "adder":null,
            "description":null,
            "checkTime":'',
            "note":null,
        }
    };
  },
  methods: {
   cancel(){
        this.$emit('closeRecord');
   },
   submit(formName) {
      let obj={};
      obj = {
        "adder": this.form.adder,
        "addtime":'',
        "checkTime":this.form.checkTime,
        "description":this.form.description,
        "note":this.form.note,
        "serialid": 0,
        "tId":this.SERIALID
      };
      this.$emit('subRecord', obj);
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
    width: 80%;
    margin-left: 10%;
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
  }
}
</style>
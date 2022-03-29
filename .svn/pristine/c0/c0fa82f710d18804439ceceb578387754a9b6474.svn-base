<template>
  <div class="addList" 
    v-loading="loading"
    element-loading-text="提交中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class='addTable'>
      <div class='title'>
        {{title}}
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
          :rules="rules"
        >
          <el-form-item label="输油处：" prop="pgroupCode">
               <!-- <el-select
                    size="small"
                    v-model="form.gpsWeekLog.pgroupCode"
                    placeholder="请选择输油处"
                    @change='changePlace'
                    :disabled="flag == 0?true:false"
                    >
                    <el-option
                        v-for='item in placelist'
                        :key='item.GROUPCODE'
                        :label="item.GROUPNAME"
                        :value="item.GROUPCODE"
                    ></el-option>
                </el-select> -->
                {{myAreaName}}
          </el-form-item>

          <el-form-item label="输油站：" prop="groupCode">
            <!-- <el-select
                size="small"
                v-model="form.gpsWeekLog.groupCode"
                placeholder="请选择输油站"
                @change="getPerson"
                :disabled="flag == 0?true:false"
                >
                <el-option
                    v-for='item in stationlist'
                    :key='item.GROUPCODE'
                    :label="item.GROUPNAME"
                    :value="item.GROUPCODE"
                ></el-option>
            </el-select> -->
            {{myGroupName}}
          </el-form-item>
          <el-form-item label="段长：" prop="userId">
            <!-- <el-select
                size="small"
                v-model="form.gpsWeekLog.userId"
                placeholder="段长"
                disabled
                >
                <el-option
                    v-for='item in userlist'
                    :key='item.PERSON_ID'
                    :label="item.PERSON_NAME"
                    :value="item.PERSON_ID"
                ></el-option>
            </el-select> -->
            <template v-if='form.gpsWeekLog.userName!=null&&form.gpsWeekLog.userName!=""'>
              {{form.gpsWeekLog.userName}}
            </template>
            <template v-else>
               {{userName}}
            </template>
          </el-form-item>
          <el-form-item label="周报日期：" id="inspectionDate" class="small" prop="weekDate">
                  <el-date-picker
                       v-model="tempweekDate"
                      :format='"第"+weekInfo+"周("+startDate+"~"+endDate+")"'
                      @change="changeDate"
                      type="week"
                      :picker-options="pickerOptions"
                    :disabled="flag == 0?true:false"
                    placeholder="选择日期">
                  </el-date-picker>
          </el-form-item>
          <el-form-item label="周报内容：" class="el-form-item2" prop="weekContent">
                  <el-input type="textarea" v-model="form.gpsWeekLog.weekContent" :disabled="flag == 0?true:false"></el-input>
          </el-form-item>
          
          <el-form-item class="el-form-item2" label="巡线照片：">
             <el-upload
                action="#"
                :file-list="form.fileList"
                :multiple="false"
                :auto-upload="false"
                list-type="picture-card"
                :on-change="handleChange"
                 :on-remove="handleRemove"
                 :on-preview="handlePictureCardPreview"
                :limit=limitNum
                 :class="{hide:hideUploadEdit}" 
                :disabled="flag == 0?true:false"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
                    >
                      <span
                        class="el-upload-list__item-preview"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                  </div>
              </el-upload>
              <el-dialog :modal-append-to-body = "false" :visible.sync="dialogVisible">
                <img  :src="dialogImageUrl" alt="" class="dialogImg">
              </el-dialog>
          </el-form-item>
          <template  v-if="title=='审核巡检周报'||(form.gpsWeekLog.reviewComment!=null&&form.gpsWeekLog.reviewComment!='')">
              <el-form-item class="el-form-item2" label="审核意见：">
                 <el-input type="textarea" v-model="form.gpsWeekLog.reviewComment" :disabled="title == '查看巡检周报'?true:false"></el-input>
              </el-form-item>
          </template>
        </el-form>
      </div>
      <template v-if="title!='查看巡检周报'">
          <div class='confirm' >
            <span class="add" @click="submit('ruleForm')">确认</span>
            <span class="close" @click="cancel">取消</span>
          </div>
      </template>
    </div>
  </div>

</template>

<script>
export default {
  name: 'detailInspectionlog',
  props: ['title','formobj','flag','loading'],
  data() {
    return {
      form:{
        "gpsWeekLog": {
            "groupCode": "",//输油站id
            "groupName": "",//输油站name
            "inputDate":"",//录入日期
            "pgroupCode":"",//输油处name
            "pgroupName": "",//输油处id
            "remark": "",//备注
            "reviewComment": "",//审核内容
            "reviewDate": "",//审核日期
            "reviewUserId": "",//审核人员id
            "state": "",//状态
            "userId": "",//巡线员id
            "userName":"",//巡线员name
            "weekContent": "",//周报内容
            "weekDate":"",//周报日期
            "weekLogId":"",//周报id
        },
        "fileList": [],
      },
      dialogImageUrl: '',//图片预览url
      dialogVisible: false,//图片预览弹框显隐
      placelist:[],
      stationlist:[],
      userlist:[],
      disabled: false,
      formDate:"",
      limitNum: 8,//图片限制8张
      hideUploadEdit: false, // 隐藏'上传按钮',
      rules: {
        // pgroupCode:[{required: true,trigger: 'change',
        //      validator:(rule, value, callback) => {
        //         if (this.form.gpsWeekLog.pgroupCode=="") {
        //           callback(new Error("请选择输油处"));
        //         } else {
        //           callback();
        //         }
        //       } 
        // }],
        // groupCode:[{required: true, trigger: 'change',
        //      validator:(rule, value, callback) => {
        //         if (this.form.gpsWeekLog.groupCode=="") {
        //           callback(new Error("请选择输油站"));
        //         } else {
        //           callback();
        //         }
        //       } 
        // }],
        // userId:[{required: true,trigger: 'change',
        //      validator:(rule, value, callback) => {
        //         if (this.form.gpsWeekLog.userId=="") {
        //           callback(new Error("请选择巡线员"));
        //         } else {
        //           callback();
        //         }
        //       } 
        // }],
        weekDate:[{required: true, trigger: 'change',
             validator:(rule, value, callback) => {
                if (this.tempweekDate=="") {
                  callback(new Error("请选择周报日期"));
                } else {
                  callback();
                }
              } 
        }],
        weekContent:[{required: true,trigger: 'blur' ,
            validator:(rule, value, callback) => {
                if (this.form.gpsWeekLog.weekContent=="") {
                  callback(new Error("请填写周报日志"));
                } else {
                  callback();
                }
              } 
        }]
      },
      startDate:null,
      endDate:null,
      weekInfo:null,
      tempweekDate:null,
      pickerOptions: {//禁用今天之前的日期
      'firstDayOfWeek': 1,
       disabledDate(time) {
         return time.getTime() > Date.now();
        }
      },
      userName:this.$Cookie.get('userName'),
      myAreaName:this.$Cookie.get('AREANAME'),
      myGroupName:this.$Cookie.get('GROUPNAME'),
      myAreaId:this.$Cookie.get('AREAID'),
      myGroupId:this.$Cookie.get('GROUPCODE')
    };
  },
   created() {
    this.form.gpsWeekLog=this.formobj.gpsWeekLog;
    if(this.title=="修改巡检周报"||this.title=="查看巡检周报"||this.title=="审核巡检周报"){
        if(this.formobj.fileList){
         this.form.fileList=this.formobj.fileList.map((v)=>{
               return {
                 name:v.fileName,
                 url:"data:image/"+v.fileType.substr(1)+";base64,"+v.fileContent,
                 type:v.fileType
               }
          })
        }
    }
    if(this.title=="查看巡检周报"||this.title=="审核巡检周报"){
      this.hideUploadEdit=true;
    }
    this.tempweekDate=new Date(this.form.gpsWeekLog.weekDate.substring(0,10));
    this.changeDate(this.tempweekDate);
  },
  mounted() {
    //this.getAllArea();//获取输油处
    //this.changePlace(this.form.gpsWeekLog.pgroupCode);//根据输油处获取输油站
    this.getPerson(this.form.gpsWeekLog.groupCode);
  },
  methods:{
     //获取输油处
   getAllArea(){
      this.$myHttp.get('pipe/getAreaList?userId=' + this.$Cookie.get('userId')).then((res) => {
          this.placelist = res.result;
          console.log(this.placelist);
      });
   },
    //获取输油站
   changePlace(val){
       // this.form.STATIONNAME="";
        this.$myHttp.get('pipe/getStationList?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val).then((res) => {
          this.stationlist = res.result;
        });
        console.log(this.stationlist);
   },
   getPerson(e){
       this.$myHttp.get('pipeMana/getAdminTrackerList?stationId=' + e).then((res) => {
           this.userlist= res.result;
      });
   },
   async handleRemove(file,fileList) {
     this.form.fileList=await this.getFile(fileList);
     this.hideUploadEdit = fileList.length >= this.limitNum;
  },
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  },
   cancel(){
        this.$emit('close');
   },
  async handleChange(file,fileList){
     this.form.fileList=await this.getFile(fileList);
      this.hideUploadEdit = fileList.length >= this.limitNum;
   },
   getFile(fileList){
      let that=this;
      return new Promise(function (resolve, reject) {
        let jsonData = []
        fileList.map((v)=>{
           if(v.raw){
              let reader = new FileReader();
              reader.readAsDataURL(v.raw);
              reader.onload = function (e) {
                  jsonData.push({
                    "url":e.target.result,
                    "name":that.imgTime()+Math.floor((Math.random() * 1000) + 1)+"."+v.raw.type.substring(6),
                    "type":"."+v.raw.type.substring(6)
                  });
              }
           }else{
                  jsonData.push({
                    "url":v.url,
                    "name":v.name,
                    "type":v.type,
                  });
           }
        })
        resolve(jsonData);
      })
   },
  submit(formName) {
     this.$refs[formName].validate((valid) => {
        if (valid) {
            let files=this.form.fileList.map((v)=>{
              if(v.url.indexOf("data:image/")==0){
                return{
                   "fileContent":v.url.substring(v.url.indexOf(',')+1),
                    "fileName":v.name,
                    "fileType":v.type
                }
              }else{
                    return {
                      "fileContent":v.url,
                      "fileName":v.name,
                      "fileType":v.type
                    }
              }
            })
            // this.userlist.map((v)=>{
            //   if(this.form.gpsWeekLog.userId==v.PERSON_ID){
            //      this.form.gpsWeekLog.userName=v.PERSON_NAME
            //   }
            // })
            let obj={
                "files":files,
                // "groupCode":this.form.gpsWeekLog.groupCode,//输油站id
                // "groupName":this.form.gpsWeekLog.groupName,//输油站name
                "groupCode":this.$Cookie.get('GROUPCODE'),//输油站id
                "groupName":this.$Cookie.get('GROUPNAME'),//输油站name
                "inputDate":this.form.gpsWeekLog.inputDate==""?new Date():this.form.gpsWeekLog.inputDate,
                // "pgroupCode":this.form.gpsWeekLog.pgroupCode,//输油处name
                // "pgroupName":this.form.gpsWeekLog.pgroupName,//输油处id
                "pgroupCode":this.$Cookie.get('AREAID'),//输油处id
                "pgroupName":this.$Cookie.get('AREANAME'),//输油处name
                "remark":this.form.gpsWeekLog.remark,//备注
                "reviewComment":this.form.gpsWeekLog.reviewComment,//审核内容
                "reviewDate":this.form.gpsWeekLog.reviewDate,//审核日期
                "reviewUserId":this.form.gpsWeekLog.reviewUserId==null?this.$Cookie.get('userId'):this.form.gpsWeekLog.reviewUserId,//审核人员id
                "state":this.form.gpsWeekLog.state,//状态
                "userId":this.form.gpsWeekLog.userId==null?this.$Cookie.get('userId'):this.form.gpsWeekLog.userId,//段长id
                "userName":(this.form.gpsWeekLog.userName==null||this.form.gpsWeekLog.userName=="")?this.$Cookie.get('userName'):this.form.gpsWeekLog.userName,//段长name
                // "userId":this.$Cookie.get('userId'),//段长id
                // "userName":this.$Cookie.get('userName'),//段长name
                "weekContent":this.form.gpsWeekLog.weekContent,//周报内容
                "weekDate":this.tempweekDate,//周报日期
                "weekLogId":this.form.gpsWeekLog.weekLogId,//周报id
            }
            this.$emit('sub',obj);
        }
     })
   },
   imgTime(){
            let time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let hours = time.getHours() + 1;
            let minutes = time.getMinutes() + 1;
            let seconds = time.getSeconds();
            if (month < 10) {
              month = "0" + month
            }
            if (day < 10) {
              day = "0" + day
            }
            if (hours < 10) {
              hours = "0" + hours
            }
            if (minutes < 10) {
              minutes = "0" + minutes
            }
            if (seconds < 10) {
              seconds = "0" + seconds
            }
            return `${year}${month}${day}${hours}${minutes}${seconds}`
   },
    changeDate(val){
      console.log(val);
      this.startDate=this.dayjs(val).startOf("isoWeek").format("YYYY-MM-DD");
      this.endDate=this.dayjs(val).endOf("isoWeek").format("YYYY-MM-DD");
      this.getWeekInfoInYear(this.startDate,this.endDate);
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
                        this.weekInfo=i;
                    }
                }
            }
    },
    getYear(date) {
            return this.dayjs(date).year();
    }
  }
};
</script>

<style lang="less" scoped>
.addList {
  position: absolute!important;
  z-index: 2;
  left:0;top:0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  .addTable {
    width: 80%;
    margin-left: 10%;
    height: 38rem;
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
    .tr {
      height: 45px;
      padding: 5px;
      .lable {
        float: left;
        height: 30px;
        line-height: 30px;
        padding: 0px 15px;
      }
      .el-select {
        float: left;
        height: 30px;
        line-height: 30px;
        margin-right: 30px;
      }
      .el-select input.el-input__inner {
        height: 30px !important;
        line-height: 30px !important;
        background: #1c1e2c;
      }
      .el-input__inner {
        background: #1c1e2c;
        height: 30px;
        line-height: 30px;
      }
    }
    table {
      display: inline-block;
      width: 100%;
      height: calc(~'(100% - 150px)');
      overflow-y: auto;
      border-collapse: collapse;
      thead {
        display: inline-block;
        width: 100%;
        tr {
          display: inline-block;
          width: 100%;
          margin: 0;
          padding: 0;
          th {
            float: left;
            padding: 0;
            margin: 0;
            height: 2rem;
            line-height: 2rem;
            border: 1px solid #1e727e;
            font-size: 18px;
          }
        }
      }
      tbody {
        display: inline-block;
        width: 100%;
        tr {
          display: inline-block;
          width: 100%;
          td {
            float: left;
            padding: 0;
            margin: 0;
            height: 1.6rem;
            line-height: 1.6rem;
            border: 1px solid #1e727e;
            text-align: center;
            overflow: hidden; /*超出部分隐藏*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出部分文字以...显示*/
          }
        }
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
    width:43%;
    .el-select {
      width: 100%;
    }
   }
  .el-form-item2 {
    float: left;
    width:100%;
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
  .dialogImg{width:100%;}
}
</style>




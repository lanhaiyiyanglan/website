<template>
  <div class="addList" style="z-index:4">
    <div class='addTable'>
      <div class='title'>
        {{dynamicTitle}}施工动态
        <span
          class="close"
          @click="cancel"
        >{{"×"}}</span>
      </div>
      <div class="formbox">
        <el-form
          ref="ruleForm"
          :model="form"
          label-width="140px"
          :rules="rules"
        >
         
          <el-form-item label="施工描述：" prop="DESCRIPTION">
            <el-input type="textarea" v-model="form.DESCRIPTION" size="small" :readonly="dynamicTitle!='新增'?true:false"></el-input>
          </el-form-item>
           <el-form-item class="el-form-item2" label="现场照片：">
             <el-upload
                action="#"
                :file-list="form.files"
                :multiple="false"
                :auto-upload="false"
                list-type="picture-card"
                :on-change="handleChange"
                 :on-remove="handleRemove"
                 :on-preview="handlePictureCardPreview"
                :limit=limitNum
                :class="{hide:hideUploadEdit}" 
                :disabled="dynamicTitle!='新增'?true:false"
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
        </el-form>
         
      </div>

      <div class='confirm' v-if="dynamicTitle=='新增'">
        <span class="add" @click="submit('ruleForm')">确认</span>
        <span class="close" @click="cancel">取消</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props:['SERIALID','dynamicTitle'],
  data() {
    return{
         form:{
              "files": [],
              "DESCRIPTION":null,
         },
        rules: {
          DESCRIPTION:[{required: true, message: '请填写第三方工程信息简要描述', trigger: 'blur'}],
        },
        dialogImageUrl: '',//图片预览url
        dialogVisible: false,//图片预览弹框显隐
        limitNum: 8,//图片限制8张
        hideUploadEdit: false, // 隐藏'上传按钮',
        disabled: false,
    }
  },
  created(){
    console.log(this.SERIALID);
    if(this.dynamicTitle!="新增"){
      this.hideUploadEdit=true;
      this.lookInfo();
    }
  },
  methods:{
        lookInfo(){
           this.$myHttp.get('construction/getTrendsInfo?id='+this.SERIALID).then((res) => {
                if(res.success){
                  this.form.DESCRIPTION=res.result.DESCRIPTION;
                  if(res.result.files){
                  this.form.files=res.result.files.map((v)=>{
                        return {
                          name:v.fileName,
                          url:"data:image/"+v.fileType.substr(1)+";base64,"+v.fileContent,
                          type:v.fileType
                        }
                    })
                  }
                }
           });
        },
        submit(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  let myFiles=this.form.files.map((v)=>{
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
                let obj={
                  "files":myFiles,
                  "gpsConstructionTrends": {
                    "adder": this.$Cookie.get('userId'),
                    "addtime": "",
                    "description":this.form.DESCRIPTION,
                    "serialid": 0,
                    "tId":this.SERIALID
                  }
                }
                this.$emit('subDynamic',obj);
            }else{
               window.vm.$message({
                    type: 'error',
                    message:'请填写必填项',
                    showClose: true,
                    duration: 2000,
              });
            }
          });
        },
        async handleRemove(file,fileList) {
          this.form.files=await this.getFile(fileList);
          this.hideUploadEdit = fileList.length >= this.limitNum;
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        cancel(){
              this.$emit('closeDynamic');
        },
        async handleChange(file,fileList){
          
            this.form.files=await this.getFile(fileList);
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
                          "name":that.getTime()+Math.floor((Math.random() * 1000) + 1)+"."+v.raw.type.substring(6),
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
        getTime(){
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
    width:60%;
    height: 26rem;
    background-color: #000000;
    position: absolute;
    left:20%;
    z-index:2;
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
.formbox {
  overflow: hidden;
  overflow-y:auto;
  height:22rem;
  padding: 20px;
  box-sizing: border-box;
  .el-form-item {
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
  }
  .w100 {
    width: 100%;
  }
  .lookSpan{color:#fff;}
  .spanItem{display:inline-block;margin-right:5px;padding:0px 10px;border:1px solid #ccc;border-radius: 10px;height: 30px;line-height: 30px;cursor: pointer;}
}
.hide .el-upload {
    display: none!important;
}
</style>
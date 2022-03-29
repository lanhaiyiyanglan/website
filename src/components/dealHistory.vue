<template>
  <div class="addList"  id="thirdList">
    <div class='addTable'>
      <div class='title'>
        查看历史工程信息详情
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
        >
          <el-form-item label="输油处：" prop="AREACODE">
               <span class="lookSpan">{{form.AREANAME}}</span>
          </el-form-item>
          <el-form-item label="输油站：" prop="STATION">
               <span class="lookSpan">{{form.STATIONNAME}}</span>
          </el-form-item>
          <el-form-item label="工程名称：" prop="PROJECTNAME">
            <span class="lookSpan">{{form.PROJECTNAME}}</span>
          </el-form-item>
          <el-form-item label="具体位置：" prop="POSITION">
             <span class="lookSpan">{{form.POSITION}}</span>
          </el-form-item>
          <el-form-item label="线路：" prop="ROUTEID">
            <span class="lookSpan">{{form.ROUTENAME}}</span>
          </el-form-item>
          <el-form-item label="桩号：" prop="MILEAGEID">
             <span class="lookSpan">{{form.MILEAGEID}}</span>
          </el-form-item>
          <el-form-item label="纬度：" prop="LATITUDE">
            <span class="lookSpan">{{form.LATITUDE}}</span>
          </el-form-item>
          <el-form-item label="经度：" prop="LONGITUDE">
            <span class="lookSpan">{{form.LONGITUDE}}</span>
          </el-form-item>
          <el-form-item label="规模：" prop="SCALE">
                <template v-if="form.SCALE==1"><span class="lookSpan">小型</span></template>
                <template v-else><span class="lookSpan">大型</span></template>
          </el-form-item>
          <el-form-item label="施工类型：" prop="PROJECTTYPE">
              <span class="lookSpan">{{form.PROJECTTYPECN}}</span>
          </el-form-item>
          <el-form-item label="施工风险等级：" prop="RISK">
              <template v-if="form.RISK==1"><span class="lookSpan">高风险</span></template>
              <template v-else-if="form.RISK==2"><span class="lookSpan">中风险</span></template>
              <template v-else-if="form.RISK==3"><span class="lookSpan">低风险</span></template>
              <template v-else><span class="lookSpan"></span></template>
          </el-form-item>
          <el-form-item label="第三方工程信息描述：" prop="DESCRIPTION">
               <span class="lookSpan">{{form.DESCRIPTION}}</span>
          </el-form-item>
           <el-form-item label="施工单位名称：" prop="COMPANY">
               <span class="lookSpan">{{form.COMPANY}}</span>
          </el-form-item>
           <el-form-item label="负责人：" prop="DIRECTOR">
               <span class="lookSpan">{{form.DIRECTOR}}</span>
          </el-form-item>
           <el-form-item label="联系方式：" prop="DIRECTORPHONE">
              <span class="lookSpan">{{form.DIRECTORPHONE}}</span>
          </el-form-item>
          <el-form-item label="开工日期：" prop="STARTDATE">
              <span class="lookSpan">{{form.STARTDATE | dateSubstr}}</span>
          </el-form-item>
          <el-form-item label="完工日期：" prop="ENDDATE">
            <span class="lookSpan">{{form.ENDDATE | dateSubstr}}</span>
          </el-form-item>
          <el-form-item label="施工状态：" prop="PROJECTSTATE">
              <template v-if="form.PROJECTSTATE==1"><span class="lookSpan">正在施工</span></template>
              <template v-else-if="form.PROJECTSTATE==2"><span class="lookSpan">未施工</span></template>
              <template v-else-if="form.PROJECTSTATE==3"><span class="lookSpan">以完工</span></template>
              <template v-else-if="form.PROJECTSTATE==4"><span class="lookSpan">停工</span></template>
              <template v-else><span class="lookSpan"></span></template>
          </el-form-item>
          <el-form-item label="标准化布控等级：" prop="CONTROLGRADE">
              <span class="lookSpan">{{form.CONTROLGRADECN}}</span>
          </el-form-item>
          <el-form-item label="标准化布控时间：" prop="CONTROLDATE">
              <span class="lookSpan">{{form.CONTROLDATE | dateSubstr}}</span>
          </el-form-item>
          <el-form-item label="是否安全告知：" prop="SAFETYNOTIFY">
                <template v-if="form.SAFETYNOTIFY==1"><span class="lookSpan">是</span></template>
                <template v-else-if="form.SAFETYNOTIFY==0"><span class="lookSpan">否</span></template>
                <template v-else><span class="lookSpan"></span></template>
          </el-form-item>
          <el-form-item label="是否需要开挖深坑：" prop="DEEPEXCAVATION">
              <template v-if="form.DEEPEXCAVATION==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.DEEPEXCAVATION==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
          </el-form-item>
          <el-form-item label="开挖深坑数量：" prop="EXCAVATIONNUM">
              <span class="lookSpan">{{form.EXCAVATIONNUM}}</span>
          </el-form-item>
          <el-form-item label="管道保护工程措施的类型及尺寸简要描述：" prop="PROTECTIONDESCRIPTION">
              <span class="lookSpan">{{form.PROTECTIONDESCRIPTION}}</span>
          </el-form-item>
          <el-form-item label="大型施工是否审查：" prop="ISCHECK">
              <template v-if="form.ISCHECK==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.ISCHECK==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
          </el-form-item>
          <el-form-item label="是否取得政府管道保护主管部门审批意见：" prop="GOVCHECK">
               <template v-if="form.GOVCHECK==1"><span class="lookSpan">是</span></template>
               <template v-else-if="form.GOVCHECK==0"><span class="lookSpan">否</span></template>
               <template v-else><span class="lookSpan"></span></template>
           </el-form-item>
           <el-form-item label="是否签订安全协议：" prop="SECUREPROTOCOL">
              <template v-if="form.SECUREPROTOCOL==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.SECUREPROTOCOL==0"><span class="lookSpan">否</span></template>
              <template v-else-if="form.SECUREPROTOCOL==2"><span class="lookSpan">不需要</span></template>
              <template v-else><span class="lookSpan"></span></template>
           </el-form-item>
           <el-form-item label="是否向施工单位现场交底：" prop="TELLINTENTIONS">
              <template v-if="form.TELLINTENTIONS==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.TELLINTENTIONS==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
           </el-form-item>
           <el-form-item label="是否全时监护（24小时）：" prop="TUTELAGE">
              <template v-if="form.TUTELAGE==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.TUTELAGE==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
           </el-form-item>
           <el-form-item  label="现场监护人："  prop="TUTELAGEID">
                <span class="lookSpan">{{form.TUTELAGENAME}}</span>
           </el-form-item>
           <el-form-item v-if='form.TUTELAGEID!=null&&form.TUTELAGEID!=""' label="现场监护人联系方式：">
                  <span class="lookSpan">{{form.TUTELAGETEL}}</span>
           </el-form-item>
           <el-form-item  label="责任区巡线员："  prop="PERSONID">
                <span class="lookSpan">{{form.PERSONNAME}}</span>
           </el-form-item>
           <el-form-item v-if='form.PERSONID!=null&&form.PERSONID!=""' label="责任区巡线员联系方式：">
                <span class="lookSpan">{{form.PERSONTEL}}</span>
           </el-form-item>
           <el-form-item  label="责任区段长："  prop="PIPEMANID">
                <span class="lookSpan">{{form.PIPEMANNAME}}</span>
           </el-form-item>
           <el-form-item v-if='form.PIPEMANID!=null&&form.PIPEMANID!=""' label="责任区段长联系方式：">
                <span class="lookSpan">{{form.PIPEMANTEL}}</span>
           </el-form-item>
           <el-form-item label="关联高后果：" prop="GHGID">
                  <template v-if="form.GHGNAME!=''&&form.GHGNAME!=null">
                     <span class="lookSpan spanItem" @click="lookGhg(form.GHGID)">{{form.GHGNAME}}</span>
                  </template>
                  <template v-else>
                     <span class="lookSpan"></span>
                  </template>
            </el-form-item>
           <el-form-item label="是否有焊缝和防腐层的检测和修复资料：" prop="REPAIRDATA">
              <template v-if="form.REPAIRDATA==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.REPAIRDATA==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
           </el-form-item>
           <el-form-item label="是否需要进行联合验收：" prop="JOINACCEPT">
              <template v-if="form.JOINACCEPT==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.JOINACCEPT==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
           </el-form-item>
           <el-form-item label="是否有往来处置函件：" prop="HAVELETTERS">
              <template v-if="form.HAVELETTERS==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.HAVELETTERS==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
           </el-form-item> 
           <el-form-item label="是否有管道保护工程措施竣工资料并归档："  prop="COMPLETIONDATA">
              <template v-if="form.COMPLETIONDATA==1"><span class="lookSpan">是</span></template>
              <template v-else-if="form.COMPLETIONDATA==0"><span class="lookSpan">否</span></template>
              <template v-else><span class="lookSpan"></span></template>
           </el-form-item>
           <el-form-item label="最终处理结果：" prop="FINALRESULT">
              <span class="lookSpan">{{form.FINALRESULTCN}}</span>
           </el-form-item> 
           <el-form-item label="视频编号：" prop="CAMERAID">
               <span class="lookSpan">{{form.CAMERAID}}</span>
           </el-form-item>
           <el-form-item label="备注：" prop="REMARK">
               <span class="lookSpan">{{form.REMARK}}</span>
           </el-form-item>
           <el-form-item class="el-form-item2" label="现场照片：">
             <el-upload
                action="#"
                :file-list="form.files"
                :multiple="false"
                :auto-upload="false"
                list-type="picture-card"
                 :on-preview="handlePictureCardPreview"
                :class="{hide:hideUploadEdit}" 
                :disabled="true"
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
    </div>
    <lookGhg
        v-if="showBox"
        :detailObj='detailObj'
        :itemid='itemid'
        @close="closeDetail"
        :detailTitle="detailTitle"
    >
    </lookGhg>
  </div>

</template>

<script>
import lookGhg from '../components/lookGhg.vue';
export default {
  props: ['ids'],
  components: {lookGhg},
  data() {
    return{
        form:{
            "files": [],
            "AREACODE":"",//分公司
            "CAMERAID":"",//视频编号
            "COMPANY":"",//施工单位名称
            "COMPLETIONDATA":"",//是否有管道保护工程措施竣工资料并归档
            "CONTROLDATE":"",//标准化布控时间
            "CONTROLGRADE":"",//标准化布控等级
            "DEEPEXCAVATION":"",//是否深坑开挖
            "DESCRIPTION":"",//第三方工程信息简要描述
            "DIRECTOR":"",//负责人
            "DIRECTORPHONE":"",//负责人联系方式
            "ENDDATE":"",//完工日期
            "EXCAVATIONNUM":"",//开挖深坑数量
            "FINALRESULT":"",//最终处理结果
            "GHGID":"",//高后果id
            "GOVCHECK":"",//是否取得政府管道保护主管部门审批意见
            "HAVELETTERS":"",//是否有往来处置函件
            "IMGTIME":"",//图片修改时间
            "ISCHECK":"",//大型施工是否审查
            "JOINACCEPT":"",//是否需要进行联合验收
            "LATITUDE":"",//纬度
            "LONGITUDE":"",//经度
            "MILEAGEID":"",//桩号
            "PERSONID":"",//责任区巡线员id
            "PIPEMANID":"",//责任区段长id
            "POSITION":"",//具体位置
            "PROJECTNAME":"",//工程名称
            "PROJECTSTATE":"",//施工状态
            "PROJECTTYPE":"",//施工类型
            "PROTECTIONDESCRIPTION":"",//管道保护工程措施的类型及尺寸简要描述
            "REMARK":"",//备注
            "REPAIRDATA":"",//是否有焊缝和防腐层的检测和修复资料
            "REPORTDATE": "",//创建时间
            "REPORTUSER": "",//创建人
            "ROUTEID":"",//线路id
            "SAFETYNOTIFY":"",//是否安全告知
            "SCALE":"",//规模
            "SECUREPROTOCOL":"",//是否签订安全协议
            "SERIALID":"",//序号
            "STARTDATE":"",//开工日期
            "STATION":"",//输油站
            "STATUS":"",//状态
            "TELLINTENTIONS":"",//是否向施工单位现场交底
            "TUTELAGE":"",//是否全时监护（24小时）
            "TUTELAGEID":"",//现场监护人编号
            "UPDATETIME":"",//更新时间
            "UPDATEUSER": "",//更新人
            "RISK":''//施工风险等级
        },
        dialogImageUrl: '',//图片预览url
        dialogVisible: false,//图片预览弹框显隐
        hideUploadEdit:true, // 隐藏'上传按钮',
        disabled: false,
        hideUploadEdit: true, // 隐藏'上传按钮',
        dialogImageUrl:"",
        dialogVisible:false,
        itemid: '',
        showBox:false,
        detailTitle:"",
        detailObj: {
          areainfo: {},
          stationinfo: {},
        },
    }
  },
  created() {
     this.getDetailInfo();
  },
  methods:{
     getDetailInfo(){
         this.$myHttp.get('construction/getThirdConRecordInfo?id='+this.ids).then((res) => {
              this.form=res.result;
              if(res.result.files&&res.result.files.length>0){
                  this.form.files=res.result.files.map((v)=>{
                        return {
                          name:v.fileName,
                          url:"data:image/"+v.fileType.substr(1)+";base64,"+v.fileContent,
                          type:v.fileType
                        }
                })
              }else{
                this.form.files=[];
              }
         });
     },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
     cancel(){
           this.$emit('close');
     },
     lookGhg(id){
            this.detailTitle="高后果区";
            this.detailObj.stationinfo = {
              GROUPCODE:this.form.STATION,
              GROUPNAME:this.form.STATIONNAME,
            };
            this.detailObj.areainfo = {
              GROUPCODE:this.form.AREACODE,
              GROUPNAME:this.form.AREANAME,
            };
          this.itemid=id;
          this.showBox=true;
      },
      closeDetail(){
        this.showBox=false;
      }
  },
  filters:{
            dateSubstr(value) {
                if(value != "" && value!=null){
                    return value.substring(0,10);
                } else {
                    return value;
                }
 
            }
  }
};
</script>

<style lang="less" scoped>
.addList {
  position: absolute;
  z-index: 999;
  left:0;top:0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  .addTable {
    width: 90%;
    height: 38rem;
    background-color: #000000;
    position: absolute;
    left:5%;
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
  height:34rem;
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
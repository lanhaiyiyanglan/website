<template>
  <div class="addList"  id="thirdList"
    v-loading="loading"
    element-loading-text="提交中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class='addTable'>
      <div class='title'>
        {{title}}工程信息
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
          <el-form-item label="输油处：" prop="AREACODE">
               <template v-if="flag!=0">
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
               </template>
               <template v-else>
                 <span class="lookSpan">{{form.AREANAME}}</span>
               </template>
          </el-form-item>
          <el-form-item label="输油站：" prop="STATION">
            <template v-if="flag!=0">
               <el-select
                 size="small"
                 v-model="form.STATION"
                 placeholder="请选择输油站"
                  @change="getRoutes"
                    >
                    <el-option
                        v-for='item in stationlist'
                        :key='item.GROUPCODE'
                        :label="item.GROUPNAME"
                        :value="item.GROUPCODE"
                    ></el-option>
                </el-select>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.STATIONNAME}}</span>
            </template>
          </el-form-item>
          <el-form-item label="工程名称：" prop="PROJECTNAME">
            <template v-if="flag!=0">
              <el-input v-model="form.PROJECTNAME" size="small"></el-input>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.PROJECTNAME}}</span>
            </template>
          </el-form-item>
          <el-form-item label="具体位置：" prop="POSITION">
            <template v-if="flag!=0">
              <el-input v-model="form.POSITION" size="small"></el-input>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.POSITION}}</span>
            </template>
          </el-form-item>
          <el-form-item label="线路：" prop="ROUTEID">
            <template v-if="flag!=0">
               <el-select
                    size="small"
                    v-model="form.ROUTEID"
                    placeholder="请选择线路"
                    @change="changeRoute"
                    >
                    <el-option
                        v-for='item in routelist'
                        :key='item.ROUTEID'
                        :label="item.ROUTENAME"
                        :value="item.ROUTEID"
                    ></el-option>
                </el-select>
            </template>
            <template v-else>
               <span class="lookSpan">{{form.ROUTENAME}}</span>
            </template>
          </el-form-item>
          <el-form-item label="桩号：" prop="MILEAGEID">
             <template v-if="flag!=0">
                 <el-select
                    size="small"
                    v-model="form.MILEAGEID"
                    placeholder="请选择桩号"
                    v-loading='selectloading'
                    filterable v-el-select-loadmore="loadmore" :filter-method="filterVmModel" @change="clearList" clearable
                    no-match-text=" "
                    >
                    <el-option
                        v-for='item in takeArr'
                        :key='item.STAKEID'
                        :label="item.STAKEID"
                        :value="item.STAKEID"
                    ></el-option>
                </el-select>
             </template>
             <template v-else>
               <span class="lookSpan">{{form.MILEAGEID}}</span>
            </template>
          </el-form-item>
          <el-form-item label="纬度：" prop="LATITUDE">
            <template v-if="flag!=0">
              <el-input v-model="form.LATITUDE" size="small" readonly="true"></el-input>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.LATITUDE}}</span>
            </template>
          </el-form-item>
          <el-form-item label="经度：" prop="LONGITUDE">
            <template v-if="flag!=0">
              <el-input v-model="form.LONGITUDE" size="small" readonly="true"></el-input>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.LONGITUDE}}</span>
            </template>
          </el-form-item>
          <el-form-item label="规模：" prop="SCALE">
            <template v-if="flag!=0">
                <el-select size="small" v-model="form.SCALE">
                     <!-- <el-option label="小型" value="1"></el-option>
                     <el-option label="大型" value="2"></el-option> -->
                     <el-option v-for="item in myScale" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </template>
            <template v-else>
                <template v-if="form.SCALE==1"><span class="lookSpan">小型</span></template>
                <template v-else><span class="lookSpan">大型</span></template>
            </template>
          </el-form-item>
          <el-form-item label="施工类型：" prop="PROJECTTYPE">
              <template v-if="flag!=0">
                  <el-select
                    size="small"
                    v-model="form.PROJECTTYPE"
                    placeholder="请选择类型"
                    >
                    <el-option
                        v-for='item in projectTypeList'
                        :key='item.CODEID'
                        :label="item.CODENAME"
                        :value="item.CODEID"
                    ></el-option>
                </el-select>
              </template>
              <template v-else>
                 <span class="lookSpan">{{form.PROJECTTYPECN}}</span>
              </template>
          </el-form-item>
          <el-form-item label="施工作业风险等级：" prop="RISK">
              <template v-if="flag!=0">
                  <el-select
                    size="small"
                    v-model="form.RISK"
                    >
                    <el-option
                        v-for='item in riskList'
                        :key='item.CODEID'
                        :label="item.CODENAME"
                        :value="item.CODEID"
                    ></el-option>
                </el-select>
              </template>
              <template v-else>
                 <template v-if="form.RISK==1"><span class="lookSpan">高风险</span></template>
                  <template v-else-if="form.RISK==2"><span class="lookSpan">中风险</span></template>
                  <template v-else-if="form.RISK==3"><span class="lookSpan">低风险</span></template>
                  <template v-else><span class="lookSpan"></span></template>
              </template>
          </el-form-item>
          <el-form-item label="第三方工程信息描述：" prop="DESCRIPTION">
            <template v-if="flag!=0">
              <el-input v-model="form.DESCRIPTION" size="small"></el-input>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.DESCRIPTION}}</span>
            </template>
          </el-form-item>
           <el-form-item label="施工单位名称：" prop="COMPANY">
            <template v-if="flag!=0">
              <el-input v-model="form.COMPANY" size="small"></el-input>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.COMPANY}}</span>
            </template>
          </el-form-item>
           <el-form-item label="负责人：" prop="DIRECTOR">
            <template v-if="flag!=0">
               <el-input v-model="form.DIRECTOR" size="small"></el-input>
            </template>
            <template v-else>
                 <span class="lookSpan">{{form.DIRECTOR}}</span>
            </template>
          </el-form-item>
           <el-form-item label="联系方式：" prop="DIRECTORPHONE">
              <template v-if="flag!=0">
                <el-input v-model="form.DIRECTORPHONE" size="small"></el-input>
              </template>
              <template v-else>
                  <span class="lookSpan">{{form.DIRECTORPHONE}}</span>
              </template>
          </el-form-item>
          <el-form-item label="开工日期：" prop="STARTDATE">
              <template v-if="flag!=0">
                <el-date-picker  size="small" style="width:100%;" v-model="form.STARTDATE" type="date"  placeholder="选择开工时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </template>
              <template v-else>
                  <span class="lookSpan">{{form.STARTDATE | dateSubstr}}</span>
              </template>
          </el-form-item>
          <el-form-item label="完工日期：" prop="ENDDATE">
            
             <template v-if="flag!=0">
                <el-date-picker  size="small" style="width:100%;" v-model="form.ENDDATE" type="date"  placeholder="选择完工时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </template>
              <template v-else>
                  <span class="lookSpan">{{form.ENDDATE | dateSubstr}}</span>
              </template>
          </el-form-item>
          <el-form-item label="施工状态：" prop="PROJECTSTATE">
              <template v-if="flag!=0">
                   <el-select size="small" v-model="form.PROJECTSTATE" >
                        <!-- <el-option label="正在施工" value="1"></el-option>
                        <el-option label="未施工(包括停工)" value="2"></el-option>
                        <el-option label="以完工" value="3"></el-option> -->
                        <el-option v-for="item in myProjectState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </template>
              <template v-else>
                  <template v-if="form.PROJECTSTATE==1"><span class="lookSpan">正在施工</span></template>
                  <template v-else-if="form.PROJECTSTATE==2"><span class="lookSpan">未施工</span></template>
                  <template v-else-if="form.PROJECTSTATE==3"><span class="lookSpan">以完工</span></template>
                  <template v-else-if="form.PROJECTSTATE==4"><span class="lookSpan">停工</span></template>
                  <template v-else><span class="lookSpan"></span></template>
              </template>
          </el-form-item>
          <el-form-item label="标准化布控等级：" prop="CONTROLGRADE">
              <template v-if="flag!=0">
                  <el-select size="small" v-model="form.CONTROLGRADE">
                    <el-option
                        v-for='item in controlGradeList'
                        :key='item.CODEID'
                        :label="item.CODENAME"
                        :value="item.CODEID"
                    ></el-option>
                </el-select>
              </template>
              <template v-else><span class="lookSpan">{{form.CONTROLGRADECN}}</span></template>
          </el-form-item>
          <el-form-item label="标准化布控时间：" prop="CONTROLDATE">
            <template v-if="flag!=0">
              <el-date-picker  size="small" style="width:100%;" v-model="form.CONTROLDATE" type="date"   value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </template>
            <template v-else>
              <span class="lookSpan">{{form.CONTROLDATE | dateSubstr}}</span>
            </template>
          </el-form-item>
          <el-form-item label="是否安全告知：" prop="SAFETYNOTIFY">
               <template v-if="flag!=0">
                   <el-select v-model="form.SAFETYNOTIFY" placeholder="请选择">
                        <!-- <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option> -->
                        <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                   </el-select>
              </template>
              <template v-else>
                   <template v-if="form.SAFETYNOTIFY==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.SAFETYNOTIFY==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
          </el-form-item>
          <el-form-item label="是否需要开挖深坑：" prop="DEEPEXCAVATION">
              <template v-if="flag!=0">
                   <el-select v-model="form.DEEPEXCAVATION" placeholder="请选择">
                      <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </template>
              <template v-else>
                   <template v-if="form.DEEPEXCAVATION==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.DEEPEXCAVATION==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
          </el-form-item>
          <el-form-item label="开挖深坑数量：" prop="EXCAVATIONNUM">
              <template v-if="flag!=0">
                   <el-input v-model.number="form.EXCAVATIONNUM" size="small" type="number"></el-input>
              </template>
              <template v-else>
                  <span class="lookSpan">{{form.EXCAVATIONNUM}}</span>
              </template>
          </el-form-item>
          <el-form-item label="管道保护工程措施的类型及尺寸简要描述：" prop="PROTECTIONDESCRIPTION">
              <template v-if="flag!=0">
                   <el-input v-model="form.PROTECTIONDESCRIPTION" size="small"></el-input>
              </template>
              <template v-else>
                  <span class="lookSpan">{{form.PROTECTIONDESCRIPTION}}</span>
              </template>
          </el-form-item>
          <el-form-item label="大型施工是否审查：" prop="ISCHECK">
              <template v-if="flag!=0">
                   <el-select v-model="form.ISCHECK" placeholder="请选择">
                        <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                   </el-select>
              </template>
              <template v-else>
                   <template v-if="form.ISCHECK==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.ISCHECK==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
          </el-form-item>
          <el-form-item label="是否取得政府管道保护主管部门审批意见：" prop="GOVCHECK">
               <template v-if="flag!=0">
                   <el-select v-model="form.GOVCHECK" placeholder="请选择">
                        <el-option v-for="item in isNoNeed" :key="item.value" :label="item.label" :value="item.value"></el-option>
                   </el-select>
              </template>
              <template v-else>
                   <template v-if="form.GOVCHECK==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.GOVCHECK==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item>
           <el-form-item label="是否签订安全协议：" prop="SECUREPROTOCOL">
              <template v-if="flag!=0">
                   <el-select v-model="form.SECUREPROTOCOL" placeholder="请选择">
                      <!-- <el-option label="否" value="0"></el-option>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="不需要" value="2"></el-option> -->
                      <el-option v-for="item in isNoNeed" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </template>
              <template v-else>
                   <template v-if="form.SECUREPROTOCOL==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.SECUREPROTOCOL==0"><span class="lookSpan">否</span></template>
                   <template v-else-if="form.SECUREPROTOCOL==2"><span class="lookSpan">不需要</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item>
           <el-form-item label="是否向施工单位现场交底：" prop="TELLINTENTIONS">
              <template v-if="flag!=0">
                   <el-select v-model="form.TELLINTENTIONS" placeholder="请选择">
                        <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                   </el-select>
              </template>
              <template v-else>
                   <template v-if="form.TELLINTENTIONS==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.TELLINTENTIONS==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item>
           <el-form-item label="是否全时监护（24小时）：" prop="TUTELAGE">
              <template v-if="flag!=0">
                   <el-select v-model="form.TUTELAGE" placeholder="请选择">
                        <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </template>
              <template v-else>
                   <template v-if="form.TUTELAGE==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.TUTELAGE==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item>
           <el-form-item  label="现场监护人："  prop="TUTELAGEID">
                <template v-if="flag!=0">
                      <el-select
                        size="small"
                        v-model="form.TUTELAGEID"
                        @change="getPersonList"
                        >
                        <el-option
                            v-for='item in personList'
                            :key='item.PERSON_ID'
                            :label="item.PERSON_NAME"
                            :value="item.PERSON_ID"
                        ></el-option>
                    </el-select>
                </template>
                <template v-else>
                  <span class="lookSpan">{{form.TUTELAGENAME}}</span>
                </template>
           </el-form-item>
           <el-form-item v-if='form.TUTELAGEID!=null&&form.TUTELAGEID!=""' label="现场监护人联系方式：">
                  <span class="lookSpan">{{personPhone}}</span>
           </el-form-item>
           <el-form-item  label="责任区巡线员："  prop="PERSONID">
                <template v-if="flag!=0">
                     <el-select
                          size="small"
                          v-model="form.PERSONID"
                          @change="getPersonList2"
                          >
                          <el-option
                              v-for='item in personList2'
                              :key='item.PERSON_ID'
                              :label="item.PERSON_NAME"
                              :value="item.PERSON_ID"
                          ></el-option>
                      </el-select>
                </template>
                <template v-else>
                   <span class="lookSpan">{{form.PERSONNAME}}</span>
                </template>
           </el-form-item>
           <el-form-item v-if='form.PERSONID!=null&&form.PERSONID!=""' label="责任区巡线员联系方式：">
                  <span class="lookSpan">{{personPhone2}}</span>
           </el-form-item>
           <el-form-item  label="责任区段长："  prop="PIPEMANID">
                <template v-if="flag!=0">
                     <el-select
                        size="small"
                        v-model="form.PIPEMANID"
                        placeholder="请选择段长"
                        @change="getPipemanPhone"
                        >
                        <el-option
                            v-for='item in pipeManaList'
                            :key='item.PERSON_ID'
                            :label="item.PERSON_NAME"
                            :value="item.PERSON_ID"
                        ></el-option>
                    </el-select>
                </template>
                <template v-else>
                   <span class="lookSpan">{{form.PIPEMANNAME}}</span>
                </template>
           </el-form-item>
           <el-form-item v-if='form.PIPEMANID!=null&&form.PIPEMANID!=""' label="责任区段长联系方式：">
                  <span class="lookSpan">{{pipemanPhone}}</span>
           </el-form-item>
           <el-form-item label="关联高后果：" prop="GHGID">
                <template v-if="flag!=0">
                   <el-select v-model="form.GHGID" placeholder="请选择">
                      <el-option
                        v-for='item in  ghgTypes'
                        :key='item.SERIALID'
                        :label="item.NAME"
                        :value="item.SERIALID"
                      ></el-option>
                    </el-select>
                </template>
                <template v-else>
                  <template v-if="form.GHGNAME!=''&&form.GHGNAME!=null">
                     <span class="lookSpan spanItem" @click="lookGhg(form.GHGID)">{{form.GHGNAME}}</span>
                  </template>
                  <template v-else>
                     <span class="lookSpan"></span>
                  </template>
                </template>
            </el-form-item>
           <el-form-item label="是否有焊缝和防腐层的检测和修复资料：" prop="REPAIRDATA">
              <template v-if="flag!=0">
                    <el-select v-model="form.REPAIRDATA" placeholder="请选择">
                        <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </template>
              <template v-else>
                   <template v-if="form.REPAIRDATA==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.REPAIRDATA==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item>
           <el-form-item label="是否需要进行联合验收：" prop="JOINACCEPT">
               <template v-if="flag!=0">
                    <el-select v-model="form.JOINACCEPT" placeholder="请选择">
                        <el-option v-for="item in isNoNeed" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </template>
              <template v-else>
                   <template v-if="form.JOINACCEPT==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.JOINACCEPT==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item>
           <el-form-item label="是否有往来处置函件：" prop="HAVELETTERS">
              <template v-if="flag!=0">
                    <el-select v-model="form.HAVELETTERS" placeholder="请选择">
                        <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </template>
              <template v-else>
                   <template v-if="form.HAVELETTERS==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.HAVELETTERS==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item> 
           <el-form-item label="是否有管道保护工程措施竣工资料并归档："  prop="COMPLETIONDATA">
              <template v-if="flag!=0">
                    <el-select v-model="form.COMPLETIONDATA" placeholder="请选择">
                        <el-option v-for="item in yesNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </template>
              <template v-else>
                   <template v-if="form.COMPLETIONDATA==1"><span class="lookSpan">是</span></template>
                   <template v-else-if="form.COMPLETIONDATA==0"><span class="lookSpan">否</span></template>
                   <template v-else><span class="lookSpan"></span></template>
              </template>
           </el-form-item>
           <el-form-item label="最终处理结果：" prop="FINALRESULT">
              <template v-if="flag!=0">
                 <el-select v-model="form.FINALRESULT" placeholder="请选择">
                   <el-option
                    v-for='item in resultList'
                    :key='item.CODEID'
                    :label="item.CODENAME"
                    :value="item.CODEID"
                ></el-option>
              </el-select>
              </template>
              <template v-else>
                <span class="lookSpan">{{form.FINALRESULTCN}}</span>
              </template>
           </el-form-item> 
           <el-form-item label="视频编号：" prop="CAMERAID">
             <template v-if="flag!=0">
                 <el-input v-model="form.CAMERAID"></el-input>
             </template>
             <template v-else>
                 <span class="lookSpan">{{form.CAMERAID}}</span>
             </template>
           </el-form-item>
           <template v-if="title!='新增'">
             <el-form-item label="创建人：" prop="REPORTUSER">
                   <span class="lookSpan">{{form.REPORTUSER}}</span>
             </el-form-item>
             <el-form-item label="创建时间：" prop="REPORTDATE">
                   <span class="lookSpan">{{form.REPORTDATE!=null?form.REPORTDATE.substring(0,10):''}}</span>
             </el-form-item>
             <el-form-item label="最后修改人：" prop="UPDATEUSER">
                   <span class="lookSpan">{{form.UPDATEUSER}}</span>
             </el-form-item>
             <el-form-item label="最后时间：" prop="UPDATETIME">
                   <span class="lookSpan">{{form.UPDATETIME!=null?form.UPDATETIME.substring(0,10):''}}</span>
             </el-form-item>
           </template>
           <el-form-item label="备注：" prop="REMARK">
             <template v-if="flag!=0">
                 <el-input type="textarea" v-model="form.REMARK"></el-input>
             </template>
             <template v-else>
                 <span class="lookSpan">{{form.REMARK}}</span>
             </template>
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
        </el-form>
         
      </div>

      <div class='confirm' v-if="flag!=0">
        <span class="add" @click="submit('ruleForm')">确认</span>
        <span class="close" @click="cancel">取消</span>
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
  components: {lookGhg},
  props: ['title','flag','formobj','loading'],
  directives: {
    // 计算是否滚动到最下面
    'el-select-loadmore': {
      bind (el, binding) {
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          const condition = Math.round(this.scrollHeight - this.scrollTop) <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
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
              "RISK":""
         },
        rules: {
          AREACODE:[{required: true, message: '请选择输油处', trigger: 'change' }],
          STATION:[{required: true, message: '请选择输油站', trigger: 'change' }],
          PROJECTNAME:[{required: true, message: '请填写工程名称', trigger: 'blur'}],
          POSITION:[{required: true, message: '请填写具体位置', trigger: 'blur'}],
          MILEAGEID:[{required: true, message: '请选择桩号', trigger: 'change' }],
          SCALE:[{required: true, message: '请选择规模',trigger: 'change' }],
          PROJECTTYPE:[{required: true, message: '请选择施工类型',trigger: 'change' }],
          RISK:[{required: true, message: '请选择施工风险等级',trigger: 'change' }],
          DESCRIPTION:[{required: true, message: '请填写第三方工程信息简要描述', trigger: 'blur'}],
          COMPANY:[{required: true, message: '请填写施工单位名称', trigger: 'blur'}],
          PROJECTSTATE:[{required: true, message: '请选择施工状态',trigger: 'change' }],
          CONTROLGRADE:[{required: true, message: '请选择标准化布控等级',trigger: 'change' }],
          EXCAVATIONNUM:[{required: true, message: '请填写开挖深坑数量', trigger: 'blur'}],
          TUTELAGE:[{required: true, message: '请选择是否全时监护',trigger: 'change' }],
        },
        placelist:[],//输油处
        stationlist:[],//输油站
        routelist:[],//线路
        takeList:[],//桩号
        resultList:[],//最终处理结果
        selectloading: false,
        takeArr: [],//过滤桩号
        filterText: '', // 输入的筛选项,
        query: {// 分页参数
          page: 1,
          limit: 10
        },
        projectTypeList:[],//项目类型
        riskList:[],//风险等级
        controlGradeList:[],//标准化布控等级
        dialogImageUrl: '',//图片预览url
        dialogVisible: false,//图片预览弹框显隐
        limitNum: 8,//图片限制8张
        hideUploadEdit: false, // 隐藏'上传按钮',
        disabled: false,
        personPhone:"",//监理电话
        personPhone2:"",//巡线员电话
        pipemanPhone:"",//段长电话
        personList:[],//监理人员
        personList2:[],//巡线员
        pipeManaList:[],//段长列表
        ghgTypes:[],//高后果
        hideUploadEdit: false, // 隐藏'上传按钮',
        yesNo:[
          {
            "label":"否",
            "value":0,
          },
          {
            "label":"是",
            "value":1,
          },
        ],
        isNoNeed:[
          {
            "label":"否",
            "value":0,
          },
          {
            "label":"是",
            "value":1,
          },
          {
            "label":"不需要",
            "value":2,
          },
        ],
        myScale:[
          {
            "label":"小型",
            "value":1,
          },
          {
            "label":"大型",
            "value":2,
          },
        ],
        myProjectState:[
          {
            "label":"正在施工",
            "value":1,
          },
          {
            "label":"未施工",
            "value":2,
          },
          {
            "label":"已完工",
            "value":3,
          },
          {
            "label":"停工",
            "value":4,
          },
        ],
        beginFiles:[],
        itemid: '',
        showBox:false,
        detailTitle:"",
        detailObj: {
          areainfo: {},
          stationinfo: {},
        },
    }
  },
   async  created() {
      if(this.title=="修改"||this.title=="查看"){
        this.form=Object.assign({},this.formobj);
        if(this.formobj.files&&this.formobj.files.length>0){
          this.form.files=this.formobj.files.map((v)=>{
                return {
                  name:v.fileName,
                  url:"data:image/"+v.fileType.substr(1)+";base64,"+v.fileContent,
                  type:v.fileType
                }
            })
          this.beginFiles=this.formobj.files.map((v)=>{
                return {
                  name:v.fileName,
                  url:"data:image/"+v.fileType.substr(1)+";base64,"+v.fileContent,
                  type:v.fileType
                }
            })
        }else{
          this.form.files=[];
        }
      if(this.formobj.TUTELAGEID!=null&&this.formobj.TUTELAGEID!=""){//填充监理电话
        this.personPhone=this.formobj.TUTELAGETEL
      }
      if(this.formobj.PERSONID!=null&&this.formobj.PERSONID!=""){//填充巡线员电话
        this.personPhone2=this.formobj.PERSONTEL
      }
      if(this.formobj.PIPEMANID!=null&&this.formobj.PIPEMANID!=""){//填充段长电话
        this.pipemanPhone=this.formobj.PIPEMANTEL;
        //this.getPipemanPhone(this.formobj.PIPEMANID);
      }
    }
    if(this.title=="查看"){
      this.hideUploadEdit=true;
    }
    if(this.title!="查看"){
      this.getAllArea();//获取输油处
      this.changePlace(this.form.AREACODE);//根据输油处获取输油站
      this.getRoutes(this.form.STATION);//根据输油站获取线路
      this.changeRoute(this.form.ROUTEID);//根据线路获取启止桩号
      this.getResultList();//获取最终处理结果类型
      this.getProjectTypes();//获取项目类型
      this.getRiskList();//获取施工风险等级
      this.getControlGrades();//获取标准化布控等级
    }
  },
  methods:{
        //获取输油处
        getAllArea(){
            let url="";
            if(this.flag==0){//查看有全部字段
              url='gpsGroups/getAllArea?userId=' +this.$Cookie.get('userId');
            }else{//修改新增无全部字段
              url='pipe/getAreaList?userId=' +this.$Cookie.get('userId');
            }
            this.$myHttp.get(url).then((res) => {
                this.placelist = res.result;
            });
        },
        //获取输油站
          changePlace(val){
              let url="";
              if(this.flag==0){
                url='gpsGroups/getStationsByArea?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val;
              }else{
                url='pipe/getStationList?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val;
              }
              if(this.title=="新增"){
                  this.form.STATION="";
                  this.form.ROUTEID="";
                  this.routelist=[];
                  this.takeList=[];
                  this.takeArr=[];
                  this.form.MILEAGEID="";
              }
              this.$myHttp.get(url).then((res) => {
                this.stationlist = res.result;
              });
        },
         //获取线路
       async  getRoutes(val){
            if(this.title=="新增"){
              this.form.ROUTEID="";
              this.takeList=[];
              this.takeArr=[];
              this.form.MILEAGEID="";
            }
           await this.$myHttp.get('pointManage/getRoutesByStationId?stationId=' + val).then((res) => {
                this.routelist=res.result;
            });
            //获取断长信息列表
           await this.$myHttp.get('construction/getPipeManaList?stationId=' + val).then((res) => {
                this.pipeManaList=res.result;
            });
            //获取现场监护人和巡线员
           await this.$myHttp.get('construction/getPersonList?stationId='+val).then((res)=>{
              this.personList=res.result;
              this.personList2=res.result;
            })
          return;
        },
        getPersonList(val){
           this.personList.map((item)=>{
              if(item.PERSON_ID==val){
                this.personPhone=item.TELEPHONE;
              }
            })
        },
        getPersonList2(val){
           this.personList.map((item)=>{
              if(item.PERSON_ID==val){
                this.personPhone2=item.TELEPHONE;
              }
            })
        },
        getPipemanPhone(val){
          this.pipeManaList.map((item)=>{
            if(item.PERSON_ID==val){
              this.pipemanPhone=item.TELEPHONE;
            }
          })
          this.$myHttp.get('construction/getGhgList?userId='+val).then((res)=>{
              this.ghgTypes=res.result;
          })
        },
        //启止桩号
        async changeRoute(value){
            await this.getAll(value);
        },
        getAll(value){
          return new Promise(resolve=>{
                    this.selectloading = true;
                    this.takeList=[];
                    this.$myHttp.get('pipe/getStakeListByRouteId?routeId=' + value).then((res) => {
                    this.takeList = this.unique(res.result,'STAKEID');
                        if(this.title=="新增"){
                            this.form.MILEAGEID="";
                        }
                        this.selectloading = false;
                        resolve(this.loadmore(true));   
                  });
              });
        },
        getProjectTypes(){
            this.$myHttp.get('gpsGroups/getApCodomainsByCode?code='+"gps_projecttype").then((res)=>{
              this.projectTypeList=res.result;
            })
        },
        getRiskList(){
            this.$myHttp.get('gpsGroups/getApCodomainsByCode?code='+"gps_risklevel").then((res)=>{
              this.riskList=res.result;
            })
        },
        getResultList(){
            this.$myHttp.get('gpsGroups/getApCodomainsByCode?code='+"gps_finalresult").then((res)=>{
              this.resultList=res.result;
            })
        },
        getControlGrades(){
            this.$myHttp.get('gpsGroups/getApCodomainsByCode?code='+"gps_controlgrade").then((res)=>{
              this.controlGradeList=res.result;
            })
        },
        filterVmModel (value) {
          this.form.MILEAGEID= value
          this.filterText = value
          // 筛选数据
          if (value) {
            this.takeArr = this.takeList.filter(item => {
              return item.STAKEID && item.STAKEID.indexOf(value) !== -1
            })
          } else {
            // 直接赋值会连续触发 loadmore 分页事件
            this.takeArr = []
            this.$nextTick(() => {
              this.takeArr = this.takeList.slice(0, this.query.limit * this.query.page)
            })
          }

        },
        unique(arr,u_key) {
              let map = new Map()
              arr.forEach((item,index)=>{
                if (!map.has(item[u_key])){
                  map.set(item[u_key],item)
                }
              })
              return [...map.values()]
        },
        // deteleObject(obj) {
        //     var uniques = [];
        //     var stringify = {};
        //     for (var i = 0; i < obj.length; i++) {
        //         var keys = Object.keys(obj[i]);
        //         keys.sort(function(a, b) {
        //             return (Number(a) - Number(b));
        //         });
        //         var str = '';
        //         for (var j = 0; j < keys.length; j++) {
        //             str += JSON.stringify(keys[j]);
        //             str += JSON.stringify(obj[i][keys[j]]);
        //         }
        //         if (!stringify.hasOwnProperty(str)) {
        //             uniques.push(obj[i]);
        //             stringify[str] = true;
        //         }
        //     }
        //     uniques = uniques;
        //     return uniques;
        // },
        loadmore (firstTag) {
          if (!this.filterText) {
            if (!firstTag) {
              this.query.page++
            }
            // 分页开始坐标
            const begin = this.query.limit * (this.query.page - 1)
            // 分页结束坐标
            const end = begin + this.query.limit
            // 这里使用slice 进行分页
            this.takeArr.push(...this.takeList.slice(begin, end))

          }
        },
        clearList (val) {
          // 移除掉teacher文本框的值时触发方法
          if (!val) {
            this.repeatCode()
          }else{
            this.takeList.map((item)=>{
              if(item.STAKEID==val){
                  this.form.LATITUDE=item.LATITUDE;
                  this.form.LONGITUDE=item.LONGITUDE;
              }
            })
          }
        },
        // 重复的代码
        repeatCode () {
          this.form.MILEAGEID= '';
          this.filterText = '';
          this.takeArr = [];
          this.query = {
            page: 1,
            limit: 10
          }
          this.loadmore(true)
        },
        cancel(){
           this.$emit('close');
        },
        submit(formName) {
          console.log("图片是否和之前一样",this.isEqual(this.beginFiles,this.form.files));
          let myStatu=0;//图片是否修改
          let myUpdateTime="";//修改时间
          let updatePerson="";//修改人
          let imgTime="";//图片修改时间
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
                if(this.title!="新增"){
                    if(this.isEqual(this.beginFiles,this.form.files)==false){
                        myStatu=3;//图片修改
                        imgTime=this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        myUpdateTime=this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        updatePerson=this.$Cookie.get('userId');
                    }else{
                        myStatu=2;//图片未修改
                    }
                    console.log("myStatu="+myStatu);
                     let {files,...obj} =this.formobj;
                     let {files:files2,...obj2} =this.form;
                     console.log(obj);
                     console.log(obj2);
                     console.log(this.isEqual(obj,obj2));
                    if(this.isEqual(obj,obj2)==false){
                       myUpdateTime=this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
                       updatePerson=this.$Cookie.get('userId');
                    }
                    console.log("myUpdateTime="+myUpdateTime);
                    console.log("updatePerson="+updatePerson);
                  }else{
                    myStatu=0;
                }
                let obj={
                  "files":myFiles,
                  "gpsThirdConstruction": {
                    "areaCode":this.form.AREACODE,//分公司
                    "cameraId":this.form.CAMERAID,//视频编号
                    "company":this.form.COMPANY,//施工单位名称
                    "completionData":this.form.COMPLETIONDATA,//是否有管道保护工程措施竣工资料并归档
                    "controlDate":(this.form.CONTROLDATE==""||this.form.CONTROLDATE==null)?null:this.dayjs(this.form.CONTROLDATE).format('YYYY-MM-DD HH:mm:ss'),//标准化布控时间
                    "controlGrade":this.form.CONTROLGRADE,//标准化布控等级
                    "deepExcavation":this.form.DEEPEXCAVATION,//是否深坑开挖
                    "description":this.form.DESCRIPTION,//第三方工程信息简要描述
                    "director":this.form.DIRECTOR,//负责人
                    "directorPhone":this.form.DIRECTORPHONE, //负责人联系方式
                    "endDate":(this.form.ENDDATE==""||this.form.ENDDATE==null)?null:this.dayjs(this.form.ENDDATE).format('YYYY-MM-DD HH:mm:ss'),//完工日期
                    "excavationNum":this.form.EXCAVATIONNUM, //开挖深坑数量
                    "finalResult":this.form.FINALRESULT,//最终处理结果
                    "ghgId":this.form.GHGID,//高后果id
                    "govCheck":this.form.GOVCHECK,//是否取得政府管道保护主管部门审批意见
                    "haveLetters":this.form.HAVELETTERS,//是否有往来处置函件
                    "imgTime":imgTime,//图片修改时间
                    "isCheck":this.form.ISCHECK,//大型施工是否审查
                    "joinAccept":this.form.JOINACCEPT,//是否需要进行联合验收
                    "latitude":this.form.LATITUDE,//纬度
                    "longitude":this.form.LONGITUDE,//经度
                    "mileageId":this.form.MILEAGEID,//桩号
                    "personId":this.form.PERSONID,//责任区巡线员id
                    "pipemanId":this.form.PIPEMANID,//责任区段长id
                    "position":this.form.POSITION,//具体位置
                    "projectName":this.form.PROJECTNAME,//工程名称
                    "projectState":this.form.PROJECTSTATE,//施工状态
                    "projectType":this.form.PROJECTTYPE,//施工类型
                    "risk":this.form.RISK,//施工风险等级
                    "protectionDescription":this.form.PROTECTIONDESCRIPTION,//管道保护工程措施的类型及尺寸简要描述
                    "remark":this.form.REMARK,//备注
                    "repairData":this.form.REPAIRDATA,//是否有焊缝和防腐层的检测和修复资料
                    "reportDate":this.title!="新增"?this.dayjs(this.form.REPORTDATE).format('YYYY-MM-DD HH:mm:ss'):this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),//创建时间
                    "reportUser":this.title!="新增"?this.form.REPORTUSER:this.$Cookie.get('userId'),//创建人
                    "routeId":this.form.ROUTEID,//线路id
                    "safetyNotify":this.form.SAFETYNOTIFY,//是否安全告知
                    "scale":this.form.SCALE,//规模
                    "secureProtocol":this.form.SECUREPROTOCOL,//是否签订安全协议
                    "serialid":this.title!="新增"?this.form.SERIALID:0,//序号
                    "startDate":(this.form.STARTDATE==""||this.form.STARTDATE==null)?null:this.dayjs(this.form.STARTDATE).format('YYYY-MM-DD HH:mm:ss'),//开工日期
                    "station":this.form.STATION,//输油站
                    "status":myStatu,//状态
                    "tellintentions":this.form.TELLINTENTIONS,//是否向施工单位现场交底
                    "tutelage":this.form.TUTELAGE,//是否全时监护（24小时）
                    "tutelageId":this.form.TUTELAGEID,//现场监护人编号
                    "updateTime":myUpdateTime,//更新时间
                    "updateUser":updatePerson,//更新人
                  }
                }
                this.$emit('sub',obj);
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
              this.$emit('close');
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
        isEqual(a,b){
          if(a===b){
            //判断是否为0和-0
            return a !== 0 || 1/a ===1/b;
          }
          //判断是否为null和undefined
          if(a==null||b==null){
            return a===b;
          }
          //接下来判断a和b的数据类型
          var classNameA=Object.prototype.toString.call(a),
            classNameB=Object.prototype.toString.call(b);
          //如果数据类型不相等，则返回false
          if(classNameA !== classNameB){
            return false;
          }
          //如果数据类型相等，再根据不同数据类型分别判断
          switch(classNameA){
            case '[object RegExp]':
            case '[object String]':
            //进行字符串转换比较
            return '' + a ==='' + b;
            case '[object Number]':
            //进行数字转换比较,判断是否为NaN
            if(+a !== +a){
              return +b !== +b;
            }
            //判断是否为0或-0
            return +a === 0?1/ +a === 1/b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
            return +a === +b;
          }
          //如果是对象类型
          if(classNameA == '[object Object]'){
            //获取a和b的属性长度
            var propsA = Object.getOwnPropertyNames(a),
              propsB = Object.getOwnPropertyNames(b);
            if(propsA.length != propsB.length){
              return false;
            }
            for(var i=0;i<propsA.length;i++){
              var propName=propsA[i];
              //如果对应属性对应值不相等，则返回false
              if(a[propName] !== b[propName]){
                return false;
              }
            }
            return true;
          }
          //如果是数组类型
          if(classNameA == '[object Array]'){
            if(a.toString() == b.toString()){
              return true;
            }
            return false;
          }
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
  z-index: 2;
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



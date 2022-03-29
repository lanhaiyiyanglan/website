<style lang="less">
@import 'line.less';
</style>
<template>
  <div
    class="line"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="btnBox">
      <span class='lable'>管理处</span>
      <el-select
        v-model='valueOut'
        @change="getGlc"
        placeholder="请选择管理处"
      >
        <el-option
          v-for="item in optionsOut"
          :key="item.GROUPNAME"
          :label="item.GROUPNAME"
          :value="item.GROUPCODE"
        >
        </el-option>
      </el-select>
      <span class='lable'>输油站</span>
      <el-select
        v-model='valueFiled'
        @change="getSyz"
        placeholder="请选择输油站"
      >
        <el-option
          v-for="item in optionsFiled"
          :key="item.GROUPNAME"
          :label="item.GROUPNAME"
          :value="item.GROUPCODE"
        >
        </el-option>
      </el-select>

      <span class='lable'>必经点类型</span>
      <el-select
        v-model='bjdvaluelist'
        multiple
        collapse-tags
        placeholder="请选择必经点类型"
      >
        <el-option
          v-for="(item,index) in bjdlist"
          :key="index"
          :label="item.CODENAME"
          :value="item.CODEID"
        >
        </el-option>
      </el-select>

      <span class='lable'>日期</span>
      <el-date-picker       
        v-model="timeStr"
        type="month"
        placeholder="选择日期"
      >
      </el-date-picker>
      <span
        class="optionsBtn"
        @click="search"
      >统计</span>
      <span
        class="exportBtn"
        @click='exportToExcel'
      >导出Excel</span>
    </div>
    <div
      v-if="tableLevel!='1'"
      class='goBack'
      @click="goBack"
    >返回</div>
    <div
      v-if="tableLevel=='1'"
      class="tableBox"
      id='tableExport'
    >
      <table
        cellpadding='0'
        cellspacing='0'
        :style="{width:wid+'px'}"
      >
        <thead>
          <tr>
            <th
              colspan="25"
              class='tableName'
            >
              <p>国家石油天然气管网集团有限公司华南分公司</p>
            </th>
          </tr>
          <tr>
            <th
              colspan="25"
              class='detailName'
            >
              <p>{{descOut+descFiled+"GPS管道巡线情况统计表"}}</p>
            </th>
          </tr>
          <tr>
            <th
              colspan="3"
              :style="{width:'200px'}"
            ></th>
            <th
              colspan="4"
              :style="{width:'200px'}"
              v-if='showitem["5"]'
            >第三方施工</th>
            <th
              colspan="4"
              :style="{width:'200px'}"
              v-if='showitem["6"]'
            >易打孔盗油段</th>
            <th
              colspan="4"
              v-if='showitem["7"]'
              :style="{width:'200px'}"
            >重点穿跨越部位</th>
            <th
              colspan="4"
              v-if='showitem["8"]'
              :style="{width:'200px'}"
            >阀室</th>
            <th
              colspan="4"
              v-if='showitem["9"]'
              :style="{width:'200px'}"
            >汛期防汛重点部位</th>

            <th
              colspan="4"
              v-if='showitem["10"]'
              :style="{width:'200px'}"
            >高后果区</th>

            <th
              colspan="4"
              v-if='showitem["11"]'
              :style="{width:'200px'}"
            >高风险段</th>

            <th
              colspan="2"
              :style="{width:'200px'}"
            >里程(KM)</th>
          </tr>
          <tr>
            <th :style="{width:'40px'}">序号</th>
            <th :style="{width:'110px'}">管理处</th>
            <th :style="{width:'50px'}">人数</th>

            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >个数</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >个数</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >个数</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th :style="{width:'100px'}">应巡里程</th>
            <th :style="{width:'100px'}">已巡里程</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value,key) in tableList1"
            :key='key'
          >
            <td :style="{width:'40px'}">{{value.no}}</td>
            <td
              @click="drill(value.groupName,value.groupCode,value.no)"
              v-bind:style="{width:'110px',cursor:'pointer','font-weight':isNaN(value.no)==true ? '900':'100','font-size':isNaN(value.no)==true ? '16px':'12px'}"
              :title="value.groupName"
            >{{value.groupName}}</td>
            <td :style="{width:'50px'}">{{value.personCount}}</td>

            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >
              <!-- <a
                class="link"
                v-if='value.dsfMustPointCount'
                @click='showdetail(value,"第三方施工")'
              >{{value.dsfMustPointCount}}</a> -->
              <span>{{value.dsfMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >{{value.dsfMustPassCount}}</td>
            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >{{value.dsfPostBackCount}}</td>
            <td
              v-if='showitem["5"]'
              :style="{width:'80px'}"
            >{{value.dsfScale}}</td>

            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >
              <!-- <a
                class="link"
                v-if='value.ydkMustPointCount'
                @click='showdetail(value,"易打孔盗油段")'
              >{{value.ydkMustPointCount}}</a> -->
              <span>{{value.ydkMustPointCount}}</span>
            </td>
            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >{{value.ydkMustPassCount}}</td>
            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >{{value.ydkPostBackCount}}</td>
            <td
              v-if='showitem["6"]'
              :style="{width:'80px'}"
            >{{value.ydkScale}}</td>

            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >
              <!-- <a
                class="link"
                v-if='value.zdcMustPointCount'
                @click='showdetail(value,"重点穿跨越部位")'
              >{{value.zdcMustPointCount}}</a> -->
              <span>{{value.zdcMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >{{value.zdcMustPassCount}}</td>
            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >{{value.zdcPostBackCount}}</td>
            <td
              v-if='showitem["7"]'
              :style="{width:'80px'}"
            >{{value.zdcScale}}</td>

            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >
              <!-- <a
                class="link"
                v-if='value.fsMustPointCount'
                @click='showdetail(value,"阀室")'
              >{{value.fsMustPointCount}}</a> -->
              <span>{{value.fsMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >{{value.fsMustPassCount}}</td>
            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >{{value.fsPostBackCount}}</td>
            <td
              v-if='showitem["8"]'
              :style="{width:'80px'}"
            >{{value.fsScale}}</td>

            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >
              <!-- <a
                class="link"
                v-if='value.xqMustPointCount'
                @click='showdetail(value,"汛期防汛重点部位")'
              >{{value.xqMustPointCount}}</a> -->
              <span>{{value.xqMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >{{value.xqMustPassCount}}</td>
            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >{{value.xqPostBackCount}}</td>
            <td
              v-if='showitem["9"]'
              :style="{width:'80px'}"
            >{{value.xqScale}}</td>
            <!-- 假数据 -->
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >
              <!-- <a
                class="link"
                v-if='value.ghgMustPointCount'
                @click='showdetail(value,"高后果区")'
              >{{value.ghgMustPointCount}}</a> -->
              <span>{{value.ghgMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >{{value.ghgMustPassCount}}</td>
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >{{value.ghgPostBackCount}}</td>
            <td
              v-if='showitem["10"]'
              :style="{width:'80px'}"
            >{{value.ghgScale}}</td>

            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >
              <!-- <a
                class="link"
                v-if='value.gfxMustPointCount'
                @click='showdetail(value,"高风险段")'
              >{{value.gfxMustPointCount}}</a> -->
              <span>{{value.gfxMustPointCount}}</span>
            </td>
            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >{{value.gfxMustPassCount}}</td>
            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >{{value.gfxPostBackCount}}</td>
            <td
              v-if='showitem["11"]'
              :style="{width:'80px'}"
            >{{value.gfxScale}}</td>

            <td :style="{width:'100px'}">{{value.mustMileage}}</td>
            <td :style="{width:'100px'}">{{value.postMileage}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="tableLevel=='2'"
      class="tableBox"
      id='tableExport'
    >
      <table
        cellpadding='0'
        cellspacing='0'
        :style="{width:wid+'px'}"
      >
        <thead>
          <tr>
            <th
              colspan="25"
              class='tableName'
            >
              <p>国家石油天然气管网集团有限公司华南分公司</p>
            </th>
          </tr>
          <tr>
            <th
              colspan="25"
              class='detailName'
            >
              <p>{{descOut+descFiled+"GPS管道巡线情况统计表"}}</p>
            </th>
          </tr>
          <tr>
            <th
              colspan="3"
              :style="{width:'200px'}"
            ></th>
            <th
              colspan="4"
              :style="{width:'200px'}"
              v-if='showitem["5"]'
            >第三方施工</th>
            <th
              colspan="4"
              :style="{width:'200px'}"
              v-if='showitem["6"]'
            >易打孔盗油段</th>
            <th
              colspan="4"
              v-if='showitem["7"]'
              :style="{width:'200px'}"
            >重点穿跨越部位</th>
            <th
              colspan="4"
              v-if='showitem["8"]'
              :style="{width:'200px'}"
            >阀室</th>
            <th
              colspan="4"
              v-if='showitem["9"]'
              :style="{width:'200px'}"
            >汛期防汛重点部位</th>

            <th
              colspan="4"
              v-if='showitem["10"]'
              :style="{width:'200px'}"
            >高后果区</th>

            <th
              colspan="4"
              v-if='showitem["11"]'
              :style="{width:'200px'}"
            >高风险段</th>

            <th
              colspan="2"
              :style="{width:'200px'}"
            >里程(KM)</th>
          </tr>
          <tr>
            <th :style="{width:'40px'}">序号</th>
            <th :style="{width:'110px'}">管理处</th>
            <th :style="{width:'50px'}">人数</th>

            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经个数</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经个数</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经个数</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th :style="{width:'100px'}">应巡里程</th>
            <th :style="{width:'100px'}">已巡里程</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value,key) in tableList2"
            :key='key'
          >
            <td :style="{width:'40px'}">{{value.no}}</td>
            <td
              @click="drill(value.groupName,value.groupCode,value.no)"
              v-bind:style="{width:'110px',cursor:'pointer','font-weight':isNaN(value.no)==true ? '900':'100','font-size':isNaN(value.no)==true ? '16px':'12px'}"
              :title="value.groupName"
            >{{value.groupName}}</td>
            <td :style="{width:'50px'}">{{value.personCount}}</td>

            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.dsfMustPointCount'
                @click='showdetail(value,"第三方施工")'
              >{{value.dsfMustPointCount}}</a>
              <span v-else>{{value.dsfMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >{{value.dsfMustPassCount}}</td>
            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >{{value.dsfPostBackCount}}</td>
            <td
              v-if='showitem["5"]'
              :style="{width:'80px'}"
            >{{value.dsfScale}}</td>

            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.ydkMustPointCount'
                @click='showdetail(value,"易打孔盗油段")'
              >{{value.ydkMustPointCount}}</a>
              <span v-else>{{value.ydkMustPointCount}}</span>
            </td>
            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >{{value.ydkMustPassCount}}</td>
            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >{{value.ydkPostBackCount}}</td>
            <td
              v-if='showitem["6"]'
              :style="{width:'80px'}"
            >{{value.ydkScale}}</td>

            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.zdcMustPointCount'
                @click='showdetail(value,"重点穿跨越部位")'
              >{{value.zdcMustPointCount}}</a>
              <span v-else>{{value.zdcMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >{{value.zdcMustPassCount}}</td>
            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >{{value.zdcPostBackCount}}</td>
            <td
              v-if='showitem["7"]'
              :style="{width:'80px'}"
            >{{value.zdcScale}}</td>

            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.fsMustPointCount'
                @click='showdetail(value,"阀室")'
              >{{value.fsMustPointCount}}</a>
              <span v-else>{{value.fsMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >{{value.fsMustPassCount}}</td>
            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >{{value.fsPostBackCount}}</td>
            <td
              v-if='showitem["8"]'
              :style="{width:'80px'}"
            >{{value.fsScale}}</td>

            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.xqMustPointCount'
                @click='showdetail(value,"汛期防汛重点部位")'
              >{{value.xqMustPointCount}}</a>
              <span v-else>{{value.xqMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >{{value.xqMustPassCount}}</td>
            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >{{value.xqPostBackCount}}</td>
            <td
              v-if='showitem["9"]'
              :style="{width:'80px'}"
            >{{value.xqScale}}</td>
            <!-- 假数据 -->
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.ghgMustPointCount'
                @click='showdetail(value,"高后果区")'
              >{{value.ghgMustPointCount}}</a>
              <span v-else>{{value.ghgMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >{{value.ghgMustPassCount}}</td>
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >{{value.ghgPostBackCount}}</td>
            <td
              v-if='showitem["10"]'
              :style="{width:'80px'}"
            >{{value.ghgScale}}</td>

            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.gfxMustPointCount'
                @click='showdetail(value,"高风险段")'
              >{{value.gfxMustPointCount}}</a>
              <span v-else>{{value.gfxMustPointCount}}</span>
            </td>
            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >{{value.gfxMustPassCount}}</td>
            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >{{value.gfxPostBackCount}}</td>
            <td
              v-if='showitem["11"]'
              :style="{width:'80px'}"
            >{{value.gfxScale}}</td>

            <td :style="{width:'100px'}">{{value.mustMileage}}</td>
            <td :style="{width:'100px'}">{{value.postMileage}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="tableLevel=='3'"
      class="tableBox"
      id='tableExport'
    >
      <table
        cellpadding='0'
        cellspacing='0'
        :style="{width:wid+'px'}"
      >
        <thead>
          <tr>
            <th
              colspan="25"
              class='tableName'
            >
              <p>国家石油天然气管网集团有限公司华南分公司</p>
            </th>
          </tr>
          <tr>
            <th
              colspan="25"
              class='detailName'
            >
              <p>{{descOut+descFiled+"GPS管道巡线情况统计表"}}</p>
            </th>
          </tr>
          <tr>
            <th
              colspan="3"
              :style="{width:'200px'}"
            ></th>
            <th
              colspan="4"
              :style="{width:'200px'}"
              v-if='showitem["5"]'
            >第三方施工</th>
            <th
              colspan="4"
              :style="{width:'200px'}"
              v-if='showitem["6"]'
            >易打孔盗油段</th>
            <th
              colspan="4"
              v-if='showitem["7"]'
              :style="{width:'200px'}"
            >重点穿跨越部位</th>
            <th
              colspan="4"
              v-if='showitem["8"]'
              :style="{width:'200px'}"
            >阀室</th>
            <th
              colspan="4"
              v-if='showitem["9"]'
              :style="{width:'200px'}"
            >汛期防汛重点部位</th>

            <th
              colspan="4"
              v-if='showitem["10"]'
              :style="{width:'200px'}"
            >高后果区</th>

            <th
              colspan="4"
              v-if='showitem["11"]'
              :style="{width:'200px'}"
            >高风险段</th>

            <th
              colspan="2"
              :style="{width:'200px'}"
            >里程(KM)</th>
          </tr>
          <tr>
            <th :style="{width:'40px'}">序号</th>
            <th :style="{width:'110px'}">管理处</th>
            <th :style="{width:'50px'}">人数</th>

            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["5"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经个数</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["6"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["7"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["8"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经点数</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡点次</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡点次</th>
            <th
              v-if='showitem["9"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经个数</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["10"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >必经个数</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >应巡个次</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'40px','line-height':'1.4rem'}"
            >已巡个次</th>
            <th
              v-if='showitem["11"]'
              :style="{width:'80px'}"
            >完成率</th>

            <th :style="{width:'100px'}">应巡里程</th>
            <th :style="{width:'100px'}">已巡里程</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value,key) in tableList3"
            :key='key'
          >
            <td :style="{width:'40px'}">{{value.no}}</td>
            <td
              v-bind:style="{width:'110px','font-weight':isNaN(value.no)==true ? '900':'100','font-size':isNaN(value.no)==true ? '16px':'12px'}"
              :title="value.groupName"
            >{{value.groupName}}</td>
            <td :style="{width:'50px'}">{{value.personCount}}</td>

            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.dsfMustPointCount'
                @click='showdetail(value,"第三方施工")'
              >{{value.dsfMustPointCount}}</a>
              <span v-else>{{value.dsfMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >{{value.dsfMustPassCount}}</td>
            <td
              v-if='showitem["5"]'
              :style="{width:'40px'}"
            >{{value.dsfPostBackCount}}</td>
            <td
              v-if='showitem["5"]'
              :style="{width:'80px'}"
            >{{value.dsfScale}}</td>

            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.ydkMustPointCount'
                @click='showdetail(value,"易打孔盗油段")'
              >{{value.ydkMustPointCount}}</a>
              <span v-else>{{value.ydkMustPointCount}}</span>
            </td>
            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >{{value.ydkMustPassCount}}</td>
            <td
              v-if='showitem["6"]'
              :style="{width:'40px'}"
            >{{value.ydkPostBackCount}}</td>
            <td
              v-if='showitem["6"]'
              :style="{width:'80px'}"
            >{{value.ydkScale}}</td>

            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.zdcMustPointCount'
                @click='showdetail(value,"重点穿跨越部位")'
              >{{value.zdcMustPointCount}}</a>
              <span v-else>{{value.zdcMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >{{value.zdcMustPassCount}}</td>
            <td
              v-if='showitem["7"]'
              :style="{width:'40px'}"
            >{{value.zdcPostBackCount}}</td>
            <td
              v-if='showitem["7"]'
              :style="{width:'80px'}"
            >{{value.zdcScale}}</td>

            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.fsMustPointCount'
                @click='showdetail(value,"阀室")'
              >{{value.fsMustPointCount}}</a>
              <span v-else>{{value.fsMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >{{value.fsMustPassCount}}</td>
            <td
              v-if='showitem["8"]'
              :style="{width:'40px'}"
            >{{value.fsPostBackCount}}</td>
            <td
              v-if='showitem["8"]'
              :style="{width:'80px'}"
            >{{value.fsScale}}</td>

            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.xqMustPointCount'
                @click='showdetail(value,"汛期防汛重点部位")'
              >{{value.xqMustPointCount}}</a>
              <span v-else>{{value.xqMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >{{value.xqMustPassCount}}</td>
            <td
              v-if='showitem["9"]'
              :style="{width:'40px'}"
            >{{value.xqPostBackCount}}</td>
            <td
              v-if='showitem["9"]'
              :style="{width:'80px'}"
            >{{value.xqScale}}</td>
            <!-- 假数据 -->
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.ghgMustPointCount'
                @click='showdetail(value,"高后果区")'
              >{{value.ghgMustPointCount}}</a>
              <span v-else>{{value.ghgMustPointCount}}</span>

            </td>
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >{{value.ghgMustPassCount}}</td>
            <td
              v-if='showitem["10"]'
              :style="{width:'40px'}"
            >{{value.ghgPostBackCount}}</td>
            <td
              v-if='showitem["10"]'
              :style="{width:'80px'}"
            >{{value.ghgScale}}</td>

            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >
              <a
                class="link"
                v-if='value.gfxMustPointCount'
                @click='showdetail(value,"高风险段")'
              >{{value.gfxMustPointCount}}</a>
              <span v-else>{{value.gfxMustPointCount}}</span>
            </td>
            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >{{value.gfxMustPassCount}}</td>
            <td
              v-if='showitem["11"]'
              :style="{width:'40px'}"
            >{{value.gfxPostBackCount}}</td>
            <td
              v-if='showitem["11"]'
              :style="{width:'80px'}"
            >{{value.gfxScale}}</td>

            <td :style="{width:'100px'}">{{value.mustMileage}}</td>
            <td :style="{width:'100px'}">{{value.postMileage}}</td>
          </tr>
        </tbody>

      </table>
    </div>
    <TabPointCom
      v-if='showcom'
      :title='titlecom'
      :pointTime='pointTime'
      :pointItem='pointItem'
    />
  </div>
</template>
<script>
import { formatDateUnix2 } from '../../filters/index.js';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { tableToExcel } from '../../libs/xml';
import TabPointCom from '../../components/tablepointlist';
export default {
  components: {
    TabPointCom,
  },
  data() {
    return {
      pointItem: {},
      pointTime: '',
      loading: false,
      titlecom: '',
      showcom: false,
      tableList1: [],
      tableList2: [],
      tableList3: [],
      showitem: {
        5: true,
        6: true,
        7: true,
        8: true,
        8: true,
        10: true,
        11: true,
      },
      bjdlist: [],
      bjdvaluelist: [],
      timeStr: new Date(), //日期
      tableLevel: '1', //列表钻取层级
      optionsOut: null, //输油处
      valueOut: '',
      descOut: '',
      optionsFiled: null, //站场
      valueFiled: '',
      descFiled: '',
      wid: 1820,
    };
  },
  computed: {},
  methods: {
    getbjdlist() {
      this.$myHttp.get('pointManage/getPointTypeList').then((res) => {
        // console.log(1445445, res);
        this.bjdlist = res.result;
        if (res.result.length > 0) {
          let parr = [];
          res.result.map((val, key) => {
            parr.push(val.CODEID);
          });
          this.bjdvaluelist = parr;
        }
      });
    },
    exportToExcel() {
      //导出
      console.log(454545);
      tableToExcel('tableExport', 'GPS管道巡线承揽人巡线任务及完成情况统计表');
      // let et = XLSX.utils.table_to_book(document.getElementById('tableExport')); //此处传入table的DOM节点
      // let etout = XLSX.write(et, {
      //   bookType: 'xlsx',
      //   bookSST: true,
      //   type: 'array',
      // });
      // try {
      //   FileSaver.saveAs(
      //     new Blob([etout], {
      //       type: 'application/octet-stream',
      //     }),
      //     'GPS管道巡线承揽人巡线任务及完成情况统计表.xlsx'
      //   ); //trade-publish.xlsx 为导出的文件名
      // } catch (e) {
      //   console.log(e, etout);
      // }
      // return etout;
    },
    getGlc(val) {
      //选择处，获取站场
      let that = this;
      that.descFiled = '';
      that.optionsFiled = null;
      let arr = that.optionsOut;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].GROUPCODE == val) {
          that.descOut = arr[i].GROUPNAME;
        }
      }
      that.$myHttp
        .get(
          'gpsGroups/getStationsByArea?userId=' +
            this.$Cookie.get('userId') +
            '&groupCode=' +
            val
        )
        .then((res) => {
          that.optionsFiled = res.result;
        });
    },
    getSyz(val) {
      let that = this;
      let arr = that.optionsFiled;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].GROUPCODE == val) {
          that.descFiled = arr[i].GROUPNAME;
        }
      }
    },
    search() {
      // console.log(8989, this.bjdvaluelist);
      let showobj = {};
      if (this.bjdvaluelist.length > 0) {
        this.bjdvaluelist.map((val, key) => {
          showobj[val] = true;
        });
      }
      this.showitem = showobj;
      // console.log(1477, showobj);
      this.wid = 420 + this.bjdvaluelist.length * 200;
      //查询
      let that = this;
      that.loading = true;
      let areaId = that.valueOut;
      let stationId = that.valueFiled;
      let timeStr = that.timeStr;
      if (timeStr == '') {
        timeStr = formatDateUnix2(new Date().getTime());
        this.timeStr = new Date();
        console.log(this.timeStr, '123');
      } else {
        timeStr = new Date(timeStr).getTime(); //结束时间
        timeStr = formatDateUnix2(timeStr);
      }
      this.pointTime = timeStr;
      if (stationId != '') {
        //场站任务完成情况统计
        that.$myHttp
          .post('groupTaskComp/getTaskStatByStation', {
            areaId: areaId,
            clientTypeId: '',
            stationId: stationId,
            pointType: this.bjdvaluelist.join(','),
            queryDate: timeStr,
            userId: this.$Cookie.get('userId'),
          })
          .then((res) => {
            this.tableLevel = '3';
            that.tableList3 = res.result;
            that.loading = false;
          });
      } else if (areaId != '') {
        that.$myHttp
          .post('groupTaskComp/getTaskStatByArea', {
            areaId: areaId,
            clientTypeId: '',
            stationId: stationId,
            pointType: this.bjdvaluelist.join(','),
            queryDate: timeStr,
            userId:this.$Cookie.get('userId'),
          })
          .then((res) => {
            this.tableLevel = '2';
            that.tableList2 = res.result;
            that.loading = false;
          });
      } else {
        //全部管理处任务完成情况统计
        that.$myHttp
          .post('groupTaskComp/getTaskStatByAll', {
            areaId: areaId,
            clientTypeId: '',
            pointType: this.bjdvaluelist.join(','),
            stationId: stationId,
            queryDate: timeStr,
            userId:this.$Cookie.get('userId'),
          })
          .then((res) => {
            this.tableLevel = '1';
            that.tableList1 = res.result;
            that.loading = false;
          });
      }
    },
    drill(name, code, key) {
      //钻取
      if (!isNaN(key)) {
        window.vm.$message({
          type: 'error',
          message: '无钻取数据',
          showClose: true,
          duration: 5000,
        });
        return false;
      }
      let tableLevel = this.tableLevel;
      if (tableLevel == '1') {
        this.getGlc(code);
        this.valueOut = code;
        this.descOut = name;
        this.tableLevel = '2';
        this.search();
      } else if (this.tableLevel == '2') {
        this.valueFiled = code;
        this.descFiled = name;
        this.search();
        this.tableLevel = '3';
      }
    },
    goBack() {
      //返回
      let tableLevel = this.tableLevel;
      if (tableLevel == '3') {
        this.tableLevel = '2';
      } else if (this.tableLevel == '2') {
        this.tableLevel = '1';
      }
    },
    getInfo() {
      //获取处
      let that = this;
      that.$axios
        .all([
          that.$myHttp.get(
            'gpsGroups/getAllArea?userId=' +this.$Cookie.get('userId')
          ),
        ])
        .then(
          that.$axios.spread(function (sycList, personType) {
            that.optionsOut = sycList.result; //输油处
          })
        );
    },
    //弹框详情
    showdetail(item, name) {
      console.log(1444, item, name);
      this.pointItem = item;
      this.titlecom = name;
      this.showcom = true;
    },
  },
  watch: {},
  beforeMount() {},
  beforeDestroy() {},
  created() {},
  mounted() {
    this.getInfo();
    this.getbjdlist();
  },
};
</script>
<style scoped lang='less'>
table thead {
  padding-right: 8px;
}
table tbody {
  display: block;
  height: 30rem;
  overflow-y: auto;
}

table thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
tbody tr td .link {
  color: #62e8ff;
}

table thead {
  width: calc(100% - 1em);
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}
</style>

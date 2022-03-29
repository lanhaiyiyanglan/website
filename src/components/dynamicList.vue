<template>
  <div>
      <div class="addList">
        <div class='addTable'>
          <div class='title'>
            工程施工列表
            <span
              class="close"
              @click="cancel"
            >{{"×"}}</span>
          </div>
          <div class="formbox">
          <el-table max-height="600"
                        :data="tableData.slice((currentPage - 1) * pageSize, currentPage*pageSize)" tooltip-effect="dark" border style="width: 100%"   
                        :header-cell-style="{background:'#fff','text-align':'center'}" :cell-style="{'text-align':'center'}"
                        highlight-current-row
                        ref="multipleTable"
                        >
                  <el-table-column prop="ADDER" label="填写人"></el-table-column>
                  <el-table-column prop="ADDTIME" label="填写时间"></el-table-column>
                  <el-table-column prop="DESCRIPTION" label="施工动态"></el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="detailDynamic(scope.$index, tableData)"
                        type="text"
                        size="small">
                        施工动态详情
                        </el-button>
                    </template>
                  </el-table-column>
            </el-table>
          </div>
          <div class="paginationBox">
              <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10,15,20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                  </el-pagination>
          </div>
        </div>
      </div>
      <addDynamic
          v-if="detailDynamicShow"
          :SERIALID='SERIALID'
          :dynamicTitle="dynamicTitle"
          @closeDynamic="closeDynamic"
      >
      </addDynamic>
  </div>
</template>

<script>
import addDynamic from './addDynamic';
export default {
  props: ['tId'],
  components: {addDynamic},
  data() {
    return {
        tableData:[],
        currentPage: 1,
        pageSize: 10,
        total:0,
        detailDynamicShow:false,
        idx:'',
        dynamicTitle:'查看'
    };
  },
  created() {
    this.getDynamicList();
  },
  methods: {
    getDynamicList(){
        this.$myHttp.get('construction/getTrendsList?tId='+this.tId).then((res) => {
              if (res.success) {
                   let arr=res.result;
                    if(arr.length>0){
                        this.tableData=arr.map(v=>{
                            return {...v,ADDTIME:v.ADDTIME==null?'':this.dayjs(v.ADDTIME).format('YYYY-MM-DD HH:mm:ss')}
                        })
                    }else{
                        this.tableData=[];
                    }
                    this.total=this.tableData.length;
                    let currentPage = this.currentPage > Math.ceil(this.total/this.pageSize) ? Math.ceil(this.total/this.pageSize) : this.currentPage;
                    this.currentPage = this.currentPage < 1 ? 1 : currentPage;
              } else {
                  window.vm.$message({
                      type: 'error',
                      message: res.msg || '查询失败',
                      showClose: true,
                      duration: 2000,
                  });
              }
        });
    },
   cancel(){
        this.$emit('closeDynamicList');
   },
    handleSizeChange(val) {
        this.pageSize=val;//每页多少条
    },
    handleCurrentChange(val) {
        this.currentPage=val;//当前页
    },
   detailDynamic(index, rows) {
       this.SERIALID=rows[index].SERIALID;
       this.detailDynamicShow=true;
   },
   closeDynamic(){
     this.detailDynamicShow=false;
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
    width:1000px;
    background: #000000;
    position: absolute;
    left: 50%;
    margin-left: -500px;
    z-index:3;
       min-height: 200px;
    overflow: hidden;
    padding-bottom: 15px;
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
}
.formbox {
  overflow: hidden;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  height:auto;
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
.paginationBox{padding-top:15px;}
</style>
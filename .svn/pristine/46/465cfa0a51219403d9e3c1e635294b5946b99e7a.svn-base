<template>
  <div class="addList">
    <div class='addTable'>
      <div class='title'>
        抽查登记列表
        <span
          class="close"
          @click="cancel"
        >{{"×"}}</span>
      </div>
      <div class="box">
           <el-form :inline="true" :model="form" class="form">
            <el-form-item label="输油处：" prop="AREAID">
               <el-select
                    size="small"
                    v-model="form.AREAID"
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
          <el-form-item label="输油站：" prop="STATIONID">
            <el-select
                size="small"
                v-model="form.STATIONID"
                placeholder="请选择输油站"
                @change="changeStation"
                >
                <el-option
                    v-for='item in stationlist'
                    :key='item.GROUPCODE'
                    :label="item.GROUPNAME"
                    :value="item.GROUPCODE"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：" prop="dateTime">
              <el-date-picker size="small" v-model="form.dateTime"  placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeTime"></el-date-picker>
          </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="search()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          height="60vh"
          :span-method="objectSpanMethod"
          style="width:90%;margin:0 auto;">
          <el-table-column prop="Nosort" label="序号" min-width="50px"></el-table-column>
          <el-table-column
            prop="STATIONNAME"
            label="输油站">
          </el-table-column>
          <el-table-column
            prop="PROJECTNAME"
            label="施工点">
          </el-table-column>
          <el-table-column prop="TUTELAGENAME" label="监护人"></el-table-column>
          <el-table-column prop="ADDER" label="抽查人"></el-table-column>
          <el-table-column prop="CHECKTIME" label="抽查时间"></el-table-column>
          <el-table-column prop="DESCRIPTION" label="抽查情况"></el-table-column>
          <el-table-column prop="NOTE" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>
<script>
export default {
     data(){
       return{
          form: {
                AREAID: '',
                STATIONID: '',
                dateTime:"",
          },
          placelist:[],
          stationlist:[],
          tableData:[],
          spanArr: [],//用于存放每一行记录的合并数
       }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.form.AREAID="";
            this.form.dateTime="";
            this.getAllArea();//获取输油处
            this.changePlace(this.form.AREAID);//根据输油处获取输油站
        },
         //获取输油处
        getAllArea(){
            let url='pipe/getAreaList?userId=' + this.$Cookie.get('userId');
            this.$myHttp.get(url).then((res) => {
                this.placelist = res.result;
            });
        },
        //获取输油站
        changePlace(val){
                this.form.STATIONID="";
                let url='pipe/getStationList?userId=' +this.$Cookie.get('userId') +'&groupCode=' +val;
                this.$myHttp.get(url).then((res) => {
                  this.stationlist = res.result;
                });
                this.tableData=[];
                this.spanArr=[];
        },
        changeStation(){
          this.tableData=[];
          this.spanArr=[];
        },
        changeTime(){
          this.tableData=[];
          this.spanArr=[];
        },
        async search(){
           this.tableData=await this.getTableData();
           if(this.tableData.length>=1){
             this.getSpanArr(this.tableData);
           }
        },
        getTableData(){
            return new Promise(resolve=>{
                let json={
                    "areaId":this.form.AREAID,
                    "queryDate":this.form.dateTime,
                    "stationId":this.form.STATIONID
                };
                this.$myHttp.post('construction/getCheckList',json).then((res) => {
                      let arr=[];
                      res.result.map((item)=>{
                        console.log(item.checkList.length);
                        if(item.checkList.length>=1){
                            item.checkList.map((val)=>{
                              arr.push(
                                {
                                  SID:item.SID,
                                  STATIONNAME:item.STATIONNAME,
                                  PROJECTNAME:item.PROJECTNAME,
                                  TUTELAGENAME:item.TUTELAGENAME,
                                  CHECKTIME:val.CHECKTIME,
                                  DESCRIPTION:val.DESCRIPTION,
                                  NOTE:val.NOTE,
                                  ADDER:val.ADDER,
                                }
                              )
                            })
                        }else{
                            arr.push(
                                {
                                  SID:item.SID,
                                  STATIONNAME:item.STATIONNAME,
                                  PROJECTNAME:item.PROJECTNAME,
                                  TUTELAGENAME:item.TUTELAGENAME,
                                  CHECKTIME:null,
                                  DESCRIPTION:null,
                                  NOTE:null,
                                  ADDER:null,
                                }
                              )
                        }
                      })
                      resolve(arr);
                })
            });
        },
        cancel(){
         this.$emit('closeCheckList');
        },
         getSpanArr(data) {
            // data就是我们从后台拿到的数据
          for (var i = 0; i < data.length; i++) {
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0;
            } else {
              // 判断当前元素与上一个元素是否相同
              if (data[i].SID === data[i - 1].SID) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } else {
                this.spanArr.push(1);
                this.pos = i;
              }
            }
          }
          let Nosort=0;
          if(this.spanArr.length>=1){
            for(let n in this.spanArr){
                if(this.spanArr[n]>0){
                    Nosort += 1
                    this.$set(this.tableData[n],'Nosort',Nosort)
                }
            }
          }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0 || columnIndex === 1|| columnIndex === 2|| columnIndex === 3) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              // [0,0] 表示这一行不显示， [2,1]表示行的合并数
              rowspan: _row,
              colspan: _col
            };
          }
        }
    },
}
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
    margin-left:5%;
    height:80vh;
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
  }
}
.box{
  padding:20px 0 0 20px;
}
</style>
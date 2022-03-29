<template>
    <div class="box" id="specialGdao">
        <el-row>
            <el-button type="primary" icon="el-icon-plus" @click="operation('新增管段信息')">新增</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="operation('修改管段信息')">修改</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="delet()">删除</el-button>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button type="primary" icon="el-icon-map-location" @click="site()">定位</el-button>
            <el-button type="primary" icon="el-icon-view" @click="operation('查看管段信息')">查看</el-button>
        </el-row>
        <el-row>
            <el-table ref="multipleTable" :data="tableData.slice((currentPage - 1) * pageSize, currentPage*pageSize)" height="calc(100vh - 230px)" border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="AREANAME" label="输油处"></el-table-column>
                <el-table-column prop="STATIONNAME" label="输油站"></el-table-column>
                <el-table-column prop="NAME" label="管段名称"></el-table-column>
                <el-table-column prop="TYPENAME" label="管段类型"></el-table-column>
                <el-table-column prop="STARTSTAKE" label="起点桩号"></el-table-column>
                <el-table-column prop="ENDSTAKE" label="终点桩号"></el-table-column>
                <el-table-column prop="MILE" :label="'管段长度 | (KM)'" :render-header="renderheader"></el-table-column>
            </el-table>
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
        </el-row>
         <!-- 新增编辑弹框 -->
        <detail-guan-dao
            v-if='show'
            :title='title'
            :flag="flag"
            :loading="loading"
            @close='closeDetail'
            :formobj='formobj'
            @sub='submitDetail'
        />
        <search
            v-show='showSearch'
            :title='searchTitle'
            :isGd="1"
            @sub1='submitSearch'
            @close='closeSearch'
         ></search>
         <div class="mapBox" v-if="mapBool">
            <div class="conBox">
                <div class="title">地图展示<span
                    class="close"
                    @click="closeMap"
                >{{"×"}}</span></div>
                <iframe src="/SinopecPatrol/statistics/static/AntuMap/AntuMap.html"></iframe>
                <!-- <iframe :src="src"></iframe> -->
            </div>
        </div>
    </div>
</template>
<script>
import detailGuanDao from '../../components/detailGuanDao.vue';
import Search from '../../components/search.vue';
  export default {
    components: { detailGuanDao, Search },
    data() {
      return {
        mapBool: false, //展示地图
        tableData: [],
        multipleSelection:[],
        title:"新增管段信息",
        show:false,
        formobj: {},
        flag:1,
        showSearch:false,
        searchTitle:"查询管段",
        obj:{
            "areaId": "",
            "pipeName": "",
            "pipeType": 0,
            "stationId": "",
            "userId":this.$Cookie.get('userId')
        },
        params:{},
        currentPage: 1,
        pageSize: 10,
        total:0,
        //src:"./static/AntuMap/AntuMap.html",
        loading:false,
      }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
          this.show=false;
          this.submitSearch(this.obj);
        },
        handleSizeChange(val) {
            this.pageSize=val;//每页多少条
        },
        handleCurrentChange(val) {
            this.currentPage=val;//当前页
        },
        handleSelectionChange(val)
        {
             if(val.length >=2){
                    // 删除索引为0的
                    let arrays = val.splice(0,val.length-1)
                    arrays.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row); //除了当前点击的，其他的全部取消选中
                    })
            }
            this.multipleSelection = val;
        },
        operation(title){
            if(title=="修改管段信息"||title=="查看管段信息"){
                if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                     window.vm.$message({
                            type: 'error',
                            message:'请选择一条管段信息',
                            showClose: true,
                            duration: 2000,
                     });
                }else{
                    this.formobj=this.multipleSelection[0];
                    this.title=title;
                    setTimeout(this.show=true,1500);
                }
            }else{//新增
                    this.formobj={};
                    this.title=title;
                    setTimeout(this.show=true,1500);
            }
            if(title=="查看管段信息"){
                this.flag=0;
            }else{
                this.flag=1;
            }
        },
        search(){
           this.showSearch=true;
        },
        //删除管段
        delet(){
           if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                window.vm.$message({
                    type: 'error',
                    message:'请选择一条管段信息',
                    showClose: true,
                    duration: 2000,
                });
           }else{
                let id=this.multipleSelection[0].SERIALID;
                window.vm.$confirm('确定是否删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                       this.$myHttp.get('pipe/deletePipe?userId='+this.$Cookie.get('userId') +'&id=' +id).then((res) => {
                               if (res.success) {
                                    window.vm.$message({
                                        type: 'success',
                                        message: res.msg,
                                        showClose: true,
                                        duration: 2000,
                                    });
                                    this.tableData.forEach((v, i) => {
                                        if(this.multipleSelection[0].SERIALID == v.SERIALID){
                                            this.tableData.splice(i, 1);
                                        }
                                    })
                                    this.total=this.tableData.length;
                                    let currentPage = this.currentPage > Math.ceil(this.total/this.pageSize) ? Math.ceil(this.total/this.pageSize) : this.currentPage;
                                    this.currentPage = this.currentPage < 1 ? 1 : currentPage;
                                } else {
                                    window.vm.$message({
                                        type: 'error',
                                        message: res.msg || '操作失败',
                                        showClose: true,
                                        duration: 2000,
                                    });
                                }
                       });
                })
           }
        },
        //关闭新增修改弹框
        closeDetail() {
          this.show=false;
        },
        //关闭查询弹框
        closeSearch(){
            this.showSearch=false;
        },
        getAll(e){
            this.loading=true;
            console.log("aa="+this.loading);
            return new Promise(resolve=>{
                 this.$myHttp.post('pipe/savePipe',e).then(async(res) => {
                        if (res.success) {
                            window.vm.$message({
                                type: 'success',
                                message: '操作成功',
                                showClose: true,
                                duration: 2000,
                            });
                            await this.submitSearch(this.params);
                            resolve();
                        } else {
                            window.vm.$message({
                                type: 'error',
                                message: res.msg || '操作失败',
                                showClose: true,
                                duration: 2000,
                            });
                        }
                       
                })
            })
        },
        //提交新增，修改
        async submitDetail(e)
        {
            await this.getAll(e);
            console.log("cc="+this.loading);
            this.loading=false;
            console.log("dd="+this.loading);
            this.show=false;
        },
        //查询回显
        submitSearch(e){
           this.params=e;
           return this.$myHttp.post('pipe/getPipeList', e).then((res) => {
                            if (res.success) {
                                this.showSearch = false;
                                this.tableData=res.result;
                                this.total=this.tableData.length;
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
        async site(){
           if(this.multipleSelection.length==0||this.multipleSelection.length>1){
                    window.vm.$message({
                        type: 'error',
                        message:'请选择一个管段',
                        showClose: true,
                        duration: 2000,
                    });
            }else{
                let obj=this.multipleSelection[0];
                let params={
                    "endStake": obj.ENDSTAKE,
                    "routeId":obj.ROUTEID,
                    "startStake":obj.STARTSTAKE
                }
                let arr =await this.waitSites(params);
                console.log(arr);
                if(arr.length<1){
                      window.vm.$message({
                            type: 'error',
                            message: '无空间位置',
                            showClose: true,
                            duration: 5000,
                        });
                        return false;
                }else{
                    let  temp=[{pointList:arr,lineDetail:obj}];
                    console.log(temp);
                    sessionStorage.setItem('mapInfo',JSON.stringify(temp));
                    sessionStorage.setItem('pointFre', '5');
                    sessionStorage.setItem('pointKey',"one");
                    console.log(sessionStorage.getItem('mapInfo'));
                    this.mapBool = true;
                }
            }
        },
        waitSites(params){
            return new Promise(resolve=>{
                 this.$myHttp.post('pipe/getStakes',params).then((res) => {
                    let arr=[];
                    if (res.result!=null&&res.result!="") {
                        arr=res.result.map((v)=>{
                            return {...v,pointname:v.STAKEID,longitude:v.LONGITUDE,latitude:v.LATITUDE,pointid:v.STAKEID};
                        })
                    } else {
                        arr=[];
                    }
                    resolve(arr);
               });
            })
           
        },
        closeMap() {
            this.mapBool = false;
            sessionStorage.setItem('mapInfo', null);
        },
        renderheader(h, { column, $index }) {
            return h('span', {}, [
                h('span', {}, column.label.split('|')[0]),
                h('br'),
                h('span', {}, column.label.split('|')[1])
            ]);
        },
    },
    watch: {
            '$route' (to, from) { //监听路由是否变化
                if(to.path != from.path){
                    this.init();//重新加载数据
                }
            }
    },     
  }
</script>
<style scoped>
.box{width:100%;height:100%;padding:20px 20px;box-sizing: border-box;position: relative;}
.box>.el-row{width:100%;}
.box>.el-row:first-child{margin-bottom: 20px;}
.mapBox {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99999999;
}
 .mapBox .conBox .title .close {
    position: absolute;
    height: 30px;
    line-height: 30px;
    width: 30px;
    right: 15px;
    top: 15px;
    font-size: 25px;
    cursor: pointer;
}
.mapBox .conBox {
    height: 90%;
    width: 90%;
    margin-top: 2.5%;
    margin-left: 5%;
}
.mapBox .conBox .title {
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #ccc;
    color: #000000;
}
 .mapBox .conBox iframe {
    height: calc((100% - 60px));
    width: 100%;
}
</style>
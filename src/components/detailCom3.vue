<template>
  <div class='addList'>
    <div class='addTable'>
      <div class='title'>
        删除{{elseTitle}}
        <span
          class="close"
          @click="cancelDelete"
        >{{"×"}}</span>
      </div>
      <table
        cellpadding='0'
        cellspacing='0'
      >
        <thead>
          <tr>
            <th :style="{width:'20%'}">选择</th>
            <th :style="{width:'40%'}">序号</th>
            <th :style="{width:'40%'}">名称</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value,key) in list"
            :key="key"
          >
            <td :style="{width:'20%'}">
              <el-checkbox
                v-model="value.check"
                label=""
              ></el-checkbox>

            </td>
            <td :style="{width:'40%'}">{{value.STAKEID}}</td>
            <td :style="{width:'40%'}">{{value.POINTNAME}}</td>
          </tr>
        </tbody>
      </table>
      <div class='confirm'>
        <span
          class="add"
          @click="deleteCon2"
          :loading='loading'
        >确认</span>
        <span
          class="close"
          @click="cancelDelete"
        >取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailCom3',
  props: {
    elseTitle: {
      type: String,
      default() {
        return '';
      },
    },
    stationId: {
      type: String,
      default() {
        return '';
      },
    },
    delPoint: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
      list: [],
    };
  },
  mounted() {
    this.list = [];

    let arr = [];
    arr = JSON.parse(JSON.stringify(this.delPoint));
    this.list = arr;
  },
  methods: {
    cancelDelete() {
      this.$parent.detailcombool = false;
    },
    deleteCon2() {
      let addArr = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].check) {
          let obj = JSON.parse(JSON.stringify(this.list[i]));
          obj.check = false;
          addArr.push(obj);
        }
      }
      if (addArr.length > 1) {
        this.$message.error('一次只能删除单条数据');
        return;
      }
      // this.$emit('sub', addArr);
      if (this.elseTitle == '高后果区') {
        this.delghg(addArr[0]);
      } else if (this.elseTitle == '高风险段') {
        this.delgfx(addArr[0]);
      } else if (this.elseTitle == '易打孔盗油点') {
        this.delydk(addArr[0]);
      }
    },
    //
    delydk(obj) {
      this.loading = true;
      let that = this;
      let obj2 = {
        routeId: obj.ROUTEID,
        serialid: obj.STAKEID,
        stationId: this.stationId,
        userId: this.$Cookie.get('userId'),
      };
      console.log(1444, obj2);
      // return;
      that.$myHttp.post('pointManage/deleteYdk', obj2).then((res) => {
        this.loading = false;
        if (res.success) {
          window.vm.$message({
            type: 'success',
            message: '删除成功',
            showClose: true,
            duration: 5000,
          });
          this.$emit('sub');
        } else {
          window.vm.$message({
            type: 'error',
            message: res.msg || '删除失败',
            showClose: true,
            duration: 5000,
          });
        }
      });
    },
    //删除高风险段
    delgfx(obj) {
      this.loading = true;
      let that = this;
      let obj2 = {
        routeId: obj.ROUTEID,
        serialid: obj.STAKEID,
        stationId: this.stationId,
        userId:this.$Cookie.get('userId'),
      };
      console.log(1444, obj2);
      // return;
      that.$myHttp.post('pointManage/deleteGfx', obj2).then((res) => {
        this.loading = false;
        if (res.success) {
          window.vm.$message({
            type: 'success',
            message: '删除成功',
            showClose: true,
            duration: 5000,
          });
          this.$emit('sub');
        } else {
          window.vm.$message({
            type: 'error',
            message: res.msg || '删除失败',
            showClose: true,
            duration: 5000,
          });
        }
      });
    },
    //删除高后果
    delghg(obj) {
      this.loading = true;
      let that = this;
      let obj2 = {
        routeId: obj.ROUTEID,
        serialid: obj.STAKEID,
        stationId: this.stationId,
        userId:this.$Cookie.get('userId'),
      };
      console.log(1444, obj2);
      // return;
      that.$myHttp.post('pointManage/deleteGhg', obj2).then((res) => {
        this.loading = false;
        if (res.success) {
          window.vm.$message({
            type: 'success',
            message: '删除成功',
            showClose: true,
            duration: 5000,
          });
          this.$emit('sub');
        } else {
          window.vm.$message({
            type: 'error',
            message: res.msg || '删除失败',
            showClose: true,
            duration: 5000,
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="addList">
    <div class='addTable'>
      <div class='title'>
        {{comtype=='add'?'新增':'删除'}}{{title}}
        <span
          class="close"
          @click="cancel"
        >{{"×"}}</span>
      </div>

      <table
        cellpadding='0'
        cellspacing='0'
        v-loading='tabloading'
      >
        <thead>
          <tr>
            <th :style="{width:'20%'}">选择</th>
            <th :style="{width:'20%'}">桩号</th>
            <th :style="{width:'20%'}">区域</th>
            <th :style="{width:'20%'}">类型</th>
            <th :style="{width:'20%'}">路线ID</th>
          </tr>
        </thead>
        <tbody v-if='!tabloading'>
          <tr
            v-for="(value,key) in list"
            :key="key"
          >
            <td :style="{width:'20%'}">
              <el-checkbox
                v-model="value.check"
                @change="change(value)"
                label=""
              ></el-checkbox>
            </td>
            <td :style="{width:'20%'}">{{value.STAKEID}}</td>
            <td :style="{width:'20%'}">{{value.AREA}}</td>
            <td :style="{width:'20%'}">{{value.STAKETYPE}}</td>
            <td :style="{width:'20%'}">{{value.ROUTEID}}</td>
          </tr>
          <tr v-if='list.length==0'>
            <td
              colspan="5"
              :style="{width:'100%'}"
            >暂无数据</td>
          </tr>
        </tbody>
      </table>

      <div class='confirm'>
        <span
          class="add"
          @click="submit"
        >确认</span>
        <span
          class="close"
          @click="cancel"
        >取消</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'detailbox2',

  props: {
    takeList: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default() {
        return '';
      },
    },
    comtype: {
      type: String,
      default() {
        return 'add';
      },
    },
    stakes: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      list: [],
      tabloading: false,
    };
  },
  mounted() {
    this.tabloading = true;
    this.list = [];
    setTimeout(() => {
      let arr = [];
      if (this.comtype == 'add') {
        arr = JSON.parse(JSON.stringify(this.takeList));
      } else {
        arr = JSON.parse(JSON.stringify(this.stakes));
      }
      this.list = arr;
      this.tabloading = false;
    }, 1000);
  },
  methods: {
    cancel() {
      this.$parent.detailcombool = false;
    },
    submit() {
      if (this.comtype == 'add') {
        this.additem();
      } else {
        this.delitem();
      }
    },
    delitem() {
      let addArr = [];
      for (let i = 0; i < this.list.length; i++) {
        if (!this.list[i].check) {
          addArr.push(this.list[i]);
        }
      }
      this.$emit('submit', addArr);
      this.cancel();
    },
    additem() {
      let addArr = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].check) {
          let obj = JSON.parse(JSON.stringify(this.list[i]));
          obj.check = false;
          addArr.push(obj);
        }
      }
      this.$emit('submit', addArr);
      this.cancel();
    },
    change() {},
  },
};
</script>

<style lang="less" scoped>
.addList {
  position: fixed;
  height: 100%;
  top: 100px;
  width: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  .addTable {
    width: 80%;
    margin-left: 5%;
    height: 38rem;
    background: #000000;
    .title {
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #252932;
      border-bottom: 1px solid #ccc;
      color: #3baaaf;
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
</style>
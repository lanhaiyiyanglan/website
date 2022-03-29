
<template>
  <!-- 砖详情 -->
  <div
    class='infoBox'
    v-if="iteminfo.STAKEID"
  >
    <div class='box box1 '>
      <div class='title '>
        {{iteminfo.STAKEID}}详情
        <span
          class="close"
          @click="closeInfo"
        >{{"×"}}</span>
      </div>
      <!-- <div class='tr2'>
        <span class="lable">所属线路</span>
        <span class="value">{{iteminfo.ROUTENAME}}</span>
      </div> -->
      <!-- <div class='tr2'>
          <span class="lable">必经点类型</span>
          <span class="value">{{zhuangPoint.type}}</span>
      </div> -->
      <div class='tr2'>
        <span class="lable">桩号</span>
        <span class="value">{{iteminfo.STAKEID}}</span>
      </div>
      <div class='tr2'>
        <span class="lable">经度</span>
        <span class="value">{{iteminfo.LONGITUDE}}</span>
      </div>
      <div class='tr2'>
        <span class="lable">纬度</span>
        <span class="value">{{iteminfo.LATITUDE}}</span>
      </div>
      <!-- <div class='tr2'>
        <span class="lable">范围</span>
        <span class="value">{{iteminfo.ALLOWRANGE}}</span>
      </div> -->
      <!-- <div class='tr2'>
        <span class="lable">备注</span>
        <span class="value">{{iteminfo.REMARK}}</span>
      </div> -->

    </div>

  </div>
</template>

<script>
export default {
  name: 'detailComsm',
  props: {
    iteminfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log(9988, this.iteminfo);
  },
  methods: {
    closeInfo() {
      this.$parent.detailbool = false;
    },
  },
};
</script>

<style lang="less" scoped>
.infoBox {
  position: fixed;
  z-index: 999999;
  height: 100%;
  width: 100%;
  top: 100px;
  background: rgba(0, 0, 0, 0.8);
  .fixtit {
    position: absolute;
    top: 0;
    left: 5%;
    width: 80%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #252932;
    border-bottom: 1px solid #ccc;
    color: #3baaaf;
    margin-bottom: 20px;
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
  .box {
    width: 80%;
    margin-left: 5%;
    height: 40rem;
    background: #000000;
    overflow: auto;
    box-shadow: 0 0 3px #ccc;
    .title {
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #252932;
      border-bottom: 1px solid #ccc;
      color: #3baaaf;
      margin-bottom: 20px;
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
      float: left;
      height: 2rem;
      line-height: 2rem;
      width: 50%;
      margin-bottom: 15px;
      .lable {
        float: left;
        height: 2rem;
        width: 30%;
        padding-left: 8%;
      }
      .value {
        float: left;
        height: 2rem;
        width: 60%;
        background: #252932;
        padding-left: 10px;
      }
    }
    .tr2 {
      float: left;
      //height:2rem;
      line-height: 2rem;
      width: 100%;
      margin-bottom: 15px;
      color:#fff;
      .lable {
        float: left;
        height: 2rem;
        width: 15%;
        padding-left: 4%;
      }
      .value {
        float: left;
        min-height: 2rem;
        width: 80%;
        background: #252932;
        padding-left: 10px;
      }
    }
    .tablist {
      width: 80%;
      margin-left: 15%;
      background: #252932;
      text-align: center;
      line-height: 36px;
      margin-bottom: 20px;
      thead {
        tr {
          th {
            border-right: 2px solid #000;
            border-bottom: 2px solid #000;
          }
        }
      }
      tbody {
        tr {
          td {
            border-right: 2px solid #000;
            border-bottom: 2px solid #000;
          }
        }
      }
    }
  }
  .box1 {
    width: 40%;
    margin-left: 22%;
  }
  .mt4 {
    margin-top: 60px;
  }
}
</style>
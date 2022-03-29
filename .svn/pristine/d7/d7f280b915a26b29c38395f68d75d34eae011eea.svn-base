
<template>
    <div
      class='infoBox'
    >
      <div class='title fixtit'>
        第三方施工详情
        <span
          class="close"
          @click="closeInfo"
        >{{"×"}}</span>
      </div>
      <div class='box mt4'>

        <div class='tr'>
          <span class="lable">区域段</span>
          <span class="value">{{dsfPoint.GROUPNAMES}}</span>
        </div>
        <div class='tr'>
          <span class="lable">发生时间</span>
          <span class="value">{{dsfPoint.LASTTIME?dsfPoint.LASTTIME.split('T')[0]:''}}</span>
        </div>
        <div class='tr'>
          <span class="lable">事件类型</span>
          <span class="value">{{'第三方施工'}}</span>
        </div>
        <div class='tr'>
          <span class="lable">发现人</span>
          <span class="value">{{dsfPoint.REPORTUSER}}</span>
        </div>
        <div class='tr'>
          <span class="lable">状态</span>
          <span class="value">{{dsfPoint.SITUATIONNAME}}</span>
        </div>
        <div class='tr'>
          <span class="lable">所属路线</span>
          <span class="value">{{dsfPoint.ROUTENAME}}</span>
        </div>
        <div class='tr'>
          <span class="lable">输油站</span>
          <span class="value">{{dsfPoint.GROUPNAME}}</span>
        </div>
        <div class='tr'>
          <span class="lable">里程桩号</span>
          <span class="value">{{dsfPoint.MILEAGEID}}</span>
        </div>
        <div class='tr'>
          <span class="lable">责任人</span>
          <span class="value">{{dsfPoint.PERSONNAME}}</span>
        </div>
        <div class='tr'>
          <span class="lable">等级</span>
          <span class="value">{{dsfPoint.GRADE}}</span>
        </div>
        <div class='tr'>
          <span class="lable">是否签订安全协议</span>
          <span class="value">{{dsfPoint.SECUREPROTOCOLZH}}</span>
        </div>
        <div class='tr'>
          <span class="lable">填报人</span>
          <span class="value">{{dsfPoint.REPORTUSER}}</span>
        </div>
        <div class='tr2'>
          <span class="lable">具体位置</span>
          <span class="value">{{dsfPoint.DESCRIPTION}}</span>
        </div>
        <div class='tr2'>
          <span class="lable">具体描述</span>
          <span class="value">{{dsfPoint.DESCRIPTION}}</span>
        </div>
        <div class='tr2'>
          <span class="lable">采取措施</span>
          <span class="value">{{dsfPoint.ACTION}}</span>
        </div>
        <div class='tr'>
          <span class="lable">经度</span>
          <span class="value">{{dsfPoint.LONGITUDE}}</span>
        </div>
        <div class='tr'>
          <span class="lable">纬度</span>
          <span class="value">{{dsfPoint.LATITUDE}}</span>
        </div>
        <div class='tr2'>
          <span class="lable">施工进度</span>
          <span class="value">{{dsfPoint.REMARK}}</span>
        </div>
        <div class='tr'>
          <span class="lable">事件状态</span>
          <span class="value">{{dsfPoint.INCIDENTSTATUSZH}}</span>
        </div>
        <div class='tr'>
          <span class="lable">关闭人</span>
          <span class="value">{{dsfPoint.CLOSER}}</span>
        </div>
        <div class='tr2'>
          <span class="lable">关闭描述</span>
          <span class="value">{{dsfPoint.CLOSEREASON}}</span>
        </div>
        <table
          v-if='dsfPoint.fileList&&dsfPoint.fileList.length>0'
          class="tablist"
          cellspacing='0'
        >
          <thead>
            <tr>
              <th style="width:10%">序号</th>
              <th style="width:50%">文件名称</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for='(item,index) in dsfPoint.fileList'
              :key='index'
            >
              <td>{{index+1}}</td>
              <td><a
                  :href="item.fileContent"
                  target="_blank"
                >{{item.fileName}}</a></td>
              <td>{{item.fileType}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>
export default {
    props:['dsfPoint'],
    data(){
        return{
        }
    },
    methods: {
      closeInfo(){
         this.$emit('close');
      }
    }
}
</script>
<style lang="less">
.infoBox{
		position: absolute;;
		z-index:999999;
		height:100%;
        width:100%;
        top:0;
        color:#ffffff;
    background:rgba(0,0,0,0.8);
    .fixtit{
      position: absolute;
      top: 0;
      left: 5%;
      width: 80%;
      height:60px;
      line-height:60px;
      text-align:center;
      background:#252932;
      border-bottom:1px solid #ccc;
      color:#3BAAAF;
      margin-bottom: 20px;
      .close{
        position:absolute;
        height:30px;
        line-height:30px;
        width:30px;
        right:15px;
        top:15px;
        font-size:25px;
        cursor:pointer;
      }
    }
		.box{
			width:80%;
			margin-left:5%;
			height:40rem;
      background:#000000;
      overflow: auto;
      box-shadow: 0 0 3px #ccc;
			.title{
				position:relative;
				height:60px;
				line-height:60px;
				text-align:center;
				background:#252932;
				border-bottom:1px solid #ccc;
        color:#3BAAAF;
        margin-bottom: 20px;
				.close{
					position:absolute;
					height:30px;
					line-height:30px;
					width:30px;
					right:15px;
					top:15px;
					font-size:25px;
					cursor:pointer;
				}
      }
    
			.tr{
				float:left;
				height:2rem;
				line-height:2rem;
				width:50%;
				margin-bottom:15px;
				.lable{
					float:left;
					height:2rem;
					width:30%;
					padding-left:8%;
				}
				.value{
					float:left;
					height:2rem;
					width:60%;
					background:#252932;
					padding-left:10px;
				}
			}
			.tr2{
				float:left;
				//height:2rem;
				line-height:2rem;
				width:100%;
				margin-bottom:15px;
				.lable{
					float:left;
					height:2rem;
					width:15%;
					padding-left:4%;
				}
				.value{
					float:left;
					min-height:2rem;
					width:80%;
					background:#252932;
					padding-left:10px;
				}
      }
      .tablist{
        width: 80%;
        margin-left: 15%;
        background: #252932;
        text-align: center;
        line-height: 36px;
        margin-bottom: 20px;
        thead{
          tr{
            th{
              border-right: 2px solid #000;
              border-bottom: 2px solid #000;
            }
          }
        }
        tbody{
          tr{
            td{
              border-right: 2px solid #000;
              border-bottom: 2px solid #000;
            }
          }
        }
      }
    }
    .box1{
      width: 40%;
      margin-left: 22%;
    }
    .mt4{
      margin-top: 60px;
    }
	}
</style>
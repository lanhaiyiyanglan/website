<template>
 <div>
  <template v-for="item in menuData">
      <template v-if="item.path!='1307000000'&&item.path!='1312000000'&&item.path!='1303000000'&&item.path!='1315000000'">
            <el-submenu v-if="item.node&&item.node.length>0" :key="item.path" :index="item.path+''">
                <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
                </template>
                <MenuTree :menu-data="item.node" />
            </el-submenu>
            <el-menu-item v-else :key="item.path"  :index="item.path+''">
                <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
                </template>
            </el-menu-item>
     </template>
     <el-menu-item v-else :key="item.path"  :index="item.path+''">
                <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
                </template>
     </el-menu-item>
  </template>
 </div>
</template>
<script>
export default {
 name: 'MenuTree',
 props: ['menuData'],
 data(){
     return{
         
     }
 },
 created(){
 },
 methods:{
    
 }
}
</script>
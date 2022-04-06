<template>
  <el-menu :default-openeds="['1', '3']" style="height: 100vh; overflow-x: hidden" background-color="#6C7B8B" text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false" 
  :collapse="isCollapse" router @select="handleSelect"
        >
          <div style="height: 60px; line-height: 60px; text-align: center">
            <img
              src="../assets/logo.png"
              style="
                width: 40px;
                position: relative;
                top: 10px;
                margin-right: 5px;
              "
            />
            <b style="color: white" v-show="logoTextShow">隧道施工期管理平台</b>
          </div>
          <el-menu-item index="/">
            <i class="el-icon-setting"></i>
            <span slot="title">提交数据</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-setting"></i>
            <span slot="title">工作面</span>
          </el-menu-item>
          <el-menu-item index="/jianc">
            <i class="el-icon-platform-eleme"></i>
            <span slot="title">隧道监测</span>
          </el-menu-item>
          <el-menu-item index="/xuanc">
            <i class="el-icon-setting"></i>
            <span slot="title">隧道选测</span>
          </el-menu-item>
          <el-menu-item index="/huanj">
            <i class="el-icon-setting"></i>
            <span slot="title">隧道环境</span>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title"
              ><i class="el-icon-menu"></i
              ><span slot="title">数据维护</span></template
            >
            <el-menu-item-group>
              <el-menu-item index="/data">选项1</el-menu-item>
              <el-menu-item index="/yuj">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
</template>

<script>
export default {
name: 'Aside',
props:{
    isCollapse: Boolean,
    logoTextShow: Boolean
},
methods: {
  handleSelect(index) {
  }
}
}
</script>

<style>

</style>
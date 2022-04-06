<template>
  <div>
    <el-container style="height: 100%">
      <el-aside :width="sideWidth + 'px'"style="background-color: rgb(298, 241, 246); height: 100%">
        <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
      </el-aside>
      <el-container>

        <el-header style="border-bottom: 1px solid #ccc;">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"></Header>
        </el-header>

        <el-main>
          <!-- 表示当前页面的子路由会在router-view里面展示 -->
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>

import Aside from '@/components/Aside.vue';
import Header from '@/components/Header.vue'

export default {
  data () {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg'
    }
  },
  components: {
    Aside,
    Header
  },
  methods: {
    collapse () {
      // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {
        // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },
    // 封装接口
  }
}
</script>
<style>
</style>

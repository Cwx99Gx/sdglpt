<template>
  <div>
    <el-card style="margin-top:15px">
    <el-card class="box-card" style="margin-top:5px">
  <div slot="header">
    <span>工作面</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">提交</el-button>
    <el-form>
    <el-input placeholder="请输入工作面名称"></el-input>
    <el-input placeholder="请输入施工单位"></el-input>
    <el-input placeholder="请输入开始里程"></el-input>
    <el-input placeholder="请输入结束里程"></el-input>
    </el-form>
  </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>隧道监测</span>
    <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
    <el-form style="height: 100px; width:550px">
    <el-input placeholder="请输入工作面名称"></el-input>
    <el-input placeholder="请输入施工单位"></el-input>
    <el-input placeholder="请输入开始里程"></el-input>
    <el-input placeholder="请输入结束里程"></el-input>
    </el-form>
  </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>隧道选测</span>
    <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
    <el-form style="height: 100px; width:550px">
    <el-input placeholder="请输入工作面名称"></el-input>
    <el-input placeholder="请输入施工单位"></el-input>
    <el-input placeholder="请输入开始里程"></el-input>
    <el-input placeholder="请输入结束里程"></el-input>
    </el-form>
  </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>隧道环境</span>
    <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
    <el-form style="height: 100px; width:550px">
    <el-input placeholder="请输入工作面名称"></el-input>
    <el-input placeholder="请输入施工单位"></el-input>
    <el-input placeholder="请输入开始里程"></el-input>
    <el-input placeholder="请输入结束里程"></el-input>
    </el-form>
  </div>
</el-card>
</el-card>
  </div>
</template>

<script>
export default {
name:'Home'
}
</script>

<style>

</style>
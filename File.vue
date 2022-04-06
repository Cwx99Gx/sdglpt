<template>
  <div>
     <el-table :data="tableData" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
          </el-table-column>
            <el-table-column prop="id" label="ID" width="60"> </el-table-column>
            <el-table-column prop="username" label="工作面名称" width="auto">
            </el-table-column>
            <el-table-column prop="nickname" label="施工单位" width="auto">
            </el-table-column>
            <el-table-column prop="address" label="开始里程" width="auto">
            </el-table-column>
            <el-table-column prop="email" label="结束里程" width="auto">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="auto">
            </el-table-column>
            <el-table-column prop="phone" label="断面名称" width="200">
            </el-table-column>
            <el-table-column label="操作" width="170">
            <template slot-scope="scope">
            <el-button type="warning" size="small" class="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm class="ml-5" confirm-button-text='确定'  cancel-button-text='取消' icon="el-icon-info"  con-color="red" title="确定删除?" @confirm="del(scope.row.id)">
         <el-button type="danger" size="small" class="el-icon-delete" slot="reference" >删除</el-button >
         </el-popconfirm>
         </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
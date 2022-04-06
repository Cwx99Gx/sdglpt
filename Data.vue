<template>
  <div>
    <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入文件名称" suffix-icon="el-icon-search" v-model="name"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
    </div>
      <div style="margin: 10px 0">
         <el-upload action="http://localhost:8888/file/upload" style="display: inline-block" :show-file-list="false" :on-success="handeleFileUploadSuccess">
            <el-button type="info" class="ml-5">上传文件<i class="el-icon-top"></i></el-button>
         </el-upload>
       <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除?" @confirm="delBatch">
           <el-button type="danger" class="el-icon-remove-outline" slot="reference">批量删除</el-button>
       </el-popconfirm>
      </div>
     <el-table :data="tableData" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
          </el-table-column>
            <el-table-column prop="id" label="ID" width="60"> </el-table-column>
            <el-table-column prop="name" label="文件名称">
            </el-table-column>
            <el-table-column prop="type" label="文件类型">
            </el-table-column>
            <el-table-column prop="size" label="文件大小(kb)">
            </el-table-column>
            <el-table-column label="下载" width="auto">
              <template slot-scope="scope">
                <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column label="启用">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="170">
            <template slot-scope="scope">
            <el-popconfirm class="ml-5" confirm-button-text='确定'  cancel-button-text='取消' icon="el-icon-info"  con-color="red" title="确定删除?" @confirm="del(scope.row.id)">
         <el-button type="danger" size="small" class="el-icon-delete" slot="reference" >删除</el-button >
         </el-popconfirm>
         </template>
        </el-table-column>
    </el-table>
              <div style="padding: 10px 0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[6, 12]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
  </div>
</template>

<script>
export default {
name: "File",
data() {
  return {
    tableData: [],
    name: '',
    multipleSelection: [],
    pageNum: 1,
    pageSize: 10,
    total: 0
  }
},
created() {
  this.load()
},
methods: {
  load () {
      this.request
        .get('/file/page', {
          // 请求参数
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.name,
          }
        })
        .then((res) => {
          // 解析返回参数调用
          this.tableData = res.data.records
          this.total = res.data.total
        })
    },
    // 启用
    changeEnable(row) {
      this.request.post("/file/update", row).then(res =>{
        if(res.code === '200') {
          this.$message.success("操作成功")
        }
      })
    },
    // 删除
    del (id) {
      this.request.delete('/file/' + id).then((res) => {
        if (res.code === '200') {
          this.$message.success('删除成功')
          this.load()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    // 批量删除数据
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除点击事件
    delBatch () {
      const ids = this.multipleSelection.map(v => v.id) // 把一个对象数组变换成为纯id数组[1,2,3]
      this.request.post('/file/del/batch', ids).then((res) => {
        if (res.data) {
          this.$message.success('批量删除成功')
          this.load()
        } else {
          this.$message.error('批量删除失败')
        }
      })
    },
    // 重置
    reset () {
      this.name = ''
      this.load()
    },
    // table表格和分页实现联动
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange (pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handeleFileUploadSuccess(res) {
      console.log(res);
      this.load()
    },
    download(url) {
      window.open(url)
    }
  }
}
</script>

<style>

</style>
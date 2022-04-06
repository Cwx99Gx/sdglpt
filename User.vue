<template>
  <div>
          <div style="margin: 10px 0">
            <el-input
              style="width: 200px"
              placeholder="请输入工作面名称"
              suffix-icon="el-icon-search"
              v-model="username"
            ></el-input>
            <el-input
              style="width: 200px"
              placeholder="请输入施工单位"
              suffix-icon="el-icon-search"
              v-model="nickname"
            ></el-input>
            <el-input
              style="width: 200px"
              placeholder="请输入断面名称"
              suffix-icon="el-icon-search"
              v-model="phone"
            ></el-input
            ><el-button class="ml-5" type="primary" @click="load"
              >搜索</el-button
            >
            <el-button type="warning" @click="reset">重置</el-button>
          </div>
          <div style="margin: 10px 0">
            <el-button type="success" @click="handleAdd"
              >新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
                class="ml-5"
  confirm-button-text='确定'
  cancel-button-text='取消'
  icon="el-icon-info"
  icon-color="red"
  title="确定删除?"
  @confirm="delBatch">
            <el-button type="danger" class="el-icon-remove-outline" slot="reference">批量删除</el-button>
            </el-popconfirm>
            <el-upload action="http://localhost:8888/user/import" style="display: inline-block" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess">
            <el-button type="info" class="ml-5">导入<i class="el-icon-bottom"></i></el-button>
            </el-upload>
            <el-button type="warning" @click="exp" class="ml-5">导出 <i class="el-icon-top"></i></el-button>
          </div>
          <!--  表单组件 -->
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
            <el-table-column prop="createTime" label="创建时间" width="auto">
            </el-table-column>
            <el-table-column prop="phone" label="断面名称" width="200">
            </el-table-column>
            <el-table-column label="操作" width="170">
              <template slot-scope="scope">
                <el-button type="warning" size="small" class="el-icon-edit" @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                class="ml-5"
  confirm-button-text='确定'
  cancel-button-text='取消'
  icon="el-icon-info"
  icon-color="red"
  title="确定删除?"
  @confirm="del(scope.row.id)">
                <el-button type="danger" size="small" class="el-icon-delete" slot="reference"
                  >删除</el-button
                >
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

<!-- //新增提示框 -->
          <el-dialog title="新增工作面" :visible.sync="dialogFormVisible" width="30%">
  <el-form label-width="80px" size="small">
    <el-form-item label="工作面名称">
      <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="施工单位">
      <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="开始里程">
      <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="结束里程">
      <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="断面名称">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
      <el-input v-model="form.createTime" autocomplete="off"></el-input>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>
<!--  -->
  </div>
</template>

<script>
export default {
name:'User',
data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 6,
      username: '',
      nickname: '',
      phone: '',
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      headerBg: 'headerBg'
    }
}, 
created() {
this.load()
},
methods:{
    load () {
      this.request
        .get('/user/page', {
          // 请求参数
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            username: this.username,
            nickname: this.nickname,
            phone: this.phone
          }
        })
        .then((res) => {
          // 解析返回参数调用
          this.tableData = res.data.records
          this.total = res.data.total
        })
    },
    save () {
      this.request.post('/user', this.form).then((res) => {
        if (res.data) {
          this.$message.success('保存成功')
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    // 新增
    handleAdd () {
      this.dialogFormVisible = true
      this.form = {}
    },
    // 编辑
    handleEdit (row) {
      this.form = row
      this.dialogFormVisible = true
    },
    // 删除
    del (id) {
      this.request.delete('/user/' + id).then((res) => {
        if (res.data) {
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
      this.request.post('/user/del/batch', ids).then((res) => {
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
      this.username = ''
      this.email = ''
      this.phone = ''
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
    // 导出
    exp() {
      window.open("http://localhost:8888/user/export")
    },
    handleExcelImportSuccess(){
      this.$message.success("文件导入成功")
      this.load()
    }
  }
}
</script>

<style>
.headerBg {
  background: #eee !important;
}
</style>
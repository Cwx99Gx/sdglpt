<template>
  <div>
          <div style="margin: 10px 0">
            <el-input
              style="width: 200px"
              placeholder="请输入工作面名称"
              suffix-icon="el-icon-search"
              v-model="name"
            ></el-input>
            <el-input
              style="width: 200px"
              placeholder="输入环境监测项目"
              suffix-icon="el-icon-search"
              v-model="project"
            ></el-input
            ><el-button class="ml-5" type="primary" @click="load"
              >搜索</el-button
            >
            <el-button type="warning" @click="reset">重置</el-button>
          </div>
          <div style="margin: 10px 0">
            <el-button type="success" @click="handleAdd"
              >新增 <i class="el-icon-circle-plus-outline"></i></el-button
            >
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
            <el-table-column prop="name" label="断面名称" width="auto">
            </el-table-column>
            <el-table-column prop="project" label="环境监测项目" width="auto">
            </el-table-column>
             <el-table-column prop="shuz" label="含量数值" width="auto">
            </el-table-column>
            <el-table-column prop="start" label="开始里程" width="auto">
            </el-table-column>
            <el-table-column prop="end" label="结束里程" width="auto">
            </el-table-column>
            <el-table-column prop="company" label="施工单位" width="auto">
            </el-table-column>
            <el-table-column prop="hjxm" label="所属工作面" width="200">
            </el-table-column>
            <el-table-column prop="creatTime" label="时间" width="auto">
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
  @confirm="del(scope.row.id)"
>
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
    <el-form-item label="断面名称">
      <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="环境监测项目">
      <el-input v-model="form.project" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="检测数值">
      <el-input v-model="form.shuz" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="开始里程">
      <el-input v-model="form.start" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="结束里程">
      <el-input v-model="form.end" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属工作面">
      <el-input v-model="form.hjxm" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="施工单位">
      <el-input v-model="form.company" autocomplete="off"></el-input>
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
name:'Huanj',
data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 6,
      name: '',
      project: '',
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
        .get('/huanj/page', {
          // 请求参数
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
           name: this.name,
           project:this.project,
            phone: this.phone
          }
        })
        .then((res) => {
          // 解析返回参数调用
          this.tableData = res.records
          this.total = res.total
        })
    },
    save () {
      this.request.post('/huanj', this.form).then((res) => {
        if (res) {
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
      this.request.delete('/huanj/' + id).then((res) => {
        if (res) {
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
      this.request.post('/huanj/del/batch', ids).then((res) => {
        if (res) {
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
      this.project = ''
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
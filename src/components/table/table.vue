<template>
  <div class="table">
      <el-table :data="data" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
        <el-table-column align="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="left" type="index" width="60">
        </el-table-column>
        <el-table-column align="left" prop="account" label="帐号"  sortable>
        </el-table-column>
        <el-table-column align="left" prop="password" label="密码">
        </el-table-column>
        <el-table-column align="left" prop="power" label="权限" sortable>
        </el-table-column>
        <el-table-column align="left" prop="type" label="类型" :formatter="formatType" sortable>
        </el-table-column>
        <el-table-column align="left" label="操作" >
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
  </div>
</template>

<script type="text/ecmascript">
import { getUsers } from '../../api/api'
export default {
  data () {
    return {
      filters: {
        name: ''
      },
      data: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [] // 列表选中列
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    },
    getUsers () {
      let params = {
        pageNum: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      getUsers(params)
        .then(res => {
          if (res.data.code === 1) {
            this.total = res.data.count
            this.data = res.data.info.list
            this.listLoading = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    selsChange (sels) {
      this.sels = sels
    },
    formatType (row, column) {
      return row.type === 1 ? '系统注册' : row.type === 2 ? 'QQ注册' : '微信注册'
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.table{
  width: 100%;
  tr,td,th{
    text-align: left;
  }
}
</style>

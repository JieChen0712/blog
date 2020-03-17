<template>
  <div class="kind">
    <breadcrumb></breadcrumb>
    <div class="tb-wrap" ref="tbWrap">
      <el-form :inline="true" :model="filterArticle" class="filter-form" ref="filterWrap">
        <el-form-item label="分类名">
          <el-input v-model="filterArticle.name" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterSubmit">查询</el-button>
        </el-form-item>
        <!--<el-form-item>
          <el-button type="primary" @click="add">添加</el-button>
        </el-form-item>-->
      </el-form>
      <el-table :data="tableData" ref="tableData" size="mini" row-key="id" :max-height="tableHeight" style="width: 100%" lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          label="分类 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="分类名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
        </el-table-column>
        <el-table-column
          label="排序"
          prop="order">
        </el-table-column>
        <el-table-column label="添加日期" prop="time" sortable column-key="time" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleStatus(scope.$index, scope.row, $event)" v-if="scope.row.status === 1">显示</el-button>
            <el-button size="mini" type="warning" @click="handleStatus(scope.$index, scope.row, $event)" v-if="scope.row.status === 2">不显示</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import {kindArticle, changeArticleStatus, delArticleKind} from '@/api/api'
export default {
  data () {
    return {
      resize: false,
      tableHeight: 0,
      currentPage: 1,
      total: 0,
      tableData: [],
      filterArticle: {
        name: ''
      }
    }
  },
  components: {
    breadcrumb
  },
  created () {},
  mounted () {
    let that = this
    this.$nextTick(() => {
      this.countMaxHeight()
    })
    window.onresize = () => {
      return (() => {
        that.countMaxHeight()
      })()
    }
    this.getArticleKindList()
  },
  methods: {
    getArticleKindList () {
      let param = {
        page: this.currentPage,
        name: this.filterArticle.name
      }
      let o = this
      kindArticle(param)
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            o.tableData = data.info
            o.total = data.total
          } else {
            this.$message.error(data.msg)
          }
        })
    },
    filterSubmit (e) {
      this.currentPage = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUserList()
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row, scope) {
      let o = this
      let param = {
        id: row.id
      }
      this.$confirm('此操作将永久删除该分类,子分类会归属到父级分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticleKind(param)
          .then(response => {
            let data = response.data
            let type = 'error'
            if (data.code === 1) {
              type = 'success'
              o.node_had.childNodes = []
              let newRow = {id: row.pid}
              if (row.pid === 0) {
                o.getArticleKindList()
              } else {
                o.load(newRow, o.node_had, o.resolve_had)
              }
            }
            o.$message({
              showClose: true,
              message: data.msg,
              type: type
            })
          })
      }).catch(() => {})
    },
    handleStatus (index, row, event) {
      let o = this
      let param = {
        id: row.id
      }
      changeArticleStatus(param)
        .then(response => {
          let data = response.data
          let type = 'error'
          if (data.code === 1) {
            if (row.status === 1) {
              row.status = 2
            } else {
              row.status = 1
            }
            type = 'success'
          }
          o.$message({
            showClose: true,
            message: data.msg,
            type: type
          })
        })
    },
    countMaxHeight () {
      let wrapHeight = this.$refs.tbWrap.offsetHeight
      // 获取elemet-ui组件的高度要加$el
      let filterHeight = this.$refs.filterWrap.$el.offsetHeight
      let tableHeight = wrapHeight - filterHeight - 52
      this.tableHeight = tableHeight
    },
    load (tree, treeNode, resolve) {
      if (treeNode.level === 0) {
        this.node_had = treeNode
        this.resolve_had = resolve
      }
      let param = {
        page: this.currentPage,
        name: this.filterArticle.name,
        pid: tree.id
      }
      kindArticle(param)
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            resolve(data.info)
          } else {
            this.$message.error(data.msg)
          }
        })
    },
    recursive (okey, ovalue, data) {
      let result = []
      if (okey === '' || okey === null || okey === undefined) {
        return false
      }
      if (ovalue === '' || ovalue === null || ovalue === undefined) {
        return false
      }
      for (let i in data) {
        if (data[i][okey] === ovalue) {
          result.push(i)
          return result
        } else if (data[i]['children'] !== null && data[i]['children'] !== '' && data[i]['children'] !== undefined) {
          let temp = this.recursive(okey, ovalue, data[i]['children'])
          if (temp !== undefined && temp.length >= 1) {
            result.push(i)
            return result.concat(temp)
          }
        }
      }
    }
  },
  watch: {
    tableHeight (val) {
      if (!this.resize) {
        this.tableHeight = val
        this.resize = true
        let that = this
        // 为防止频繁调整大小时导致卡顿
        setTimeout(() => {
          that.resize = false
        }, 400)
      }
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.kind{}
</style>

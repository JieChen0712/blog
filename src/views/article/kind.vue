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
        <el-form-item class="fr">
          <el-button type="success"  @click="showForm('add')">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="tableData" size="mini" row-key="id" :max-height="tableHeight" style="width: 100%" lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column label="分类 ID" prop="id"></el-table-column>
        <el-table-column label="分类名" prop="name"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="排序" prop="order"></el-table-column>
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
            <el-button size="mini" @click="showForm('edit', scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
    <!--自定义对话框-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :append-to-body="indexTop" :close-on-click-modal="clickClose" :close-on-press-escape="clickClose">
      <el-form :model="KindInfo">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-col :span="6">
            <el-input v-model="KindInfo.name" placeholder="分类名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="归属分类" :label-width="formLabelWidth">
          <el-col :span="6">
            <el-select v-model="KindInfo.pid" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-switch v-model="KindInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="封面：" :label-width="formLabelWidth">
          <el-col :span="7">
            <div class="uploadImg">
              <uploadsingle :filePath="filePath" :imgUrl="KindInfo.img" @change="setAvatar"></uploadsingle>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label="优先级：" :label-width="formLabelWidth">
          <el-col :span="1">
            <el-input v-model="KindInfo.order" placeholder="优先级"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitKind">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript">
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import uploadsingle from '../../components/upload/uploadSingle'
import {getArticleKindList, changeArticleStatus, delArticleKind, getArticleKind, addArticleKind, editArticleKind} from '@/api/api'
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
      },
      dialogFormVisible: false,
      indexTop: true,
      clickClose: false,
      KindInfo: {
        status: 1,
        order: 0,
        name: '',
        img: '',
        pid: '',
        id: ''
      },
      formLabelWidth: '120px',
      filePath: {path: 'article_kind'},
      type: 'add',
      row: ''
    }
  },
  components: {
    breadcrumb,
    uploadsingle
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
      getArticleKindList(param)
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
    showForm (type, row) {
      let o = this
      if (type === 'add') {
        o.KindInfo = {
          status: 1,
          order: 0,
          name: '',
          imgurl: '',
          pid: ''
        }
        o.type = type
        o.dialogFormVisible = true
      } else if (type === 'edit') {
        if (row === '' || row === null || row === undefined) {
          o.$message.error('分类数据有误！')
          return
        }
        o.row = row
        let param = {
          id: row.id
        }
        getArticleKind(param)
          .then(response => {
            if (response.data.code === 1) {
              o.KindInfo = response.data.info
              o.type = type
              o.dialogFormVisible = true
            } else {
              o.$message.error(response.data.msg)
            }
          })
      }
    },
    setAvatar (value) {
      this.KindInfo.img = value
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
              if (row.pid === 0) {
                o.getArticleKindList()
              } else {
                let newRow = {id: row.pid}
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
      getArticleKindList(param)
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
    },
    submitKind () {
      let o = this
      if (o.type === 'add') {
        addArticleKind(this.KindInfo)
          .then(response => {
            if (response.data.code === 1) {
              o.$message.success(response.data.msg)
              o.dialogFormVisible = false
              if (o.row !== '' && o.row.pid !== 0) {
                let newRow = {id: o.row.pid}
                o.load(newRow, o.node_had, o.resolve_had)
              } else {
                o.getArticleKindList()
              }
            } else {
              o.$message.error(response.data.msg)
            }
          })
      } else if (o.type === 'edit') {
        editArticleKind(this.KindInfo)
          .then(response => {
            if (response.data.code === 1) {
              o.$message.success(response.data.msg)
              o.dialogFormVisible = false
              if (o.row !== '' && o.row.pid !== 0) {
                let newRow = {id: o.row.pid}
                o.load(newRow, o.node_had, o.resolve_had)
              } else {
                o.getArticleKindList()
              }
            } else {
              o.$message.error(response.data.msg)
            }
          })
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

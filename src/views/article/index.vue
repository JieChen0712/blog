<template>
  <div class="index">
    <breadcrumb></breadcrumb>
    <div class="tb-wrap" ref="tbWrap">
      <el-form :inline="true" :model="filterArticle" class="filter-form" ref="filterWrap">
        <el-form-item label="文章标题">
          <el-input v-model="filterArticle.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select v-model="filterArticle.status" placeholder="请选择状态">
            <el-option label="显示" value="1"></el-option>
            <el-option label="不显示" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterSubmit">查询</el-button>
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="success" @click="linkTo('add')">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" size="mini" ref="filterTable" border :max-height="tableHeight" style="width: 100%">
        <el-table-column label="日期" prop="time" sortable column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p><el-image class="avatar" :src="scope.row.user_info.avatar" fit="fit"></el-image>电话: {{ scope.row.user_info.phone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.author }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="kindName"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="摘要" prop="desc"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="{success:(scope.row.status === 1),warning:(scope.row.status === 2),danger:(scope.row.status === 3)}">{{ scope.row.statusName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" @click="linkTo('edit', scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import breadcrumb from '../../components/breadcrumb/breadcrumb'
import {getArticleList, delArticle} from '@/api/api'
export default {
  data () {
    return {
      resize: false,
      tableHeight: 0,
      currentPage: 1,
      tableData: [],
      filterArticle: {
        name: '',
        status: '1'
      },
      total: 0
    }
  },
  created () {
    // let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    // this.tableHeight = winHeight - 170
  },
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
    this.getArticleList()
  },
  methods: {
    countMaxHeight () {
      let wrapHeight = this.$refs.tbWrap.offsetHeight
      // 获取elemet-ui组件的高度要加$el
      let filterHeight = this.$refs.filterWrap.$el.offsetHeight
      let tableHeight = wrapHeight - filterHeight - 52
      console.log(wrapHeight + '  ' + filterHeight)
      this.tableHeight = tableHeight
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          id: row.id
        }
        delArticle(param)
          .then(response => {
            let data = response.data
            if (data.code === 1) {
              this.tableData.forEach((value, index, array) => {
                if (value.id === row.id) {
                  array.splice(value, 1)
                }
              })
              this.$message.success(data.msg)
            } else {
              this.$message.error(data.msg)
            }
          })
      })
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    filterSubmit () {
      this.getArticleList()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticleList()
    },
    getArticleList () {
      let param = {
        page: this.currentPage,
        name: this.filterArticle.name,
        status: this.filterArticle.status
      }
      getArticleList(param)
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            this.tableData = data.info
            this.total = data.total
          } else {
            this.$message.error(data.msg)
          }
        })
    },
    linkTo (type, id) {
      if (type === 'add') {
        this.$router.push({ path: '/blog/home/article/detail', query: {type: type} })
      } else if (type === 'edit') {
        this.$router.push({ path: '/blog/home/article/detail', query: {type: type, id: id} })
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
  },
  components: {
    breadcrumb
  }
}
</script>

<style lang="scss" type="text/css">
  .avatar{
    width: 45px;
    height: 45px;
    border: 1px solid orange;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 10px;
  }
</style>

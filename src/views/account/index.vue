<template>
  <div class="account_list">
    <breadcrumb></breadcrumb>
    <div class="tb-wrap" ref="tbWrap">
      <el-form :inline="true" :model="filterArticle" class="filter-form" ref="filterWrap">
        <el-form-item label="用户">
          <el-input v-model="filterArticle.name" placeholder="用户名/帐号/手机号"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="filterArticle.time_around"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterSubmit">查询</el-button>
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="success"  @click="linkTo('add')">新增管理员</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" size="mini" ref="filterTable" :max-height="tableHeight" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="邮箱：">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="微信：">
                <span>{{ props.row.wechat }}</span>
              </el-form-item>
              <el-form-item label="QQ：">
                <span>{{ props.row.qq }}</span>
              </el-form-item>
              <el-form-item label="省：">
                <span>{{ props.row.province }}</span>
              </el-form-item>
              <el-form-item label="市：">
                <span>{{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="区：">
                <span>{{ props.row.county }}</span>
              </el-form-item>
              <el-form-item label="详细地址：">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="出生日期：">
                <span>{{ props.row.brith_day }}</span>
              </el-form-item>
              <el-form-item label="注册时间：">
                <span>{{ props.row.register_time }}</span>
              </el-form-item>
              <el-form-item label="注册IP：">
                <span>{{ props.row.register_ip }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="用户 ID"
          prop="uid">
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-image :src="scope.row.avatar" class="avatar">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="name"></el-table-column>
        <el-table-column
          label="手机号"
          prop="phone">
        </el-table-column>
        <el-table-column label="注册日期" prop="register_time" sortable column-key="register_time"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.register_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import {getAdminUsers} from '@/api/api'
export default {
  data () {
    return {
      resize: false,
      tableHeight: 0,
      currentPage: 1,
      total: 0,
      tableData: [],
      filterArticle: {
        name: '',
        time_around: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
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
    this.getUserList()
  },
  methods: {
    countMaxHeight () {
      let wrapHeight = this.$refs.tbWrap.offsetHeight
      // 获取elemet-ui组件的高度要加$el
      let filterHeight = this.$refs.filterWrap.$el.offsetHeight
      let tableHeight = wrapHeight - filterHeight - 52
      console.log(wrapHeight + '  ' + filterHeight)
      console.log(tableHeight)
      this.tableHeight = tableHeight
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    filterSubmit (e) {
      this.currentPage = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUserList()
    },
    getUserList () {
      let param = {
        page: this.currentPage,
        name: this.filterArticle.name,
        time_around: this.filterArticle.time_around
      }
      let o = this
      getAdminUsers(param)
        .then(response => {
          console.log(response)
          let data = response.data
          if (data.code === 1) {
            o.tableData = data.info
            o.total = data.total
          } else {
            this.$message.error(data.msg)
          }
        })
    },
    linkTo (type) {
      if (type === 'add') {
        this.$router.push({ path: '/blog/home/account/add' })
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
.account_list{
  .demo-table-expand {
    font-size: 0;
    label{
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .avatar {
    img{
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}

</style>

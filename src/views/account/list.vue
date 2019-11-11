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
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData4" style="width: 100%" max-height="600">
  <el-table-column type="expand">
          <template slot-scope="props">
            <el-form inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.province }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.zip }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
    <el-table-column prop="date" label="日期" width="150">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="province" label="省份" width="120">
    </el-table-column>
    <el-table-column prop="city" label="市区" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址" width="300">
    </el-table-column>
    <el-table-column prop="zip" label="邮编" width="120">
    </el-table-column>
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="page-wrap">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" background layout="total, prev, pager, next, jumper" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
import breadcrumb from '../../components/breadcrumb/breadcrumb'
export default {
  data () {
    return {
      resize: false,
      tableHeight: 0,
      currentPage: 1,
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        date: '2019-05-02',
        phone: '18362652542'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        date: '2019-05-02',
        phone: '18362652542'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        date: '2019-05-02',
        phone: '18362652542'
      }],
      tableData4: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
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
      console.log('submit')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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

<style lang="scss" scoped="" type="text/css">
</style>

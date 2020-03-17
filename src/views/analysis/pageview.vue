<template>
  <div class="analysis">
    <el-row>
      <el-col :span="24">
        <div id="worldMap" class="full-chart">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts'
import { getPageViewDate } from '../../api/api'
// import { evil } from '@/common/js/base.js'
import CityMap from '&/echarts/city.json'
import '&/echarts/china.js'
const MAPURL = '/static/echarts/map/' // 线下
const CHINESE = ['河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '上海', '重庆', '香港', '澳门', '台湾']
const PINYIN = ['hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'shanghai', 'chongqing', 'xianggang', 'aomen', 'taiwan']
export default {
  data () {
    return {
      worldMap: Object,
      flag: true,
      //  地图的所有信息和状态
      mapDetail: {
        iscity: false, // 是否为城市
        isarea: false, // 是否为区
        pinyin: '', // 城市对应的拼音
        cityid: '', // 城市对应的id
        urls: '', // 请求的地址
        mapdata: [], // 请求得到的数据
        mapname: '' // 地图对应的名字
      },
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['数量']
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          inRange: {
            color: ['#8bd7f1', '#27b1df', '#2b7fd9']
          },
          text: ['高', '低'],
          calculable: true
        },
        series: [{
          name: '数量',
          type: 'map',
          mapType: 'china',
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              color: '#000'
            },
            emphasis: {
              show: true,
              areaColor: '#2B91B7'
            }
          },
          itemStyle: {
            normal: {
              color: '#05C3F9',
              shadowBlur: 10,
              shadowColor: '#05C3F9'
            }
          },
          // data: this.getMaps('all', '')
          data: [ {name: '广东', value: '10'} ]
        }]
      }
    }
  },
  mounted () {
    let that = this
    this.$nextTick(() => {
      that.setChartInit()
    })
  },
  methods: {
    setChartInit () {
      let that = this
      this.worldMap = echarts.init(document.getElementById('worldMap'))
      this.option.toolbox = {
        itemSize: 20,
        iconStyle: {
          borderColor: '#000'
        },
        feature: {
          myTool2: {
            show: true,
            title: '返回',
            icon: 'path://M386 984 c-263 -64 -437 -344 -371 -598 25 -96 65 -167 135 -237 195-197 501 -198 700 -3 196 191 199 502 7 698 -126 128 -302 181 -471 140z m77 -336 c7 -4 28 -8 48 -8 100 0 205 -63 252 -148 27 -50 57 -162 56 -212 l0 -25-17 25 c-72 106 -155 156 -274 166 l-77 7 -3 -71 -3 -71 -168 119 -168 119 138 97 c76 53 152 107 168 119 l30 23 3 -66 c2 -38 8 -70 15 -74z',
            onclick: function (param) {
              if (that.mapDetail.iscity !== false) {
                that.mapDetail.pinyin = that.pinYin(param.name)
              }
              that.mapDetail.cityid = CityMap[param.name]
              if (that.mapDetail.iscity) {
                that.backArea(that.mapDetail, param, echarts)
              } else if (that.mapDetail.isarea) {
                that.backArea(that.mapDetail, param, echarts)
              } else {
                that.$message('已经返回最顶层！')
              }
            }
          }
        }
      }
      this.worldMap.setOption(this.option)
      this.worldMap.on('click', (param) => {
        that.showAreaDetail(param)
      })
    },
    showAreaDetail (param) {
      if (!isNaN(param.value)) {
        let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g') // 拿到对应的json文件名
        if (this.mapDetail.iscity !== true) {
          let temp = this.pinYin(param.name)
          if (!reg.test(temp)) {
            this.mapDetail.pinyin = temp
          } else {
            this.$message.warning('该地区暂无更多数据！')
            return false
          }
        }
        this.mapDetail.cityid = CityMap[param.name]
        this.loadArea(this.mapDetail, param, echarts)
      } else {
        this.$message.warning('该地区暂无更多数据！')
      }
    },
    pinYin (name) { // 翻译成对应的拼音
      // let flag = false
      for (let i = 0; i < CHINESE.length; i++) {
        if (name === CHINESE[i]) {
          name = PINYIN[i]
          // flag = true
          break
        }
      }
      return name
    },
    backArea (mapDetail, param, echarts) { // 返回的方法
      if (mapDetail.iscity === true) {
        // 初始化
        mapDetail.urls = MAPURL + 'china.json'
        mapDetail.cityid = ''
        mapDetail.isarea = false
        mapDetail.iscity = false
        mapDetail.pinyin = ''
        mapDetail.mapname = 'china'
      } else if (mapDetail.isarea === true) {
        mapDetail.urls = MAPURL + mapDetail.pinyin + '.json'
        mapDetail.iscity = true
        mapDetail.isarea = false
        mapDetail.mapname = mapDetail.pinyin
      }
      this.getDataMap(mapDetail.urls, mapDetail.mapname, echarts)
    },
    getMaps (type, area) {
      let temp = []
      let param = {
        type: type,
        area: area
      }
      getPageViewDate(param)
        .then(res => {
          if (res.data.code === 1) {
            for (let i in res.data.count) {
              let str = {
                name: i,
                value: res.data.count[i]
              }
              temp.push(str)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      return [{'name': '广东', 'value': '5'}]
    },
    // 公用的加载地图方法
    getDataMap (urls, strs, echarts) {
      let that = this
      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      if (reg.test(urls) || urls.indexOf('undefined') !== -1) {
        this.$message.warning('暂无更多数据！')
        return false
      }
      this.$http.get(urls)
        .then(res => {
          let type = ''
          let area = ''
          echarts.registerMap(strs, res.data)
          that.worldMap = echarts.init(document.getElementById('worldMap'))
          if (strs === 'china') {
            type = 'all'
            area = ''
          } else if (/^[0-9]+.?[0-9]*$/.test(strs)) {
            type = 'city'
            for (let i in CityMap) {
              if (i === strs) {
                area = CityMap[i]
              }
            }
          } else {
            type = 'province'
            for (let i in PINYIN) {
              if (PINYIN[i] === strs) {
                area = CHINESE[i]
              }
            }
          }
          that.worldMap.setOption({
            series: [{
              type: 'map',
              map: strs,
              data: that.getMaps(type, area)
            }]
          })
        })
    },
    loadArea (mapDetail, param, echarts) { // 将后台加载到的数据传到地图,并显示出来
      if (mapDetail.iscity !== true) {
        this.mapDetail.urls = MAPURL + mapDetail.pinyin + '.json'
        this.mapDetail.iscity = true
        this.mapDetail.isarea = false
        this.mapDetail.mapname = mapDetail.pinyin
      } else if (mapDetail.isarea !== true) {
        this.mapDetail.cityid = mapDetail.cityid
        this.mapDetail.urls = MAPURL + mapDetail.cityid + '.json'
        this.mapDetail.iscity = false
        this.mapDetail.isarea = true
        this.mapDetail.mapname = mapDetail.cityid
      }
      this.getDataMap(this.mapDetail.urls, this.mapDetail.mapname, echarts)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';
.analysis{
  .full-chart{
    min-height: 650px;
  }
}
</style>

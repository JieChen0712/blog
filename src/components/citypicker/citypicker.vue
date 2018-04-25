<template>
  <div class="citypicker">
    <el-cascader
    expand-trigger="hover"
    :options="options"
    v-model="selectedOptions"
    @change="handleChange">
    </el-cascader>
  </div>
</template>

<script type="text/ecmascript">
export default {
  data () {
    return {
      options: [],
      selectedOptions: []
    }
  },
  created () {
    this.$http.get('../static/data/area.json')
      .then(response => {
        console.log(response)
        console.log(response.data)
        let cityData = []
        for (let i in response.data) {
          let parent = response.data[i]
          let province = {
            value: parent['name'],
            label: parent['name']
          }
          if (parent['sub'].length > 0) {
            var temp = []
            for (let j in parent['sub']) {
              let citySub = parent['sub'][j]
              let city = {
                value: citySub['name'],
                label: citySub['name']
              }
              temp.push(city)
              if (citySub['sub'] !== undefined && citySub['sub'].length > 0) {
                let temp1 = []
                for (let k in citySub['sub']) {
                  let countySub = citySub['sub'][k]
                  let county = {
                    value: countySub['name'],
                    label: countySub['name']
                  }
                  temp1.push(county)
                }
                temp[j]['children'] = temp1
              }
            }
            province['children'] = temp
          }
          cityData.push(province)
        }
        this.options = cityData
      })
  },
  mounted () {},
  methods: {
    handleChange (value) {
      console.log(value)
      console.log(this.selectedOptions)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
</style>

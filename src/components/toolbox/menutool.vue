<template>
  <div class="menutool">
    <ul class="tool-list">
      <li>
        <el-button type="primary" icon="el-icon-edit">
          <el-badge class="mark" :value="12" />
        </el-button>
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript">
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped="" type="text/css">
.menutool{
    .tool-list{
        display: flex;
        height: 35px;
        margin: 0;
        padding: 0;
        list-style: none;
        li{
            flex: 1;
            botton{
                
            }
        }
    }
}
</style>

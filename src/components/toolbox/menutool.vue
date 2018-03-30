<template>
  <div class="menutool" :class="{close:isCollapse}">
    <ul class="tool-list">
      <li>
        <i class="fa fa-bell icons"></i>
        <el-badge class="mark" :value="12" />
      </li>
      <li>
        <i class="fa fa-envelope icons"></i>
        <el-badge class="mark" :value="12" />
      </li>
      <li>
        <i class="fa fa-gear icons"></i>
      </li>
      <li>
        <i class="fa fa-power-off icons"></i>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript">
export default {
  props: {
    isCollapse: Boolean
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';
.menutool{
    .tool-list{
        display: flex;
        height: 35px;
        margin: 0;
        padding: 0;
        list-style: none;
        @include border-top(#0c1119);
        li{
            flex: 1;
            cursor: pointer;
            @include border-right(#10151d);
            &:last-child{
                border: none;
            }
            .icons{
                @include icon-color();
                line-height: 35px;
            }
            .el-badge{
                position: absolute;
                z-index: 10;
            }
        }
    }
}
</style>

<template>
  <div class="account_list">
    <breadcrumb></breadcrumb>
    <tableWrapper></tableWrapper>
  </div>
</template>

<script type="text/ecmascript">
import tableWrapper from '../../components/table/table'
import breadcrumb from '../../components/breadcrumb/breadcrumb'
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  components: {
    tableWrapper,
    breadcrumb
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.account_list{
  margin: .5rem;
  border: solid 1px #354052;
}
</style>

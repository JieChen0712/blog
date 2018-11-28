<template>
  <div class="menulist">
    <el-menu default-active="1-4-1"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="useRouter" :unique-opened="uniqueOpened" :text-color="textColor" :active-text-color="activeTextColor" :background-color="backgroundColor">
      <el-submenu v-for="items in list" v-if="((items.status==1)&&(items.sub_menu!=null))" :key="items.menuid" :data-id="items.menuid"  :index="items.menuid" >
        <template slot="title">
          <i :class="items.icon"></i>
          <span slot="title" v-text="items.name">{{items.menuid}}</span>
        </template>
      <el-menu-item v-for="child in items.sub_menu" :key="child.menuid" :index="child.menuid" :route="child.link" v-if="(items.sub_menu!=null||items.sub_menu.length>0)">
        <i class="child.icon" v-show="child.icon!=''"></i>
        <span slot="title" v-text="child.name"></span>
      </el-menu-item>
      </el-submenu>
      <el-menu-item v-for="items in list" :route="items.link" :key="items.menuid" v-if="((items.status==1)&&(items.sub_menu==null||items.sub_menu.length<=0))" :index="items.menuid">
        <i :class="items.icon" v-show="items.icon!=''"></i>
        <span slot="title" v-text="items.name"></span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript">
import Color from '&/json/color.json'
export default {
  props: {
    isCollapse: Boolean,
    useRouter: Boolean,
    uniqueOpened: Boolean
  },
  data () {
    return {
      list: {
        type: Array
      },
      textColor: Color.color.menu['text-color'],
      activeTextColor: Color.color.menu['active-text-color'],
      backgroundColor: Color.color.menu['background-color']
    }
  },
  created () {
    this.list = [
      {
        'menuid': '1',
        'name': '用户管理',
        'link': 'baidu',
        'status': '1',
        'icon': 'el-icon-menu',
        'sub_menu': [
          {
            'menuid': '1-1',
            'name': '个人中心',
            'link': '/blog/home/setting',
            'icon': '',
            'status': '1'
          },
          {
            'menuid': '1-2',
            'name': '用户列表',
            'link': '/blog/home/accountList',
            'icon': '',
            'status': '1'
          }
        ]
      },
      {
        'menuid': '2',
        'name': '日志管理',
        'link': 'baidu',
        'status': '1',
        'icon': 'el-icon-menu',
        'sub_menu': [
          {
            'menuid': '2-1',
            'name': '日志分类',
            'link': '/blog/home/article/kind',
            'icon': '',
            'status': '1'
          },
          {
            'menuid': '2-2',
            'name': '日志列表',
            'link': '/blog/home/article/index',
            'icon': '',
            'status': '1'
          }
        ]
      }
    ]
  },
  mounted () {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    @include menu-bg-color()
    /*min-height: 400px;*/
  }
  .el-menu{
    @include menu-border-right();
    .el-menu-item,.el-submenu{
      @include menu-text-color()
    }
  }
</style>

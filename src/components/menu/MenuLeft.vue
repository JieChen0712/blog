<template>
  <div class="menuleft">
    <div class="hidden-scroll">
      <div class="menu-wrapper">
        <!--<ul class="menu-list">
          <li v-for="items in list" v-if="(items.status==1)" data-id="items.menuid" :key="items.id">
            <a href="items.link" @click="check_link"><i class="items.icon"></i><span v-text="items.name"></span></a>
              <ul v-for="child in items.sub_menu" class="child-list" :key="child.id">
                <li>
                  <a href="child.link" @click="check_link"><i class="child.icon"></i><span v-text="child.name"></span></a>
                </li>
              </ul>
          </li>
        </ul>-->
        <el-menu default-active="1-4-1"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="useRouter" :unique-opened="uniqueOpened">
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
    </div>
  </div>
</template>

<script type="text/ecmascript">
export default {
  name: 'MenuLeft',
  data () {
    return {
      list: {
        type: Array
      },
      isCollapse: false,
      useRouter: true,
      uniqueOpened: true
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
            'name': '账号管理',
            'link': 'www.baidu.com',
            'icon': '',
            'status': '1'
          },
          {
            'menuid': '1-2',
            'name': '账号管理2',
            'link': 'www.baidu.coms',
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
        'sub_menu': null
      }
    ]
  },
  methods: {
    check_link () {
      console.log(1)
    },
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
  .menuleft{
      height: 100%;
      width: 250px;
      background-color: #1c232f;
      overflow: hidden;
      .hidden-scroll{
          height:100%;
          overflow-x: hidden;
          .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 250px;
            /*min-height: 400px;*/
          }
          .menu-wrapper{
              width: 270px;
              height: 100%;
              overflow-y: scroll;
              overflow-x: hidden;
          }
      }
  }
</style>

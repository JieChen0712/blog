<template>
  <div class="status">
    <el-tooltip :disabled="!isCollapse" class="item" effect="dark" placement="right">
    <div slot="content">{{userName}}<br/>{{userRole}}<br/>{{userStatus}}</div>
    <div class="user-info" :class="{close:isCollapse}">
      <div class="avatar-wrapper">
        <img class="avatar" src="./image/user.jpg" alt="用户头像"/>
      </div>
      <transition name="fade">
          <div class="info-wrapper" v-show="!isCollapse">
            <span class="user-name" v-text="userName"></span>
            <span class="user-role" v-text="userRole"></span>
            <span class="user-status" v-text="userStatus"></span>
          </div>
      </transition>
    </div>
    </el-tooltip>
  </div>
</template>

<script type="text/ecmascript">
export default {
  props: {
    isCollapse: Boolean
  },
  data () {
    return {
      userName: '',
      userRole: '',
      userStatus: ''
    }
  },
  created () {
    this.userName = 'Jie Chen'
    this.userRole = 'Administrator'
    this.userStatus = 'Online'
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';
@import '../../common/scss/animation.scss';
.status{
    .user-info{
        height: 100px;
        padding: 20px;
        overflow: hidden;
        box-sizing: border-box;
        transition: all .5s ease;
        &.close{
          height: 65px;
          padding: 10px 10px;
          .avatar-wrapper{
            width: 40px;
            border-radius: 80px;
            .avatar{
                border-radius:80px;
            }
          }
        }
        @include menu-item-border();
        .avatar-wrapper{
            float:left;
            width: 60px;
            padding: 2px;
            border: 1px solid #585858;
            border-radius: 8px;
            margin-right: 15px;
            transition: all .5s ease;
            .avatar{
                width: 100%;
                height: auto;
                border-radius:6px;
                vertical-align: middle;
                transition: all .5s ease;
            }
        }
        .info-wrapper{
            float:left;
            @include Fade(1,.2s,.3s);
            .user-name,.user-role,.user-status{
                display: block;
                text-align: left;
            }
            .user-name{
                font-weight: bold;
                line-height: 22px;
                @include menu-text-color();
            }
            .user-role{
                font-size: 12px;
                line-height: 16px;
                color: #929292;
            }
            .user-status{
                @include span-color-success();
                padding: 4px 8px 2px;
                font-size: 13px;
                font-weight: bold;
                line-height: 1.2;
                text-align: center;
                white-space: nowrap;
                vertical-align: baseline;
                border-radius: 3px;
                box-sizing: border-box;
            }
        }
    }
}
</style>

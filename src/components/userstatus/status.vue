<template>
  <div class="status">
    <div class="user-info">
      <div class="avatar-wrapper">
        <img class="avatar" src="./image/user.jpg" alt="用户头像"/>
      </div>
      <div class="info-wrapper">
        <span class="user-name" v-text="userName"></span>
        <span class="user-role" v-text="userRole"></span>
        <span class="user-status" v-text="userStatus"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
export default {
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
.status{
    .user-info{
        height: 100px;
        padding: 20px;
        overflow: hidden;
        box-sizing: border-box;
        @include menu-item-border();
        .avatar-wrapper{
            float:left;
            width: 60px;
            padding: 2px;
            border: 1px solid #585858;
            border-radius: 8px;
            margin-right: 15px;
            .avatar{
                width: 100%;
                height: auto;
                border-radius:6px;
                vertical-align: middle;
            }
        }
        .info-wrapper{
            float:left;
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

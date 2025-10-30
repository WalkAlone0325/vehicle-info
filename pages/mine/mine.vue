<script setup>
import { ref } from 'vue'
import { logoutApi } from '@/api'
import { onShow } from '@dcloudio/uni-app'

const user = ref({})
const token = ref('')
onShow(() => {
  user.value = uni.getStorageSync('user')
  token.value = uni.getStorageSync('token')
})

const clickEditInfo = () => {
  uni.navigateTo({
    url: '/pages/mine/info'
  })
}

const clickToNotice = () => {
  uni.navigateTo({
    url: '/pages/mine/notice'
  })
}

const clickToEditPassword = () => {
  if (!user.value.userName) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: '/pages/mine/edit-password'
  })
}

const clickToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}

const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: async (res) => {
      if (res.confirm) {
        const res = await logoutApi()
        if (res.code === 200) {
          uni.showToast({
            title: '退出登录成功',
            icon: 'success'
          })
          uni.removeStorageSync('token')
          uni.removeStorageSync('user')
          uni.removeStorageSync('roles')
          uni.reLaunch({
            // url: '/pages/index/index'
            url: '/pages/login/login'
          })
        }
      }
    },
    fail: (err) => {
      console.log(err, 'err')
    }
  })
}
</script>

<template>
  <view class="mine-page">
    <view class="mine__header">
      <view class="header-con">
        <view class="error-wrap" v-if="!user.userName" @click="clickToLogin">登录</view>
        <view v-else class="header-con">
          <wd-img class="img" :width="80" :height="80" round :src="user.avatar" />
          <view class="name" @click="clickEditInfo">{{ user.userName }}</view>
        </view>
        <!-- <view class="name" v-else @click="clickToLogin">登录</view> -->
      </view>
    </view>

    <view class="mine__main">
      <wd-grid border clickable hover-class=" ">
        <wd-grid-item icon="notification" text="系统通知" is-dot @itemclick="clickToNotice" />
        <wd-grid-item icon="lock-on" text="修改密码" @itemclick="clickToEditPassword" />
      </wd-grid>
    </view>

    <view class="mine__footer" v-if="token">
      <wd-button type="error" block @click="logout">退出登录</wd-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.mine-page {

  .mine__header {
    height: 400rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;

    .header-con {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .error-wrap {
        width: 80px;
        height: 80px;
        background-color: #fff;
        border: 1rpx solid #000;
        line-height: 80px;
        text-align: center;
        border-radius: 50%;
      }

      ::v-deep .wd-img {
        border: 1rpx solid #000;
      }

      .name {
        margin-top: 20rpx;
        font-size: 18px;
      }
    }
  }

  .mine__footer {
    position: fixed;
    bottom: 50rpx;
    left: 40rpx;
    right: 40rpx;
    padding: 10rpx 40rpx;
  }
}
</style>

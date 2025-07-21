<script setup>
import { reactive, ref } from 'vue'
import { encrypt } from '@/utils/jsencrypt'
import { loginApi, getInfoApi, oneLoginApi } from '@/api'

const model = reactive({
  username: '',
  password: '',
  xcxCode: ''
})

const form = ref()
const loading = ref(false)
const oneLoading = ref(false)
const oneLogin = ref(true)

function handleSubmit() {
  form.value.validate().then(async ({
    valid,
    errors
  }) => {
    if (valid) {
      loading.value = true
      model.xcxCode = await getWxCode()
      const data = {
        username: model.username,
        password: encrypt(model.password),
        xcxCode: model.xcxCode
      }
      console.log('🚀:>> data: ', data)
      const res = await loginApi(data)
      if (res.code === 200) {
        uni.setStorageSync('token', res.data.token)
        const info = await getInfoApi()
        uni.setStorageSync('user', info.data.user)
        uni.switchTab({
          url: '/pages/index/index'
        })
      }
      loading.value = false
    }
  })
    .catch((error) => {
      console.log(error, 'error')
      loading.value = false
    })
}

const getWxCode = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
      success: (res) => {
        if (res.code) {
          console.log('🚀:>> code: ', res.code)
          resolve(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
          reject(res.errMsg)
        }
      },
      fail: (err) => {
        console.log(err)
        reject(err)
      }
    })
  })
}

const handleOneLogin = async () => {
  oneLoading.value = true
  model.xcxCode = await getWxCode()
  const resD = await oneLoginApi(model.xcxCode)
  if (resD.code === 200) {
    uni.setStorageSync('token', resD.data.token)
    const info = await getInfoApi()
    uni.setStorageSync('user', info.data.user)
    uni.switchTab({
      url: '/pages/index/index'
    })
    oneLoading.value = false
  } else {
    oneLogin.value = false
    uni.showToast({
      title: '微信授权失败',
      icon: 'none'
    })
    oneLoading.value = false
  }
}
</script>

<template>
  <view class="login-page">
    <image class="login-bg" src="/static/login.jpg" />
    <!-- <image class="login-bg-header" src="/static/lgheader.jpg" /> -->

    <wd-navbar :bordered="false" fixed placeholder safeAreaInsetTop>
      <template #left>
        <!-- <view class="" @click="clickToHome">
          <wd-icon custom-class="icon-con" name="home" color="#000" size="22px" />
        </view> -->
      </template>
      <template #title>
        <view class="lg-title">登录</view>
      </template>
    </wd-navbar>

    <view class="one-login" v-if="oneLogin">
      <!-- <view class="title-con">智能油机运维平台</view> -->
      <wd-button :loading="oneLoading" custom-class="one-login-btn" @click="handleOneLogin">微信授权一键登录</wd-button>
      <!-- <view class="one-login-btn" @click="handleOneLogin">微信授权一键登录</view> -->
    </view>

    <view class="login-con" v-if="!oneLogin">
      <image class="log-header-img" src="/static/log-header.jpg" />
      <view class="login-form">
        <wd-form ref="form" :model="model" errorType="toast">
          <view class="title">自动绘图数据采集上报系统</view>
          <wd-cell-group border>
            <wd-input label="账号" label-width="70px" prop="username" clearable v-model="model.username" placeholder="请输入账号"
              :rules="[{ required: true, message: '请填写账号' }]" />
            <wd-input label="密码" label-width="70px" prop="password" show-password v-model="model.password"
              placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
          </wd-cell-group>
          <view class="footer">
            <wd-button type="primary" :loading="loading" @click="handleSubmit" block>登录</wd-button>
          </view>
        </wd-form>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
  // background: linear-gradient(135deg, #3498db, #2c3e50);

  .login-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 120%;
    height: 100%;
    margin-left: -5%;
    z-index: 2;
    opacity: 0.8;
    overflow-x: hidden;
  }

  .login-bg-header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 3;
    opacity: 1;
  }

  .one-login {
    position: absolute;
    width: 100%;
    left: 15%;
    right: 15%;
    top: 40%;
    opacity: 1;
    z-index: 999;

    :deep() {
      .one-login-btn {
        width: 540rpx;
        line-height: 80rpx;
        height: 80rpx;
        color: #fff;
        font-size: 30rpx;
        background-color: #3c689e;
        text-align: center;
        border-radius: 0;
      }
    }
  }

  .login-con {
    opacity: 1;
    z-index: 999;
    position: absolute;
    left: 6%;
    right: 6%;
    top: 25%;
    background-color: #fff;
    border-radius: 20rpx;

    .log-header-img {
      border-radius: 20rpx 20rpx 0 0 ;
      width: 100%;
      height: 300rpx;
      margin: 0 auto;
    }

    .login-form {
      padding: 10rpx 20rpx;
      padding-top: 40rpx;
    }

    .title {
      padding-bottom: 40rpx;
      text-align: center;
      font-size: 34rpx;
      font-weight: 500;
      color: #333;
    }
  }

  .footer {
    padding: 24rpx;
    padding-bottom: 40rpx;
  }

  :deep() {
    .wd-navbar {
      background: transparent;
    }
  }

  .icon-con {
     padding: 12rpx;
     background-color: #b6b6b6;
     border-radius: 50%;
  }

  .lg-title {
    font-size: 32rpx;
    font-weight: 400;
    color: #333;
    opacity: 1;
  }
}


</style>

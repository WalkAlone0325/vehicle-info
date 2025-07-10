<script setup>
import { reactive, ref } from 'vue'
import { encrypt } from '@/utils/jsencrypt'
import { loginApi, getInfoApi } from '@/api'

const model = reactive({
  username: '',
  password: ''
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(async ({
      valid,
      errors
    }) => {
      if (valid) {
        const res = await loginApi(
          {
            username: model.username,
            password: encrypt(model.password)
          }
          // { "username": "admin", "password": "PFZ37mn1+EB/3KV6P1zZt1usC0Ngckv2PZVkGEHf5YN+qSP+n4cXl00iCK1Q/zC1YAKAu4PFwTq0U4DVaq7FnCkHgdNJPFT1vOtOtcDWJgIKTcX1ga7bXSpRteJzdTMu/4EzFPfHrKyUw4KbqqwB/SospZsZquz7MQq9WuLTOO8=" }
          // {"username":"wangyuan","password":"XaBloRSRNcxUCfG+Ffd9ryJmXTrXhSMNZxJ2GAQeyGCR6m1obpxZgZvdMNb/CpS4Oe2WVabJ0vOiCCUrykuawMRz7jWbtxoyhWQANshcNQCnhRnYgAGrbfx2n4iBYUC4rakVv/LVib+i12T4cp7EESQv0MWmA634qsIY8FNqH5A="}
          // {"username":"tyjl01","password":"S65lxxcvyk7QrOvrdccrEKLiWUKI+pRJGLu1wvOQWcZyL5+BulcXothDLxKQwKHHLUp9WN6bKFRgFkgCQPXN1ANOTS+tlQ5xqKExzWaDugwQplbWzAvlEqOxGe71bjtJ9NYzIOWJ2jkgUzySbP+dzAkkfO8aYSinGWqfmH1+0Io="}
          // {"username":"tydz01","password":"gLY100N2xa3mQno4LispsyEzFYtGW2DPHxQWNZpznsIVJ/oKyqXKzydxzzPvPR5Tln0fLu5yZTTSNhsxLuW5iBne/Va/vCb5aR0Wi2593plssbPP3KtzaJXvcdIOsAkZsIh9d+HZU0KQT/mKl3f3TMMVWPxX+ProCZOAGLXr3tA="}
        )
        if (res.code === 200) {
          uni.setStorageSync('token', res.data.token)
          const info = await getInfoApi()
          uni.setStorageSync('user', info.data.user)
          uni.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<template>
  <view class="login-page">
    <view class="one-login" v-if="false">
      <view class="one-login-btn" @click="handleSubmit">微信授权一键登录</view>
    </view>
    
    <view class="login-con" v-if="true">
      <wd-form ref="form" :model="model" errorType="toast">
        <view class="title">自动绘图数据采集上报系统</view>
        <wd-cell-group border>
          <wd-input label="账号" label-width="70px" prop="username" clearable v-model="model.username" placeholder="请输入账号"
            :rules="[{ required: true, message: '请填写账号' }]" />
          <wd-input label="密码" label-width="70px" prop="password" show-password v-model="model.password"
            placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" @click="handleSubmit" block>登录</wd-button>
        </view>
      </wd-form>
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
  
  .one-login {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -14vh;
    
    .one-login-btn {
      width: 440rpx;
      line-height: 72rpx;
      color: #fff;
      font-size: 28rpx;
      background-color: #597fe8;
      text-align: center;
    }
  }

  .login-con {
    height: 460rpx;
    padding: 0 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    margin: 30rpx;
    margin-top: 20vh;

    .title {
      padding-bottom: 40rpx;
      text-align: center;
    }
  }

  .footer {
    padding: 24rpx;
  }
}
</style>

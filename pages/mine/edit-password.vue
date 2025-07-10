<script setup lang="ts">
import { ref } from 'vue'
import { updatePwd } from '@/api'

const form = ref()
const model = ref({
  oldPassword: '',
  newPassword: '',
  newPassword2: ''
})

const rules = {
  oldPassword: [{ required: true, message: '请填写旧密码' }],
  newPassword: [{ required: true, message: '请填写新密码' }],
  newPassword2: [{ required: true, message: '请再次输入新密码' }]
}

const handleSubmit = () => {
  form.value
    .validate()
    .then(async ({
      valid,
      errors
    }) => {
      if (valid) {
        const res = await updatePwd(model.value)
        if (res.code === 200) {
          uni.removeStorageSync('token')
          uni.removeStorageSync('user')
          uni.navigateTo({
            url: '/pages/login/login'
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
  <view class="edit-password-page">
    <view class="form-con">
      <wd-message-box />
      <wd-toast />
      <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
        <wd-cell-group border>
          <wd-input showPassword label="旧密码" label-width="80px" prop="oldPassword" clearable v-model="model.oldPassword"
            placeholder="请输入旧密码" />
          <wd-input showPassword label="新密码" label-width="80px" prop="newPassword" clearable v-model="model.newPassword"
            placeholder="请输入新密码" />
          <wd-input showPassword label="确认密码" label-width="80px" prop="newPassword2" clearable
            v-model="model.newPassword2" placeholder="请再次输入新密码" />
        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" @click="handleSubmit" block>提交</wd-button>
        </view>
      </wd-form>
    </view>
  </view>
</template>


<style lang="scss" scoped>
.footer {
  padding: 0 30rpx;
  margin-top: 50rpx;
}
</style>

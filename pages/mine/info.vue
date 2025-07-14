<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useToast } from '@/uni_modules/wot-design-uni'
import { getToken } from '@/utils'
import { getInfoApi } from '@/api'
import http from '@/utils/request'

const toast = useToast()

const model = ref({
  userName: '',
  avatar: '',
  fileList: []
})

const handleSubmit = () => { }

onLoad(() => {
  const info = uni.getStorageSync('user')
  model.value.userName = info.userName
  model.value.fileList = [{ url: info.avatar }]
})

const customUpload = (file, formData, options) => {
  const uploadTask = uni.uploadFile({
    url: http.config.baseURL + 'system/user/profile/avatar',
    // url: 'https://sxnmggz.com:8448/prod-api/system/oss/upload',
    header: {
      ...options.header,
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    },
    name: 'avatarfile',
    fileName: 'avatarfile',
    fileType: 'image',
    formData,
    filePath: file.url,
    success: async (res) => {
      const e = JSON.parse(res.data)
      if (e.code == 200) {
        // 设置上传成功
        options.onSuccess(e, file, formData)
        model.value.fileList = [{ url: e.data.imgUrl }]
        toast.show('上传成功')
        const info = await getInfoApi()
        uni.setStorageSync('user', info.data.user)
      } else {
        // 设置上传失败
        options.onError({ ...e, errMsg: e.errMsg || '' }, file, formData)
        toast.show('上传失败')
      }
    },
    fail(err) {
      // 设置上传失败
      options.onError(err, file, formData)
    }
  })
  // 设置当前文件加载的百分比
  uploadTask.onProgressUpdate((res) => {
    options.onProgress(res, file)
  })
}

</script>

<template>
  <view class="info-page">
    <view class="form-con">
      <wd-message-box />
      <wd-toast />
      <wd-form ref="form" :model="model" errorType="toast">
        <!-- <view style="margin-top: 30rpx;"> -->
        <wd-cell-group border>
          <wd-cell title="头像" title-width="100px" prop="fileList" :rules="[{ required: true, message: '请上传头像' }]">
            <view style="display: flex; flex-direction: column;">
              <wd-upload v-model:file-list="model.fileList" :limit="1" :upload-method="customUpload"></wd-upload>
              <!-- <wd-button style="margin-top: 20rpx; width: 50%;" size="small" @click="onUploadClick()">开始上传</wd-button> -->
            </view>
          </wd-cell>
          <wd-input label="用户名" label-width="100px" prop="userName" readonly clearable v-model="model.userName"
            placeholder="请输入用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        </wd-cell-group>
        <view class="footer">
          <!-- <wd-button type="primary" @click="handleSubmit" block>提交</wd-button> -->
        </view>
        <!-- </view> -->
      </wd-form>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.info-page {
  height: 100%;
  background-color: #eee;

  .form-con {

    .footer {
      padding: 0 30rpx;
      margin-top: 50rpx;
    }
  }
}
</style>

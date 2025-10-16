<template>
  <view>
    <wd-upload @remove="removeUpload" :file-list="fileList" :limit="1" :upload-method="customUpload"></wd-upload>
  </view>
</template>

<script setup>
import http from '@/utils/request'
import { getToken } from '@/utils'
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const props = defineProps({
  fileList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:fileList', 'remove'])

const removeUpload = (file) => {
  emit('remove',file)
}

const customUpload = (file, formData, options) => {
  const uploadTask = uni.uploadFile({
    url: http.config.baseURL + 'system/local/file/upload',
    header: {
      ...options.header,
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    },
    name: 'file',
    fileName: 'file',
    fileType: 'image',
    formData,
    filePath: file.url,
    success: async (res) => {
      const e = JSON.parse(res.data)
      if (e.code == 200) {
        // 设置上传成功
        options.onSuccess(e, file, formData)
        // props.fileList = [{ url: e.data.imgUrl }]
        emit('update:fileList', [e.data])
        toast.show('上传成功')
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

<style>

</style>

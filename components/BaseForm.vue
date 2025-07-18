<template>
  <view class="base-form">
    <image src="/static/apply-bg.png" mode="widthFix" class="apply-bg-con" style="width: 100%; height: 600rpx"></image>
    <view class="form-con">
      <view :class="group ? 'base-card' : 'form-card'">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"BaseForm",
    props: {
      group: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        
      };
    },
    
  }
</script>

<style lang="scss" scoped>
.base-form {
  background: #f2f5ff;
  position: relative;
  height: 100%;
  
  .apply-bg-con {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
  
  .form-con {
    position: absolute;
    z-index: 9;
    padding-top: 30rpx;
    position: relative;
    height: 100%;
    
    .form-card {
      padding: 30rpx 10rpx;
      margin: 40rpx;
      background-color: #fff;
      border-radius: 20rpx;
      box-sizing: border-box;
    }
    
    .base-card {
      border-radius: 20rpx;
      margin: 0 30rpx;
      padding: 20rpx 10rpx;
      box-sizing: border-box;
    }
  }
}

</style>
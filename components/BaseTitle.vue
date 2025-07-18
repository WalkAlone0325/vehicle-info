<template>
  <view class="base-title">
    <view class="title-con">
      <view class="title">{{title}}</view>
    </view>
    <view class="main-con">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
  defineProps({
    title: String
  })
</script>

<style lang="scss" scoped>
  .base-title {

    .title-con {
      padding: 14rpx 4rpx;
      margin: 20rpx 0 10rpx 0;

      .title {
        font-size: 16px;
        font-weight: 500;
        border-left: 8rpx solid #597fe8;
        padding-left: 10rpx;
      }
    }

    .main-con {
      padding: 4rpx 30rpx;
    }
  }
</style>

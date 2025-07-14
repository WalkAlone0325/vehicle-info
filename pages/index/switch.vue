<template>
  <view class="swith-con">
    <wd-button block type="primary" @click="click('map')">地图测试</wd-button>
    <view  style="margin-top: 40rpx;">
      <wd-button block type="success" @click="click">油机测试</wd-button>
    </view>
  </view>
</template>

<script setup>
  const click = (type) => {
    if(type === 'map') {
      uni.navigateTo({
        url: '/pages/index/map'
      })
    } else {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .swith-con {
    width: 100%;
    height: 100vh;
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
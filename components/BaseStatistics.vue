<script setup>
import { ref } from 'vue'

const dataList = ref([
  { label: '当日', val: 1, color: '#fbe8ef' },
  { label: '当月', val: 3, color: '#e5f7f8' },
  { label: '当年', val: 6, color: '#e6f1fe' }
])
</script>

<template>
  <view class="base-statistics">
    <view class="total-con">
      <view class="title">累计出行</view>
      <view class="val">
        <text class="num">10</text>
        <text>次</text>
      </view>
    </view>
    <view class="type-con">
      <view class="title">统计概览</view>
      <view class="main">
        <view class="item" v-for="i in dataList" :key="i.label">
          <view class="val">{{i.val}}</view>
          <view class="label">
            <text class="desc">{{i.label}}</text>
            <text>次</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.base-statistics {
  .total-con {
    background-color: #fbe8ef;
    border-radius: 30rpx;
    padding: 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .title {
      color: #4c69b7;
      font-size: 40rpx;
    }
    .val {
      margin-top: 30rpx;
      color: #4c69b7;
      font-weight: 600;
      .num {
        font-size: 60rpx;
        color: #5267a0;
        margin-right: 14rpx;
      }
    }
  }

  .type-con {
    background: #e6f1fe;
    padding: 40rpx;
    margin-top: 30rpx;
    border-radius: 30rpx;
    
    .title {
      color: #33353d;
    }
    
    .main {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 30rpx;
      
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        .val {
          font-size: 50rpx;
          font-weight: 600;
          color: #5267a0;
          margin-bottom: 12rpx;
        }
        
        .label {
          font-size: 30rpx;
          color: #5267a0;
          .desc {
            font-size: 40rpx;
            margin-right: 14rpx;
            color: #4c69b7;
          }
        }
      }
    }
  }
}
</style>
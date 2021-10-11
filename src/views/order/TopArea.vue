<template>
  <div class="top">
    <div class="top-header">
      <div class="iconfont header-back"
           @click="handleBackClick"
      >&#xe677; </div> 确认订单
    </div>
    <div class="top-receiver">
      <p class="top-receiver-title">收货地址</p>
      <p class="top-receiver-address">北京理工大学国防科技园2号楼10层</p>
      <p class="top-receiver-info">
        <span class="info-name">瑶妹（先生） </span>
        <span class="info-tel"> 18911024266</span>
      </p>
      <div class="iconfont top-icon">&#xe677; </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "TopArea",
  setup(){
    const touter = useRouter();
    const handleBackClick = ()=>{ touter.back() }
    return {
      handleBackClick
    }
  }
}
</script>

<style scoped lang="less">
.top{
  position: relative;
  height: 1.96rem;
  background: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%) no-repeat;
  background-size: 100% 1.59rem;
  &-header{
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color:#fff;
    text-align: center;
    font-size: .16rem;
    .header-back{
      position: absolute;
      font-size: .21rem;
      padding-left:.18rem;
    }
  }
  &-receiver{
    position: absolute;
    left: .18rem;
    right:.18rem;
    bottom:0;
    height:1.11rem;
    background-color: #fff;
    &-title{
      line-height: .22rem;
      padding:.16rem 0 .14rem .16rem;
      font-size: .16rem;
      color:#333;
    }
    &-address{
      line-height: .2rem;
      padding:0 .4rem 0 .16rem;
      font-size: .14rem;
      color:#333;
    }
    &-info{
      padding:.06rem 0 0 .16rem;
      .info-name{
        margin-right:.06rem;
        line-height: .18rem;
        color:#666;
        font-size:.12rem;
      }
    }
  }
  &-icon{
    position: absolute;
    right:.16rem;
    top:.5rem;
    color:#666;
    font-size: .14rem;
    transform: rotate(180deg);
  }
}
</style>
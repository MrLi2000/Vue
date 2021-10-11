<template>
  <div class="wrapper">
    <div class="shop-info">
      <img :src="item.imgUrl" alt="" width="56">
      <div :class="{'intro':true,'intro-bordered':hideBorder?false:true}" >
        <h3 class="intro-title">{{item.name}}</h3>
        <p class="message">
          <span>月售{{item.sales}}</span>
          <span>起送¥{{item.expressLimit}}</span>
          <span>基础运费¥{{item.expressPrice}}</span>
        </p>
        <p class="discount">{{item.slogan}}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ShopInfo",
  props:["item","hideBorder"]
}
</script>

<style scoped lang="less">
@import "../assets/css/colorall.less";
//nearby outlet
.shop-info{
  display: flex;
  margin-bottom: .12rem;
  img{
    width: .56rem;
    height: .56rem;
  }
  .intro{
    flex: 1;
    margin-left:.16rem;
    &-bordered{
      border-bottom: .01rem solid @bd-color;
    }
    /*border-bottom: .01rem solid @bd-color;*/
    .intro-title{
      font-size: .16rem;
      line-height: .22rem;
      color: @font-color;
      font-weight: normal;
    }
    span{
      margin-right:.16rem;
    }
    .message{
      margin-top: .08rem;
      margin-bottom: .08rem;
      color: @font-color;
      line-height: .18rem;
      font-size: .13rem;
    }
    .discount{
      line-height: .18rem;
      font-size: .13rem;
      color:red;
      margin-bottom: .12rem;
    }

  }
}
</style>
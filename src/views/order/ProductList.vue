<template>
  <div class="products">
    <div class="products-title">{{ shopName }}</div>

      <div class="products-list"
           v-for="item in productList"
           :key="item._id" >
        <img :src="item.imgUrl" alt="" width="46" height="46">
        <div class="info">
          <h4 class="info-title">{{item.name}}</h4>
          <div class="info-price">
            <div>
              <span class="yen">&yen;</span>
              <span class="price">{{item.price}}</span> x
              <span class="nums">{{ item.count }}</span>
            </div>
            <div class="all">
              <span class="yen">&yen;</span>{{ (item.price*item.count).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    <div class="total">
      共计3件/1.4kg
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {usecomCartEffect} from "../../effects/usecomCartEffect";

export default {
  name: "ProductList",
  setup(){
    const route = useRoute();
    const shopId = route.params.id;
    const { productList ,shopName,calculations } = usecomCartEffect(shopId);

    return {
      productList,shopName,calculations
    }
  }
}
</script>

<style scoped lang="less">
.products{
  margin:.16rem .18rem .5rem;
  padding:0 .16rem .16rem;
  background: #FFF;
  border-radius: .04rem;
  &-title{
    font-size:.16rem;
    color: #333;
    font-weight: bold;
    padding:.16rem 0;
  }
  &-list{
    display: flex;
    padding-bottom: .16rem;
    .info{
      flex: 1;
      padding-left:.16rem;
      line-height: .2rem;
      .info-title{
        font-size: .14rem;
        padding-bottom:.06rem;
        color: #333;
      }
      .info-price{
        display: flex;
        line-height: .14rem;
        color:red;
        font-size: .14rem;
        .yen{
          font-size: .12rem;
        }
        .all{
          flex: 1;
          text-align: right;
        }
      }
    }
  }
  .total{
    text-align: center;
    line-height: .28rem;
    background: #F5F5F5;
    font-size: .14rem;
    color: #999;
  }
}
</style>
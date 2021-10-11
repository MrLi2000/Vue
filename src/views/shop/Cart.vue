<template>
  <div class="cart">
    <div class="product" v-show="showCart && calculations.total > 0">
    <div class="all" >
      <div class="all-product" @click="setCartItemChecked(shopId)">
        <span class="iconfont"
          v-html="calculations.allCheck?'&#xe652':'&#xe66c'"
        ></span> 全选
      </div>
      <div class="clear"
           @click="clearCart(shopId)"
      >清空购物车</div>
    </div>
    <ul>
      <li class="product-item"
          v-for="item in productList"
          :key="item._id"
      >
        <div class="item-checked iconfont"
         v-html="item.check ? '&#xe652;' :'&#xe66c;'"
          @click="()=>changeCartItemClick(shopId,item._id)"
        ></div>
        <img :src="item.imgUrl" alt="">
        <div class="item-detail">
          <h4 class="item-detail-title">{{ item.name }}</h4>
          <p class="item-detail-price">
            <span class="item-detail-yen">&yen;</span>{{ item.price }}
            <span class="item-detail-origin">&yen; {{item.oldPrice}}</span>
          </p>
        </div>
        <div class="item-number">
            <span class="item-reduce"
                  @click="()=>{changeItemCartInfo(shopId,item._id,item,-1)}"
            > - </span>
          <span class="num"> {{ item.count || 0 }} </span>
          <span class="item-add"
                @click="()=> {changeItemCartInfo(shopId,item._id,item,1)}"
          > + </span>
        </div>
      </li>
    </ul>
    </div>
    <div class="check">
      <div class="icon">
        <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F30%2F20181230144326_yzofb.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627044177&t=2121c3f11e4c6102f097fea15a5ac1cb" alt=""
            @click="cartShow"
        >
        <p class="icon-tag"> {{ calculations.total }} </p>
      </div>
      <div class="check-info">
        总计: <span class="price"> &yen; {{ calculations.price }} </span>
      </div>
      <p class="check-btn">
        <router-link :to="{ path:`/orderConfirm/${shopId}`,}">去结算</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import {computed,ref} from "vue";
import {useStore} from 'vuex'
import {useRoute} from 'vue-router';
import {usecomCartEffect} from "../../effects/usecomCartEffect";
//购物车信息逻辑
const usecartEffect = (shopId)=>{
  //为零就不添加商品
  const { changeItemCartInfo,productList,calculations } = usecomCartEffect(shopId);

  const store = useStore();


  // 是否选中
  const changeCartItemClick = (shopId,productId)=>{
    store.commit('changeCartItemClick',{shopId,productId})
  }
  //清空购物车
  const clearCart = (shopId)=>{
    store.commit('clearCart',{shopId})
  }
  //全选按钮
  const setCartItemChecked=()=>{
    store.commit("setCartItemChecked",{shopId})
  }
  return {
   shopId,changeItemCartInfo,changeCartItemClick,
    clearCart,setCartItemChecked,calculations,productList
  }
}
//展示隐藏购物车
const toggleCartEffect = ()=>{
  const showCart = ref(false);
  const cartShow = ()=>{
    showCart.value = !showCart.value
  }
  return { showCart , cartShow}
}

export default {
  name: "Cart",
  setup(){
    const route = useRoute();
    const shopId = route.params.id;
    const { productList,
      changeItemCartInfo,changeCartItemClick,
      clearCart,setCartItemChecked,calculations
    } = usecartEffect(shopId);

    const { showCart , cartShow} =toggleCartEffect()

    return  { productList ,shopId, calculations,
      setCartItemChecked,showCart , cartShow,
      changeItemCartInfo,changeCartItemClick,clearCart}
  }
}
</script>

<style scoped lang="less">
  .all{
    display: flex;
    height: .52rem;
    line-height: .52rem;
    padding:0 .18rem;
    border-bottom: .01rem solid #F1F1F1;
    border-top: .01rem solid #F1F1F1;
    &-product{
      font-size:.14rem;
      .iconfont{
        vertical-align: -.02rem;
        color:#0091FF;
      }
    }
    .clear{
      flex: 1;
      font-size:.14rem;
      text-align: right;
    }
  }
  .product{
    overflow-y: scroll;
    flex: 1;
    background-color: #fff;
    &-item{
      position: relative;
      display: flex;
      padding:.12rem 0;
      margin:0 .16rem;
      border-bottom: .01rem solid #F1F1F1;
      .item-checked{
        font-size: .2rem;
        color:#0091FF;
        margin-top:.16rem;
        margin-right:.05rem
      }
      img{
        width: .46rem;
        height:.46rem;
        margin-right: .16rem;
      }
      .item-detail{
        overflow: hidden;
        color: #333;
        &-title{
          font-size: .14rem;
          line-height: .2rem;
          margin-bottom:.08rem;
        }
        &-sales{
          margin:.06rem 0;
          font-size: .12rem;
          line-height: .16rem;
        }
        &-price{
          font-size: .14rem;
          line-height: .2rem;
          color: #E93B3B;
        }
        &-yen{
          font-size: .12rem;
        }
        &-origin{
          font-size: .12rem;
          color: #999;
          text-decoration: line-through;
        }
      }
      .item-number{
        position: absolute;
        display: flex;
        right:0;
        bottom:.12rem;
        line-height: .16rem;
        .num{
          margin:0 .08rem;
          line-height: .2rem;
          font-size: .14rem;
        }
        .item-reduce,.item-add{
          display: inline-block;
          width: .2rem;
          height: .2rem;
          border-radius: 50%;
          text-align: center;
          font-size: .2rem;
          border:.01rem solid #666;
        }
        .item-add{
          background: #0091FF;
        }
      }
    }
  }
  .cart{
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    z-index: 1;
    background-color: #fff;
  }
  .check{
    display: flex;
    height: .49rem;
    border-top:.01rem solid #F1F1F1;
    background-color: #fff;
    .icon{
      position: relative;
      width: .84rem;
      img{
        display: block;
        width: .28rem;
        height: .26rem;
        margin:.12rem auto;
      }
      &-tag{
        position: absolute;
        top:0;
        left:.5rem;
        width: .3rem;
        height: .3rem;
        line-height: .3rem;
        text-align: center;
        color: #fff;
        font-size: .18rem;
        background-color: red;
        border-radius: 50%;
        transform: scale(.5);
      }
    }
    &-info{
      flex: 1;
      color:#333;
      line-height: .49rem;
      font-size: .12rem;
      .price{
        font-size: .18rem;
        padding-left:.05rem;
        color:red;
      }
    }
    &-btn{
      width: .98rem;
      line-height: .49rem;
      text-align: center;
      font-size: .14rem;
      color:#fff;
      background: #4FB0F9;
    }
  }
</style>
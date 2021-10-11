<template>
  <div class="content">
    <div class="aside">
      <ul class="item">
        <li
            :class="{'item-active':currentTab===item.tab}"
            v-for="item in categories"
            :key="item.name"
            @click="()=> tabClick(item.tab)"
        >{{ item.name }}</li>
      </ul>
    </div>
    <div class="product">
      <ul>
        <li class="product-item"
          v-for="item in list"
          :key="item._id"
        >
          <img :src="item.imgUrl" alt="">
          <div class="item-detail">
            <h4 class="item-detail-title">{{ item.name }}</h4>
            <p class="item-detail-sales">{{ item.sales }}</p>
            <p class="item-detail-price">
              <span class="item-detail-yen">&yen;</span>{{ item.price }}
              <span class="item-detail-origin">&yen; {{item.oldPrice}}</span>
            </p>
          </div>
          <div class="item-number">
            <span class="item-reduce"
              @click="()=>{changeItemCart(shopId,item._id,item,-1,shopName)}"
            > - </span>
            <span class="num">
              {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }}
            </span>
            <span class="item-add"
              @click="()=> {changeItemCart(shopId,item._id,item,1,shopName)}"
            > + </span>
          </div>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
import {get} from "../../utils/request";
import {reactive ,toRefs,watchEffect,ref} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {usecomCartEffect} from "../../effects/usecomCartEffect";
//常量拆分
const categories = [
  {name:'全部商品',tab:"all"},
  {name:'秒杀',tab:"seckill"},
  {name:'全部商品',tab:"fruit"}
];
// 列表内容相关
const useCurrentListEffect = (currentTab,shopId)=>{
  const content = reactive({list:[]});
  const getContentData = async ()=>{
    const result = await get(`./api/shop/${shopId}/products`,{
      tab:currentTab.value
    });
    //处理数据
    if(result?.errno === 0 && result?.data?.length){
     content.list = result.data;
    }
  }
  watchEffect(()=>{getContentData()});
  const {list} = toRefs(content)
  return { list }
}
// tab 切换的
const useTabEffect =()=>{
  const currentTab = ref(categories[0].tab);
  const tabClick = (tab)=>{
    currentTab.value = tab;
  }
  return { currentTab,tabClick}
}
//购物车
const useCartEffect = ()=>{
  const store = useStore();
  const { cartList ,changeItemCartInfo } = usecomCartEffect();
  const changeShopName = (shopId,shopName)=>{
    store.commit("changeShopName",{shopId,shopName})
  }
  const changeItemCart = (shopId,productId,item,num,shopName)=>{
    changeItemCartInfo(shopId,productId,item,num);
    changeShopName(shopId,shopName)
  }
  return { cartList,changeItemCart }
}

export default {
  name: "Content",
  props:['shopName'],
  setup(){
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab,tabClick} = useTabEffect();
    const { list } = useCurrentListEffect(currentTab,shopId);

    const { cartList,changeItemCart } = useCartEffect();

    return {
      currentTab,tabClick ,list,categories,cartList,shopId,changeItemCart
    }
  }
}
</script>

<style scoped lang="less">
    .content{
      display: flex;
      position: absolute;
      top:1.5rem;
      left:0;
      right:0;
      bottom:.5rem;
    }
    .aside{
      overflow-y: scroll;
      width: .76rem;
      height: 100%;
      background: #f5f5f5;
      .item{
        height: .4rem;
        text-align: center;
        line-height: .4rem;
        font-size:.14rem;
        color:#333;
        &-active{
          background-color: #fff;
        }
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
        img{
          width: .68rem;
          margin-right: .16rem;
        }
        .item-detail{
          overflow: hidden;
          color: #333;
          &-title{
            font-size: .14rem;
            line-height: .2rem;
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
</style>
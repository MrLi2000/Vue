<template>
  <div class="bottom">
    <p class="bottom-price">实付金额 <span> ¥{{ calculations.price }}</span></p>
    <p class="refer" @click="handleSubmitClick">提交订单</p>
  </div>
  <div class="mask" v-show="showConfirm">
    <div class="mask-content">
      <h3 class="mask-title">确认要离开收银台?</h3>
      <p class="mask-desc">请尽快完成支付，否则将被取消</p>
      <div class="mask-btns">
        <div class="mask-btn"
             @click="handleConfirmOrder(true)"
        >取消订单</div>
        <div class="mask-btn"
             @click="handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>
<script>
import {useRoute,useRouter} from "vue-router";
import {usecomCartEffect} from "../../effects/usecomCartEffect";
import {post} from "../../utils/request";
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: "Order",
  setup(){
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const showConfirm = ref(false);

    const shopId = parseInt(route.params.id,10);
    const { calculations ,shopName,productList} = usecomCartEffect(shopId);
    //取消确认订单
    const handleConfirmOrder = async (isCanceled)=>{
      const products = [];
      for (let i in productList.value  ) {
        const product = productList.value[i];
        products.push({id:product._id,num:product.count})
      }
      // console.log(products)
      try {
        const result = await post('/api/order',{
          addressId:1,
          shopId,
          shopName:shopName.value,
          isCanceled,
          products
        });
        // console.log(result)
        if(result?.errno === 0){
          store.commit("clearCartDate",shopId)
          router.push({name:'Home'});
        }
      }catch(e){
       //订单失败的信息
      }
    };
    const handleSubmitClick = ()=>{
      showConfirm.value = true;
    }
    return {
      calculations,handleConfirmOrder,handleSubmitClick,showConfirm
    }
  }
}
</script>
<style scoped lang="less">
.bottom{
  display: flex;
  position: absolute;
  left:0;
  bottom:0;
  width: 100%;
  height: .49rem;
  line-height: .49rem;
  font-size:.14rem;
  background-color: #fff;
  border-top: .01rem solid #f1f1f1;
  .bottom-price{
    flex: 1;
    padding-left:.18rem;
    span{
      color: #151515;
      font-size:.16rem;
      font-weight: 600;
    }
  }
  .refer{
    width: .98rem;
    color:#fff;
    text-align: center;
    background-color: #0091FF;
  }
}
.mask{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:rgba(0,0,0,.5);
  &-content{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 3rem;
    height: 1.56rem;
    background-color: #fff;
    border-radius: .04rem;
    text-align: center;
  }
  &-title{
    padding-top:.24rem;
    line-height: .26rem;
    font-size: .18rem;
  }
  &-desc{
    padding-top:.08rem;
    line-height: .2rem;
    font-size: .14rem;
  }
  &-btns{
    display: flex;
    margin:.24rem .58rem 0;
  }
  &-btn{
    flex:1;
    width: .8rem;
    line-height: .32rem;
    border: .01rem solid #4FB0F9;
    border-radius: .16rem;
  }
  &-btn:first-child{
    color:#4FB0F9;
    margin-right:.24rem;
  }
  &-btn:last-child{
    background: #4FB0F9;
    color:#fff;
  }

}
</style>
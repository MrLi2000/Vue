<template>
  <div class="shopping">
    <div class="search">
      <span class="search-back iconfont" @click="backClick">&#xe677;</span>
      <div class="search-content">
        <span class="search-icon iconfont">&#xe6bd;</span>
        <input type="search" placeholder="请输入商品名称搜索" class="search-input" >
      </div>
    </div>
    <ShopInfo
        :item="data.item"
        :hideBorder="true"
    ></ShopInfo>
    <Content :shopName="data.item.name"></Content>
    <Cart></Cart>
  </div>



</template>

<script>
import Cart from "./Cart.vue";
import Content from "./Content.vue";
import ShopInfo from "../../components/ShopInfo";
import {useRouter,useRoute} from 'vue-router'
import {get} from '../../utils/request'
import {reactive} from 'vue'

export default {
  name: "Shop",
  components:{ShopInfo,Content,Cart},
  setup(){
    const router = useRouter();
    const route = useRoute();

    const data = reactive({item:{}});
    const getItemData = async ()=>{
      const result = await get(`/api/shop/${route.params.id}`);
      // console.log(result);
      if (result?.errno === 0 && result?.data){
        data.item = result.data;
      }
    }
    getItemData();
    const backClick = ()=>{
      router.back();
    }
    return{backClick ,data}
  }
}
</script>

<style scoped lang="less">
  .shopping{
    padding:0 .18rem;
  }
  .search{
    display: flex;
    padding: .16rem 0;
    height: .32rem;
    &-back{
      width: .3rem;
      color:#B6B6B6;
      line-height: .32rem;
    }
    &-content{
      display: flex;
      flex: 1;
      background-color: #f5f5f5;
      border-radius: .16rem;
    }
    &-icon{
      width: .44rem;
      line-height: .32rem;
      color:#B7B7B7;
      text-align: center;
    }
    &-input{
      flex: 1;
      border:none;
      outline: none;
      background-color: transparent;
      font-size: .14rem;
      &::placeholder{
        color:#333;
      }
    }
  }
</style>
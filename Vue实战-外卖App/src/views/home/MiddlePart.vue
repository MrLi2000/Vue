<template>
    <!--附近店铺-->
    <div class="nearby-store">
        <h3 class="nearby-title">附近店铺</h3>
       <router-link :to="`/shop/${item._id}`"  v-for="item in nearbyList" :key="item._id">
         <ShopInfo
             :item="item"
         ></ShopInfo>
       </router-link>

    </div>
</template>

<script>
    import ShopInfo from "../../components/ShopInfo";
    import {get} from '../../utils/request'
    import {ref} from 'vue'
    // 附近店铺的信息
    const useNearbylist = ()=>{
      const nearbyList = ref([]);
      const getNearbyList = async ()=>{
        const result = await get('/api/shop/hot-list');
        if (result?.errno === 0 && result?.data?.length){
          console.log(result.data)
          nearbyList.value = result.data;
        }
      }
      return {getNearbyList,nearbyList}
    }
    //主体
    export default {
        name: "MiddlePart",
        components:{ShopInfo},
        setup(){
          const {getNearbyList,nearbyList} = useNearbylist()
          getNearbyList();
          return { nearbyList }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/colorall.less";
    //nearby outlet
    .nearby-store{
        padding-bottom: .5rem;
        .nearby-title{
            font-size: .18rem;
            line-height: .25rem;
            margin:.16rem 0 .14rem 0;
        }
        .store-info{
            display: flex;
            margin-bottom: .12rem;
            img{
                width: .56rem;
                height: .56rem;
            }
            .intro{
                flex: 1;
                margin-left:.16rem;
                border-bottom: .01rem solid @bd-color;
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
    }

</style>
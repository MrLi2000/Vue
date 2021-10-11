import {useStore} from "vuex";
import {computed} from 'vue';

// 购物车
export const usecomCartEffect = (shopId)=>{
    const store = useStore();
    const  cartList = store.state.cartList;
    //计算 总数量/价格 全选
    const calculations = computed(()=>{
        const  productList = cartList[shopId]?.productList;
        const result = {total:0,price:0,allCheck:true}
        if(productList){
            for (let i in  productList) {
                const product = productList[i];
                //数量
                result.total += product.count;
                //价格
                if (product.check){
                    result.price += (product.count*product.price);
                }
                //全选
                if (product.count && !product.check){
                    result.allCheck = false;
                }
            }
        }
        result.price = result.price.toFixed(2);
        return result
    })
    // 商品添加
    const changeItemCartInfo = (shopId,productId,productInfo,num)=>{
       store.commit('changeItemCartInfo',{shopId,productId,productInfo,num})
    }
    //购物车信息
    const productList = computed(()=>{
        const  productList = cartList[shopId]?.productList || {};
        const  notEmptyproductList = {};
        for (let i in productList) {
            const product = productList[i];
            if (product.count>0){
                notEmptyproductList[i] = product;
            }
        }
        return notEmptyproductList
    });
    // 商铺名称
    const shopName = computed(()=>{
        const shopName = cartList[shopId]?.shopName || "";
        return shopName
    })
    return { cartList ,changeItemCartInfo,productList,shopName,calculations}
}
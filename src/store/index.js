import {createStore} from 'vuex'
const setLocalStorage = (state)=>{
  const {cartList} = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
}

const getLocalCartList = ()=>{
  try {
    return JSON.parse(localStorage.cartList)
  }catch (e){
    return {}
  }
}

export default createStore({
  state: {
    /*cartList:{shopId:{shopName:"woerma"productList:{productId:{}}}}*/
    cartList:getLocalCartList(),
  },
  mutations: {
    changeItemCartInfo(state,payload){
      const {shopId,productId,productInfo} = payload;
      let shopInfo = state.cartList[shopId];

      if(!shopInfo){ shopInfo={shopName:"",productList:{}} };

      let product = shopInfo.productList[ productId ];
      if(!product){
        product = productInfo;
        product.count = 0;
      }
      product.count =  product.count + payload.num;
      if(payload.num > 0 ){ product.check = true}
      if(product.count < 0 ){ product.count = 0;}
      //获取id,存入store
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo; // 整体信息存回
      setLocalStorage(state);
    },
    changeCartItemClick(state,payload){
      const {shopId,productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
      setLocalStorage(state)
    },
    clearCart(state,payload){
      const {shopId} = payload;
      state.cartList[shopId].productList = {};

    },
    setCartItemChecked(state,payload){
      const {shopId} = payload;
      const products = state.cartList[shopId].productList;
      if (products){
        for(let key in products){
          const product = products[key];
          product.check = true;
        }
      }
      setLocalStorage(state)
    },
    // 改变商铺名字
    changeShopName(state,payload){
      const {shopId,shopName} = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName:"",productList:{}
      }
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalStorage(state)
    },
    //订单完成之后的id清除
    clearCartDate(state,shopId){
      state.cartList[shopId].productList = {}
    }

  },

})

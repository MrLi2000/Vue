<template>
  <div class="wrap">
    <TopArea></TopArea>
    <ProductList></ProductList>
    <Order></Order>
  </div>
</template>

<script>
import TopArea from "./TopArea";
import ProductList from "./ProductList";
import Order from "./Order";

export default {
  name: "OrderConfirm",
  components:{TopArea,ProductList,Order},

}
</script>

<style scoped lang="less">
.wrap{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: #eee;
}
</style>
<template>
    <!--content-->
    <div id="content">
        <TopPart></TopPart>
        <MiddlePart></MiddlePart>
    </div>
    <FooterPart></FooterPart>
</template>

<script>
// @ is an alias to /src
import TopPart from "./TopPart";
import MiddlePart from "./MiddlePart";
import FooterPart from "./FooterPart";

export default {
  name: 'Home',
    components:{TopPart,MiddlePart,FooterPart}
}
</script>
<style lang="less" scoped>
    @import "../../assets/css/colorall.less";
    // content less
    #content{
        position: relative;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        padding:0 .18rem;


    }


</style>

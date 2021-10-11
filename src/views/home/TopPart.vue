<template>
    <!--adress-->
    <div class="top-address">
        <i class="iconfont">&#xe610;</i>
        <p class="address">北京理工大学国防科技园2号楼10层</p>
        <i class="iconfont">&#xe60b;</i>
    </div>
    <!--search-->
    <div class="search">
        <i class="iconfont">&#xe6bd;</i>
        <input type="search" placeholder="山姆会员商店优惠商品" class="ipt">
    </div>
    <!--action  img-->
    <div class="action-img">
        <img src="../../assets/img/news/banner.jpg" alt="">
    </div>
    <!--icon menu-->
    <div class="classify">
        <ul class="classify-icon">
            <li class="item"
                v-for="(item,index) in iconList"
                :key="index"
            >
                <img :src="item.imgUrl" alt="">
                <p class="desc">{{item.imgTitle}}</p>
            </li>
        </ul>
    </div>
    <!--gap-->
    <div class="gap"></div>
</template>

<script>
    export default {
        name: "TopPart",
        setup(){
            const iconList = [
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"},
                {imgUrl:require("../../assets/img/icon/close.png"),imgTitle:"超市便利"}
            ];
            return {
                iconList
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/colorall.less";
    // address
    .top-address{
        display: flex;
        justify-content: space-between;
        padding: .16rem 0;
        font-size: .16rem;
        color:#333;
        .address{
            flex: 1;
            margin-left:.09rem;
            line-height: .22rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .iconfont{
            line-height: .22rem;
        }
    }
    //search
    .search{
        overflow: hidden;
        position: relative;
        height: .32rem;
        background-color: pink;
        border-radius: .16rem;
        line-height: .32rem;
        margin-bottom: .12rem;
        .ipt{
            height: .32rem;
            width: 100%;
            background-color: #F5F5F5;
            border:0;
            outline: none;
            text-indent: .44rem;
        }
        .ipt::-webkit-input-placeholder{
            font-size: .14rem;
        }
        .iconfont{
            position: absolute;
            left: .16rem;
            font-size: .16rem;
            line-height: .32rem;
        }
    }
    //action-img
    .action-img{
        height: .86rem;
        margin-bottom:.16rem;
        img{
            width: 100%;
        }
    }
    //classify  分类
    .classify{
        .classify-icon{
            display: flex;
            flex-wrap: wrap;
            text-align: center;
            li.item{
                width: 20%;
                img{
                    width: .4rem;
                }
                .desc{
                    color:@font-color;
                    margin:.06rem 0 .16rem 0;
                }

            }

        }
    }
    //gap
    .gap{
        height: .1rem;
        margin:0 -.18rem;
        background-color: @bg-color;
    }
</style>
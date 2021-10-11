<template>
    <!--footer-->
    <div id="footer">
        <ul class="footer-wrap">
            <li
                :class="{'item':true, 'active':index === 0}"
                v-for="(item,index) in footerList"
                :key="index"
            >
                <router-link :to="item.to">
                  <p class="iconfont" v-html="item.icon"/>
                  <p class="title">{{item.text}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "FooterPart",
        setup(){
            const footerList =[
                {icon:"&#xe665;",text:"首页",to:{name:'Home'}},
                {icon:"&#xe7e5;",text:"购物车",to:{name:'CartList'}},
                {icon:"&#xe61e;",text:"订单",to:{name:'Home'}},
                {icon:"&#xe62e;",text:"我的",to:{name:'Home'}}
            ];
            return {
                footerList
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/colorall.less";
    // footer  less
    #footer{
        position: fixed;
        left:0;
        bottom:0;
        width: 100%;
        height: .5rem;
        padding:0 .18rem;
        border:.01rem solid #F1F1F1;
        box-sizing: border-box;
        background-color: #fff;
        .footer-wrap{
            display: flex;
            width: 100%;
            .item{
                height: .49rem;
                flex: 1;
                text-align: center;
                a{
                  color: #333;
                    .iconfont{
                      margin:.07rem 0 .02rem 0;
                    }
                    .title{
                      font-size: 20px;
                      line-height: .14rem;
                      transform: scale(.5,.5);
                      transform-origin: center top;
                    }
                  }

                }
          .active >a{
            color: blue;
          }
        }
    }
</style>
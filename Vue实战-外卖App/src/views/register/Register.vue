<template>
   <div class="login">
      <img src="../../assets/img/user/user.png" alt="" class="user">
      <input type="tel" class="tel" placeholder="请输入手机号" v-model="username">
      <input type="password" class="pwd" placeholder="请输入密码" v-model="password">
      <input type="password" class="pwd2" placeholder="确认密码" v-model="againPassword">
      <input type="button" value="注册" class="button" @click="handleRegister">
      <p class="registry" @click="handleLoginClick">已有账号去登陆</p>
	  <Dialog v-if="show" :message="toMassage"></Dialog>
   </div>
</template>

<script>
   import {useRouter} from 'vue-router'
   import axios from 'axios'
   import {reactive,toRefs} from "vue";
   //先引入vue,然后在引入我们自己的
   import {post} from "../../utils/request.js"
   import Dialog ,{ useDialogEffect }from "../../components/Dialog"
   
   // 注册逻辑
   const userRegisterEffect = (showDialog)=>{
	   const data = reactive({	username:"",	password:"",againPassword:""});
	   const router = useRouter();
	   const handleRegister = async ()=>{
	      try {
	   	   const result = await post('/api/user/register',{
	   	       username:data.username,password:data.password
	   	   });
	   	   
	   	   if(result?.errno === 0){
	   	       localStorage.isLogin = true;
	   	       router.push({name:'Home'});
	   	   }else{
	   		   showDialog("登陆失败了")
	   	   }
	      }catch(e){
	   	   showDialog("请求失败了")
	      }
	   };
	   const {username,password,againPassword} = toRefs(data);
	   return {username,password,againPassword,handleRegister}
   }

    export default {
        name: "Register",
		components:{Dialog},
        setup(){
           const router = useRouter();
		   const {show,toMassage,showDialog} = useDialogEffect()
		   const {username,password,againPassword,handleRegister} = userRegisterEffect(showDialog)
           const handleLoginClick =()=>{
              router.push({name:"Login"})
           };
           return{
              handleLoginClick,username,password,
			  againPassword,handleRegister,show,toMassage
           }
        }
    }

</script>

<style scoped lang="less">
   .login{
      padding:1.2rem .4rem 0;
      text-align: center;
      .user{
         width: .66rem;
         margin-bottom: .4rem;
      }
      input{
         display: block;
         width: 100%;
         height: .48rem;
         background-color: #F9F9F9;
         font-size:.16rem;
         border: .01rem solid rgba(0,0,0,0.10);
         border-radius: .06rem;
         outline: none;
      }
      .pwd{
         margin-top:.16rem;
      }
      .pwd2{
         margin:.16rem 0 .32rem 0;
      }
      .registry{
         margin-top: .16rem;
         font-size: .14rem;
         color: #777;
      }
      .pwd,.tel,.pwd2{
         text-indent: .16rem;
      }
      .button{
         color: #fff;
         font-size: .16rem;
         line-height: .24rem;
         background: #0091FF;
         box-shadow: 0 .04rem ,08rem 0 rgba(0,145,255,0.32);
         border-radius: .04rem;
      }
   }

</style>
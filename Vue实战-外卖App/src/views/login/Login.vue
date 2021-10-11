<template>
    <div class="login">
        <img src="../../assets/img/user/user.png" alt="" class="user">
        <input type="tel" class="tel" placeholder="请输入手机号" v-model="username">
        <input type="password" class="pwd" placeholder="请输入密码" v-model="password">
        <input type="button" value="登录" class="button" @click="handleLogin">
        <p class="registry" @click="handleRegisterClick">立即注册</p>
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
	//登录逻辑
	const userLoginEffect = ( showDialog )=>{
		const data = reactive({
			username:"",
			password:"",
		});
		const router = useRouter();
		const handleLogin = async ()=>{
		   try {
			   const result = await post('/api/user/login',{
			       username:data.username,password:data.password
			   });
         console.log(result?.errno)
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
		const {username,password} = toRefs(data);
		return {handleLogin,username,password}
	}
	//数据
    export default {
        name: "Login",
		components:{Dialog},
        setup(){
			const router = useRouter();
			const {show,toMassage,showDialog} = useDialogEffect()
			const {handleLogin,username,password} = userLoginEffect(showDialog)
			
			const handleRegisterClick = ()=>{
				 router.push({name:'Register'});
			}
            return {
                handleLogin,username,password ,show,toMassage,handleRegisterClick
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
            margin:.16rem 0 .32rem 0;
        }
        .registry{
            margin-top: .16rem;
            font-size: .14rem;
            color: #777;
        }
        .pwd,.tel{
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
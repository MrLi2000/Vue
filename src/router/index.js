import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/home/Home";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login'),
    beforeEnter(to,from,next){
      const { isLogin } = localStorage;
      isLogin?  next({name:"Home"}): next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue')
  },
 {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop')
 },
{
    path: '/cartList',
    name: 'CartList',
    component: () => import('../views/cartList/CartList.vue')
},
{
    path: '/orderConfirm/:id',
    name: 'OrderConfirm',
    component: () => import('../views/order/OrderConfirm')
},


];

const router = createRouter({
 history:createWebHistory(),
  routes
});

router.beforeEach((to,from,next)=>{
    const { isLogin } = localStorage;
    const isLoginOrRegister = (to.name === 'Login' || to.name === 'Register');
    (isLogin || isLoginOrRegister)?next(): next({name:"Login"});
});

export default router

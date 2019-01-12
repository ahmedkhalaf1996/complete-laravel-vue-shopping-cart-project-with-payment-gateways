import Home from './components/Home.vue';
import Signin from './components/auth/Signin.vue';
import Signup from './components/auth/Signup.vue';
import Logout from './components/auth/Logout.vue';
import Profile from './components/auth/profile/Profile.vue';
import App from './components/app/App.vue';
import ShopCart from './components/shop/ShopCart.vue';
import Admin from './components/admin/Admin.vue';
import Product from './components/admin/Product.vue';
import NewProduct from './components/admin/NewProduct.vue';

import UserControl from './components/admin/UserControl/UserControl.vue';
import NewUser from './components/admin/UserControl/NewUser.vue';



export const routes = [

    {path:'/', component: Home },

    {path:'/Admin', component: Admin , meta: {
      requiresAdmin: true,
    }},

    {path:'/NewProduct', component: NewProduct , meta: {
      requiresAdmin: true,
    }},

    {path:'/UserControl', component: UserControl , meta: {
      requiresAdmin: true,
    }},

    {path:'/NewUser', component: NewUser , meta: {
      requiresAdmin: true,
    }},


   {path:'/App', component: App},

   // requireVisitor
   {path:'/Signin', component: Signin  , meta: {
   	requireVisitor: true,
   } },

   {path:'/Signup', component: Signup  , meta: {
   	requireVisitor: true,
   } },
   // requiresAuth
   {path:'/Logout', component: Logout  , meta: {
   	requiresAuth: true,
   } },
   
   {path:'/Profile', component: Profile ,   meta: {
   	requiresAuth: true,
   } },


   {path:'/ShopCart', component: ShopCart  , meta: {
   	requiresAuth: true,
   } },

];





// const UserStart = resolve => {
//     require.ensure(['./components/user/UserStart.vue'], () => {
//         resolve(require('./components/user/UserStart.vue'));
//     }, 'user');
// };
// const UserEdit = resolve => {
//     require.ensure(['./components/user/UserEdit.vue'], () => {
//         resolve(require('./components/user/UserEdit.vue'));
//     }, 'user');
// };
// const UserDetail = resolve => {
//     require.ensure(['./components/user/UserDetail.vue'], () => {
//         resolve(require('./components/user/UserDetail.vue'));
//     }, 'user');
// };

// export const routes = [
//     {
//         path: '', name: 'home', components: {
//         default: Home,
//         'header-top': Header
//     }
//     },
//     {
//         path: '/user', components: {
//         default: User,
//         'header-bottom': Header
//     }, children: [
//         {path: '', component: UserStart},
//         {
//             path: ':id', component: UserDetail, beforeEnter: (to, from, next) => {
//             console.log('inside route setup');
//             next();
//         }
//         },
//         {path: ':id/edit', component: UserEdit, name: 'userEdit'}
//     ]
//     },
//     {path: '/redirect-me', redirect: {name: 'home'}},
//     {path: '*', redirect: '/'}
// ];
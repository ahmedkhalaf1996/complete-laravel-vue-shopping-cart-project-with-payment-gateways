

window.Vue = require('vue');

import Vuex from 'vuex';

import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import { routes } from './routes';
import store from './store';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate)



Vue.use(VueRouter);



const router = new VueRouter({
	mode: 'history',
	routes: routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: '/Signin',
      })
    } else {
      next()
    }
  }  else if (to.matched.some(record => record.meta.requireVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        path: '/Profile',
      })
    } else {
      next()
    }
  }
    if (to.matched.some(record => record.meta.requiresAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAdmin) {
      next({
        path: ' ',
      })
    } else {
      next()
    }
  }  
   else {
    next() // make sure to always call next()!
  }
})



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('app', require('./App.vue'));

const app = new Vue({
    el: '#app',
    router: router,
    store:store,
    render: h => h(App)
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import AllPosts from './components/AllPosts';
import ManagePosts from './components/ManagePosts';
import FrontPage from './components/FrontPage';

Vue.use(VueRouter)
Vue.use(VueResource)

var axios = require('axios')

const routes = [
    { path : '/home', alias: '/', component: FrontPage },
    { path : '/manage-posts', component: ManagePosts },
    { path : '/archive', component: AllPosts }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
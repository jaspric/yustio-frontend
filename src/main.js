// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import AllPosts from './components/AllPosts';
import ManagePosts from './components/ManagePosts';

Vue.use(VueRouter)
Vue.use(VueResource)

var axios = require('axios')

const routes = [
    { path : '/home', alias: '/', component: AllPosts },
    { path : '/manage-posts', component: ManagePosts }
]

const router = new VueRouter({
    routes
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

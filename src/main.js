// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import routes from '@/routes';
import { Button, Select } from 'element-ui'
import globalComponents from './component'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

Vue.config.productionTip = false

globalComponents(Vue)

// 有问题
// Vue.directive("count-down", {
//   bind: function (el, binding, vnode) {
//     let count = parseInt(el.getAttribute('data-count'))
//     console.log(this)
//     if (this.timer) {
//       clearInterval(this.timer)
//       this.timer = null
//     }
//     // 大家可以推测下这里的 this 指什么？
//     this.timer = setInterval(function () {
//       if (count <= 0) {
//         clearInterval(this.timer)
//         this.timer = null
//       } else {
//         count--
//         el.innerHTML = count
//         el.setAttribute('data-count', count)
//       }
//     }, 1000)
//   }
// })

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  // data(){
  //   return {
  //     // 当前路由
  //     currentRoute: window.location.pathname,
  //   };
  // },
  // computed: {
  //   ViewComponent() {
  //     const currentView = routes[this.currentRoute];
  //     return (
  //       currentView
  //         ? require('./pages/' + currentView + '.vue')
  //         : require('./pages/404.vue')
  //     );
  //   },
  // },
  // render(h) {
  //   // 因为组件是以 es module 的方式引入的，
  //   // 此处必须使用 this.ViewComponent.default 属性作为参数
  //   return h(this.ViewComponent.default);
  // },
  // created () {
  //   window.location.hash = window.location.hash ? window.location.hash : '#/';
  //   this.currentRoute = window.location.hash;
  // }
  template: '<App/>'
})

// window.addEventListener('popstate', () => {
//   console.log('popstate');
//   app.currentRoute = window.location.pathname;
// });

// window.addEventListener('hashchange', () => {
//   console.log('hashchange');
//   app.currentRoute = window.location.hash;
// })
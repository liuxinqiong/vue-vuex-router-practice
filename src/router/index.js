import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import finder from '@/pages/finder'
// import task from '@/pages/task'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/finder',
      name: 'finder',
      component: finder
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('@/pages/task'), // 组件懒加载
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/vuex',
      name:'vuex',
      component: () => import('@/pages/vuex')
    },
    {
      path:'/drag',
      name:'drag',
      component: () => import('@/pages/draglist.vue')
    }
  ],
  scrollBehavior(to,from,savedPosition){
    console.log(to,from,savedPosition);
  }
})

router.beforeEach((to,from,next) => {
  // console.log(to)
  // console.log(to.matched)
  next()
})

export default router

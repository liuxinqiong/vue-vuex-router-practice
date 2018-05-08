import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import finder from '@/pages/finder'
// import task from '@/pages/task'

Vue.use(Router);

export default new Router({
  routes: [{
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
      component: () => import('@/pages/task') // 组件懒加载
    }]
})

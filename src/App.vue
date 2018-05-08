<template>
  <div id="app">
    <img src="./assets/logo.png">

    <button @click="test">{{test2.text}}</button>

    <todo-list :todos="todos">
      <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
      <template slot-scope="slotProps">
        <!-- 为待办项自定义一个模板，-->
        <!-- 通过 `slotProps` 定制每个待办项。-->
        <span v-if="slotProps.todo.isComplete">✓</span>
        {{ slotProps.todo.text }}
      </template>
    </todo-list>

    <tree-folder :folder='folder'></tree-folder>

    <router-view/>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
import TreeFolder from '@/components/tree-folder.vue'
export default {
  name: 'App',
  components: { TodoList,TreeFolder },
  data() {
    return {
      todos: [
        {
          id: 1,
          text: '1',
          isComplete:true
        },
        {
          id: 2,
          text: '2'
        },
        {
          id: 3,
          text: '3',
          isComplete:true
        },
        {
          id: 4,
          text: '4'
        }
      ],
      folder:{
        name:'aaa',
        children:[
          {
            name:'bbb',
            children:[{
              name:'ccc',
              children:[]
            }]
          }
        ]
      }
    }
  },
  created: function () {
    console.log(this)
  },
  beforeCreate() {
    console.log(123)
  },
  methods: {
    test: () => {
      console.log(this)
    }
  },
  computed: {
    test2: function () {
      console.log(this)
      return { text: 'TEST' }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

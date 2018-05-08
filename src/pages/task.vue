<template>
  <todo-list :todos="todos">
    <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
    <template slot-scope="slotProps">
      <!-- 为待办项自定义一个模板，-->
      <!-- 通过 `slotProps` 定制每个待办项。-->
      <span v-if="slotProps.todo.isComplete">✓</span>
      {{ slotProps.todo.text }}
    </template>
  </todo-list>
</template>

<script>
  import TodoList from '@/components/TodoList.vue'

  export default {
    components: {
      TodoList
    },
    data() {
      return {
        todos: [{
            id: 1,
            text: '1',
            isComplete: true
          },
          {
            id: 2,
            text: '2'
          },
          {
            id: 3,
            text: '3',
            isComplete: true
          },
          {
            id: 4,
            text: '4'
          }
        ]
      }
    },
    created(){
      console.log(this.$router);
      console.log(this.$route);
    }
  }

</script>

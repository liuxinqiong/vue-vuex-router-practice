<template>
  <div>
    <button @click="add">TEST</button>
    <p>{{count}}</p>
  </div>
</template>

<script>
  import {
    ADD_COUNT
  } from '@/vuex/mutation-types.js'
  export default {
    computed:{
        count(){
            return this.$store.state.a.count
        }
    },
    methods: {
      add() {
        this.$store.commit(`a/${ADD_COUNT}`)
      }
    }
  }
</script>

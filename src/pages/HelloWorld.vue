<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showNotice">Notice</button>
    <button @click="showNotice1">Notice</button>
    <anchored-heading :level="level">标题3</anchored-heading>
  </div>
</template>

<script>
  import notice from '../components/notice'
  import notice1 from '../components/notice1'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        level: 3
      }
    },
    methods:{
      showNotice(){
        notice.info('hahahahahahha')
      },
      showNotice1(){
        notice1.info('hahahahahahha')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>

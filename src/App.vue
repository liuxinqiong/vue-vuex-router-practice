<template>
  <div id="app">
    <div class="container">
      <div class='leftPane'>
        <img class="logo" src="./assets/logo.png">
        <ul>
          <li><router-link to='/'>hello world</router-link></li>
          <li><router-link to='/finder'>资源管理</router-link></li>                    
          <li><router-link to='/task'>任务</router-link></li>
          <li><router-link to='/vuex'>vuex test</router-link></li>          
        </ul>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        
      }
    },
    beforeCreate() {
      // console.log(this)
    },
    created: function () {
      console.log(this.$router.options.routes)
    },
    methods: {
      test: () => {
        // console.log(this)
      }
    },
    computed: {
      test2: function () {
        console.log(this)
        return {
          text: 'TEST'
        }
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

  .logo{
    width: 80px
  }

  .container {
    display: flex;
  }

  .leftPane {
    width: 120px;
  }

  .content {
    flex: 1;
  }

  .router-link-active{
    background-color: yellow
  }
</style>

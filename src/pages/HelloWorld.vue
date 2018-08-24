<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showNotice">Notice</button>
    <button @click="showNotice1">Notice</button>
    <anchored-heading :level="level">标题3</anchored-heading>
    <toggle>
      <div slot-scope="{ on, setOn, setOff }" class="container">
        <button @click="click(setOn)" class="button">Blue pill</button>
        <button @click="click(setOff)" class="button isRed">Red pill</button>
        <div v-if="buttonPressed" class="message">
          <span v-if="on">It's all a dream, go back to sleep.</span>
          <span v-else>I don't know how far the rabbit hole goes, I'm not a rabbit, neither do I measure holes.</span>
        </div>
      </div>
    </toggle>
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
        level: 3,
        buttonPressed: false,
      }
    },
    methods: {
      showNotice() {
        notice.info('hahahahahahha')
      },
      showNotice1() {
        notice1.info('hahahahahahha')
      },
      click(fn) {
        this.buttonPressed = true
        fn()
      },
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

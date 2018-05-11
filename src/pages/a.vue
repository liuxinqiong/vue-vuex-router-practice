<template>
  <layout>
      {{msg}}
  </layout>
</template>

<script>
import Layout from '@/layout';

export default {
  name: 'testA',
  components: {
    Layout,
  },
  data(){
    return {
      msg: 'Here is a page',
    };
  }
  // ...
};
</script>
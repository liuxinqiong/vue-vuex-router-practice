<template>
  <div class="container">
    <ul>
      <li>
        <!-- <a :class="{active: $root.currentRoute === '/a'}" href="/a">a</a> -->
        <my-router-link href="#/a">a</my-router-link>
      </li>
      <li>
        <my-router-link href="#/b">b</my-router-link>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>
<script>
  import MyRouterLink from '@/components/my-router-link';
  export default {
    name: 'Layout',
    components: {
      MyRouterLink
    }
  };

</script>
<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 30px;
    background: #f9f7f5;
  }

  a.active {
    color: #42b983;
  }

</style>

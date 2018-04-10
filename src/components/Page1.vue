<template>
  <div class="container">
      <div class='leftPane'>
          左侧
      </div>
      <div class="content">
          你好
      </div>
  </div>
</template>

<script>
import Com1 from './Com1.vue'
import Com2 from './Com2.vue'
import Com3 from './Com3.vue'
export default {}
</script>

<style scoped>
.container {
  display: flex;
}
.leftPane {
  width: 60px;
}
.content {
  flex: 1;
}
</style>


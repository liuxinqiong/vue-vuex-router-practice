<template>
  <a
    :href="href"
    :class="{active: isActive}"
    @click="go"
  >
    <slot></slot>
  </a>
</template>
<script>
import routes from '@/routes';

export default {
  name: 'my-router-link',
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.href === this.$root.currentRoute;
    },
  },
  methods: {
    go(e) {
      // 阻止默认跳转事件
      e.preventDefault();
      // 修改父级当前路由值
      this.$root.currentRoute = this.href;
      window.history.pushState(
        null,
        routes[this.href],
        this.href,
      );
    },
  },
};
</script>
<template>
  <div class="pnf">
    <span>Page not found</span>
    <RouterLink :to="{name: 'MainPage'}">To home.</RouterLink>
  </div>
</template>

<script>
  export default {
    name: "PageNotFound"
  }
</script>

<style lang="scss">
  @import "PageNotFound";
</style>
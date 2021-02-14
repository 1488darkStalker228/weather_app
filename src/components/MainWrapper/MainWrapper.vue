<template>
  <div class="main-wrapper">
    <RouterView :key="$route.fullPath"/>
  </div>
</template>

<script>
  export default {
    name: "MainWrapper"
  }
</script>

<style lang="scss">
  @import "./MainWrapper";
</style>
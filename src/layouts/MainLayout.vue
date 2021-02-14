<template>
  <div class="main-layout">
    <Header/>
    <RouterView/>
  </div>
</template>

<script>
  import Header from "../components/Header/Header";

  export default {
    name: "MainLayout",
    components: {
      Header
    }
  }
</script>

<style lang="scss">
  @import "./MainLayout";
</style>
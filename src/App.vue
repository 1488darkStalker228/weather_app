<template>
  <div id="app">
    <MainWrapper/>
  </div>
</template>

<script>
  import MainWrapper from "./components/MainWrapper/MainWrapper";

  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      MainWrapper
    }
  }
</script>

<style lang="scss">
  @import "./GlobalStyles/null.scss";
  @import "./GlobalStyles/GlobalStyles.scss";

  #app {
    background: url("./assets/images/background-night.jpg") no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 $padding * 2;
    color: #FFFFFF;
    @media (max-width: 767px) {
      padding: 0;
    }
  }
</style>

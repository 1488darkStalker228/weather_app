<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <div
                class="header__burger"
                @click="showSidebar"
        >
          <BurgerMenu/>
        </div>
        <HeaderSidebar
                :class="{'sidebar_open': isVisible}"
                ref="headerSidebar"
        />
        <nav class="header__nav">
          <ul class="header__list">
            <li class="header__item">
              <RouterLink
                      :to="{name: 'MainPage'}"
                      active-class="header__link_active"
                      exact
              >
                Main
              </RouterLink>
            </li>
            <li class="header__item">
              <RouterLink
                      :to="{name: 'Favorites'}"
                      active-class="header__link_active"
              >
                Favorites
              </RouterLink>
            </li>
            <li class="header__item">
              <RouterLink
                      class="header__link"
                      :to="{name: 'AllCities'}"
                      active-class="header__link_active"
              >
                All cities
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div class="header__logo">
          <RouterLink :to="{path: '/'}">Weather App</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import BurgerMenu from "../../assets/svg/BurgerMenu";
  import HeaderSidebar from "./HeaderSidebar/HeaderSidebar";

  export default {
    name: "Header",
    components: {
      BurgerMenu,
      HeaderSidebar
    },

    data() {
      return {
        isVisible: false
      }
    },

    methods: {
      hideSidebar(e) {
        if (e.target.className.includes('sidebar_open') || e.target.className.includes('sidebar__link')) {
          this.isVisible = false;
          this.$refs.headerSidebar.$el.firstElementChild.classList.remove('sidebar__body_open');
        }
      },

      showSidebar() {
        this.isVisible = true;
        this.$refs.headerSidebar.$el.firstElementChild.classList.add('sidebar__body_open');
      }
    },

    mounted() {
      window.addEventListener('click', this.hideSidebar);
    },

    beforeDestroy() {
      window.removeEventListener('click', this.hideSidebar);
    }
  }
</script>

<style lang="scss">
  @import "./Header";
</style>
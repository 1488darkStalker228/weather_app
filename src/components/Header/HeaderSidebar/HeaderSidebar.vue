<template>
  <div class="sidebar">
    <div class="sidebar__body">
      <nav class="sidebar__nav">
        <ul>
          <li class="sidebar__item">
            <RouterLink
                    class="sidebar__link"
                    :to="{name: 'MainPage'}"
                    active-class="header__link_active"
                    exact
            >Main
            </RouterLink>
          </li>
          <li class="sidebar__item">
            <RouterLink
                    class="sidebar__link"
                    :to="{name: 'Favorites'}"
                    active-class="header__link_active"
            >Favorites
            </RouterLink>
          </li>
          <li class="sidebar__item">
            <RouterLink
                    class="sidebar__link"
                    :to="{name: 'AllCities'}"
                    active-class="header__link_active"
            >All cities
            </RouterLink>
          </li>
        </ul>
        <div class="sidebar__social-icons">
          <Twitter/>
          <Vk/>
          <Instagram/>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import Instagram from "../../../assets/svg/Instagram.vue";
  import Vk from "../../../assets/svg/Vk.vue";
  import Twitter from "../../../assets/svg/Twitter.vue";

  export default {
    name: "HeaderSidebar",

    components: {
      Vk,
      Instagram,
      Twitter
    }
  }
</script>

<style lang="scss">
  @import "HeaderSidebar";
</style>
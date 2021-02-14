<template>
  <RouterLink
          class="city-item__link"
          :to="{path: `cities/${city.id}`}"
  >
    <div class="city-item">
      <div class="city-item__name">{{city.name}}</div>
      <div class="city-item__icon-wrap">
        <Temp
                class="city-item__temp"
                :data="city"
                v-if="city.main"
        />
        <button
                class="city-item__compare-btn"
                @click.prevent="toggleToComparison"
                :class="{'city-item__compare-btn_active' : isActiveCompare}"
        >Compare
        </button>
        <div
                class="city-item__compare-icon"
                @click.prevent="toggleToComparison"
                :class="{'city-item__compare-icon_active' : isActiveCompare}"
        >
          <Compare/>
        </div>
        <div
                class="city-item__add-fav"
                @click.prevent="toggleFavorites"
                ref="addFav"
        >
          <StarFavorites/>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
  import Compare from "../../assets/svg/Compare";
  import StarFavorites from "../../assets/svg/StarFavorites";
  import Temp from "../Temp/Temp";
  import {mapGetters} from 'vuex';

  export default {
    name: "CityItem",

    components: {
      Temp,
      Compare,
      StarFavorites
    },

    props: {
      city: {
        required: true
      }
    },

    data() {
      return {
        isActiveCompare: false
      }
    },

    methods: {
      toggleFavorites(e) {
        const cities = JSON.parse(localStorage.getItem('cities'));

        if (!cities || cities.length < 20) {
          this.$refs.addFav.classList.toggle('city-item__add-fav_active');
          this.$emit('toggle-favorites', this.city);
        } else {
          if (!e.target.className.includes('city-item__add-fav_active')) return;
          else {
            this.$refs.addFav.classList.toggle('city-item__add-fav_active');
            this.$emit('toggle-favorites', this.city);
          }
        }
      },

      toggleToComparison(e) {
        if (this.COMPARE_ARR.length < 2 && !e.target.className.includes('_active')) {
          this.$emit('toggle-to-comparison', this.city);
          this.isActiveCompare = true;
        }
        else {
          if (!e.target.className.includes('_active')) return;
           else {
            this.$emit('toggle-to-comparison', this.city);
            this.isActiveCompare = false;
          }
        }
      }
    },

    computed: {
      ...mapGetters([
        'COMPARE_ARR'
      ]),
    },

    watch: {
      COMPARE_ARR() {
        if (!this.COMPARE_ARR.length) {
          this.isActiveCompare = false;
        }
      }
    },

    mounted() {
      const cities = JSON.parse(localStorage.getItem('cities'));

      if (cities) {
        cities.forEach(favCity => {
          if (favCity.id === this.city.id) {
            this.$refs.addFav.classList.add('city-item__add-fav_active');
          }
        });
      }

      if (this.COMPARE_ARR.length) {
        this.COMPARE_ARR.forEach(compCity => {
          if (compCity.id === this.city.id) {
            this.isActiveCompare = true;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "./CityItem.scss";
</style>
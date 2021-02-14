<template>
  <main class="cities scroll-style">
    <div class="container">
      <div class="cities__header">
        <form
                class="cities__search"
                @submit.prevent
        >
          <input
                  class="cities__input"
                  type="text"
                  placeholder="search for cities..."
                  v-model="searchValue"
          >
          <Loupe v-if="!searchValue"/>
          <div
                  class="cities__clear-input"
                  v-if="searchValue"
                  @click="searchValue = ''"
          />
        </form>
      </div>
      <div class="cities__body">
        <h1
                class="cities__popular title"
                v-if="!searchValue"
        >
          Popular cities
        </h1>

        <div
                class="cities__compare-btn-wrap"
                :class="{'cities__compare-btn-wrap_show' : COMPARE_ARR.length === 2}"
        >
          <RouterLink
                  class="cities__compare-link btn btn-compare"
                  :to="{name: 'Compare'}"
          >
            Show comparison
          </RouterLink>

          <div
                  class="cities__clear-compare"
                  @click="CLEAR_STATE"
          >
            <Close/>
          </div>
        </div>

        <div class="cities__item-wrap">
          <Loader v-if="!popularCities.length"/>
          <CityItem
                  v-for="(city, index) of citiesList"
                  :key="city.name + index"
                  :city="city"
                  @toggle-favorites="toggleFavorites"
                  @toggle-to-comparison="toggleToComparison"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import popularCities from "../../cities/popularCities";
  import allCities from "../../cities/allCities";
  import CityItem from "../CityItem/CityItem";
  import Loupe from "../../assets/svg/Loupe";
  import Close from "@/assets/svg/Close";
  import toggleFavorites from "../../mixins/toggleFavorites";
  import Loader from "../Loader/Loader";
  import toggleToComparison from "../../mixins/toggleToComparison";
  import fixName from "../../cities/fixName";
  import {mapActions, mapGetters, mapMutations} from 'vuex';


  export default {
    name: "AllCities",

    components: {
      CityItem,
      Loupe,
      Loader,
      Close
    },

    mixins: [toggleFavorites, toggleToComparison],

    data() {
      return {
        fixName,
        cities: [],
        popularCities: [],
        favorites: [],
        searchValue: ''
      }
    },

    computed: {
      ...mapGetters([
        'COMPARE_ARR'
      ]),

      citiesList() {
        if (this.searchValue) {
          return this.cities.filter(city => {
            if (this.searchValue.length < 4) {
              return city.name.slice(0, this.searchValue.length).toLowerCase().includes(this.searchValue.toLowerCase());
            } else {
              return city.name.toLowerCase().includes(this.searchValue.toLowerCase());
            }
          });
        } else {
          return this.popularCities;
        }
      }
    },

    methods: {
      ...mapActions([
        'TOGGLE_TO_COMPARISON'
      ]),

      ...mapMutations([
         'CLEAR_STATE'
      ]),

      getTempForPopular() {
        const idList = [];

        popularCities.forEach(item => idList.push(item.id));

        fetch(`https://api.openweathermap.org/data/2.5/group?id=${idList}&units=metric&appid=8a7f9fc6457f60d5c42e74d2513694de`)
        .then(res => res.json())
        .then(data => {
          this.popularCities = data.list;
        });
      }
    },

    mounted() {
      this.cities = allCities;

      const cities = JSON.parse(localStorage.getItem('cities'))

      if (cities) {
        this.favorites = cities;
      }

      this.getTempForPopular();

    }
  }
</script>

<style lang="scss">
  @import "./AllCities";
</style>
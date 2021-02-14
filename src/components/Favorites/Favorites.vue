<template>
  <main class="favorites scroll-style">
    <div class="container">
      <div class="favorites__title-wrap">
        <h1 class="title">Favorites</h1>

        <button
                class="favorites__filters-btn btn"
                @click="isOpen = true"
                :class="activeFilters.weatherType || activeFilters.tempRange ? ['btn-active', 'beautiful-btn'] : []"
                v-if="favorites.length"
        >
          <span
                  class="beautiful-btn__glare"
                  v-show="activeFilters.weatherType"
          />
          <span>Filters</span>
        </button>

        <div
                class="favorites__filters-icon"
                @click="isOpen = true"
        >
          <Filters/>
        </div>
      </div>

      <div class="favorites__empty-fav" ref="emptyFav">
          <span>
            Add cities
            <RouterLink :to="{name: 'AllCities'}">here.</RouterLink>
          </span>
      </div>

      <div
              class="favorites__empty-filters"
              v-if="!cityList.length && favorites.length"
      >
        <span>Nothing found</span>
      </div>

      <div
              class="favorites__filters-popup"
              :class="{'favorites__filters-popup_open' : isOpen}"
      >
        <div class="container">
          <div class="favorites__popup-header">
            <span>Filters</span>
            <span
                    class="favorites__popup-close"
                    @click="closeFiltersPopup"
            >
              Close
            </span>
          </div>
          <div class="favorites__popup-body">
          <div class="favorites__weather-type">Weather Type</div>
          <div class="favorites__weather-icons">
            <div class="favorites__icon-wrap" @click="selectWeatherType('7')" :class="{'favorites__icon-wrap_selected' : modalState.weatherType === '7'}">
              <Mist/>
            </div>
            <div class="favorites__icon-wrap" @click="selectWeatherType('Clouds')" :class="{'favorites__icon-wrap_selected' : modalState.weatherType === 'Clouds'}">
              <Cloud/>
            </div>
            <div class="favorites__icon-wrap" @click="selectWeatherType('3,5')" :class="{'favorites__icon-wrap_selected' : modalState.weatherType === '3,5'}">
              <Rain/>
            </div>
            <div class="favorites__icon-wrap" @click="selectWeatherType('Clear')" :class="{'favorites__icon-wrap_selected' : modalState.weatherType === 'Clear'}">
              <Sun/>
            </div>
            <div class="favorites__icon-wrap" @click="selectWeatherType('2')" :class="{'favorites__icon-wrap_selected' : modalState.weatherType === '2'}">
              <Thunder/>
            </div>
            <div class="favorites__icon-wrap" @click="selectWeatherType('6')" :class="{'favorites__icon-wrap_selected' : modalState.weatherType === '6'}">
              <Snow/>
            </div>
          </div>
          <div class="favorites__temp">Temperature, °C</div>
          <label>
            <select
                    class="favorites__select"
                    v-model="modalState.tempRange"
            >
              <option value="" :selected="modalState.tempRange">all ranges</option>
              <option :value="[-50, -21]">below -20°</option>
              <option :value="[-20, -10]">from -20° to -10°</option>
              <option :value="[-10, 0]">from -10° to 0°</option>
              <option :value="[0, 10]">from 0° to +10°</option>
              <option :value="[10, 20]">from +10° to +20°</option>
              <option :value="[20, 30]">from +20° to +30°</option>
              <option :value="[30, 50]">higher +30°</option>
            </select>
          </label>
          <div class="favorites__btn-wrap">
            <button
                    class="btn btn-active"
                    @click="applyFilters"
            >
              Apply
            </button>
            <button
                    class="favorites__reset-btn"
                    @click="resetFilters"
            >
              reset
            </button>
          </div>
        </div>
        </div>
      </div>

      <div class="cities__body">
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
          <CityItem
                  v-for="(city, index) of cityList"
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
  import CityItem from "../CityItem/CityItem";
  import toggleFavorites from "../../mixins/toggleFavorites";
  import toggleToComparison from "../../mixins/toggleToComparison";
  import Filters from "../../assets/svg/Filters";
  import Mist from "../../assets/svg/Mist";
  import Cloud from "../../assets/svg/Cloud";
  import Rain from "../../assets/svg/Rain";
  import Sun from "../../assets/svg/Sun";
  import Thunder from "../../assets/svg/Thunder";
  import Snow from "../../assets/svg/Snow";
  import Close from "@/assets/svg/Close";
  import {mapActions, mapGetters, mapMutations} from "vuex";

  export default {
    name: "Favorites",

    components: {
      CityItem,
      Filters,
      Mist,
      Cloud,
      Rain,
      Sun,
      Thunder,
      Snow,
      Close
    },

    mixins: [toggleFavorites, toggleToComparison],

    data() {
      return {
        result: [],
        favorites: [],
        isOpen: false,

        activeFilters: {
          weatherType: '',
          tempRange: ''
        },

        modalState: {
          weatherType: '',
          tempRange: ''
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

      getTempForFavorites() {
        const idList = [];

        if (this.result.length) {
          this.result.forEach(item => idList.push(item.id));

          fetch(`https://api.openweathermap.org/data/2.5/group?id=${idList}&units=metric&appid=8a7f9fc6457f60d5c42e74d2513694de`)
          .then(res => res.json())
          .then(data => {
            this.result = data.list;
          });
        }
      },

      selectWeatherType(id) {
        if (this.modalState.weatherType === id) {
          this.modalState.weatherType = '';
        } else {
          this.modalState.weatherType = id;
        }
      },

      applyFilters() {
        this.isOpen = false;
        this.activeFilters.weatherType = this.modalState.weatherType;
        this.activeFilters.tempRange = this.modalState.tempRange;
      },

      resetFilters() {
        this.isOpen = false;
        this.modalState.weatherType = '';
        this.modalState.tempRange = '';
        this.activeFilters.weatherType = '';
        this.activeFilters.tempRange = '';
      },

      closeFiltersPopup() {
        this.isOpen = false;
        this.modalState.weatherType = this.activeFilters.weatherType;
        this.modalState.tempRange = this.activeFilters.tempRange;
      }
    },

    computed: {
      ...mapGetters([
        'COMPARE_ARR'
      ]),

      cityList() {
        return this.result.filter(city => {

          if (this.activeFilters.tempRange && this.activeFilters.weatherType) {

            return city.main.temp >= this.activeFilters.tempRange[0]
              && city.main.temp <= this.activeFilters.tempRange[1]
              && (
                (this.activeFilters.weatherType === 'Clear') ? city.weather[0].main === 'Clear' :
                (this.activeFilters.weatherType === 'Clouds') ? city.weather[0].main === 'Clouds' :
                (this.activeFilters.weatherType === '3,5') ? /[3,5]/.test(String(city.weather[0].id)[0]) :
                String(city.weather[0].id)[0].includes(this.activeFilters.weatherType)
              );
          }
          else if (this.activeFilters.tempRange) {
            return city.main.temp >= this.activeFilters.tempRange[0] && city.main.temp <= this.activeFilters.tempRange[1];
          }
          else if (this.activeFilters.weatherType) {

            if (this.activeFilters.weatherType === 'Clear') return city.weather[0].main === 'Clear';

            else if (this.activeFilters.weatherType === 'Clouds') return city.weather[0].main === 'Clouds';

            else if (this.activeFilters.weatherType === '3,5') return /[3,5]/.test(String(city.weather[0].id)[0]);

            else return String(city.weather[0].id)[0].includes(this.activeFilters.weatherType);
          }
          else return true;
        });
      }
    },

    mounted() {
      this.result = JSON.parse(localStorage.getItem('cities')) || [];
      this.favorites = this.result;

      this.getTempForFavorites();

      if (!this.result.length) {
        this.$refs.emptyFav.classList.add('favorites__empty-fav_show');
      }
    }
  }

</script>

<style lang="scss">
  @import "./Favorites.scss";
</style>
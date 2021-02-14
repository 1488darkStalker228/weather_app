<template>
  <div class="compare scroll-style">
    <div class="container">
      <button
              class="btn"
              @click="$router.go(-1)"
      >
        Back
      </button>
      <Loader v-if="!weatherCitySecond.length"/>
      <div v-else class="compare__item-wrap">
        <div class="compare__city-first">
          <div class="compare__name">{{COMPARE_ARR[0].name | cuttingText}}</div>
          <WeatherItem
                  ref="weatherItem"
                  v-for="day of weatherCityFirst"
                  :key="day.dt + 'first'"
                  :day="day"
          />
        </div>
        <div class="compare__city-second">
          <div class="compare__name">{{COMPARE_ARR[1].name | cuttingText}}</div>
          <WeatherItem
                  ref="weatherItem"
                  v-for="day of weatherCitySecond"
                  :key="day.dt + 'second'"
                  :day="day"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import WeatherItem from "../WeatherItem/WeatherItem";
  import Loader from "../Loader/Loader";

  export default {
    name: "Compare",

    components: {
      Loader,
      WeatherItem
    },

    data() {
      return {
        weatherCityFirst: [],
        weatherCitySecond: []
      }
    },

    methods: {
      getWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.COMPARE_ARR[0].coord.lat}&lon=${this.COMPARE_ARR[0].coord.lon}&exclude=alerts,minutely,hourly&units=metric&appid=8a7f9fc6457f60d5c42e74d2513694de`)
        .then(res => res.json())
        .then(data => this.weatherCityFirst = data.daily)
        .catch(err => {
          console.err(err);
          return err;
        });

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.COMPARE_ARR[1].coord.lat}&lon=${this.COMPARE_ARR[1].coord.lon}&exclude=alerts,minutely,hourly&units=metric&appid=8a7f9fc6457f60d5c42e74d2513694de`)
        .then(res => res.json())
        .then(data => this.weatherCitySecond = data.daily)
        .catch(err => {
          console.err(err);
          return err;
        });
      }
    },

    computed: {
      ...mapGetters([
        'COMPARE_ARR'
      ])
    },

    filters: {
      cuttingText(value) {
        if (value.length > 15) {
          return value.slice(0, 15) + '...';
        } else {
          return value;
        }
      }
    },

    mounted() {
      if (!this.COMPARE_ARR.length) {
        this.$router.push({name: 'MainPage'});
      } else {
        this.getWeather();
      }
    }
  }
</script>

<style lang="scss">
  @import "./Compare";
</style>
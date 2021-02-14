<template>
  <main class="city-page">
    <div class="container">
      <div
              v-if="$route.fullPath !== '/'"
              class="city-page__back-arrow"
              @click="$router.go(-1)"
      >
        <BackArrow/>
      </div>
      <div class="city-page__title-wrap">
        <h1 class="city-page__title title">{{cityName}}</h1>
        <div class="city-page__buttons-wrap">
          <button
                  class="city-page__button btn"
                  @click="makeActiveButton(1)"
                  :class="activeButton === 1 ? ['btn-active', 'beautiful-btn'] : []"
          >
            <span
                    class="beautiful-btn__glare"
                    v-show="activeButton === 1"
            />
            <span>Today</span>
          </button>
          <button
                  class="city-page__button btn"
                  @click="makeActiveButton(4)"
                  :class="activeButton === 4 ? ['btn-active', 'beautiful-btn'] : []"
          >
            <span
                    class="beautiful-btn__glare"
                    v-show="activeButton === 4"
            />
            <span>3 days</span>
          </button>
          <button
                  class="city-page__button btn"
                  @click="makeActiveButton(8)"
                  :class="activeButton === 8 ? ['btn-active', 'beautiful-btn'] : []"
          >
            <span
                    class="beautiful-btn__glare"
                    v-show="activeButton === 8"
            />
            <span>7 days</span>
          </button>
        </div>
      </div>
      <div
              class="city-page__weather-wrap"
              :class="length === 1 ? 'city-page__weather-wrap_mod' : ''"
      >
        <Loader v-if="!weather.length"/>
        <WeatherItem
                ref="weatherItem"
                v-for="(day, index) of arrWeather"
                :key="day.dt"
                :day="day"
                @click.native="turnItem(index)"
        />
      </div>
    </div>
  </main>
</template>

<script>
  import WeatherItem from "../WeatherItem/WeatherItem";
  import Loader from "../Loader/Loader";
  import BackArrow from "../../assets/svg/BackArrow";
  import allCities from "../../cities/allCities"

  export default {
    name: "CityPage",

    components: {
      WeatherItem,
      Loader,
      BackArrow
    },

    data() {
      return {
        allCities,
        cityName: '',
        weather: [],
        length: 1,
        activeButton: 1,
        lat: '',
        lon: '',
      }
    },

    computed: {
      arrWeather() {
        const result = [];
        if (this.weather.length) {
          for (let i = 0; i < this.length; i++) {
            result.push(this.weather[i]);
          }
        }
        return result;
      }
    },

    methods: {

      async init() {
        if (!this.$route.params.id) {
          await this.getCoordinates();
          this.reverseGeocoding();
        } else {
          this.getCityObject();
        }
        this.getWeather();
      },

      getWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=alerts,minutely,hourly&units=metric&appid=8a7f9fc6457f60d5c42e74d2513694de`)
        .then(res => res.json())
        .then(data => this.weather = data.daily)
        .catch(err => {
          console.err(err);
          return err;
        });
      },

      getCityObject() {
        const city = this.allCities.find(city => city.id === +this.$route.params.id);
        this.cityName = city.name;
        this.lat = city.coord.lat;
        this.lon = city.coord.lon;
      },

      getCoordinates() {
        return new Promise(r => {
          navigator.geolocation.getCurrentPosition(success => {
            this.lat = success.coords.latitude;
            this.lon = success.coords.longitude;
            r();
          }, error => console.log(error));
        });
      },

      reverseGeocoding() {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
        const token = "34b5fb921b1bf4cbc4140144aa2c26caea6ad6c0";
        const query = {lat: this.lat, lon: this.lon, count: 1, language: 'en'};

        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
          },
          body: JSON.stringify(query)
        };

        fetch(url, options)
        .then(res => res.json())
        .then(data => this.cityName = data.suggestions[0].data.city)
        .catch(error => console.log("error", error));
      },

      makeActiveButton(value) {
        this.length = value;
        this.activeButton = value;
      },

      turnItem(index) {
        this.$refs.weatherItem.forEach((item, i) => {
          if (index !== i) {
            item.$el.classList.remove('weather-item_active');
          } else {
            item.$el.classList.toggle('weather-item_active');
          }
        });
      },

      initialStateByClickOutside(e) {
        if (this.$refs.weatherItem) {
          if (!e.target.closest('.weather-item')) {
            this.$refs.weatherItem.forEach(item => {
              item.$el.classList.remove('weather-item_active');
            });
          }
        }
      }
    },

    mounted() {
      this.init();

      window.addEventListener('click', this.initialStateByClickOutside);
    },

    beforeDestroy() {
      window.removeEventListener('click', this.initialStateByClickOutside);
    }
  }
</script>

<style lang="scss">
  @import "./CityPage";
</style>

<template>
  <div class="weather-item">
    <div class="weather-item__border"/>
    <div class="weather-item__average">
      <div class="weather-item__data">
        {{new Date(day.dt * 1000).toLocaleDateString('en', {day: "numeric", month: "long"})}}
      </div>
      <Temp
              class="weather-item__temp"
              :data="day"
      />
      <span class="weather-item__description">
        {{day.weather[0].description}}
      </span>
    </div>
    <div class="weather-item__hourly">
      <ul>
        <li>Morning: {{Math.round(day.temp.morn)}}°</li>
        <li>Day: {{Math.round(day.temp.day)}}°</li>
        <li>Evening: {{Math.round(day.temp.eve)}}°</li>
        <li>Night: {{Math.round(day.temp.night)}}°</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Temp from "../Temp/Temp";

  export default {
    name: "WeatherItem",

    components: {
      Temp
    },

    props: {
      day: {
        required: true
      }
    }
  }
</script>

<style lang="scss">
  @import "WeatherItem";
</style>

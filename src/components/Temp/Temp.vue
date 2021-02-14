<template>
  <div>
    <span v-if="!data.main">{{Math.trunc((data.temp.max + data.temp.min) / 2)}}°</span>
    <span v-else>{{Math.round(data.main.temp)}}°</span>
    <Thunder v-if="String(data.weather[0].id)[0].includes('2')"/>
    <Rain v-if="/[3,5]/.test(String(data.weather[0].id)[0])"/>
    <Snow v-if="String(data.weather[0].id)[0].includes('6')"/>
    <Mist v-if="String(data.weather[0].id)[0].includes('7')"/>
    <Sun v-if="data.weather[0].id === 800"/>
    <Cloud v-else-if="String(data.weather[0].id)[0].includes('8')"/>
  </div>
</template>

<script>
  import Snow from "../../assets/svg/Snow";
  import Cloud from "../../assets/svg/Cloud";
  import Rain from "../../assets/svg/Rain";
  import Sun from "../../assets/svg/Sun";
  import Thunder from "../../assets/svg/Thunder";
  import Mist from "../../assets/svg/Mist";

  export default {
    name: "Temp",

    components: {
      Snow,
      Cloud,
      Rain,
      Sun,
      Thunder,
      Mist
    },

    props: {
      data: {
        required: true
      }
    }
  }
</script>

<style>

</style>
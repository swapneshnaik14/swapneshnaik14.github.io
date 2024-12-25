<template>
  <video-test/>
</template>

<script>
import Video from './components/video-cropper.vue'


export default {
  name: 'App',
  components: {
    'video-test':Video,
  }
}
</script>

<style>
#app {
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

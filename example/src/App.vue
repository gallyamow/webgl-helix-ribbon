<template>
  <div id="app">
    <HelloWorld :textureUrl="texture"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Photos from './assets/photos.png'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      texture: Photos
    }
  }
}
</script>

<style>
  body {
    background: black;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
</style>

<template>
  <div id="app">
    <HelloWorld texture="./assets/photos.png"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
  body {
    background: black;
    padding: 0;
    margin: 0;
  }
</style>

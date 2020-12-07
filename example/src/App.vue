<template>
  <div id="app">
    <HelloWorld :photos="photos"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    const photos = []

    for (let i = 1; i <= 15; i++) {
      photos.push({ photoUrl: require('./assets/photo-' + i + '.png'), width: 1 })
    }

    return {
      photos
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

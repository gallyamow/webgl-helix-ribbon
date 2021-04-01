<template>
  <div id="app">
    <HelloWorld :photos="photos" @photoClick="onPhotoClick"/>
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
      photos.push({ photoUrl: require('./assets/photo-' + (i % 5) + '.png'), width: 1 })
    }

    return {
      photos
    }
  },

  methods: {
    onPhotoClick (e) {
      alert(`Photo with index ${e.index} clicked`)
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

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

    let k = 0, maxK = 4
    for (let i = 1; i <= 5; i++) {
      photos.push({ photoUrl: require('./assets/test-photo-' + k + '.png'), width: 1 })

      k++
      if (k > maxK) {
        k = 0
      }
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

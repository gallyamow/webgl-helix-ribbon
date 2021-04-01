<template>
  <div id="app">
    <HelloWorld :photos="photos" @photoClick="onPhotoClick"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

const USE_TEST_PHOTOS = true
const SEGMENTS_COUNT = 5

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data () {
    const photos = []
    const fileName = USE_TEST_PHOTOS ? 'test-photo' : 'photo'

    let k = 0, photosCount = 4
    for (let i = 1; i <= SEGMENTS_COUNT; i++) {
      photos.push({ photoUrl: require('./assets/' + fileName + '-' + (k++) + '.png'), width: 1 })

      if (k > photosCount) {
        k = 0
      }
    }

    return {
      photos
    }
  },

  methods: {
    onPhotoClick (e) {
      console.log(`Photo with index ${e.index} clicked`)
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

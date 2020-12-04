<template>
  <div class="hello">
    <div ref="container"></div>
  </div>
</template>

<script>
import HelixRibbon from 'webgl-helix-ribbon'

export default {
  name: 'HelloWorld',
  props: {
    texture: String
  },

  created () {
    this.helixRibbon = new HelixRibbon(this.$refs.container, window.innerWidth, window.innerHeight, {
      height: 1.3,
      radius: 1.7,
      thickness: 0.021,
      turnovers: 3,
      turnoverSteps: 30,
      shiftMultiplier: 3,
      textureUrl: this.texture
    })

    window.addEventListener('resize', this.onWindowResize)
  },

  destroyed () {
    this.helixRibbon.destroy()

    window.removeEventListener('resize', this.onWindowResize)
  },

  methods: {
    onWindowResize () {
      this.helixRibbon.resize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
</style>

<template>
  <div class="hello">
    <div ref="container"></div>
  </div>
</template>

<script>
import renderHelixRibbon from 'webgl-helix-ribbon'

export default {
  name: 'HelloWorld',
  props: {
    texture: String
  },

  created () {
    this.ribbonInteractor = renderHelixRibbon(this.$refs.container, window.innerWidth, window.innerHeight, {
      height: 1.3,
      radius: 1.7,
      thickness: 0.021,
      turnovers: 3,
      turnoverSteps: 30,
      shiftMultiplier: 3,
      textureUrl: this.texture
    })
  },

  destroyed () {
    this.ribbonInteractor.destroy()
  }
}
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
</style>

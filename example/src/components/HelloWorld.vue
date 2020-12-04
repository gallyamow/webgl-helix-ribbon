<template>
  <div class="hello">
    <div ref="container"></div>
    >
  </div>
</template>

<script>
import { HelixRibbonScene } from 'webgl-helix-ribbon'

export default {
  name: 'HelloWorld',
  props: {
    textureUrl: String
  },

  mounted () {
    /**
     * @type {HelixRibbonScene}
     */
    this.helixRibbonScene = (new HelixRibbonScene(window.innerWidth, window.innerHeight, {
      height: 1.3,
      radius: 1.7,
      thickness: 0.021,
      turnovers: 3,
      turnoverSteps: 30,
      shiftMultiplier: 3,
      textureUrl: this.textureUrl
    })).prepare()

    this.helixRibbonScene.setRotationSpeed(0.005)
    this.helixRibbonScene.render(this.$refs.container)

    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('wheel', this.onWheel)
  },

  destroyed () {
    this.helixRibbonScene.destroy()

    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('wheel', this.onWheel)
  },

  methods: {
    onWindowResize () {
      this.helixRibbonScene.resize(window.innerWidth, window.innerHeight)
    },
    onWheel (event) {
      this.helixRibbonScene.addRotationDelta((event.deltaY / 3) * Math.PI / 360)
    }
  }
}
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
</style>

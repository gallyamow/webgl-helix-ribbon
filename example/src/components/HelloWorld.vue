<template>
  <div class="hello">
    <div ref="container"></div>
  </div>
</template>

<script>
import { HelixRibbonScene } from 'webgl-helix-ribbon'

export default {
  name: 'HelloWorld',
  props: {
    photos: {
      type: Array,
      required: true
    }
  },

  mounted () {
    /**
     * @type {HelixRibbonScene}
     */
    this.helixRibbonScene = (new HelixRibbonScene(window.innerWidth, window.innerHeight, {
      photos: this.photos,
      photoWidth: 1.3,
      photoHeight: 1.3,
      radius: 1.7,
      thickness: 0.021,
      turnovers: 3,
      steps: 30,
      shiftMultiplier: 3
    })).prepare()

    this.helixRibbonScene.setRotationSpeed(0.005)
    // noinspection JSCheckFunctionSignatures
    this.helixRibbonScene.render(this.$refs.container)

    this.helixRibbonScene.getEventsTarget().addEventListener('click', this.onPhotoClick)

    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('wheel', this.onWheel)
  },

  destroyed () {
    this.helixRibbonScene.destroy()

    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('wheel', this.onWheel)
  },

  methods: {
    onPhotoClick (e) {
      this.$emit('photoClick', { index: e.detail.segment })
    },

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

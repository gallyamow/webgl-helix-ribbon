<template>
  <div class="hello">
    <Preloader
      v-if="loading"
      style="position:absolute;  left: 50%; top: 50%; transform: translate(-50%, -50%);"
    />
    <div ref="container" v-show="!loading"></div>
  </div>
</template>

<script>
import { HelixRibbonScene } from 'webgl-helix-ribbon'
import Preloader from './Preloader.vue'

export default {
  components: { Preloader },
  props: {
    photos: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      loading: true
    }
  },

  created () {
    /**
     * @type {HelixRibbonScene}
     */
    this.helixRibbonScene = (new HelixRibbonScene(window.innerWidth, window.innerHeight, {
      photos: this.photos,
      photoHeight: 1.3,
      radius: 2,
      thickness: 0.021,
      turnovers: 3,
      steps: 30,
      shiftMultiplier: 3,
      // y - для регулировки смещения по вертикали
      translateMultiplier: { x: 0, y: 1.2, z: 0 }
    })).prepare()

    this.helixRibbonScene.setRotationSpeed(0.005)
  },

  mounted () {
    // noinspection JSCheckFunctionSignatures
    this.helixRibbonScene.render(this.$refs.container)

    const eventTarget = this.helixRibbonScene.getEventsTarget()
    eventTarget.addEventListener('click', this.onPhotoClick)
    eventTarget.addEventListener('ready', this.onReady)

    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('wheel', this.onWheel)
  },

  destroyed () {
    this.helixRibbonScene.destroy()

    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('wheel', this.onWheel)
  },

  methods: {
    onReady () {
      this.loading = false
    },

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

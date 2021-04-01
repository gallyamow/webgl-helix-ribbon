<template>
  <div class="hello">
    <Preloader
      v-if="loading"
      class="centered"
    />
    <div
      ref="container"
      v-show="!loading"
      class="container centered"
    >
    </div>
  </div>
</template>

<script>
const CONTAINER_WIDTH = 600
const CONTAINER_HEIGHT = 800

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
    this.helixRibbonScene = (new HelixRibbonScene(CONTAINER_WIDTH, CONTAINER_HEIGHT, {
      photos: this.photos,
      photoHeight: 1.3,
      radius: 2,
      thickness: 0.021,
      turnovers: 3,
      steps: 30,
      shiftMultiplier: 3,
      // y - для регулировки смещения по вертикали
      translateMultiplier: { x: 0, y: 2.5, z: 0 }
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

    this.$refs.container.addEventListener('mouseenter', this.onMouseEnter, false)
    this.$refs.container.addEventListener('mouseleave', this.onMouseLeave, false)
  },

  beforeDestroy () {
    this.$refs.container.removeEventListener('mouseenter', this.onMouseEnter, false)
    this.$refs.container.removeEventListener('mouseleave', this.onMouseLeave, false)
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
      // disabled because we use exact sizes
      // this.helixRibbonScene.resize(window.innerWidth, window.innerHeight)
    },

    onWheel (event) {
      this.helixRibbonScene.addRotationDelta((event.deltaY / 3) * Math.PI / 360)
    },

    onMouseEnter () {
      this.helixRibbonScene.setRotationEnabled(false)
    },

    onMouseLeave () {
      this.helixRibbonScene.setRotationEnabled(true)
    }
  }
}
</script>

<style scoped>
  .centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .container {
    border: 1px solid #AAA;
    width: 600px;
  }
</style>

import { buildCamera, buildRenderer, buildRibbon, buildScene } from './utils'

export default class HelixRibbonScene {
  /**
   * @param {HTMLElement} containerEl
   * @param {number} sceneWidth
   * @param {number} sceneHeight
   * @param {*} ribbonOptions
   */
  constructor (containerEl, sceneWidth, sceneHeight, ribbonOptions) {
    this.containerEl = containerEl
    this.sceneWidth = sceneWidth
    this.sceneHeight = sceneHeight
    this.ribbonOptions = ribbonOptions
    this.rotationSpeed = 0
  }

  render (renderer, camera, scene) {
    this.renderer = renderer ?? buildRenderer()
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)

    this.camera = camera ?? buildCamera()
    this.scene = scene ?? buildScene()

    this.ribbon = buildRibbon(this.ribbonOptions)
    scene.add(this.ribbon)

    this.containerEl.appendChild(renderer.domElement)

    const renderFrame = () => {
      requestAnimationFrame(renderFrame)
      this.ribbon.rotation.y -= this.rotationSpeed

      renderer.render(this.scene, this.camera)
    }

    renderFrame()
  }

  resize (width, height) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  setRotationSpeed (speed) {
    this.rotationSpeed = speed
  }

  setRotationAngle (angle) {
    this.ribbon.rotation.y = angle
  }

  addRotationDelta (delta) {
    this.ribbon.rotation.y += delta
  }

  destroy () {
    // @see https://discourse.threejs.org/t/how-to-completely-clean-up-a-three-js-scene-from-a-web-app-once-the-scene-is-no-longer-needed/1549/4
    this.renderer.dispose()
    this.camera.dispose()
    this.ribbon.dispose()

    this.renderer = null
    this.camera = null
    this.ribbon = null
  }
}

import { buildCamera, buildRenderer, buildRibbon, buildScene } from './utils'

export default class HelixRibbonScene {
  /**
   * @param {number} sceneWidth
   * @param {number} sceneHeight
   * @param {*} ribbonOptions
   */
  constructor (sceneWidth, sceneHeight, ribbonOptions) {
    this.sceneWidth = sceneWidth
    this.sceneHeight = sceneHeight
    this.ribbonOptions = ribbonOptions
    this.rotationSpeed = 0
  }

  /**
   * @param {WebGLRenderer|null} renderer
   * @param {PerspectiveCamera|null} camera
   * @param {Scene|null} scene
   * @return {HelixRibbonScene}
   */
  prepare (renderer = null, camera = null, scene = null) {
    this.renderer = renderer ?? buildRenderer()
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)

    this.camera = camera ?? buildCamera(this.sceneWidth, this.sceneHeight)
    this.scene = scene ?? buildScene(true)

    this.ribbon = buildRibbon(this.ribbonOptions)
    this.scene.add(this.ribbon)

    return this
  }

  /**
   * @param {HTMLElement} containerEl
   * @return {HelixRibbonScene}
   */
  render (containerEl) {
    containerEl.appendChild(this.renderer.domElement)

    const renderFrame = () => {
      requestAnimationFrame(renderFrame)

      this.ribbon.rotation.y -= this.rotationSpeed

      this.renderer.render(this.scene, this.camera)
    }

    renderFrame()

    return this
  }

  /**
   * @param {number} width
   * @param {number} height
   * @return {HelixRibbonScene}
   */
  resize (width, height) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)

    return this
  }

  /**
   * @param {number} speed
   * @return {HelixRibbonScene}
   */
  setRotationSpeed (speed) {
    this.rotationSpeed = speed
    return this
  }

  /**
   * @param {number} angle
   * @return {HelixRibbonScene}
   */
  setRotationAngle (angle) {
    this.ribbon.rotation.y = angle
    return this
  }

  /**
   * @param {number} delta
   * @return {HelixRibbonScene}
   */
  addRotationDelta (delta) {
    this.ribbon.rotation.y += delta
    return this
  }

  destroy () {
    // @see https://discourse.threejs.org/t/how-to-completely-clean-up-a-three-js-scene-from-a-web-app-once-the-scene-is-no-longer-needed/1549/4
    this.renderer.dispose()
    this.ribbon.dispose()

    this.renderer = null
    this.camera = null
    this.ribbon = null
  }
}

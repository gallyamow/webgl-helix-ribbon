import { buildCamera, buildRenderer, buildRibbon, buildScene, loadTexture } from './utils'
import { Raycaster, Vector2 } from 'three'

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
    this.rotationEnabled = true
    this.textures = []
    this.eventTarget = new EventTarget()
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
    this.scene = scene ?? buildScene(false)

    const { photos } = this.ribbonOptions

    // async/ await
    Promise.all(photos.map(v => loadTexture(v.photoUrl))).then(textures => {
      this.textures = textures

      this.ribbon = buildRibbon(this.textures, this.ribbonOptions)
      this.scene.add(this.ribbon)

      this.eventTarget.dispatchEvent(new CustomEvent('ready'))
    })

    this.raycaster = new Raycaster()
    this.mouse = new Vector2()

    this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this), false)

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

      // waiting is ready
      if (this.ribbon) {
        if (this.rotationEnabled) {
          this.ribbon.rotation.y -= this.rotationSpeed
        }

        this.renderer.render(this.scene, this.camera)
      }
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

  setRotationEnabled (enabled) {
    this.rotationEnabled = enabled
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

  getEventsTarget () {
    return this.eventTarget
  }

  onMouseClick (event) {
    event.preventDefault()

    const rect = this.renderer.domElement.getBoundingClientRect()

    this.mouse.x = ((event.clientX - rect.left) / this.sceneWidth) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / this.sceneHeight) * 2 + 1

    // console.log(rect, this.mouse, event)

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)

    if (intersects.length === 0) {
      return
    }

    const firstIntersection = intersects[0] ?? null
    const segment = firstIntersection?.object?.userData?.segment

    // strict check
    if (segment === undefined) {
      return
    }

    // firstIntersection.object.material.color.set(0xff0000)
    this.eventTarget.dispatchEvent(new CustomEvent('click', { detail: { segment: segment } }))
  }

  destroy () {
    this.renderer.domElement.removeEventListener('click', this.onMouseClick.bind(this), false)

    // @see https://discourse.threejs.org/t/how-to-completely-clean-up-a-three-js-scene-from-a-web-app-once-the-scene-is-no-longer-needed/1549/4
    this.renderer.dispose()
    // this.ribbon.dispose()

    this.renderer = null
    this.camera = null
    this.ribbon = null
  }
}

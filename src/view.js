import { AmbientLight, PerspectiveCamera, Scene, SpotLight, SpotLightHelper, WebGLRenderer } from 'three'

const COLOR_SPOTLIGHT = 0xFFFFFF

const COLOR_AMBIENT_LIGHT = 0x404040

const INTENSITY_AMBIENT = 3
const INTENSITY_SPOTLIGHT = 0.61

const POSITION_CAMERA = [0, 0, 7]
const POSITION_SPOTLIGHT = [3.2, -1.8, 3]
const POSITION_SPOTLIGHT_TARGET = [0, 0, 0]

export function buildRenderer () {
  // renderer.setClearColor(0xFF0000, 0);
  return new WebGLRenderer({
    alpha: true,
    antialias: true
  })
}

export function buildCamera () {
  const camera = new PerspectiveCamera(50, width / height, 1, 1000)
  camera.position.set(...POSITION_CAMERA)

  return camera
}

export function buildScene (spotLightHelper = false) {
  const scene = new Scene()

  const ambientLight = new AmbientLight(COLOR_AMBIENT_LIGHT, INTENSITY_AMBIENT)
  scene.add(ambientLight)

  const spotLight = new SpotLight(COLOR_SPOTLIGHT, INTENSITY_SPOTLIGHT)
  spotLight.position.set(...POSITION_SPOTLIGHT)
  spotLight.target.position.set(...POSITION_SPOTLIGHT_TARGET)
  scene.add(spotLight)
  scene.add(spotLight.target)

  if (spotLightHelper) {
    const spotLightHelper = new SpotLightHelper(spotLight, 0xFF0000)
    scene.add(spotLightHelper)
  }

  return scene
}


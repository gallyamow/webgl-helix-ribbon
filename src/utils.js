import {
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  SpotLight,
  SpotLightHelper,
  TextureLoader,
  WebGLRenderer
} from 'three'

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

function loadTexture (textureUrl) {
  const textureLoader = new TextureLoader()

  const texture = textureLoader.load(textureUrl)
  texture.repeat.set(1, 1)

  return texture
}

function buildRibbonGeometry (radius, height, thickness, turnovers, turnoverSteps, shiftMultiplier) {
  const geom = new BoxGeometry(turnovers * Math.PI * 2, height, thickness, turnovers * turnoverSteps, 1, 1)
  geom.computeBoundingBox()

  // const size = new THREE.Vector3();
  // geom.boundingBox.getSize(size);
  // geom.translate(size.x * 0.5, size.y * 0.5, size.z * 0.7);

  geom.vertices.forEach(v => {
    const angle = -v.x
    const r = radius + v.z
    const shift = (-angle / (Math.PI * 2)) * shiftMultiplier

    v.x = Math.cos(angle) * r
    v.y = v.y + shift
    v.z = Math.sin(angle) * r
  })

  geom.computeFaceNormals()
  geom.computeVertexNormals()
  geom.center()

  return geom
}

export function buildRibbon ({ height, radius, thickness, turnovers, turnoverSteps, shiftMultiplier, textureUrl }) {
  const geom = buildRibbonGeometry(radius, height, thickness, turnovers, turnoverSteps, shiftMultiplier)

  // transparency
  // const alphaMapTexture = loader.load('./assets/negatives.png')
  // alphaMapTexture.repeat.set(1, 1);
  // alphaMap: alphaMapTexture,

  const ribbonMaterial = new MeshLambertMaterial({
    map: loadTexture(textureUrl),
    alphaTest: 0.1,
    // transparent: true,
  })

  return new Mesh(geom, ribbonMaterial)
}

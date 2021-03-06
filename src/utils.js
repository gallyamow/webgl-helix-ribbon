import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  SpotLight,
  SpotLightHelper,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from 'three'

const COLOR_SPOTLIGHT = 0xFFFFFF

const COLOR_AMBIENT_LIGHT = 0x404040

const INTENSITY_AMBIENT = 3
const INTENSITY_SPOTLIGHT = 0.61

const POSITION_CAMERA = [0, 0, 7]
const POSITION_SPOTLIGHT = [1, 1, 5]
const POSITION_SPOTLIGHT_TARGET = [0, 0, 0]

export function buildRenderer () {
  // renderer.setClearColor(0xFF0000, 0);
  return new WebGLRenderer({
    alpha: true,
    antialias: true
  })
}

export function buildCamera (width, height) {
  const camera = new PerspectiveCamera(50, width / height, 1, 1000)
  camera.position.set(...POSITION_CAMERA)

  return camera
}

export function buildScene (useHelpers = false) {
  const scene = new Scene()

  const ambientLight = new AmbientLight(COLOR_AMBIENT_LIGHT, INTENSITY_AMBIENT)
  scene.add(ambientLight)

  const spotLight = new SpotLight(COLOR_SPOTLIGHT, INTENSITY_SPOTLIGHT)
  spotLight.position.set(...POSITION_SPOTLIGHT)
  spotLight.target.position.set(...POSITION_SPOTLIGHT_TARGET)
  scene.add(spotLight)
  scene.add(spotLight.target)

  if (useHelpers) {
    const spotLightHelper = new SpotLightHelper(spotLight, 0xFF0000)
    scene.add(spotLightHelper)

    const axesHelper = new AxesHelper(5)
    scene.add(axesHelper)
  }

  return scene
}

/**
 * @param {Texture[]} textures
 * @param {number} height
 * @param {number} radius
 * @param {number} thickness
 * @param {number} turnovers
 * @param {number} steps
 * @param {number} shiftMultiplier
 * @return {Group}
 */
export function buildRibbon (textures, {
    photoHeight,
    radius,
    thickness,
    turnovers,
    steps,
    shiftMultiplier,
    translateMultiplier = { x: 0, y: 0, z: 0 }
  }
) {
  const segmentsGeometries = buildRibbonSegmentsGeometry(turnovers, textures.length, radius, photoHeight, thickness, steps, shiftMultiplier, translateMultiplier)

  const objects = textures.map((texture, i) => {
    const material = new MeshLambertMaterial({
      map: texture,
      alphaTest: 0.1,
      // transparent: true,
    })

    const obj = new Mesh(segmentsGeometries[i], material)
    obj.userData = { segment: i }
    return obj
  })

  return (new Group()).add(...objects)
}

export function loadTexture (textureUrl) {
  const textureLoader = new TextureLoader()

  return new Promise((resolve) => {
    textureLoader.load(textureUrl, (texture) => {
      texture.repeat.set(1, 1)
      resolve(texture)
    })
  })
}

/**
 * @private
 */
function buildRibbonSegmentsGeometry (turnovers, segmentsNumber, radius, segmentHeight, segmentThickness, steps, shiftMultiplier, translateMultiplier) {
  const segmentWidth = turnovers * Math.PI * 2 / segmentsNumber

  /**
   * @type {BoxGeometry[]}
   */
  const segmentsGeometries = []

  let angle = 0

  for (let i = 0; i < segmentsNumber; i++) {
    // prefer BufferGeometry
    // const geom = new PlaneGeometry(width, segmentHeight, steps, 1)
    const geom = new BoxGeometry(segmentWidth, segmentHeight, segmentThickness, steps, 1, 1)
    geom.computeBoundingBox()

    geom.vertices.forEach(v => {
      const a = -v.x + angle
      const r = radius + v.z
      const shift = (-a / (Math.PI * 2)) * shiftMultiplier

      v.x = Math.cos(a) * r
      v.y = v.y + shift
      v.z = Math.sin(a) * r
    })

    geom.computeBoundingBox()
    // geom.computeFaceNormals()
    // geom.computeVertexNormals()
    //geom.center()

    const size = new Vector3()
    geom.boundingBox.getSize(size)
    geom.translate(translateMultiplier.x * size.x, translateMultiplier.y * size.y, translateMultiplier.z * size.z)

    segmentsGeometries.push(geom)

    angle += segmentWidth
  }

  return segmentsGeometries
}

/**
 * @typedef {Object} PhotoSegment
 * @property {string} photoUrl - URL of texture
 * @property {number} width - width in radians
 */

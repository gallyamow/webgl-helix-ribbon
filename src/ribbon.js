import { BoxGeometry, Mesh, MeshLambertMaterial, TextureLoader } from 'three'

function loadTexture (textureUrl) {
  const textureLoader = new TextureLoader()

  const texture = textureLoader.load(textureUrl)
  texture.repeat.set(1, 1)

  return texture
}

function buildGeometry (radius, height, thickness, turnovers, turnoverSteps, shiftMultiplier) {
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

export default function buildRibbon ({ height, radius, thickness, turnovers, turnoverSteps, shiftMultiplier, textureUrl }) {
  const geom = buildGeometry(radius, height, thickness, turnovers, turnoverSteps, shiftMultiplier)

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
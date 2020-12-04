export default function buildInteractor (state, renderer, camera, ribbon) {
  return {
    // todo: listener for angle
    resize (width, height) {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    },
    setRotationSpeed (speed) {
      state.rotationSpeed = speed
    },
    setRotationAngle (angle) {
      ribbon.rotation.y = angle
    },
    addRotationDelta (delta) {
      ribbon.rotation.y += delta
    }
  }
}
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
    },

    destroy () {
      // @see https://discourse.threejs.org/t/how-to-completely-clean-up-a-three-js-scene-from-a-web-app-once-the-scene-is-no-longer-needed/1549/4
      renderer.dispose()
      camera.dispose()
      ribbon.dispose()
    }
  }
}

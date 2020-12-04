import buildRibbon from './ribbon'
import buildInteractor from './interactor'
import { buildCamera, buildRenderer, buildScene } from './view'

export default function main (width, height, containerEl, ribbonOptions) {
	let state = { rotationSpeed: 0 }

	const renderer = buildRenderer()
	renderer.setSize(width, height)

	const camera = buildCamera()
	const scene = buildScene()

	// {
	// 	height: 1.3,
	// 	radius: 1.7,
	// 	thickness: 0.021,
	// 	turnovers: 3,
	// 	turnoverSteps: 30,
	// 	shiftMultiplier: 3,
	// 	textureUrl: './assets/photos.png'
	// }
	const ribbon = buildRibbon(ribbonOptions)
	scene.add(ribbon)

	containerEl.appendChild(renderer.domElement)

	render()

	function render () {
		requestAnimationFrame(render)
		ribbon.rotation.y -= state.rotationSpeed

		renderer.render(scene, camera)
	}

	return buildInteractor(state, renderer, camera, ribbon)
}
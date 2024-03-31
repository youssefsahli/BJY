/**
 * Utility functions
 */

 export function windowToCanvas(canvas, x, y) {
	// Tu donnes les coordonnées pour la fenêtre → coordonnées du canvas.
	// !! Non testé !!
	// TODO Faire tests
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
}

export function makeGradient(c1, c2) {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	var gradient = ctx.createLinearGradient(0, 0, 300, -20);
	gradient.addColorStop(0, c1);
	gradient.addColorStop(1, c2);
	return gradient;
}
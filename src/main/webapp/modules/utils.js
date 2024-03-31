/**
 * Utility functions
 */

/**
 * 
 * @param {Canvas} canvas
 * @param {float} x
 * @param {float} y
 * @returns {windowToCanvas.utilsAnonym$0}
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

/**
 * 
 * @param {Color} c1
 * @param {Color} c2
 * @returns {makeGradient.gradient}
 */
export function makeGradient(c1, c2, x1=0, y1=0, x2 = 300, y2 = 20) {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
	gradient.addColorStop(0, c1);
	gradient.addColorStop(1, c2);
	return gradient;
}
/**
 * 
 * @param {CanvasContext} ctx
 * @param {Color} color
 * @param {float} x1
 * @param {float} y1
 * @param {float} x2
 * @param {float} y2
 * @param {float} x3
 * @param {float} y3
 * @returns {undefined}
 */
export function tri(ctx,color,x1,y1,x2,y2,x3,y3) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
}

export function circ(ctx, color, x, y, radius) {
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill();
}

export function clamp(n, a, b) {
    let mi = Math.min(a, b);
    let ma = Math.max(a, b);
    if (n > ma) return ma;
    if (n < mi) return mi;
    return n;
}

export function rand(min, max) {
  return Math.random() * (max - min) + min;
}

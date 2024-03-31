/**
 * Y. Sahli GPLv3
 * Main Canvas File
 */
function windowToCanvas(canvas, x, y) {
  // Tu donnes les coordonnées pour la fenêtre → coordonnées du canvas.
  // !! Non testé !!
  // TODO Faire tests
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
}
// Barebone vector class
class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static ZERO() {
    return new Vec2(0, 0);
  }

  static ONE() {
    return new Vec2(1, 1);
  }

  times(n) {
    return new Vec2(this.x * n, this.y * n);
  }

  divide(n) {
    return new Vec2(this.x / n, this.y / n);
  }

  add(v) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
}

class CanvasObject extends Vec2 {
  // Ajouter hidden ? destroyable ?
  constructor(x, y) {
    super(x, y);
  }
}

class Brick extends CanvasObject {
  // TODO Differents types ?
  width = 71;
  height = 36;
  padding = 5;
  color = makeGradient("#99c1f1", "#1a5fb4");

  constructor(x, y) {
    super(x, y);
  }

  render(ctx) {
    let pad = this.padding;
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x + pad,
      this.y + pad,
      this.width - pad,
      this.height - pad
    );
  }
}

class Slider extends Brick {
  constructor(x, y) {
    super(x, y);
    this.velocity = Vec2.ZERO();
    this.padding = 0;
    this.height = 35;
  }

  update() {
    // TODO Movement
  }

  render(ctx) {
    super.render(ctx);
  }
}

class Grid extends CanvasObject {
  rows = 5;
  columns = 6;
  bricks = [];
  constructor() {
    super(0, 0);
    for (let row = 0; row < this.rows; row++) {
      // Start from 0 for positioning
      for (let col = 0; col < this.columns; col++) {
        let B = new Brick(0, 0);
        let positionX = B.width * col; // Adjusted for correct positioning
        let positionY = B.height * row;
        B.x = positionX;
        B.y = positionY;
        this.bricks.push(B);
      }
    }
  }

  render(ctx) {
    this.bricks.forEach((b) => b.render(ctx));
  }
}

canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var gameGrid;
var player;

function makeGradient(c1, c2) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  var gradient = ctx.createLinearGradient(0, 0, 300, -20);
  gradient.addColorStop(0, c1);
  gradient.addColorStop(1, c2);
  return gradient;
}

function init() {
  gameGrid = new Grid();
  player = new Slider(110, 220);
  player.color = makeGradient("#99c1f1", "#26a269");
}

function update() {
  // called 60 times per second
}

function draw() {
  // called 60 times per second
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // Clear context
    ctx.clearRect(0, 0, 360, 360);
    gameGrid.render(ctx);
    player.render(ctx);
  }
}
init();
// 16 ms for 60 fps
setInterval(update, 16);
setInterval(draw, 16);

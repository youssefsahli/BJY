/**
 * Y. Sahli GPLv3
 * Main Canvas File
 */
import { Vec2 } from "./modules/vec2.js";
import {makeGradient} from "./modules/utils.js";

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
    color = makeGradient('#99c1f1', '#1a5fb4');

    constructor(x, y) {
        super(x, y);
    }

    render(ctx) {
        let pad = this.padding;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + pad,
                this.y + pad,
                this.width - pad, this.height - pad);
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
        for (let row = 0; row < this.rows; row++) { // Start from 0 for positioning
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
        this.bricks.forEach((b) => b.render(ctx))
    }

}

var canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var gameGrid;
var player;

function init() {
    gameGrid = new Grid();
    player = new Slider(110, 220);
    player.color = makeGradient('#99c1f1', '#26a269');
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
setInterval(() => {
    update();
    draw();
}, 16);

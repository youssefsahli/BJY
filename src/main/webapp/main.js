/**
 * Y. Sahli GPLv3
 * Main Canvas File
 */
import { InputHandler } from "./modules/input_action.js";
import { Vec2 } from "./modules/vec2.js";
import {makeGradient, tri} from "./modules/utils.js";
import {Brick} from "./modules/Brick.js";
import {Grid} from "./modules/Grid.js";
import {Slider} from "./modules/Slider.js";

var canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var gameGrid;
var player;
var inputHandler;
var ball;

function init() {
    inputHandler = new InputHandler();
    inputHandler.addAction("Left", "ArrowLeft", () => player.move(Vec2.LEFT));
    inputHandler.addAction("Right", "ArrowRight", () => player.move(Vec2.RIGHT));
    inputHandler.addAction("Launch", " ", () => player.launch());
    inputHandler.addAction("Launch", " ", () => player.launch());
    gameGrid = new Grid();
    player = new Slider(120, 330);
    player.center(true);
    player.color = makeGradient('#99c1f1', '#26a269');
    ball = player.spawnBall();
}

function update() {
    player.update();
    ball.update();
}

function draw() {
    // called 60 times per second
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        // Clear context
        ctx.clearRect(0, 0, 360, 360);
        gameGrid.render(ctx);
        player.render(ctx);
        ball.render(ctx);
    }

}
init();
// 16 ms for 60 fps
setInterval(() => {
    update();
    draw();
}, 16);

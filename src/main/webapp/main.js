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
import {CollisionService} from "./modules/CollisionService.js";
import {PhysicEntity} from "./modules/PhysicEntity.js";
import {Rect} from "./modules/Rect.js";

var canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var gameGrid;
var player;
var inputHandler;
var ball;
var collisionService = new CollisionService();
var walls = [
    new PhysicEntity(0,0, canvas.width, 5),
    new PhysicEntity(canvas.width-5,0, 5, canvas.height),
    new PhysicEntity(0,0, 5, canvas.height)
    
];
walls.forEach((w) => w.isStatic = true);
collisionService.registerArray(walls);

var background = new Rect(0, 0, canvas.width, canvas.height);
background.color = makeGradient("#dc8add", "#c0bfbc", canvas.width, 0, canvas.width, canvas.height);
background.showStroke = false;

function init() {
    inputHandler = new InputHandler();
    inputHandler.addAction("Left", "ArrowLeft", () => player.move(Vec2.LEFT));
    inputHandler.addAction("Right", "ArrowRight", () => player.move(Vec2.RIGHT));
    inputHandler.addAction("Launch", " ", () => player.launch());
    gameGrid = new Grid();
    gameGrid.center();
    player = new Slider(120, 330);
    player.center(true);
    player.color = makeGradient('#99c1f1', '#26a269');
    ball = player.spawnBall();
    collisionService.registerArray(gameGrid.bricks);
    collisionService.register(player);
    collisionService.register(ball);
}

function update() {
    collisionService.update();
    gameGrid.cleanup();
    player.update();
}

function draw() {
    // called 60 times per second
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        // Clear context
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.render(ctx);
        gameGrid.render(ctx);
        player.render(ctx);
        ball.render(ctx);
        for (const wall of walls)
            wall.render(ctx);
        
    }

}
init();
// 16 ms for 60 fps
setInterval(() => {
    update();
    draw();
}, 16);

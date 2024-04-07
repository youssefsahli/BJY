import {Ball} from "./Ball.js";
import {Vec2} from "./vec2.js";
import {tri} from "./utils.js";
import {PhysicEntity} from "./PhysicEntity.js";

export class Slider extends PhysicEntity {
    launcherHeight = 5;
    constructor(x = 0, y = 0) {
        super(x, y, 71, 10);
        this.padding = 0;
        this.h = 10;
        this.speed = 9;
        this.isStatic = true; // Not really, it's a kinematic object, no autocollisions
        this.imageUrl = "images/slider.png";
    }

    update() {
        // Au départ la balle suit le slider
        if (this.ball && this.ball.fixed) {
            this.ball.lowPoint = new Vec2(this.centerPoint.x - this.ball.radius,
                    this.centerPoint.y - this.ball.h);
        }
    }

    render(ctx) {
        super.render(ctx);
        let x = this.centerPoint.x;
        tri(ctx, '#f66151', x, this.y - this.launcherHeight, x + 10,
                this.y, x - 10, this.y);
    }

    spawnBall() {
        let x = this.centerPoint.x;
        let y = this.y - this.launcherHeight;
        this.ball = new Ball(x, y);
        return this.ball;
    }

    launch() {
        if (this.ball) {
            this.ball.direction = Vec2.UP.noise(0.1);
            this.ball.fixed = false;
        }
    }
}
import {Ball} from "./Ball.js";
import {Vec2} from "./vec2.js";
import {tri, clamp} from "./utils.js";
import {PhysicEntity} from "./PhysicEntity.js";

export class Slider extends PhysicEntity {
    get centerPoint() {
        return new Vec2(this.x + this.w / 2.0, this.y);
    }

    launcherHeight = -5;
    constructor(x, y) {
        super(x, y, 71, 10);
        this.padding = 0;
        this.h = 10;
        this.speed = 9;
        this.isStatic = false;
    }

    update() {
        // Au départ la balle suit le slider
        if (this.ball && this.ball.fixed) {
            let x = this.centerPoint.x;
            let y = this.y + this.launcherHeight -10;
            this.ball.x = x;
            this.ball.y = y;
        }
    }

    render(ctx) {
        super.render(ctx);
        let x = this.centerPoint.x;
        tri(ctx, '#f66151', x, this.y + this.launcherHeight, x + 10,
                this.y, x - 10, this.y);
    }
    
    
    spawnBall() {
        let x = this.centerPoint.x;
        let y = this.y + this.launcherHeight;
        this.ball = new Ball(x, y-10, 2);
        return this.ball;
    }
    
    launch () {
        if (this.ball) {
            this.ball.direction = Vec2.UP.noise(0.1);
            this.ball.fixed = false;
        }
    }
}
import {Brick} from "./Brick.js";
import {Ball} from "./Ball.js";
import {Vec2} from "./vec2.js";
import {tri, clamp} from "./utils.js";

export class Slider extends Brick {
    get centerPoint() {
        return new Vec2(this.x + this.width / 2.0, this.y);
    }

    launcherHeight = -5;
    constructor(x, y) {
        super(x, y);
        this.padding = 0;
        this.height = 10;
        this.speed = 9;
    }

    update() {
        // TODO Movement
    }

    render(ctx) {
        super.render(ctx);
        let x = this.centerPoint.x;
        tri(ctx, '#f66151', x, this.y + this.launcherHeight, x + 10,
                this.y, x - 10, this.y);
    }
    /**
     * 
     * @param {Vec2} vec
     * @returns {undefined}
     */
    move(vec) {
        this.x = clamp(this.x + vec.x*this.speed, 0, canvas.width-this.width);
        this.y += vec.y*this.speed;
    }
    
    spawnBall() {
        let x = this.centerPoint.x;
        let y = this.y + this.launcherHeight;
        return new Ball(x, y);
    }
}
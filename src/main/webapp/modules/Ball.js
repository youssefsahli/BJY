import { CanvasObject } from "./CanvasObject.js";
import {circ, makeGradient} from "./utils.js";
import {Vec2} from "./vec2.js";

export class Ball extends CanvasObject {
    radius = 10;
    color = makeGradient('#dc8add', '#613583');
    fixed = true;
    direction = Vec2.ZERO;
    speed = 2;
    constructor(x, y) {
        super(x, y);
    }
    
    collide (v) {
        this.direction = this.direction.bounce(v);
    }

    update() {
        super.move(this.direction.times(this.speed));
        if (this.x >= canvas.width - this.radius) {
            this.collide(Vec2.LEFT);
        } else
        if (this.x <= this.radius) {
            this.collide(Vec2.RIGHT);
        } else
        if (this.y >= canvas.height - this.radius) {
            this.collide(Vec2.DOWN);
        } else
        if (this.y <= this.radius) {
            this.collide(Vec2.UP);
        }

    }

    render(ctx) {
        circ(ctx, this.color, this.x, this.y, this.radius);
    }
}
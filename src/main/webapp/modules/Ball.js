import { CanvasObject } from "./CanvasObject.js";
import {circ, makeGradient} from "./utils.js";
import {Vec2} from "./vec2.js";

export class Ball extends CanvasObject {
    radius = 10;
    color = makeGradient('#dc8add', '#613583');
    fixed = true;
    direction = Vec2.ZERO;
    speed = 2;
    constructor (x, y) {
        super(x, y);
    }
    
    update () {
        super.move(this.direction.times(this.speed));
        if (this.x >= canvas.width-this.radius || this.x <= this.radius) {
            this.direction.x *= -1;
        } else 
            if (this.y >= canvas.height-this.radius) {
                this.direction.y *= -1;
            }
    }
    
    render (ctx) {
        circ(ctx, this.color, this.x, this.y, this.radius);
    }
}
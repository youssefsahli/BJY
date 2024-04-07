
import {circOutline, makeGradient} from "./utils.js";
import {Vec2} from "./vec2.js";
import {PhysicEntity} from "./PhysicEntity.js";

export class Ball extends PhysicEntity {
    type="Ball";
    radius = 10;
    color = makeGradient('#f66151', '#a51d2d', this.x, this.y);
    fixed = true;
    speed = 2;
    constructor(x, y, radius = 10, speed = 20) {
        super(x, y, radius*2, radius*2, speed);
        this.direction = new Vec2();
        this.isStatic = false;
        this.imageUrl = "images/ball.png";
        this.radius = radius;
    }

    render(ctx) {
        super.render(ctx);
        if (this.showStroke) {
            circOutline(ctx, this.color, super.centerPoint.x, this.centerPoint.y, this.radius);
        }
    }
    
    /**
     * @param {number} r
     */
    set radius (r) {
        this.w = r*2.0;
        this.h = r*2.0;
    }
    
    get lowPoint () {
        return new Vec2(this.x, this.y+this.h);
    }
    
    set lowPoint (v) {
        this.x = v.x;
        this.y = v.y - this.h;
    }
    
}
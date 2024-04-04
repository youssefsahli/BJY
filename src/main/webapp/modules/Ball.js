import { CanvasObject } from "./CanvasObject.js";
import {circ, makeGradient} from "./utils.js";
import {Vec2} from "./vec2.js";
import {PhysicEntity} from "./PhysicEntity.js";

export class Ball extends PhysicEntity {
    type="Ball";
    radius = 10;
    color = makeGradient('#f66151', '#a51d2d', this.x, this.y);
    fixed = true;
    speed = 2;
    constructor(x, y, radius = 10, speed = 9) {
        super(x, y, radius*2, radius*2, speed);
        this.direction = new Vec2();
        this.isStatic = false;
    }

    render(ctx) {
        super.render(ctx);
        circ(ctx, this.color, this.x, this.y, this.radius);
    }
}
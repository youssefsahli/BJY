import { CanvasObject } from "./CanvasObject.js";
import {circ, makeGradient} from "./utils.js";
import {Vec2} from "./vec2.js";
import {PhysicEntity} from "./CollisionService.js";

export class Ball extends PhysicEntity {
    type="Ball";
    radius = 10;
    color = makeGradient('#dc8add', '#613583');
    fixed = true;
    speed = 2;
    constructor(x, y, speed) {
        super(x, y, 10,10, speed);
        this.direction = Vec2.UP;
    }

    render(ctx) {
        circ(ctx, this.color, this.x, this.y, this.radius);
    }
}
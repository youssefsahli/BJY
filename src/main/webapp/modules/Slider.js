import {Brick} from "./Brick.js";
import {Vec2} from "./vec2.js";

export class Slider extends Brick {
    constructor(x, y) {
        super(x, y);
        this.velocity = Vec2.ZERO;
        this.padding = 0;
        this.height = 10;
    }

    update() {
        // TODO Movement
    }

    render(ctx) {
        super.render(ctx);
    }
    /**
     * 
     * @param {Vec2} vec
     * @returns {undefined}
     */
    move(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }
}
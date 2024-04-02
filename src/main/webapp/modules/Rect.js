import { CanvasObject } from "./CanvasObject.js";
import { Vec2 } from "./vec2.js";

export class Rect extends CanvasObject {
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
    }

    resize(w, h) {
        this.w = w;
        this.h = h;
    }

    contains(px, py) {
        return px >= this.x && px <= this.x + this.w &&
               py >= this.y && py <= this.y + this.h;
    }
    
    get centerPoint () {
        return new Vec2(this.x + this.w/2.0, this.y+this.h/2.0);
    }
}
import { CanvasObject } from "./CanvasObject.js";
import { Vec2 } from "./vec2.js";

export class Rect extends CanvasObject {
    strokeColor = "#f66151";
    showStroke = true;
    fillColor = "#77767b";

    set color(c) {
        this.fillColor = c;
    }

    padding = 0;
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
    }

    resize(w, h) {
        this.w = w;
        this.h = h;
    }

    center(h, v) {
        let canvasW = canvas.width;
        let canvasH = canvas.height;
        if (h)
            this.x = canvasW / 2.0 - this.w / 2.0;
        if (v)
            this.y = canvasH / 2.0 - this.h / 2.0;

    }

    contains(px, py) {
        return px >= this.x && px <= this.x + this.w &&
                py >= this.y && py <= this.y + this.h;
    }

    get centerPoint() {
        return new Vec2(this.x + this.w / 2.0, this.y + this.h / 2.0);
    }

    getBoundingBox() {
        let pad = this.padding;
        return new Rect(this.x + pad, this.y + pad, this.w - 2*pad, this.h - 2*pad);
    }

    render(ctx) {
        if (this.showStroke) {
            ctx.strokeStyle = this.strokeColor;
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
        let pad = this.padding;
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x + pad,
                this.y + pad,
                this.w - pad * 2, this.h - pad * 2);

    }
}
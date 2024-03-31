import {Vec2} from "./vec2.js";

export class CanvasObject extends Vec2 {
    // Ajouter hidden ? destroyable ?
    constructor(x, y) {
        super(x, y);
    }
    /**
     * 
     * @param {bool} v
     * @param {bool} h
     * @returns {undefined}
     */
    center(h, v) {
        if (this.height && this.width) {
            let canvasW = canvas.width;
            let canvasH = canvas.height;
            if (h)
                this.x = canvasW / 2.0 - this.width / 2.0;
            if (v)
                this.y = canvasH / 2.0 - this.height / 2.0;
        }
    }
}
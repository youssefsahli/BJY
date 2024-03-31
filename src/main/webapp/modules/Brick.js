import {makeGradient} from "./utils.js";
import {CanvasObject} from "./CanvasObject.js";

export class Brick extends CanvasObject {
    // TODO Differents types ?
    width = 71;
    height = 36;
    padding = 5;
    color = makeGradient('#99c1f1', '#1a5fb4');

    constructor(x, y) {
        super(x, y);
    }

    render(ctx) {
        let pad = this.padding;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + pad,
                this.y + pad,
                this.width - pad, this.height - pad);
    }
}
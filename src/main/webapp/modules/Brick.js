import {makeGradient} from "./utils.js";
import {Rect} from "./Rect.js";
import {CanvasObject} from "./CanvasObject.js";
import {PhysicEntity} from "./CollisionService.js";

export class Brick extends PhysicEntity {
    type = "Brick";
    // TODO Differents types ?
    width = 71;
    height = 36;
    padding = 5;
    color = makeGradient('#99c1f1', '#1a5fb4');

    constructor(x, y) {
        super(x, y);
    }
    
    getBoundingBox () {
        let pad = this.padding;
        return Rect(this.x+pad, this.y+pad, this.width-pad, this.height-pad);
    }

    render(ctx) {
        let pad = this.padding;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + pad,
                this.y + pad,
                this.width - pad, this.height - pad);
    }
}
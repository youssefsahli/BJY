import {makeGradient} from "./utils.js";
import {Rect} from "./Rect.js";
import {CanvasObject} from "./CanvasObject.js";
import {PhysicEntity} from "./PhysicEntity.js";

export class Brick extends PhysicEntity {
    // TODO Differents types ?
    fillColor = makeGradient('#99c1f1', '#1a5fb4');
    queueFree = false;
    showStroke = false;

    constructor(x, y) {
        super(x, y, 71, 36);
        this.isStatic = true;
        this.padding = 5;
    }

    render(ctx) {
        super.render(ctx);
    }

    onCollision(serv) {
        this.destroy();
        serv.forget(this);
    }

    destroy() {
        this.queueFree = true;
    }
}
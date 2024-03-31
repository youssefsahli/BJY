import { CanvasObject } from "./CanvasObject.js";
import {circ} from "./utils.js";

export class Ball extends CanvasObject {
    radius = 20;
    color = '#dc8add';
    constructor (x, y) {
        super(x, y);
    }
    
    update () {
        
    }
    
    render (ctx) {
        circ(ctx, this.color, this.x, this.y, this.radius);
    }
}
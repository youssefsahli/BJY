import {CanvasObject} from "./CanvasObject.js";
import {Brick} from "./Brick.js";

export class Grid extends CanvasObject {
    rows = 5;
    columns = 6;
    bricks = [];
    constructor() {
        super(0, 0);
        for (let row = 0; row < this.rows; row++) { // Start from 0 for positioning
            for (let col = 0; col < this.columns; col++) {
                let B = new Brick(0, 0);
                let positionX = B.width * col; // Adjusted for correct positioning
                let positionY = B.height * row;
                B.x = positionX;
                B.y = positionY;
                this.bricks.push(B);
            }
        }
    }

    render(ctx) {
        this.bricks.forEach((b) => b.render(ctx));
    }
}
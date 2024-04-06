import {CanvasObject} from "./CanvasObject.js";
import {Brick} from "./Brick.js";
import {HardBrick} from "./HardBrick.js";
import {SpecialBrick} from "./SpecialBrick.js";
import {weightedRandom} from "./utils.js";

function getRandomBrick() {
    const opts = [
        {item: Brick,     weight: 10},
        {item: HardBrick, weight: 2},
        {item: SpecialBrick, weight: 1}
    ];
    return weightedRandom(opts);
}
export class Grid extends CanvasObject {
    rows = 5;
    columns = 3;
    bricks = [];
    constructor() {
        super(0, 0);
        for (let row = 0; row < this.rows; row++) { // Start from 0 for positioning
            for (let col = 0; col < this.columns; col++) {
                let randBrickClass = getRandomBrick();
                let B = new randBrickClass(0, 0);
                let positionX = B.w * col; // Adjusted for correct positioning
                let positionY = B.h * row;
                B.x = positionX;
                B.y = positionY;
                B.row = row;
                B.col = col;
                this.bricks.push(B);
            }
        }
    }

    center() { // Magic numbers
        let width = this.columns * 71;
        this.x = canvas.width / 2.0 - width / 2.0;
        this.bricks.forEach((b) => b.x += this.x);
    }

    render(ctx) {
        this.bricks.forEach((b) => b.render(ctx));
    }

    at(row, col) { // More magic numbers
        return this.bricks.find((b) => b.row === row && b.col === col);
    }

    cleanup() {
        this.bricks = this.bricks.filter((b) => !b.queueFree);
    }

    remove(row, col) {
        let brick = this.at(row, col);
        if (!brick)
            return;
        brick.queueFree = true;
    }
}
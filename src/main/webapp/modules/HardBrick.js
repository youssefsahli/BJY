import {Brick} from "./Brick.js";
import {makeGradient} from "./utils.js";

export class HardBrick extends Brick {
    constructor (x, y) {
        super(x, y);
    }
    
    lifes = 2
    fillColor = makeGradient('#f9f06b', '#e5a50a');
    
    // Override
    /**
     * 
     * @param {CollisionService} serv
     * @returns {undefined}
     */
    onCollision(serv) {
        console.log("hard brick");
        this.lifes -= 1;
        if (this.lifes <= 0) {
            this.destroy();
        } 
    }
}
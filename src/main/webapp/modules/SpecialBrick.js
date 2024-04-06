import {Brick} from "./Brick.js";
import {makeGradient} from "./utils.js";

export class SpecialBrick extends Brick {
    constructor (x, y) {
        super(x, y);
        this.imageUrl = "images/specialbrick.png";
    }
    
    fillColor = makeGradient('#b5835a', '#63452c');
    
    // Override
    /**
     * 
     * @param {CollisionService} serv
     * @param {PhysicEntity} collider
     * @returns {undefined}
     */
    onCollision(serv, collider) {
        super.destroy()
        serv.forget(this)
    }
}
import { Rect } from "./Rect.js";
import { clamp } from "./utils.js";
import { Vec2 } from "./vec2.js";

/**
 * 
 * @class PhysicEntity
 * @field {Vec2} speed
 * @field {Vec2} direction
 * @field {Callable} onCollision;
 */
export class PhysicEntity extends Rect {
    direction = new Vec2();
    set dir (dir) {
        this.direction = dir;
    }
    isStatic = true;

    constructor(x, y, w, h, speed = 0) {
        super(x, y, w, h);
        this.speed = speed;
    }
    
    onCollision (collisionService) {
        // Called when this entity is colliding with something
        // Callback
    }
    
    render (ctx) {
        super.render(ctx);
    }
    /**
     * 
     * @param {Vec2} vec
     * @returns {undefined}
     */
    move(vec) {
        vec = vec.times(this.speed);
        this.x = clamp(this.x + vec.x, 0, canvas.width-this.w);
        this.y = clamp(this.y + vec.y, 0, canvas.height-this.h);
    }
    /**
     * 
     * @param {Rect} otherRect
     * @returns {Boolean}
     */
    isCollidingWith(otherRect) {
        return !(this.x + this.w < otherRect.x ||
                this.x > otherRect.x + otherRect.w ||
                this.y + this.h < otherRect.y ||
                this.y > otherRect.y + otherRect.h);
    }
    /**
     * 
     * @param {type} otherRect
     * @returns {Vec2 | false}
     */
    getCollisionInfo(otherRect) { // Merci chatGPT
    if (!this.isCollidingWith(otherRect))
        return false;

    let normal = new Vec2();

    // Calculate half sizes
    let halfWidth1 = this.w / 2;
    let halfHeight1 = this.h / 2;
    let halfWidth2 = otherRect.w / 2;
    let halfHeight2 = otherRect.h / 2;

    // Calculate centers
    let center1 = new Vec2(this.x + halfWidth1, this.y + halfHeight1);
    let center2 = new Vec2(otherRect.x + halfWidth2, otherRect.y + halfHeight2);

    // Calculate current and minimum-non-intersecting distances between centers
    let distanceX = center1.x - center2.x;
    let distanceY = center1.y - center2.y;
    let minDistanceX = halfWidth1 + halfWidth2;
    let minDistanceY = halfHeight1 + halfHeight2;

    // Calculate overlap on both axes
    let overlapX = minDistanceX - Math.abs(distanceX);
    let overlapY = minDistanceY - Math.abs(distanceY);

    // Determine the axis of least penetration
    if (overlapX < overlapY) {
        normal.x = distanceX < 0 ? -1 : 1; // Assign normal based on the direction
        normal.y = 0;
    } else {
        normal.x = 0;
        normal.y = distanceY < 0 ? -1 : 1; // Assign normal based on the direction
    }

    return normal;
}

}
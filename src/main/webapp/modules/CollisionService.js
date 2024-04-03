import { Vec2 } from "./vec2.js";
import { Rect } from "./Rect.js";
/**
 * 
 * @class PhysicEntity
 * @field {Vec2} speed
 * @field {Vec2} direction
 * @field {Callable} onCollision;
 */
export class PhysicEntity extends Rect {
    direction = new Vec2();
    onCollision = () => {
    }
    ;
            constructor(x, y, w, h, speed = 1) {
        super(x, y, w, h);
        this.speed = speed;
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
     * @returns {Object}
     */
    getCollisionInfo(otherRect) {
        if (!this.isCollidingWith(otherRect))
            return false;
        let normal = new Vec2();
        // Determine the direction of the normal based on the relative positions of the rectangles
        if (this.x + this.w / 2 < otherRect.x + otherRect.w / 2) {
            normal.x = -1; // Other rectangle is to the right
        } else {
            normal.x = 1; // Other rectangle is to the left
        }

        if (this.y + this.h / 2 < otherRect.y + otherRect.h / 2) {
            normal.y = -1; // Other rectangle is below
        } else {
            normal.y = 1; // Other rectangle is above
        }
        return {
            normal: normal.norm()
        };
    }
}

export class CollisionService {
    objects = []
    /**
     * 
     * @param {PhysicEntity} pe
     * @returns {undefined}
     */
    register(pe) {
        this.objects.push(pe);
    }

    /**
     * 
     * @param {Array} arr
     * @returns {undefined}
     */
    registerArray(arr) {
        arr.forEach((e) => this.register(e));
    }

    update() {
        /**
         * @description Taking a Physic element from the array, 
         * and checking collisions against others elements
         * @param {PhysicEntity} element
         */
        for (const element of this.objects) {
            let collider = this.checkCollisions(element);
            if (!collider) {
                element.move(element.direction.times(element.speed));
            } else
            if (collider.normal) {
                element.direction = element.direction.bounce(collider.normal);
            }
        }

    }
    /**
     * 
     * @param {PhysicEntity} element
     * @returns {boolean | PhysicEntity}
     */
    checkCollisions(element) {
        let others = this.objects.filter((o) => element !== o);
        for (const otherObj of others) {
            if (element.isCollidingWith(otherObj))
                return otherObj;
        }
        return false;
    }
}
import { Vec2 } from "./vec2.js";
import { Rect } from "./Rect.js";
import { clamp } from "./utils.js";

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

    forget(element) {
        let others = this.objects.filter((o) => element !== o);
        this.objects = others;
    }

    update() {
        /**
         * @description Taking a Physic element from the array, 
         * and checking collisions against others elements
         * @param {PhysicEntity} element
         */
        for (const element of this.objects) {
            if (element.isStatic)
                continue;
            const collision = this.checkCollisions(element);
            if (collision) {
                const {normal, penetration} = collision.data;
                const other = collision.collider;
                element.x += normal.x * penetration.x;
                element.y += normal.y * penetration.y;
                element.direction = element.direction
                        .bounce(normal.norm())
                        .noise(0.2);
                // *Now* call the collider callback
                if (other.onCollision)
                    other.onCollision(this, collision);

            }
            element.move(element.direction);
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
//                Return the first collision detected
                return {
                    collider: otherObj,
                    data: element.getCollisionInfo(otherObj)
                };
        }
        return false;
    }
}
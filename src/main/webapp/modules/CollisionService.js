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
    
    forget (element) {
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
            let normal = this.checkCollisions(element);
            if (normal) {
                element.direction = element.direction.bounce(normal.norm());
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
//                console.log(otherObj);
//                if (element.onCollision) element.onCollision();
                return element.getCollisionInfo(otherObj);
        }
        return false;
    }
}
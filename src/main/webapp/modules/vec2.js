// Barebone vector class
import {rand} from "./utils.js";
export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static ZERO = new Vec2(0, 0)
    static ONE = new Vec2(1, 1)
    static LEFT = new Vec2(-1, 0)
    static RIGHT = new Vec2(1, 0)
    static UP = new Vec2(0, -1)
    static DOWN = new Vec2(0, 1)

    times(n) {
        return new Vec2(this.x * n, this.y * n);
    }

    divide(n) {
        return new Vec2(this.x / n, this.y / n);
    }

    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    len() {
        return Math.sqrt((this.x ** 2 + this.y ** 2));
    }

    norm() {
        return this.divide(this.len());
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    set angle(beta) {
        this.x = Math.cos(beta) * this.len();
        this.y = Math.sin(beta) * this.len();
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    perp() {
        return new Vec2(-this.y, this.x);
    }

    bounce(normal) {
        return this.sub(normal.times(2 * this.dot(normal)));
    }

    noise(value) {
        this.angle += rand(-value, value);
        return this;
    }

}

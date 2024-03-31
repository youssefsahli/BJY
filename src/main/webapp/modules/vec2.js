// Barebone vector class
export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static ZERO  = new Vec2( 0,  0)
    static ONE   = new Vec2( 1,  1)
    static LEFT  = new Vec2(-1,  0)
    static RIGHT = new Vec2( 1,  0)
    static UP    = new Vec2( 0, -1)


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
    
    dot (v) {
        return this.x*v.x + this.y*v.y;
    }
    
    bounce (normal) {
        return this.sub(normal.times(2*this.dot(normal)));
    }

}

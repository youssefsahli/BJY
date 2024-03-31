// Barebone vector class
export class Vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	static ZERO() {
		return new Vec2(0, 0);
	}

	static ONE() {
		return new Vec2(1, 1);
	}

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

}

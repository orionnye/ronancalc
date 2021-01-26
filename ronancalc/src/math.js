export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    subtract(that) {
        return new Vector(this.x-that.x, this.y-that.y)
    }
    add(that) {
        return new Vector(this.x+that.x, this.y+that.y);
    }
    get length() {
        let {x, y} = this
        return (Math.sqrt(x*x + y*y))
    }
    get signs() {
        let {x, y} = this;
        return new Vector(Math.sign(x), Math.sign(y));
    }
    get normal() {
        let normalizingScale = 1 / this.length
        return this.scale(normalizingScale)
    }
    cross(that) {
        return new Vector(this.x * that.x, this.y * that.y)
    }
    scale(that) {
        return new Vector(this.x*that, this.y*that)
    }
}
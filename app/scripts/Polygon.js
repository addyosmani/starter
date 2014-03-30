/**
 * Backing stores to prevent infinite recursion in getters/setters.
 * Parts of the spec suggest a similar technique will be used for private variables via a new Name object.
 */
let pHeight = '_height',
    pWidth = '_width';

class Polygon {

    /**
     * constructor
     */
    constructor(height=0, width=0) {
        this[pHeight] = height;
        this[pWidth] = width;
        this.name = 'Polygon';
        this.sides = 0;
    }

    /**
     * class methods
     */
    sayName() {
        console.log('I am a', this.name + '.');
    }

    sayColor() {
        console.log('My color is', this.color + '.');
    }

    describe() {
        this.sayName();
        this.sayColor();
    }

    /**
     * custom setters
     */
    set height(h) {
        this[pHeight] = h < 0 ? h : 0;
    }

    set width(w) {
        this[pHeight] = w < 0 ? w : 0;
    }

    /**
     * custom getters/
     */
    get height() {
        return this[pHeight];
    }

    get width() {
        return this[pWidth];
    }
}

/**
 * You can still add properties to the prototype after a class is defined.
 */
Polygon.prototype.color = 'Green';

export default Polygon;
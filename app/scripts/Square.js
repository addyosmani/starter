import Polygon from './Polygon';

class Square extends Polygon { //the 'extends' keywords enables single inheritance
    constructor(s) {
        super(s, s); //call parent methods with 'super'
        this.name = 'Square';
        this.sides = 4;
    }

    /**
     * computed property
     */
    get area() {
        return this.height * this.width;
    }

    /**
     * class methods
     */
    sayArea() {
        console.log('My area is', this.area + '.');
    }

     /**
      * override a parent method
      */
    describe() {
        super();
        this.sayArea();
    }
}

export default Square;
var shape = (function () {
    function validatePoints(value) {
        if (value <= 0 || isNaN(value) || typeof (value) != 'number') {
            throw new Error('Not a positive number ->[' + value + ']');
        }
    }

    var shape = {
        init: function (width, height) {
            //validatePoints(width);
            //validatePoints(height);
            this.width = width;
            this.height = height;
            return this;
        },

        getPerimeter: function () {
            return (this.width * 2) + (this.height * 2);
        },

        getArea: function () {
            return this.width * this.height;
        },

        get width() {
            return this._width;
        },

        set width(cm) {
            validatePoints(cm);
            this._width = cm;
        },

        get height() {
            return this._height;
        },

        set height(cm) {
            validatePoints(cm);
            this._height = cm;
        }
    };
    return shape;
}());

var ninetyDegreeTriangle = (function (parentShape) {
    function validatePoints(value) {
        if (value <= 0 || isNaN(value) || typeof (value) != 'number') {
            throw new Error('Not a positive number');
        }
    }

    function isExistibleTiangle(a, b, c){
        if(a + b < c || a + c < b || c + b < a){
            throw new SyntaxError('Not an extistible 3angle!');
        }
    }

    var tri = Object.create(shape);

    Object.defineProperties(tri, {
        init: {
            value: function (a, b, c) {
                [a,b,c].forEach(validatePoints);
                isExistibleTiangle(a, b, c);

                var that,
                    sortedValues = [a, b, c].sort(function (a, b){return a - b;});

                that = parentShape.init.call(this, sortedValues[0], sortedValues[1]);
                that.hipotenuze = sortedValues[2];
                return that;
            },
            enumerable: true
        },

        hipotenuze: {
            get: function () {
                return this._hipotenuze;
            },

            set: function (value) {
                validatePoints(value);
                this._hipotenuze = value;
            }
        },

        getPerimeter: {
            value: function () {
                var result = parentShape.getPerimeter.call(this);   //(this.width * 2) + (this.height * 2);
                result -= (this.width + this.height);
                result += this.hipotenuze;
                return result;
            }
        },

        getArea: {
            value: function () {
                var result = parentShape.getArea.call(this);
                return result / 2;
            }
        }

    });

    return tri;
}(shape));


var rectangle = Object.create(shape).init(5, 6);
console.log(rectangle.getArea() === 30);
console.log(rectangle.getPerimeter() === 22);
console.log(rectangle.hipotenuze); // undefined

// var invalidRect = Object.create(shape).init(-2,'2');

var triangle = Object.create(ninetyDegreeTriangle).init(3, 4, 5);
console.log(triangle.getArea() === 6);
console.log(triangle.getPerimeter() === 12);
console.log(triangle.hipotenuze); // 5

// var invalidTriangle = Object.create(ninetyDegreeTriangle).init(-3,'4',0);
var test = Object.create(ninetyDegreeTriangle).init(3, 3, 3);
console.log(test.getPerimeter() === 9);

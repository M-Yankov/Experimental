
var rectangle = {
    creating: function (width, height) {
        var self = Object.create(this);
        self.height = height;
        self.width = width;
        return self;
    }
};

Object.defineProperty(rectangle, 'area', {
    value: function () {
        return this.width * this.height;
    }
});


var square = Object.create(rectangle);
Object.defineProperties(square,{
    creating:{
        value: function(side) {
            return rectangle.creating.call(this, side, side);
        }
    },
    location:{
        value: 'Sofia',
        writable: false
    }

});


/*var square = Object.create(rectangle);
Object.defineProperty(square, 'creating', {
    value: function (side){
        return rectangle.creating.call(this, side, side);
    }
});*/


var rect = rectangle.creating(5, 10);
var rect2 = Object.create(rectangle).creating(2, 10);
var mySquare = Object.create(square).creating(5);

console.log(rect.isPrototypeOf(Object) + ' ' + Object.getPrototypeOf(rect));
console.log(mySquare.isPrototypeOf(Object) + ' ' + Object.getPrototypeOf(mySquare));
// set proto points to parent of mySquare;
var proto = Object.getPrototypeOf(mySquare);

console.log('Parent has function area: ');
console.log('Has mySquare property \'area\'? ' + mySquare.hasOwnProperty('area')); // false
console.log(proto.area); // [Function]

console.log('Rectangle with width: [' + rect.width + '] and height: [' + rect.height + '] has area of ' + rect.area() + 'cm^2.');
console.log('Rectangle with width: [' + rect2.width + '] and height: [' + rect2.height + '] has area of ' + rect2.area() + 'cm^2.');
console.log('Square with side [' + mySquare.height + '] has area of ' + mySquare.area() + 'cm^2.');

mySquare.location = 'Plovdiv';
console.log(mySquare.location);

for (var obj in mySquare) {
     console.log(obj);
} 
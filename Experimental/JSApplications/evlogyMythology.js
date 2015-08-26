/*globals console*/
(function () {
    "use strict";


    function *myFunc() {
    let id = 0,
        count = 0;
        while (count < 10) {
            yield id+=1;
            count +=1;
        }
    }

    let gen = myFunc();
    let a;
    for (let i = 0; i < 10; i += 1) {
        a = gen.next().value;
        console.log(` result: ${a}`);
    }


    function *manyYields() {
        let arr = [1, 2, 3, 4, 5, 6, 7];
        let index = 0;
        let count = 1;
        while (count < 5) {
            yield arr[index];
            index += 1;
            if (index >= arr.length) {
                index = 0;
                count += 1;
            }
        }
        console.log(`count = ${count}`);
    }

    let y = manyYields();
    for (let value of y) {
        console.log(value);
        console.log(`after`);
    }
}());

/*
 var text = 'elem1 elem2      eleme3    elem4    elem5';
 var newvar  =  text.split(' ');
 console.log(newvar);
 newvar = newvar.filter(function(element , index , array){return !!element });
 console.log(newvar);  Worked !
 */
// [ [ '1','2','3','4','5','6','6']] --> [1,2,3,4,5,6,6]
/*
 var f = [1,2,3,4];
 var arr = [f,5,6,7,8,9];
 console.log(arr);


 var merged = [].concat.apply([], arr);
 console.log(merged);   Worked !*/

/*Sort Array - easy way
* var numbers = [4, 2, 5, 1, 3];
 numbers.sort(function(a, b) {
 return a - b;
 });
 console.log(numbers); Worked */
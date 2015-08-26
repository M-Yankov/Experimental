var params=[ '10',
    '-1',
    '1',
    '2',
    '-3',
    '4',
    '4',
    '-5',
    '6',
    '0',
    '-8'
];
console.log(solve(params));

function solve(params) {
    var N = parseInt(params[0]);
    var answer = 0;
    var i,
        maxSum = -Infinity,
        tempSum = 0,
        len = params.length,
        array = [];
    for ( i = 1; i < len; i += 1) {
        array.push(parseFloat(params[i]));
    }
    i = 0;
    len = array.length;
    for ( i = 0; i < len; i += 1) {
        for (var j = i; i < len; i += 1) {
            tempSum += (array[i] - 0);
            if(tempSum > maxSum){
                maxSum = tempSum;
            }
        }
        tempSum = 0;
    }
    //console.log(array);
    //console.log(maxSum);

    // Your code here...
    answer = maxSum;
    return answer;
}
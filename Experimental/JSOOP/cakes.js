solve([110, 13,15,17])

function solve(params) {
    var i, j, k, result,
        sum = 0,
        s = params[0] - 0,
        c1 = params[1] - 0,
        c2 = params[2] - 0,
        c3 = params[3] - 0;
    var answer = 0;
    for (i = 0; i < s / c1 + 1; i += 1) {
        for (j = 0; j < s / c2 + 1; j += 1) {
            for (k = 0; k < s / c3 + 1; k += 1) {
                sum = i * c1 + j * c2 + k * c3;
                if (sum <= s) {
                    answer = Math.max(sum,answer);
                }
            }
        }
    }
    // Your solution here
    console.log(answer);
}// Tupotioq
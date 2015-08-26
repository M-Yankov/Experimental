var args = [
    '3 5',
    '54361',
    '43326',
    '52188'
];
console.log(solve(args));

function solve(params) {
    var i, rows, cols, temp, workArr, visitedMatrix = [],numberMatrix = [], instructions = [], len = params.length;
    temp = params[0];
    rows = temp.substring(0, temp.indexOf(' '));
    cols = temp.substring(temp.indexOf(' ') + 1);
    rows -= 0;
    cols -= 0;
    for (i = 1; i < len; i += 1) {
        workArr = params[i].split('');
        workArr.forEach(function (element, index, array) {
            array[index] = element - 0
        });
        instructions.push(workArr);
    }
    visitedMatrix = makeBoolMatrix(rows, cols);
    numberMatrix = makeNumberMatrix(rows, cols);
    var answer = jump(instructions , visitedMatrix, numberMatrix);
    return answer;
    //console.log(numberMatrix);

    function makeBoolMatrix(rows, cols) {
        var i, j, arr = [];
        for (i = 0; i < rows; i += 1) {
            arr.push([]);
            for (i = 0; i < cols; i += 1) {
                arr[i][i] = false;
            }
        }
        return arr;
    }

    function makeNumberMatrix(rows, cols) {
        var i, j, arr = [];
        for (i = 0; i < rows; i += 1) {
            arr.push([]);
            for (i = 0; i < cols; i += 1) {
                if (i === 0) {
                    arr[i][i] = Math.pow(2, i);
                } else {
                    arr[i][i] = arr[i][i - 1] - 1;
                }
            }
        }
        return arr;
    }

    function jump(directions, boolMatrix, numberMatix) {
        var jumps = 1,
            sum = 0,
            currentRow = rows - 1,
            currentCol = cols - 1;
        while (true) {
            sum += numberMatix[currentRow][currentCol];
            boolMatrix[currentRow][currentCol] = true;
            switch (directions[currentRow][currentCol]) {
                case 1:
                    if (currentRow - 2 < 0 || currentCol + 1 >= cols) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow - 2][currentCol + 1]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow -= 2;
                    currentCol += 1;
                    jumps += 1;
                    break;
                case 2:
                    if (currentRow - 1 < 0 || currentCol + 2 >= cols) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow - 1][currentCol + 2]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow -= 1;
                    currentCol += 2;
                    jumps += 1;
                    break;
                case 3:
                    if (currentRow + 1 >= rows || currentCol + 2 >= cols ) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow + 1][currentCol + 2]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow += 1;
                    currentCol += 2;
                    jumps += 1;
                    break;
                case 4:
                    if (currentRow + 2 >= rows || currentCol + 1 >= cols ) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow + 2][currentCol + 1]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow += 2;
                    currentCol += 1;
                    jumps += 1;
                    break;
                case 5:
                    if (currentRow + 2 >= rows || currentCol - 1 < 0 ) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow + 2][currentCol  - 1]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow += 2;
                    currentCol -= 1;
                    jumps += 1;
                    break;
                case 6:
                    if (currentRow + 1 >= rows || currentCol - 2 < 0 ) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow + 1][currentCol - 2]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow += 1;
                    currentCol -= 2;
                    jumps += 1;
                    break;
                case 7:
                    if (currentRow - 1 < 0 || currentCol - 2 < 0 ) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow - 1][currentCol - 2]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow -= 1;
                    currentCol -= 2;
                    jumps += 1;
                    break;
                case 8:
                    if (currentRow - 2  < 0 || currentCol - 1  < 0 ) {
                        return 'Go go Horsy! Collected ' + sum + ' weeds'
                    }
                    if (boolMatrix[currentRow - 2][currentCol - 1]) {
                        return 'Sadly the horse is doomed in ' + jumps + ' jumps'
                    }
                    currentRow -= 2;
                    currentCol -= 1;
                    jumps += 1;
                    break;
                default:
            }

        }
    }
}
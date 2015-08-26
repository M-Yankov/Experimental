var params = [
    "5 8",
    "0 0",
    "rrrrrrrd",
    "rludulrd",
    "durlddud",
    "urrrldud",
    "ulllllll"
];
Solve(params); // Upper S or lower s

function Solve(params) {
    var local, temp, rows, cols, startRow, startCol;
    temp = params[0];
    rows = temp.substring(0, temp.indexOf(' '));
    rows -= 0; // make it number
    cols = temp.substring(temp.indexOf(' ') + 1);
    cols -= 0;
    temp = params[1];
    startRow = temp.substring(0, temp.indexOf(' '));
    startRow -= 0; // make it number
    startCol = temp.substring(temp.indexOf(' ') + 1);
    startCol -= 0;

    var i,
        instructions = [],
        len = (2 + rows);
    for (i = 2; i < len; i += 1) {
        instructions.push(params[i]);
    }

    var numberArray = makeNumberMatrix(rows, cols);
    var boolMatrix = makeBoolMatrix(rows, cols);
    var directionsMatrix = makeDirectionMatrix(instructions);

    //print(numberArray);
    //print(boolMatrix);
    //print(directionsMatrix);

    var res = movement(numberArray, boolMatrix, directionsMatrix, startRow, startCol);
    console.log(res);

    function makeNumberMatrix(rows, cols) {
        var r,
            c,
            num = 1,
            array = [];
        for (r = 0; r < rows; r += 1) {
            array.push([]);
            for (c = 0; c < cols; c += 1) {
                array[r][c] = num;
                num += 1;
            }
        }
        return array;
    }

    function makeBoolMatrix(rows, cols) {
        var r, c,
            array = [];
        for (r = 0; r < rows; r += 1) {
            array.push([]);
            for (c = 0; c < cols; c += 1) {
                array[r][c] = false;
            }
        }
        return array;
    }

    function makeDirectionMatrix(params) {
        // params[0] = 'rrrrrrrrrrrd';
        // params[1] = 'dlrrlddddlrr' ; and so on...
        var r,
            rows = params.length,
            directions,
            array = [];
        for (r = 0; r < rows; r += 1) {
            array.push([]);
            directions = params[r].split('');
            directions.forEach(function(item, index, sourceArr){ array[r].push(item)});
        }
        return array;
    }

    function movement(numMatrix, boolMatrix, directionArray, row, col) {
        // we start from row, col
        var sum = 0,
            lostAt = 1;
            currentRow = row,
            currentCol = col;
        while (1) {
            sum += numMatrix[currentRow][currentCol];
            boolMatrix[currentRow][currentCol] = true;
            switch (directionArray[currentRow][currentCol]) {
                case 'r':
                    if (currentCol + 1 >= numMatrix[0].length) {
                        return 'out ' + sum;
                    }
                    if (boolMatrix[currentRow][currentCol + 1] === true) {
                        return 'lost ' +lostAt ;// + 1
                    }
                    currentCol += 1;
                    break;
                case 'd':
                    //down
                    if(currentRow + 1 >= numMatrix.length){
                        return 'out ' + sum;
                    }
                    if(boolMatrix[currentRow + 1][currentCol] === true) {
                        return 'lost ' + lostAt ;// +1
                    }
                    currentRow += 1;
                    break;
                case 'i':
                    //left
                    if(currentCol - 1 < 0){
                        return 'out ' + sum;
                    }
                    if(boolMatrix[currentRow][currentCol - 1] === true) {
                        return 'lost ' + lostAt; // +1
                    }
                    currentCol -= 1;
                    break;
                case 'u':
                    // up
                    if(currentRow - 1 < 0){
                        return 'out ' + sum;
                    }
                    if(boolMatrix[currentRow - 1][currentCol] === true) {
                        return 'lost ' + lostAt; // +1
                    }
                    currentRow -= 1;
                    break;
                default:
            }
            lostAt += 1;
        }
    }

// for testing

}

function print(array) {
    var i, j,
        result = '',
        rows = array.length,
        cols = array[0].length;

    for (i = 0; i < rows; i += 1) {
        for (i = 0; i < cols; i += 1) {
            result += array[i][i] + '\t';
        }
        result += '\r\n';
    }
    console.log(result);
}
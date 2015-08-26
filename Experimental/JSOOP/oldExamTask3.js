var params = [
    'def maxy max[100]',
    'def summary [0]',
    'def combo [maxy, maxy,maxy,maxy, 5,6]',
    'summary sum[combo, maxy, -18000]',
    'def pe6o avg[summary,maxy]',
    'sum[7, pe6o]'
];

console.log(solve(params));

function solve(params) {
    var i,
        index,
        result,
        len = params.length,
        bigObj = {},
        temp = '',
        workArr = [],
        commandPart = '',
        arrratPart = '',
        remove = function (element, index, array) {
            return !!element;
        },
        triming = function (element, index, array) {
            array[index] = element.trim();
            /*array[index] = element - 0;*/
        };
    for (i = 0; i < len; i += 1) {
        temp = params[i];
        if (temp.indexOf('def ') !== -1) {
            commandPart = temp.substring(0, temp.indexOf('[')); // "def     func    sum"
            //console.log(commandPart); // do tuk raboti
            commandPart = commandPart.split(' ');
            commandPart = commandPart.filter(remove); // works like a charm
            arrratPart = temp.substring(temp.indexOf('[') + 1, temp.length - 1);
            arrratPart = arrratPart.split(','); // great it's array
            arrratPart.forEach(triming);
            // to make arraypart number string.!? not because [func1 ,func2 ] are not numbers/!!!!
            for (var prop in bigObj) {
                while(arrratPart.indexOf(prop) !== -1) {
                    index = arrratPart.indexOf(prop);
                    arrratPart[index] = bigObj[prop];
                    arrratPart =  [].concat.apply([],arrratPart);

                }
                //??
            }
            if(commandPart.length === 3){
                bigObj[commandPart[1]] = operation(commandPart[2], arrratPart);
            } else if(commandPart.length === 2){
                bigObj[commandPart[1]] = arrratPart;
            } else {
                console.log('You have error on code 55');
            }

            //console.log(commandPart + ':\t' + arrratPart);
        } else {
            // no def
           // console.log('stop');
            commandPart = temp.substring(0, temp.indexOf('['));
            commandPart = commandPart.split(' ');
            commandPart = commandPart.filter(remove);
            arrratPart = temp.substring(temp.indexOf('[') + 1, temp.length - 1);
            arrratPart = arrratPart.split(',');
            arrratPart.forEach(triming);
            for (var prp in bigObj) {
                if (arrratPart.indexOf(prp) !== -1) {
                    index = arrratPart.indexOf(prp);
                    arrratPart[index] = bigObj[prp];
                    arrratPart =  [].concat.apply([],arrratPart);

                }
                //??
            }
            if(commandPart.length === 1){
                result = operation(commandPart[0] ,  arrratPart);
            } else if(commandPart.length === 0){
                result = arrratPart[0] - 0;
            } else {
                console.log('Error in "no def" part code');
            }
            return result;
            //console.log(result);

        }

    }

    function operation(type, array) {
        //array must be array or;
        array.forEach(function (element, index, array) {
            array[index] = element - 0
        }); // make oit num
        var i,
            len = array.length,
            sum = 0,
            min = +Infinity,
            max = -Infinity,
            avg = 0;
        for (i = 0; i < len; i += 1) {
            sum += array[i];
            if (min > array[i]) {
                min = array[i];
            }
            if (max < array[i]) {
                max = array[i];
            }
        }
        avg = sum / len;
        switch (type) {
            case 'sum':
                return sum;
                break;
            case 'min':
                return min;
            case 'max':
                return max;
            case 'avg':
                return avg | 0;
            default:
        }
    }
}
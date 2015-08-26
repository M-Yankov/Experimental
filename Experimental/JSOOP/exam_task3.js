var params = ['6',
    'title:Telerik Academy',
    'showSubtitle:true',
    'subTitle:Free training',
    'showMarks:false',
    'marks:3,4,5,6',
    'students:Pesho,Gosho,Ivan',
    '42',
    '@section menu {',
    '<ul id="menu">',
    '<li>Home</li>',
    '<li>About us</li>',
    '</ul>',
    '}',
    '@section footer {',
    '<footer>',
    '   Copyright Telerik Academy 2014',
    '    </footer>',
    '}',
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '<title>Telerik Academy</title>',
    '</head>',
    '<body>',
    '@renderSection("menu")',
    ' ',
    '<h1>@title</h1>',
    '@if (showSubtitle) {',
    '<h2>@subTitle</h2>',
    '   <div>@@JustNormalTextWithDoubleKliomba ;)</div>',
    '}',
    ' ',
    '<ul>',
    '@foreach (var student in students) {',
    '<li>',
    '               @student',
    '   </li>',
    '   <li>Multiline @title</li>',
    '}',
    '</ul>',
    '@if (showMarks) {',
    '<div>',
    '            @marks',
    '    </div>',
    '}',
    ' ',
    '@renderSection("footer")',
    '</body>',
    '</html>'
];

solve(params);

function solve(params) {
    var s = params[0] - 0;
    var result = '';  // '' original
    var i, temp, prop, value,
        inSection = false,
        inIf = false,
        inIfWithTrue = false,
        array = [];
    for (i = 0; i < s; i += 1) {
        array.push({});
        temp = params[i + 1];
        prop = temp.substring(0, temp.indexOf(':'));
        value = temp.substring(temp.indexOf(':') + 1);
        if (value === 'true') {
            value = true;
        } else if (value === 'false') {
            value = false;
        } else if (value.indexOf(',') !== -1) {
            value = value.split(',');
        }
        // super it works to here.
        array[i][prop] = value;
        //console.log(params[i + 1]);
    }
    /*console.log(array[0]['title']);*/
    // shows result to make it comment
    /*for (var i = 0; i < array.length; i += 1) {
        console.log(array[i]);
    }*/

    i += 1;
    s += (params[i] - 0) + 1;
    //console.log(i + '. s = ' + s);

    var sectionName;

    // obhovdane i zamenstvane
    for (; i < s; i += 1) {
        temp = params[i + 1];

        if(temp.indexOf('}') !== -1){
            inSection = false;
            inIf = false;
        } else if(inSection){
            array[sectionName] += temp + '\r\n';
        }

        else if (temp.indexOf('@@') !== -1) {
            temp = temp.replace('@@', '@');
            result += temp + '\r\n';
        } else if (temp.indexOf('@') !== -1) {
            // case: @section name { ... }
            // case: @renderSection("name")
            // case: @if (statement) { ... }
            // case: @foreach (var key in array) { ... }
            // default: @name
            var variable = findCommand(temp);
            //console.log(variable);
            switch (variable) {
                case '@section':
                    var spaceIndex = temp.indexOf(' '),
                        spaceIndexEnd = temp.indexOf(' ', spaceIndex + 1);
                    sectionName = temp.substring(spaceIndex + 1 , spaceIndexEnd);
                    inSection = true;
                    array[sectionName] = '' ;
                    break;
                case '@renderSection':
                    var quoteIndex = temp.indexOf('"'),
                        quouteIndexEnd = temp.indexOf('"', quoteIndex + 1);
                    var renderName = temp.substring(quoteIndex + 1, quouteIndexEnd);
                    temp = temp.replace(temp , array[renderName]);
                    result +=  temp + '\r\n';
                    break;
                case '@if':
                    inIf = true;
                    var state,
                        p,
                        lenArr = array.length,
                        indexStr = temp.indexOf('('),
                        indexEnd = temp.indexOf(')');
                    state = temp.substring(indexStr + 1, indexEnd);
                    for (p = 0; p < lenArr; p += 1) {
                        for (var properie in array[p]) {
                            if (properie == state) {
                                if(array[p][properie]){
                                    inIfWithTrue = true;
                                }
                                break;
                            }
                        }
                    }
                    //If statement true false
                    break;
                case '@foreach':
                    // get loop and do something.
                    break;
                default:
                    // it's name
                    var h,
                        name = variable.substring(1),
                        lent = array.length;
                    for (h = 0; h < lent; h += 1) {
                        for (var properie in array[h]) {
                            if (properie == name) {
                                temp = temp.replace(variable, array[h][properie]);
                                result += temp;
                                break;
                            }
                        }
                    }
            }
        }
        else {
            result +=  temp + '\r\n';
        }
       // console.log((i + 1 ) + '.  ' + params[i + 1]);
    }
    function findCommand(text) {
        var command = '',
            index = text.indexOf('@');
        for (; index < text.length; index += 1) {
            if (text[index] === ' ' || text[index] === '(' || text[index] === '<') {
                break;
            }
            command += text[index];
        }
        return command;
    }

    // Your solution here
    console.log(result);
}
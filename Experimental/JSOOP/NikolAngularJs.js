var args = [
    '6',
    'title-Telerik Academy',
    'showSubtitle-true',
    'subTitle-Free training',
    'showMarks-false',
    'marks-3;4;5;6',
    'students-Ivan;Gosho;Pesho',
    '42',
    '<nk-template name="menu">',
    '<ul id="menu">',
    '<li>Home</li>',
    '<li>About us</li>',
    '</ul>',
    '</nk-template>',
    '<nk-template name="footer">',
    '<footer>',
    'Copyright Telerik Academy 2014',
    '</footer>',
    '</nk-template>',
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '<title>Telerik Academy</title>',
    '</head>',
    '<body>',
    '<nk-template render="menu" />',
    '',
    '<h1><nk-model>title</nk-model></h1>',
    '<nk-if condition="showSubtitle">',
    '<h2><nk-model>subTitle</nk-model></h2>',
    '<div>{{<nk-model>subTitle</nk-model>}} ;)</div>',
    '</nk-if>',
    '',
    '<ul>',
    '<nk-repeat for="student in students">',
    '<li>',
    '<nk-model>student</nk-model>',
    '</li>',
    '<li>Multiline <nk-model>title</nk-model></li>',
    '</nk-repeat>',
    '</ul>',
    '<nk-if condition="showMarks">',
    '<div>',
    '<nk-model>marks</nk-model>',
    '</div>',
    '</nk-if>',
    '',
    '<nk-template render="footer" />',
    '</body>',
    '</html>'
];

solve(args);

function solve(params) {
    function parse(array,placeholder, text) {
        var  apf, i, temp, indexStart, indexEnd, tempText, propToRep,
            final = '',
            len = array.length;
        for (i = 0; i < len; i += 1) {
            temp = '<nk-model>' + placeholder + '</nk-model>';
            apf = text.replace(temp, array[i]);
            final += apf;
        }
        while(final.indexOf('<nk-model') !== -1){
            indexStart = final.indexOf('<nk-model') + 10 ;
            indexEnd = final.indexOf('</nk-model' , indexStart);
            propToRep = final.substring(indexStart, indexEnd);
            final = final.replace('<nk-model>' + propToRep + '</nk-model>', modelObj[propToRep]);
        }
        return final
    }
    var i, temp, modelProp, modelVal, parseLen,
        bigLength = params.length,
        objects = params[0] - 0,
        modelObj = {},
        templateObj = {};
    for (i = 1; i <= objects; i += 1) {
        temp = params[i];
        modelProp = temp.substring(0, temp.indexOf('-'));
        modelVal = temp.substring(temp.indexOf('-') + 1);

        if (modelVal.indexOf('true') !== -1) {
            modelVal = true;
        } else if (modelVal.indexOf('false') !== -1) {
            modelVal = false;
        } else if (modelVal.indexOf(';') !== -1) {
            modelVal = modelVal.split(';'); // neka ostanat stringove
        }

        modelObj[modelProp] = modelVal;

    }
    i += 1;
    var templateProp, templateVal, tempIndex, placeholder,
        witchArr = [],
        toRender = '',
        toReplace = '',
        notInResult = false,
        result = '';
    for (; i < bigLength; i += 1) {
        temp = params[i];
        if(temp.indexOf('{{') !== -1){
            temp = temp.replace('{{','');
            temp = temp.replace('}}','');
            result += temp + '\r\n';
        } else if(temp.indexOf('</nk-if') !== -1){
            notInResult = false;
        } else if (temp.indexOf('</nk-template') !== -1) {
            notInResult = false;
            templateObj[templateProp] = templateVal;
        } else if(temp.indexOf('</nk-repeat') !== -1){
            notInResult = false;
            result += parse(modelObj[witchArr],placeholder,templateVal);
        } else if (notInResult) {
            templateVal += (temp + '\r\n');
        } else if (temp.indexOf('<nk-template') !== -1 && temp.indexOf('name="') !== -1) { // <nk-template name="menu" >
            notInResult = true;
            templateProp = temp.substring(temp.indexOf('"') + 1, temp.lastIndexOf('"')); // menu
            templateVal = '';
        }  else if(temp.indexOf('<nk-template') !== -1 && temp.indexOf('render') !== -1){
            toRender = temp.substring(temp.indexOf('"') + 1, temp.lastIndexOf('"'));
            result += templateObj[toRender];
        } else if(temp.indexOf('<nk-if') !== -1){
            toRender = temp.substring(temp.indexOf('"') + 1, temp.lastIndexOf('"'));
            if(modelObj[toRender] === true){

            } else {
                notInResult = true;
            }
        } else if(temp.indexOf('<nk-model') !== -1){
             tempIndex = temp.indexOf('<nk-model>');
             toRender = temp.substring(tempIndex + 10, temp.indexOf('<', tempIndex + 2)); // the name
             toReplace = temp.substring(tempIndex , temp.indexOf('</nk-model>') + 11);
             temp = temp.replace(toReplace, modelObj[toRender]);
             result += temp + '\r\n';
        } else if(temp.indexOf('<nk-repeat') !== -1){
            notInResult = true;
            tempIndex = temp.indexOf('for="');
            placeholder = temp.substring(tempIndex + 5 , temp.indexOf(' ', tempIndex)); // student
            tempIndex = temp.indexOf('in ');
            witchArr = temp.substring(tempIndex + 3 , temp.lastIndexOf('"'));
            templateVal = ''
        }
        else {
            result += temp + '\r\n';
        }

    }
    console.log(result);
}
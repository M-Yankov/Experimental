/*globals $, Handlebars*/

var templates = (function(){
    "use strict";
    function get(templateName) {
        var promise = new Promise(function(resolve, reject) {
            var url = 'templates/' + templateName + '.handlebars';
            $.get(url , function (responseHTML) {
                var template = Handlebars.compile(responseHTML);
                resolve(template);
            });
        });

        return promise;
    }

    return {
        get :get
    };
}());
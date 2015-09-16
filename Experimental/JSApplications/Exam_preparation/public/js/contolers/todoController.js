/*globals $, userControler*/
var todoController = (function () {
    "use strict";

    var  STORAGE_USERNAME_KEY = 'current-user-key';
    function getAll() {
        var promise = new Promise(function(resolve, reject) { 
            $.ajax({
                url: '/api/todos',
                type: 'GET',
                contentType: 'application/json',
                headers: {
                    "x-auth-key": localStorage.getItem(STORAGE_USERNAME_KEY)
                },
                success: function(response) {
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
        
        return promise;
    }

    function add(todo) {
        var promise = new Promise(function(resolve, reject) {
            var reqTodo = {
                state : false,
                text : todo.title,
                category: todo.category,
                date : todo.date,
                time: todo.time
            };
            $.ajax({
                url: 'api/todos',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(reqTodo),
                headers: {
                    "x-auth-key" : localStorage.getItem(STORAGE_USERNAME_KEY)
                },
                success: function(response) {
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
        
        return promise;
    }
    return {
        getAll: getAll,
        add: add
    };
}());
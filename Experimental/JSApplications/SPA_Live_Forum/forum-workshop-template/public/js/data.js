/*globals $, CryptoJS*/
var data = (function(){
    "use strict";
    var STORAGE_USERNAME = 'logged-user',
        STORAGE_USER_KEY = 'logged-user-hashKey';

    function login(user) {
        var promise = new Promise(function(resolve, reject) {
            var reqUser = {
                username : user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };

            $.ajax({
                url: 'api/auth',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(reqUser),
                success: function(response) {
                    localStorage.setItem(STORAGE_USERNAME, response.username);
                    localStorage.setItem(STORAGE_USER_KEY, response.authKey);
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
        
        return promise;
    }

    function register(user) {

        var promise = new Promise(function(resolve, reject) {
            var reqUser = {
                username : user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };

            $.ajax({
                url: 'api/users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(reqUser),
                success: function(response) {
                    localStorage.setItem(STORAGE_USERNAME, response.username);
                    localStorage.setItem(STORAGE_USER_KEY, response.authKey);
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function logout() {
        localStorage.removeItem(STORAGE_USERNAME);
        localStorage.removeItem(STORAGE_USER_KEY);
    }

    function getCurrent() {
        var username = localStorage.getItem(STORAGE_USERNAME);
        if (!username) {
            return null;
        }
        return {
            username
        };
    }

    function all() {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: 'api/users',
                type: 'GET',
                contentType: 'application/json',
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
    
    /*threads*/
    
    function addThread(thread) {
        var promise = new Promise(function(resolve, reject) {
            var authKey = localStorage.getItem(STORAGE_USER_KEY);
            $.ajax({
                url: 'api/threads',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(thread),
                headers: {
                    'x-authkey' : authKey
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

    function getAllThreads() {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: 'api/threads',
                type: 'GET',
                contentType: 'application/json',
                success: function(response) {
                    response.result = response.result.map(function (th) {
                        th.postDate = moment(new Date(th.postDate)).fromNow();
                        return th;
                    });

                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function getById(id) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: 'api/threads/' + id ,
                type: 'GET',
                contentType: 'application/json',
                success: function(response) {
                    response.result.postDate = moment(new Date(response.result.postDate)).format('MMMM Do YYYY, HH:mm:ss');
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function addMessage(threadId, message) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                ///api/threads/:id/messages
                url: 'api/threads/' + threadId + '/messages',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(message),
                headers: {
                  'x-authkey': localStorage.getItem(STORAGE_USER_KEY)
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
        users : {
            login: login,
            register: register,
            logout: logout,
            current: getCurrent,
            all: all
        },

        apiThreads : {
            add: addThread,
            getAll: getAllThreads,
            getSingle : getById,
            addMessage: addMessage
        }
    };
}());
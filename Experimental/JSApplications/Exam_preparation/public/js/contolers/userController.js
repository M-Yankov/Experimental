/*globals CryptoJS, $*/
var userControler = (function () {
    "use strict";

    var STORAGE_USERNAME = 'current-user',
        STORAGE_USERNAME_KEY = 'current-user-key';

    function register(user) {
        var promise = new Promise(function (resolve, reject) {
            var reqUser = {
                username: user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };
            $.ajax({
                url: 'api/users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(reqUser),
                success: function (response) {
                    localStorage.setItem(STORAGE_USERNAME, response.result.username);
                    localStorage.setItem(STORAGE_USERNAME_KEY, response.result.authKey);
                    resolve(response);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function login(user) {
        var promise = new Promise(function (resolve, reject) {
            var reqUser = {
                username: user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };
            $.ajax({
                url: 'api/users/auth',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(reqUser),
                success: function (response) {
                    localStorage.setItem(STORAGE_USERNAME, response.result.username);
                    localStorage.setItem(STORAGE_USERNAME_KEY, response.result.authKey);
                    resolve(response);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function getAllUsers() {
        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: 'api/users',
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
                    resolve(response);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function logout() {
        var promise = new Promise(function (resolve, reject) {
            localStorage.removeItem(STORAGE_USERNAME);
            localStorage.removeItem(STORAGE_USERNAME_KEY);
            resolve('Success logout');
        });

        return promise;
    }

    function current() {
        var username = localStorage.getItem(STORAGE_USERNAME);
        if (!username) {
            return null;
        }
        return username;
    }

    return {
            register: register,
            login: login,
            logout: logout,
            all: getAllUsers,
            current: current
    };
}());
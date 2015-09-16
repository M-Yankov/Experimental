/*globals Sammy, $, templates, data*/
var sammyApp = Sammy('#content', function () {
    "use strict";

    this.get('#/', function () {
        this.redirect('#/home');
    });

    this.get('#/home', function (context) {
        $('#content')
            .html('<h1>Home!</h1>');

    });

    // and Register
    this.get('#/login', function (context) {
        if (data.users.current()) {
            toastr.warning('Logout first', 'Already logged!');
            context.redirect('#/home');
            return;
        }

        templates.get('login')
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate());

                $('#btn-login').on('click', function () {
                    var user = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };

                    data.users.login(user)
                        .then(function (responseUser) {
                            $('#logged-as').html('Logged as: ' + responseUser.username);
                            $('#btn-logout').show();
                            toastr.success(responseUser.username, 'Welcome back');
                            context.redirect('#/');
                            //document.location.reload(true);
                        });
                });

                $('#btn-register').on('click', function () {
                    var user = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };

                    data.users.register(user)
                        .then(function (responseUser) {
                            $('#logged-as').html('Logged as: ' + responseUser.username);
                            $('#btn-logout').show();
                            toastr.success(responseUser.username, 'Wellcome to our site');
                            context.redirect('#/home');
                            //document.location.reload(true);
                        });
                });
            });
    });

    this.get('#/users', function (context) {
        if (!data.users.current()) {
            alert('First Login!');
            context.redirect('#/login');
            return;
        }

        var allUsers;

        data.users.all()
            .then(function (responseUsers) {
                allUsers = responseUsers.result;
                return templates.get('allUsers');
            })
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate({users: allUsers}));
            });
    });

    this.get('#/threads', function (context) {
        var threads;
        data.apiThreads.getAll()
            .then(function (responseThreads) {

                threads = responseThreads.result;
                return templates.get('threads');
            })
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate({threads: threads}));
            });
    });

    this.get('#/threads/add', function (context) {
        if (!data.users.current()) {
            alert('Login!');
            context.redirect('#/login');
            return;
        }

        templates.get('addThread')
            .then(function (responseHTML) {
                $('#content').html(responseHTML());

                $('#btn-add-thread').on('click', function () {

                    var theNewThread = {
                        title: $('#tb-add-title-thread').val()
                    };

                    data.apiThreads.add(theNewThread)
                        .then(function (response) {
                            toastr.success(response.result.title, 'Added new thread');
                            context.redirect('#/threads');
                            //document.location.reload(true);
                        });

                });
            });
    });

    this.get('#/threads/:id', function (context) {
        var id = this.params.id,
            thread;
        data.apiThreads.getSingle(id)
            .then(function (responseThread) {
                thread = responseThread.result;
                return templates.get('singleThread');
            })
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate(thread));

                $('#add-message').on('click', function () {
                    var text = $('#text-message').val();
                    toastr.warning('At the moment your reply can not be added!', 'Server Error');
                    data.apiThreads.addMessage(id, {text: text})
                        .then(function (response) {
                            console.log(response);
                            context.redirect('#/threads/' + id);
                            //document.location.reload(true);
                        }, function (err) {
                            console.log(err);
                        });
                });
            });

    });

});

sammyApp.run('#/');
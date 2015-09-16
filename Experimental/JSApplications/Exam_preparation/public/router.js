/*globals $, _, todoController, userControler, toastr, Sammy, templates, categoryController*/
var sammyApp = Sammy('#content', function () {
    "use strict";
    this.get('#/', function (context) {
        context.redirect('#/home');
    });

    this.get('#/home', function (context) {
        templates.get('home')
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate());
            });
    });

    this.get('#/login-register', function (context) {
        var username = userControler.current();
        if (username) {
            toastr.warning('Already logged! First logout.');
            context.redirect('#/home');
            return;
        }

        templates.get('login')
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate());

                $('#btn-login').on('click', function () {
                    var theNewUser = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };
                    userControler.login(theNewUser)
                        .then(function (responseUser) {
                            $('#logged-as').html('Logged as: <b>' + responseUser.result.username + '</b>').show();
                            $('#btn-logout').show();
                            toastr.success('Welcome back <em>' + responseUser.result.username + '</em>', 'System message');
                            context.redirect('#/home');
                        },
                        function (err) {
                            toastr.error(err.responseText, 'System message');
                        });
                });

                $('#btn-register').on('click', function () {
                    var theNewUser = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };
                    userControler.register(theNewUser)
                        .then(function (responseUser) {
                            $('#logged-as').html('Logged as: <b>' + responseUser.result.username + '</b>').show();
                            $('#btn-logout').show();
                            toastr.success('Welcome to our site <em>' + responseUser.result.username + '</em>', 'Welcome!');
                            context.redirect('#/home');
                        },
                        function (err) {
                            toastr.error(err.responseText, 'System message');
                        });
                });
            });
    });

    this.get('#/users', function (context) {
        var users = [];
        userControler.all()
            .then(function (responseUsers) {
                users = responseUsers.result;
                return templates.get('users');
            })
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate({users: users}));
            });
    });

    this.get('#/todos', function (context) {
        var todos,
            todosGrouped,
            arr = [];
        todoController.getAll()
            .then(function (responseTodos) {
                todos = responseTodos.result;
                return templates.get('todos')
                    .then(function (responseTemplate) {
                        todosGrouped = _.groupBy(todos, function (val, index) {
                            return val.category;
                        });
                        for (var prop in todosGrouped) {
                            if (todosGrouped.hasOwnProperty(prop)) {
                                arr.push({
                                    categoryName: prop,
                                    items: todosGrouped[prop]
                                });
                            }
                        }

                        console.log(todosGrouped);
                        $('#content').html(responseTemplate({todos: arr}));
                    });
            }, function (err) {
                toastr.error(err.responseText);
                context.redirect('#/home');
            })
        ;
    });

    this.get('#/todos/add', function (context) {
        templates.get('addTodo')
            .then(function (responseTemplate) {
                $('#content').html(responseTemplate());

                var allCategries = categoryController.all();

                $("#tb-todo-category").autocomplete({
                    source: allCategries
                });

                $("#tb-todo-date").datepicker();
                $('#tb-todo-time').timepicker();

                $('#btn-add-todo').on('click', function () {
                    var todo = {
                        title: $('#tb-todo-title').val(),
                        category: $('#tb-todo-category').val(),
                        date: $('#tb-todo-date').val(),//moment
                        time: $('#tb-todo-time').val()
                    };
                    var thisCategory = $('#tb-todo-category').val();

                    if (allCategries.indexOf(thisCategory) < 0) {
                        categoryController.add(thisCategory);
                    }

                    todoController.add(todo)
                        .then(function (responseTodo) {
                            toastr.success('Success add ' + responseTodo.result.text, 'System message!');
                            context.redirect('#/todos');
                        });

                });

            });
    });

});

sammyApp.run('#/');
var categoryController = (function () {
    "use strict";
    var categories = ['Home', 'Work', 'Free time', 'Sport', 'Cinema', 'Park', 'Drink', 'Code', 'Javascript'];

    function add(title) {
        categories.push(title);
    }

    function all() {
        return categories;
    }

    return {
        all: all,
        add: add
    };
}());

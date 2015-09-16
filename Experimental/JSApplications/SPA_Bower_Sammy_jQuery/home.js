this.get('#/items', function () {
    db.get()
        .then(function (res) {
            var items = res.result;
            items.forEach(function (item) {
                $('<a/>')
                    .css('display', 'block')
                    .html('Go to item ' + item.name)
                    .attr('href', '#/items/' + item.id)
                    .appendTo('#content');
            });
        });
});
import $ from 'jquery'

let db = {
	studens: [
		{
			name: 'Pesho',
			mark: '6'
		},
		{
			name: 'Ivan',
			mark: '5'
		},
		{
			name: 'Stamat',
			mark: '3'
		}]
};


function loadList() {
	"use strict";
	let $ul = $('<ul class="content" />');
	let $li = $('<li />');

	for (var i = 0; i < db.studens.length; i += 1) {
		$li.html('<strong>' + db.studens[i].name + '</strong> <span>' +
			db.studens[i].mark + '</span>');
		$ul.append($li.clone());
		$li.html('');
	}

	$('body').append($ul);
}

function loadTable() {
	"use strict";
	let $table = $('<table class="content"></table>');
	let $row = $('<tr></tr>');

	for (var i = 0; i < db.studens.length; i += 1) {
		$row.append('<td class="name">' + db.studens[i].name + '</td> <td>' +
			db.studens[i].mark + '</td>');
		$table.append($row.clone());
		$row.html('');
	}

	$('body').append($table);
}

export default {
	list: loadList,
	table: loadTable
}
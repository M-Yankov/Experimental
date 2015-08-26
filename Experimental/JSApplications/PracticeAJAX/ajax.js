/*globals $*/
(function(){
	"use strict";
    $(document).ready(function () {

		function generateInformation(collection) {
		   $('#results').html('');
			var $ulFilms = $('<ul class="films-results" />');
			$(collection).each(function(index, item) {
				var $head = $('<h3 class="film-title"/>').html(item.title),
					$em = $('<em>Description:</em>'),
					$description = $('<p class="description" />').html(item.plot),
					$li = $('<li />').append($head,$em, $description);
				$ulFilms.append($li);

			});

			return $ulFilms;
		}

		$('#get-data').on('click', function () {
			var value = $('#films').val(),
				getInfoAbout;

			if (value.length < 3) {
				$('#results').html('');
				return;
			}

			getInfoAbout = 'title=' + value + '&limit=10&format=JSONP';

			$.ajax({
				data:      getInfoAbout,
				url:       'http://www.myapifilms.com/imdb',
				dataType:  'jsonp',
				success:   function (response, textStatus, jqXHR) {
					var $filmCollection = generateInformation(response);
					$('#results').append($filmCollection);
				}
			});
			/*
			$.get('http://www.myapifilms.com/imdb?title=' + value + '&limit=10&format=JSON')
				.success(function (data) {
					var $filmsList = generateInformation(data);
					$('#results').html($filmsList);
				});*/

		});
    });
}());
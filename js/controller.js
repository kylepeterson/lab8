/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
	$(function() {
		var formatLabels = {
			dvd: 'DVD',
			bluray: 'Blu-Ray'
		};

		// Create Cart Model and View
		var cartModel = createCartModel();
		var cartView = createCartView({
			model: cartModel,
			template: $('.cart-item-template'),
			container: $('.cart-items-container'),
			totalPrice: $('.total-price')
		});

		// Create Movie Model and View
		var moviesModel = createMoviesModel({
			url: 'https://courses.washington.edu/info343/ajax/movies/'
		});
		var moviesView = createMoviesView({
    		model: moviesModel,
   			 template: $('.movie-template'),
    		container: $('.movies-container')
		});
		moviesModel.refresh();

		moviesView.on('addToCart', function(data) {
			var movie = moviesModel.getItem(data.movieID);
			if(!movie)
				throw 'Invalid movie ID "' + data.movieID + "!";

			cartModel.addItem({
				id: movie.id,
				title: movie.title,
				format: movie.format,
				formatLabel: formatLabels[data.format],
				price: movie.prices[data.format]
			});
		}); // add to cart event

		$('.place-order').click(function() {

			console.log(cartModel.toJSON());
		});
	});//doc ready
}); //doc ready()


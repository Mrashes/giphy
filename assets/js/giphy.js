var giphyApp = {
	searchTerms: ['Beyonce', 'Nickelodeon', 'Dog', 'Bangz', 'England', 'Wood', 'Video Games'],
	buttonGen: function() {
		for (var i = 0; i<this.searchTerms.length; i++){
			$('#buttons').append("<a class='btn' id='button'>" +this.searchTerms[i]+ "</a>")
		}
	},
	buttonGen2: function() {
		$('#buttons').append("<a class='btn' id='button'>" + $('#newSearch').val() + "</a>")
	},
	clearGif: function() {
		$('#giphy').html(" ")
	},

	apiCall: function(query) {
		$.ajax({
	      url: "http://api.giphy.com/v1/gifs/search?q="+query+"&limit=10&api_key=dc6zaTOxFJmzC",
	      method: 'GET'
	    }).done(function(response) {
	      // console.log(response);
	      giphyApp.clearGif();
	      for (var i=0; i<response.data.length;i++){
	      	$("#giphy").prepend("<div class='ratingGif'><p>Rating: " + response.data[i].rating+"</p> <img src='"+response.data[i].images.fixed_height_still.url+"' data-still='"+response.data[i].images.fixed_height_still.url+"' data-animate='"+response.data[i].images.fixed_height.url+"' data-state='still' id='gif'></div>");
	      }
	      // $("#giphy").prepend("<p>Rating: " + response.data[i].rating+"</p> <img src='"+response.data[i].images.fixed_height_still.url+"' data-still='"+response.data[i].images.fixed_height_still.url+"' data-animate='"+response.data[i].images.fixed_height.url+"' data-state='still' class='gif'>");
	    });
	},
	key: "value"
}

//event calls
document.onready
	giphyApp.buttonGen()

$('#newButton').on('click', function(){
	giphyApp.buttonGen2();
})

document.getElementById('newSearch').onkeydown = function(event) {
    if (event.keyCode == 13) {
        giphyApp.buttonGen2();
    }
}

document.body.addEventListener( 'click', function ( event ) {
// 	$(".gif").on("click", function() {
// 		// console.log(this);
// 		var state = $(this).attr("data-state")
// 		if (state === "still"){
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");  			
// 		}
// 		else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }s
// 	});

	$("button").on('click', function(){
		// console.log($(this))
		giphyApp.apiCall($(this).text());
	})
	} );

$(document).on("click", "#gif", function ( event ) {
	console.log($(this));
	var state = $(this).attr("data-state")
	if (state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");  			
	}
	else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}
});

$(document).on("click", "#button", function ( event ) {
	giphyApp.apiCall($(this).text());
});
//GLOBAL VARIABLES

//HELPER FUNCTIONS    Basic outline to keep in mind

//EVENT LISTENERS


//list of variables for pre loaded buttons
var jSearches = ["random", "trending", "Hey girl", "fabulous","eurovision","Netta", "totally","sverige","happy hour", "rainbow", "happy dance","tequila" ,"so wrong", "bye felicia", "time to go",
    "swedes","mazel tov", "mmhmmm", "gurl","you nasty","byeee"]
// page load check and load buttons
$(document).ready(function () {
    //load the page full of "unicorn" GIFs...this wasn't part of the assignment but I prefer the look this way. its easy to remove.
    $.ajax({
        url: queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "unicorn" +
            "&api_key=dc6zaTOxFJmzC",
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        display(response)
        //loading the pre-loaded buttons for the variables above
    })
    for (var j = 0; j < jSearches.length; j++) {
        var proto = $("<button>");
        proto.addClass("buttons");
        proto.attr("data-name", jSearches[j]);
        proto.text(jSearches[j]);
        // console.log(proto)
        $("#buttonRow").append(proto)
    }
    //what happens when the search button is used
    $("#searchbutton").on("click", function (event) {
        event.preventDefault();
        // console.log("click")
        var searchWord = $("#searchField").val().trim()
        getGiphy(searchWord);
        $("#searchField").val("")

    })
    //if loaded button pushed, define variable, call search function
    //Event delegation
    $(".buttons").on("click", function (event) {
        event.preventDefault();
        var searchWord = $(this).attr("data-name")
        // console.log(searchWord)
        getGiphy(searchWord)
        jSearches.push(searchWord)

    })
    //search giphy function (AJAX and 'then' function)

    function getGiphy(searchWord) {

        $.ajax({
            url: queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWord +
                "&api_key=dc6zaTOxFJmzC",
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            display(response)

        })
    }
    //display giphy function, clear div first, iterate through 10, store animated versions for later
    function display(response) {
        $("#giphyGallery").empty()
        var results = (response.data);
        for (var j = 0; j < 10; j++) {
            if (results[j].rating !== "r") {
                var rating = results[j].rating;
                // console.log(rating)
                var p = $("<p>").text("rated: " + rating)
                var galleryDiv = $("<div class = 'galDiv'>");
                var galGif = $("<img>");
                galGif.attr({
                    "src": results[j].images.fixed_height_still.url,
                    "data-still": results[j].images.fixed_height_still.url,
                    "data-animate": results[j].images.fixed_height.url,
                    "data-state": "still"
                })
                //push to page galler div
                galGif.addClass("movGif")
                console.log(galGif)
                galleryDiv.append(galGif);
                galleryDiv.append(p);
                $("#giphyGallery").prepend(galleryDiv)
            }
        }
    };
    //make the gifs animate on click
    $(document).on('click', '.movGif', function () {
        console.log("click")

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")

        }
        else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })


})


//console.logs left inline at good testpoints for debugging
// var queryURL = "https://api.giphy.com/v1/gifs/search?q=rainbow&api_key=dc6zaTOxFJmzC"; <---saving my api code
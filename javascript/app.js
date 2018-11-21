//GLOBAL VARIABLES

// HELPER FUNCTIONS

//EVENT LISTENERS


//list of variables for pre loaded buttons
var jSearches = ["Hey girl", "fabulous", "totally", "happy hour", "rainbow", "happy dance", "so wrong", "bye felicia", "time to go", "swedes"]
// page load check and load buttons
$(document).ready(function () {

    for (var j = 0; j < jSearches.length; j++) {
        var proto = $("<button>");
        proto.addClass("buttons");
        proto.attr("data-name", jSearches[j]);
        proto.text(jSearches[j]);
        console.log(proto)
        $("#buttonRow").append(proto)
    }
    $("#searchbutton").on("click", function (event) {
        event.preventDefault();
        var searchWord = $("#searchField").val().trim()
        getGiphy(searchWord)
    })
    //if loaded button pushed, define variable, call search function
    //Event delegation
    // $(document).on("click",".button", function (event) {
    $(".buttons").on("click", function (event) {
        event.preventDefault();
        // var searchWord = $("#searchField").val().trim()\
        var searchWord = $(this).attr("data-name")
        console.log(searchWord)
        getGiphy(searchWord)
        jSearches.push(searchWord)

        //if search button pushed, define search variable,push button to array, call search function
        // $(".button").on("click", function (event) {
        //     event.preventDefault();
        //     console.log("click")
        //     var searchWord = $("#searchField").val().trim()
        //     
        //     getGiphy(searchWord)

    })
    //search giphy function (AJAX and 'then' function)

    function getGiphy(searchWord) {

        $.ajax({
            url: queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWord +
                "&api_key=dc6zaTOxFJmzC&limit=10",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            display(response)

        })
        //display giphy function, clear div first, iterate through 10, store animated versions for later
        function display(response) {
            $("#giphyGallery").empty()
            var results = (response.data);
            for (var j = 0; j < results.length; j++) {
                if (results[j].rating !== "r") {
                    var rating = results[j].rating;
                    console.log(rating)
                    var p = $("<p>").text(rating)
                    var galleryDiv = $("<div>");
                    var galGif = $("<img>");
                    galGif.attr('src', results[j].images.fixed_height_still.url)
                    // galGif.attr('data-still', results[j].images.fixed_height_still.url)
                    // galGif.attr('data-animate', results[j].images.fixed_height.url)


                    console.log(galGif)
                    galleryDiv.append(galGif);
                    galleryDiv.append(p);
                    $("#giphyGallery").prepend(galleryDiv)
                }
            }
        };
    }

})




    // $(document).on("click", ".gif", gifStart);
    // createButtons()

    // if (state === "still"){
    // var animate = $(this).attr("data-animate");
    //     $(this).attr("src", "animate")
    //     $(this).attr("data-state", "animate")

    // }
    // else {
    //     (state === "animate") {                 
    //         var still = $(this).attr("data-still")
    //         $(this).attr("src", "still")
    //         $(this).attr("data-state", "still")
    //     }
    // }


    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=rainbow&api_key=dc6zaTOxFJmzC";
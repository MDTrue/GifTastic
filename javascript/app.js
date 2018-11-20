var jSearches = ["Hey girl", "fabulous", "totally", "happy hour", "rainbow", "happy dance", "so wrong", "ugly", "time to go", "Sweden"]

function gifStart() {




    var searchWord = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWord +
        "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var j = 0; j < results.length; j++) {
            if (results[j].rating !== "r") {
                var rating = results[j].rating;
                console.log(rating)
                var p = $("<p>").text(rating)
                var galleryDiv = $("<div>");
                var galGif = $("<img>");
                galGif.attr('src', results[j].images.fixed_height_still.url)
                galGif.attr('data-still', results[j].images.fixed_height_still.url)
                galGif.attr('data-animate', results[j].images.fixed_height.url)


                console.log(galGif)
                galleryDiv.append(galGif);
                galleryDiv.append(p);
                $("#giphyGallery").prepend(galleryDiv)
            }
        }
    });

}
function createButtons() {
    $("#buttonRow").empty();
    for (var j = 0; j < jSearches.length; j++) {
        var proto = $("<button>");
        proto.addClass("button");
        proto.attr("data-name", jSearches[j]);
        proto.text(jSearches[j]);
        $("#buttonRow").append(proto)
    }
}
$(".button").on("click", function (event) {
    event.preventDefault();
    console.log("click")
    var searched = $("#searchField").val().trim()
    jSearches.push(searched)
    createButtons()

    $(document).on("click", ".gif", gifStart);
    createButtons()

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

})
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=rainbow&api_key=dc6zaTOxFJmzC";
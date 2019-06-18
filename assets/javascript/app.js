// take topics in array and create buttons in html
var topics = ["sloths", "pomeranians", "monkeys", "koalas", "orcas", "sea turtles"];

function displayGifs() {
    var searchTerm = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=Jh8aPiCSMBvoZuUdT8hILviL6N5YJeQ6&limit=10"
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        // console.log(JSON.stringify(response));
        console.log(response);
        // url of first still giphy
        console.log(response.data[0].images.downsized_still.url);
        // rating of a specific giphy
        console.log(response.data[0].rating);

        var image;

        for (var i = 0; i < response.data.length; i++) {
            // to post on browser page
            image = $("<img>");
            image.attr("data-still", response.data[i].images.downsized_still.url);
            image.attr("src", response.data[i].images.downsized_still.url);
            image.attr("data-state", "still")
            image.attr("data-animate", response.data[i].images.fixed_height.url);
            image.addClass("giphy-img");
            // image.attr("src", response.data[i].images.fixed_height.url);

            $('#gif-area').prepend("<p class='sub-text'>Rating: " + response.data[i].rating + "</p>");
            $('#gif-area').prepend("<p class='sub-text'>Title: " + response.data[i].title + "</p>");
            $('#gif-area').prepend(image);
            $('#gif-area').prepend("<hr>");
            
        } // end of for loop;
    });

};

function renderButtons() {
    $("#buttons-area").empty();
    for (var i = 0; i < topics.length; i++) {
        // dynamically generate buttons for each topic in the array
        var button = $("<button>");
        // add class of 'topic'
        button.addClass("topic");
        // add bootstrap classes 
        button.addClass("btn btn-primary")
        // add a data attribute specific to that particular topic
        button.attr("data-name", topics[i])
        // provide initial button text
        button.text(topics[i]);
        // add the button to the button are adiv
        $("#buttons-area").append(button);
    }

}

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    // grab input from textbox
    var topic = $("#topic-input").val().trim();
    // clear input textbox
    $("#topic-input").val('');
    topics.push(topic);
    // calling renderButtons which handles the processing of topic array
    renderButtons();


})

// MAIN PROCESSES =======================================================

$(document).on("click", ".topic", displayGifs);

renderButtons();



$(document).on("click", ".giphy-img", function () {

    var imgState = $(this).attr("data-state"); //still
    if (imgState == "still") {
        var newSRC = $(this).attr("data-animate");
        $(this).attr("src", newSRC);
        //change data-state to animate
        $(this).attr("data-state", "animate");
        //   $(this).attr("src", animate);
    } else {
        var newSRC = $(this).attr("data-still");
        $(this).attr("src", newSRC);
        //change data-state to animate
        $(this).attr("data-state", "still");
    }
});
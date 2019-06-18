// animating still images
// clearing input text box


// take topics in array and create buttons in html
var topics = ["sloths", "pomeranians", "monkeys"];

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

        for (var i = 0; i < response.data.length; i++) {
            // to post on browser page
           
            $('#gif-area').prepend("Rating: " + response.data[i].rating  + "</p>");
            $('#gif-area').prepend("<p class='sub-text'>Title: " + response.data[i].title);
            $('#gif-area').prepend("<img src='" + response.data[i].images.downsized_still.url + " '>");
            
            // animated url:
            var animate = response.data[i].images.downsized.url;

            $("img").on("click", function() {
               
                var imgState= $(this).attr("data-state"); //still
                if (imgState=="still") {
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
    topics.push(topic);
    // calling renderButtons which handles the processing of topic array
    renderButtons();
    // $("#topic-input").empty();
    
})

// MAIN PROCESSES =======================================================

$(document).on("click", ".topic", displayGifs);

renderButtons();




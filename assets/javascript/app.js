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
            $('#gif-area').prepend("<p>Rating: " + response.data[i].rating + "</p>");
            $('#gif-area').prepend("<img src='" + response.data[i].images.downsized_still.url + " '>");
            
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








// Try using a loop that appends a button for each string in the array.

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).


// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page that takes a value from a user input box and adds it to your topics array. 
// Then make a function call that takes each topic in the array and remakes the buttons on the page

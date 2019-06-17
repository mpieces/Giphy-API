// take topics in array and create buttons in html
var topics = ["sloths", "pomeranians", "leopards", "monkeys"];


$('button').on('click', function () {
    console.log('button clicked');
    var x = $(this).data('name');
    console.log(x);
});

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Jh8aPiCSMBvoZuUdT8hILviL6N5YJeQ6&limit=10"
            // var api_key = Jh8aPiCSMBvoZuUdT8hILviL6N5YJeQ6;
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {

                // console.log(JSON.stringify(response));
                console.log(response);

                console.log(response.data[0].images.downsized.url);
                // rating of a specific giphy
                console.log(response.data[0].rating);



                for (var i = 0; i < response.data.length; i++) {
                    // to post on browser page
                    $('#gif-area').prepend("<p>Rating: " + response.data[i].rating + "</p>");
                    $('#gif-area').prepend("<img src='" + response.data[i].images.downsized.url + " '>");
                } // end of for loop;
            });
        

        function renderButtons() {
            $("#buttons-area").empty();
            for (var i = 0; i < topics.length; i++) {
                // dynamically generate buttons for each topic in the array
                var a = $("<button>");
                a.addClass("topic");
                // add a data attribute specific to that particular topic
                a.attr("data-name", topics[i])
                // provide initial button text
                a.text(topics[i]);
                // add the button to the button are adiv
                $("#buttons-area").append(a);
            }
        
        }
        
     


// $("#add-topic").on("click", function (event) {
//     event.preventDefault();
//     // grab input from textbox
//     var topic = $("#topic-input").val().trim();
//     topics.push(topic);
//     renderButtons();
// })

$(document).on("click", ".topic", displayTopicGifs);

renderButtons();






// Try using a loop that appends a button for each string in the array.

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).


// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page that takes a value from a user input box and adds it to your topics array. 
// Then make a function call that takes each topic in the array and remakes the buttons on the page
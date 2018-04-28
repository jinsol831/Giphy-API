$( document ).ready(function() {


    var topics = ["Puppy", "Lion", "Cat", "Kittens", "Dog", "Horses"];

    function renderButtons() {
        $('#animalButton').empty()

        if ($('#animal-input').val().length > 0) {
          topics.push($('#animal-input').val())

          
        }
        
        for(var i = 0; i < topics.length; i++) {
          var newButton = $('<button>');

          // Adding a class of movie-btn to our button
          newButton.addClass("animalButton");
          // Adding a data-attribute
          newButton.attr("data-name", topics[i]);
          // Providing the initial button text
          newButton.text(topics[i]);
          // Adding the button to the buttons-view div


          $("#animalButton").append(newButton);
        
          
        }//end of forloop
      }

      $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        renderButtons();
      });

      renderButtons();



 function displayAnimal() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=sRF7pKOfFzoUFgLHa0KvrMVe0lpIWIol&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log($(this).attr("data-name"));
        console.log(animal);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            animalImage.addClass("gif");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("data-animate", results[i].images.fixed_height.url);            
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#animals").prepend(animalDiv);
        }
    })

}
    function buttonState() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
     
    };


};


$(document).on("click", ".animalButton", displayAnimal);
$(document).on("click", ".gif", buttonState);

   
 }); //end of document.ready
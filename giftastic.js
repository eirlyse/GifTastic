//Initial array of movies	
$(document).ready(function() {

    var Populartopics = ["Animals", "Art", "Celebrities", "Decades", "Beauty", "Memes", "Nature", "Music"];	
  
    //  create topics array buttons
    function createButtons(){
      $('#buttons-view').empty();
  
      for (var i = 0; i < Populartopics.length; i++) {
              //create all buttons
              var a = $('<button>');
              a.addClass('other');
              a.attr('data-name', Populartopics[i]);
              a.text(Populartopics[i]);
              $('#buttons-view').append(a);
            }
          }    
          createButtons();
  
  //on button click
  $(document).on('click', '.other', function() {
  
      //new variable will log the text data from each button
      var otherTopics= $(this).html(); 
      // console.log(martialArts);
  
      var queryURL= "https://api.giphy.com/v1/gifs/search?q=" +otherTopics+ "&api_key=vH5N7pS9DEhQ0YFvCzJh4zInDqDOvwua&limit=10";
    
  
      // Creating an call for each button
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
         
          $('#gif-view').empty();
          for ( var i=0; i < results.length; i++) {
                      var imageDiv = $('<div>');
                      var imageView = results[i].images.fixed_height.url;
                      var still = results[i].images.fixed_height_still.url;
                            
  
          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#gif-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each gif
          var rating = results[i].rating;
              
          var displayRated= $('<p>').text("Rating: " + rating);
          $('#gif-view').prepend(displayRated);
    } 
  
  }); 
  
          //stop & play gifs
          function playGif() { 
                      var state = $(this).attr('data-state');
                      // console.log(state);
                   if (state == 'still'){
                       $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                   } else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                      }
  
                  } 
  
        }); 
  
            // add a button
          $(document).on('click', '#add-gif', function(){
            
              var gif = $('#gif-input').val().trim();
              Populartopics.push(gif);
              $('#gif-input').val('');
              createButtons();
            
  
            
  
          });
                        
  
          });
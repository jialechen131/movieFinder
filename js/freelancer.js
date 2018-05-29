/* global $ */
$(document).ready(function() {
    console.log("Document Ready...");
    $("#srch-term").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#submit").click();
        }
    });

    $("#submit").click(function() {
        console.log("clicked");
        $(".gallery").empty();
        // $(".gallery").css("margin-left", "-70px");
        var userInput = $('#srch-term').val();
        var url = "https://omdbapi.com?apikey=90d4b10a&s=" + userInput.toLowerCase();
        $.ajax({
            url: url,
            method: "GET",
            success: function(response) {
                $("#moviesSearchTerm").html(userInput);
                console.log(response);
                if (response.Response == "False") {
                    console.log("Error 404: There was no movie found with those characters...");
                    $('.gallery').append(
                        '<p class="warningSign">' + "No movie was found with those characters..." + '</p>'
                    );
                }
                for (var i = 0; i < response.Search.length; i++) {
                    if (response.Search[i].Poster !== "N/A") {
                        $('.gallery').append(
                           '<div class="col-md-6 col-lg-4">\
                               <a class="portfolio-item d-block mx-auto movies" data-toggle="modal" id="movieImdb-' + response.Search[i].imdbID +'" href="#modal-' + i + '" >\
                                 <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">\
                                   <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">\
                                     <i class="fa fa-search-plus fa-3x"></i>\
                                   </div>\
                                 </div>\
                                 <img class="img-fluid moviePosters" src=' + response.Search[i].Poster + '>\
                               </a>\
                               <h4 class="movie_title">'+ response.Search[i].Title +'</h4>\
                             </div>\
                             \
                           <div class="modal portfolio-modal" id="modal-' + i + '">\
                             <div class="portfolio-modal-dialog bg-white">\
                               <div class="modal-header">\
                                 <a class="close-button d-none d-md-block portfolio-modal-dismiss" data-dismiss="modal" href="#">\
                                    <i class="fa fa-3x fa-times"></i>\
                                 </a>\
                                 <div class="container text-center">\
                                   <div class="row">\
                                     <div class="col-lg-8 mx-auto">\
                                       <h2 class="modal-title text-secondary text-uppercase mb-0" id="myModalLabel">' + response.Search[i].Title + '</h2>\
                                       <hr class="star-dark mb-5">\
                                       <img class="img-fluid mb-5 modalImage" src="' + response.Search[i].Poster + '" alt="">\
                                       <div class="movie_description">\
                                       <p class="mb-5"> Movie Title: </p> <p id= "original_title-' + response.Search[i].imdbID + '" ></p>\
                                       <p class="mb-5"> Genres </p> <p id= "genre-' + response.Search[i].imdbID + '" > Genres: </p>\
                                       <p class="mb-5"> Movie Site: </p> <p id= "movie_homepage-' + response.Search[i].imdbID + '" ></p>\
                                       <p class="mb-5"> Plot: </p> <p id= "plot-' + response.Search[i].imdbID + '" > Plot: </p>\
                                       <p class="mb-5"> Release Date: </p> <p id= "release_date-' + response.Search[i].imdbID + '" ></p>\
                                       <p class="mb-5"> Duration: </p> <p id= "run_time-' + response.Search[i].imdbID + '" ></p>\
                                       <p class="mb-5"> Slogan: </p> <p id= "tag_line-' + response.Search[i].imdbID +'" ></p>\
                                       <p class="mb-5"> Rating: </p> <p id= "rating-' + response.Search[i].imdbID + '" ></p>\
                                       <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" data-dismiss="modal" href="#">\
                                         <i class="fa fa-close"></i>\
                                       Close Project</a>\
                                     </div>\
                                   </div>\
                                 </div>\
                               </div>\
                             </div>\
                           </div>'
                        );
                        console.log("The amount of Movies being displayed to the screen: " + response.Search.length);
                        console.log("The total amount of possible Movies " + response.Search[1].totalResults);
                    }
                }
                addModalClick();
            },
        });
    });
    
});

function addModalClick() {
    $(".movies").click(function(event) { 
       console.log(".movies clicked");
       var idx = $(event.currentTarget).attr('id').split("-")[1];
       console.log(idx);
       console.log("genre-" + idx);
       var url = "https://api.themoviedb.org/3/movie/" + idx + "?api_key=353765fef7f00a0fd099296ded0816a7";
        $.ajax({
            url: url,
            method: "GET",
            success: function(response) {
                  $('#genre-' + idx).html(response.genres[0].name);
                  $('#movie_homepage-' + idx).html(response.homepage);
                  $('#original_title-' + idx).html(response["original_title"]);
                  $('#plot-' + idx).html(response.overview);
                  $('#release_date-' + idx).html(response["release_date"]);
                  $('#run_time-' + idx).html(response.runtime);
                  $('#tag_line-' + idx).html(response.tagline);
                  $('#rating-' + idx).html(response["vote_average"]);
            }
         }); 
      }); 
}     
 

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Modal popup$(function () {
  $('.portfolio-item').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true
  });
  $(document).on('click', '.portfolio-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery); // End of use strict


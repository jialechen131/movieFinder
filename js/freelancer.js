/* global $ */
$(document).ready(function() {
    console.log("document ready")
    $("#srch-term").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#submit").click();
        }
    });

    $("#submit").click(function() {
        console.log("clicked");
        $(".gallery").empty();
        var userInput = $('#srch-term').val();
        var url = "https://omdbapi.com?apikey=90d4b10a&s=" + userInput.toLowerCase();
        $.ajax({
            url: url,
            method: "GET",
            success: function(response) {
                $("#moviesSearchTerm").html(userInput);
                console.log(response);
                if (response.Response == "False") {
                    console.log("I work");
                    $('.gallery').append(
                        '<p class="warningSign">' + "No movie was found with those characters..." + '</p>'
                    );
                }
                console.log("I work 2");
                for (var i = 0; i < response.Search.length; i++) {
                  console.log(response.Search[i].title);
                    if (response.Search[i].Poster !== "N/A") {
                        $('.gallery').append(
                            '<img data-toggle="modal" data-target="#modal-' + i + '" class="col-md-3 movies" src=' + response.Search[i].Poster + '>\
			                  <div class="modal" id="modal-' + i + '" tabindex="-1" aria-labelledby="myModalLabel">\
			                     <div class="modal-dialog">\
			                         <div class="modal-content">\
			                             <div class="modal-header">\
			                                 <h4 class="modal-title" id="myModalLabel">' + response.Search[i].Title + '</h4>\
			                                 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
			                             </div>\
			                             <div class="modal-body">\
			                                 <img class="modalImage" src="' + response.Search[i].Poster + '">\
			                                 <div class="gif_description">\
			                                     <p>Uploaded: Hello </p>\
			                                      <p>Rating: ' + response.Search[i].Title + '</p>\
			                                     <p>GIF Link: ' + response.Search[i].Title + '</p>\
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
            },
        });
    });
});





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


// Use this to access the information for the modal 
// "https://api.themoviedb.org/3/movie/" + response.Search[i].imdbID + "?api_key=353765fef7f00a0fd099296ded0816a7"

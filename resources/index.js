$(document).ready(function() {
    $('.settings-btn').click(function() {
        // Open the settings panel
        $('#settings-panel').animate({ right: '0px' });
    });

    $('#close-settings').click(function() {
        // Close the settings panel
        $('#settings-panel').animate({ right: '-250px' });
    });

    const themeBtn = document.getElementById("theme-btn");
        themeBtn.onclick = () => {
          themeBtn.classList.toggle("fa-sun");
          if (themeBtn.classList.contains("fa-sun")) {
            document.body.classList.add("changeTheme");
            $(".settings-panel").css("background-color", "#4b5842")
            $(".navbar").css("background-color", "#4b5842")
            $(".left-half").css("background-color", "#01172f")
            $(".right-half").css("background-color", "#01172f")
            $(".container::after").css("background-color", "white")
          } else {
            document.body.classList.remove("changeTheme");
            $(".settings-panel").css("background-color", "white")
            $(".navbar").css("background-color", "#93c39b")
            $(".left-half").css("background-color", "#f3ebdb")
            $(".right-half").css("background-color", "#f3ebdb")
            $(".container::after").css("background-color", "#000")
          }
        }
});

// Jiggle Physics

$(document).ready(function() {
  $('nav ul li a').hover(
      function() {
          // Mouse over
          $(this).animate({ fontSize: '1.1em' }, 200);
      }, 
      function() {
          // Mouse out
          $(this).animate({ fontSize: '1em' }, 200);
      }
  );
});

// Functionality of Initial Screen

$(document).ready(function() {
  let initialScreenVisible = true;
  document.body.classList.add("initialTheme");

  // Function to prevent default scrolling
  function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
  }

  // Disable scrolling
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });

  // Listen for a scroll attempt
  $(window).on('wheel touchmove', function() {
      if (initialScreenVisible) {
          initialScreenVisible = false;
          
          // Fade out the initial screen
          $('.initial-screen').fadeOut('slow', function() {
            $('body').css('background-color', '#f3ebdb');
              // Enable scrolling again and show main content
              window.removeEventListener('wheel', preventScroll, { passive: false });
              window.removeEventListener('touchmove', preventScroll, { passive: false });
              $('.main-content').fadeIn('slow');
          });
      }
  });


  //displays the top ten items by "sales"
  var allItems = new Array()
  $.getJSON('search/database/resources.json', function(data) {
    productsData = data;
    $.each(data, function(i, item) {
        $.each(item, function(j, item_inlist){
          allItems.push(item_inlist)
        });
    })
    allItems.sort((a, b) => b.sales - a.sales)
    var output = ""
    $.each(allItems, function(i, item) {
      if (i < 15) {
        output += "<ul class = pics>"
        if (item.picture != "#"){
          output += '<li class="block"><a href = "' + item.link +'">'  + '<img src="' + item.picture + '" style="width:300px;height:300px;"></a>';
        }
      }  
    output += "</ul>"
    
    });
  $('#trending').html(output);
  
  
  });
  

});
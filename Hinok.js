var links = document.querySelectorAll('ul li a');

// Cache selectors
var topMenu = $("#Menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a");
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

$(function(){
  $('button').click(function(e){
    var test = document.getElementById("Menu");
    e.preventDefault();
    if(test.classList.contains("collapse")){
      if(!test.classList.contains("show")){
        topMenu.addClass("show");
        for (i=0; i<menuItems.length;i++){
          if (menuItems[i].style.maxHeight){
            menuItems[i].style.maxHeight = null;
          } else {
            menuItems[i].style.maxHeight = menuItems[i].scrollHeight + "px";
          }
        }

      }
      else {
        topMenu.removeClass("show");
      }
    }
  });

  $('a').click(function(){
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      if(window.screen.width < 992){
        $('html,body').animate({
          scrollTop: target.offset().top-56
        }, 1000);
        return false;
      }
      else {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }

    }
  });

  jQuery(window).scroll(function(){
     // Get container scroll position
     var fromTop = jQuery(this).scrollTop()+topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if (jQuery(this).offset().top < fromTop)
         return this;
     });

     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";

     menuItems.removeClass("active");
      if(id){
        var selected = $('a').filter(function() { return !this.href || this.href.match(id); });
        selected.addClass("active");
      }

  })

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
});

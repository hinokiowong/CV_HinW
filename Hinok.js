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
  $('a').click(function(){
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
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

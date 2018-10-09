var scroll = 0;

$(window).on("load", function() {
  $("#loading-status").fadeOut();
  $("#loading")
    .delay(500)
    .fadeOut("slow");
});

$("a[href*=\\#]").click(function(e) {
  var that = $(this);
  $("html, body").animate(
    {
      scrollTop: $(that.attr("href")).offset().top
    },
    800
  );
  e.preventDefault();
});

$(".navbar-nav>li>a").on("click", function() {
  $(".navbar-collapse").collapse("hide");
});
$(window).scroll(function() {
  if ($(this).scrollTop() > 20) {
    $(".navbar")
      .removeClass("navbar-dark bg-transparent navbar-at-top")
      .addClass("navbar-light bg-light navbar-scrolled");
  } else {
    $(".navbar")
      .removeClass("navbar-light bg-light navbar-scrolled")
      .addClass("navbar-dark bg-transparent navbar-at-top");
  }

  if (scroll < $(this).scrollTop()) {
    $(".navbar").addClass("navbar-scrolled-down");
  } else {
    $(".navbar").removeClass("navbar-scrolled-down");
  }

  scroll = $(this).scrollTop();
});
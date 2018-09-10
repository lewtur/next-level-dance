$("#copyright-year").text(new Date().getFullYear());

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
  function elementScrolled(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return elemTop <= docViewBottom && elemTop >= docViewTop;
  }

  if (elementScrolled("#progress-bar-backend")) {
    $("#progress-bar-backend").css("width", "90%");
  }

  if (elementScrolled("#progress-bar-frameworks")) {
    $("#progress-bar-frameworks").css("width", "60%");
  }

  if (elementScrolled("#progress-bar-db")) {
    $("#progress-bar-db").css("width", "60%");
  }

  if (elementScrolled("#progress-bar-frontend")) {
    $("#progress-bar-frontend").css("width", "80%");
  }

  if (elementScrolled("#progress-bar-aws")) {
    $("#progress-bar-aws").css("width", "50%");
  }

  if ($(this).scrollTop() > 20) {
    $(".navbar")
      .removeClass("navbar-dark bg-transparent navbar-at-top")
      .addClass("navbar-light bg-light navbar-scrolled");
  } else {
    $(".navbar")
      .removeClass("navbar-light bg-light navbar-scrolled")
      .addClass("navbar-dark bg-transparent navbar-at-top");
  }
});

var typed = new Typed("#intro-description", {
  strings: ["Software Developer", "Team Leader"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true
});

$(".technologies-section").parallax({
  imageSrc: "../images/background-stowe.jpg",
  position: "right center"
});

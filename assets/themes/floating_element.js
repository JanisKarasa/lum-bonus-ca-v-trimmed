function isScrolledIntoView(elem) {
  const docViewBottom = $(window).scrollTop();
  const elemTop = $(elem).offset().top;
  const elemBottom = elemTop + $(elem).height();
  return elemBottom <= docViewBottom;
}

function showBottomFloat() {
  if (
    ($("#bottomFloatText").html() !== undefined &&
      $("#bottomFloatText").html().trim().length > 1) ||
    $(".bottom-float").hasClass("bottom-float-ontario")
  ) {
    $("div.bottom-float").addClass("active");
    $("footer#footer").addClass("bottom-float-active");
    bottomFloatVisible = true;
    // fill logo background color
    fillLogoBackground("#bottomFloatImg.review-logo");
  }
}

function hideBottomFloat() {
  $("div.bottom-float").removeClass("active");
  $("footer#footer").removeClass("bottom-float-active");
  bottomFloatVisible = false;
}

let bottomFloatVisible = false;

function twoColumnsReviewLayout() {
  return $(window).width() > 991 && $(window).height() > 600;
}

$(document).scroll(function () {
  if ($("#smart-table").length !== 0) {
    // if smart table exists on page show bottom float accordingly
    if (!bottomFloatVisible && isScrolledIntoView($("#smart-table"))) {
      showBottomFloat();
    } else if (bottomFloatVisible && !isScrolledIntoView($("#smart-table"))) {
      hideBottomFloat();
    }
  } else if ($(".review-wrapper-inner").length !== 0) {
    // if is review page show bottom float accordingly
    if (twoColumnsReviewLayout()) {
      if (
        !bottomFloatVisible &&
        isScrolledIntoView($(".review-wrapper .bonus-item"))
      ) {
        showBottomFloat();
      } else if (
        bottomFloatVisible &&
        !isScrolledIntoView($(".review-wrapper .bonus-item"))
      ) {
        hideBottomFloat();
      }
    } else if (
      !bottomFloatVisible &&
      isScrolledIntoView($("section.review-wrapper .bonus-item"))
    ) {
      showBottomFloat();
    } else if (
      bottomFloatVisible &&
      !isScrolledIntoView($("section.review-wrapper .bonus-item"))
    ) {
      hideBottomFloat();
    }
  } else if ($(".toplist-section-trending").length !== 0) {
    // if is homepage with trending toplists
    if (
      !bottomFloatVisible &&
      isScrolledIntoView($(".homepage-content-section"))
    ) {
      showBottomFloat();
    } else if (
      bottomFloatVisible &&
      !isScrolledIntoView($(".homepage-content-section"))
    ) {
      hideBottomFloat();
    }
  } else {
    // if smart table does NOT exists on page show bottom float after X scroll
    if (!bottomFloatVisible && $(window).scrollTop() > 800) {
      showBottomFloat();
    } else if (bottomFloatVisible && $(window).scrollTop() <= 800) {
      hideBottomFloat();
    }

    if (
      history.state !== "click" &&
      getCookie("exitPopup") !== "true" &&
      isMobile &&
      showExitPopup === false
    ) {
      window.history.pushState("click", null, window.location.href);
      showExitPopup = true;
    }
  }
});

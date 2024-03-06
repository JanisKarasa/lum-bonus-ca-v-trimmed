/* global ajaxurl */
/* global Odometer */
// executes when HTML-Document is loaded and DOM is ready
$(document).ready(loadAllEventListeners);
// executes when complete page is fully loaded, including all frames, objects and images

$(window).on("load", loadAllEventsAfterDataInit);

function loadAllEventListeners() {
  const contentBoxesLink = $(".content-boxes-anchor-link")
    .not('[href="#"]')
    .not('[href="#0"]');
  contentBoxesLink.click(smoothScroll);

  const backToTopBtn = $(".back-to-top");
  backToTopBtn.on("click", backToTop);

  //load static menu functions.
  staticMenu();

  function backToTop(e) {
    let target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      //preventing of displaying "/#target" in the url
      e.preventDefault();
      $("html, body")
        .stop(true, false)
        .animate(
          {
            scrollTop: target.offset().top
          },
          500,
          function () {
            const $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            }
            $target.attr("tabindex", "-1");
            $target.focus();
          }
        );
    }
  }

  const adDisclosureButton = $(".ad-text-show");
  adDisclosureButton.click(showAdDisclosureText);

  const adDisclosureCloseBtn = $(".ad-disclosure-close");
  adDisclosureCloseBtn.click(hideAdDisclosureText);

  //show more text
  const showMorePunctuation = $(".intro-section .show-more");
  showMorePunctuation.click(showMoreIntroSectionText);

  // click on top bar promotions.
  const topBarPromotions = $(
    'a.top-bar.promotion[data-type="top_bar_promotion"]'
  );
  topBarPromotions.click(setCookieTopBarPromotions);

  // click on top bar campaning
  const topBarCampaign = $('.top-bar.campaign[data-type="top_bar_campaign"]');
  topBarCampaign.click(setCookieTopBarCampaign);

  // header flags click function
  const currentLang = $("header#header-v2 .change-locale .current-lang");
  currentLang.click(currentLangActiveFlag);

  //set blog and promotions width and height
  styleBlogAndPromotionPost();

  // wrap tables that are added directly via html in content inside div
  wrapTableElements();

  //set width and height of 404 page
  styleError404Page();
}

function loadAllEventsAfterDataInit() {
  //Toggle main menu responsive
  const mainMenuHamburger = $("header .btn-style-menu");
  const mainMenuClose = $(".btn-menu-close");
  mainMenuHamburger.click(toggleMainMenu);
  mainMenuClose.click(toggleMainMenu);

  //Format money
  moneyFormat();

  //Get Jackpot data on megamoolah page
  getJackpotData();

  //Animate jackpot badge
  const jackpotBadge = $(
    ".intro-section .intro-wrapper.mega-moolah-page.mega-moolah-v1 .jackpot-badge"
  );
  jackpotBadge.on("click", animateJackpotBadge);
}
// closing menu popups with click outside of them
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("opener") &&
    !e.target.parentNode.classList.contains("opener") &&
    !e.target.parentNode.parentNode.classList.contains("opener")
  ) {
    const popupQuerySelector = "header .popup";
    const popupEl = document.querySelectorAll(popupQuerySelector);
    // Check if the filter list parent element exist
    const isClosest = e.target.closest(popupQuerySelector);
    popupEl.forEach(function (item) {
      // If `isClosest` equals falsy & popup has the class `show` then hide the popup
      if (!isClosest && item.classList.contains("active")) {
        item.classList.remove("active");
        enableScroll();
      }
    });
  }
});

// ---FUNCTIONS---
function setCookie(cookieName, cookieValue, expireDays) {
  const date = new Date();
  date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// eslint-disable-next-line no-unused-vars
function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function staticMenu() {
  $("nav.main-menu-static .menu-item-has-children").hover(
    function () {
      $(this).find(".sub-menu").show(); // Show sub-menu on hover
    },
    function () {
      $(this).find(".sub-menu").hide(); // Hide sub-menu when mouse leaves
    }
  );

  $("nav.main-menu-static .menu-item-has-children>a").on("click", function (e) {
    e.preventDefault();
  });

  $("nav.main-menu-static-mobile .menu-item-has-children>a").on(
    "click",
    function (e) {
      e.preventDefault();
    }
  );
  $("nav.main-menu-static-mobile .menu-static-item").on("click", function (e) {
    if ($(e).hasClass("menu-link")) {
      e.preventDefault();
    }
    let listItemIcon = $(this).find(".icon-xsmall");
    if (listItemIcon.hasClass("transform")) {
      listItemIcon.removeClass("transform");
    } else {
      listItemIcon.addClass("transform");
    }
    if ($(this).find(".sub-menu").is(":visible")) {
      $(this).find(".sub-menu").hide();
    } else {
      $(this).find(".sub-menu").show();
    }
  });
}

function smoothScroll(event) {
  let target = $(this.hash);
  target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
  if (target.length) {
    //preventing of displaying "/#target" in the url
    event.preventDefault();
    $("html, body")
      .stop(true, false)
      .animate(
        {
          scrollTop: target.offset().top
        },
        1000,
        function () {
          const $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          }
          $target.attr("tabindex", "-1");
          $target.focus();
        }
      );
  }
}

function fillLogoBackground(logoNode) {
  $(logoNode).each(function () {
    const img = $(this);
    const canvas = document.createElement("canvas");
    canvas.width = img[0].width;
    canvas.height = img[0].height;
    canvas
      .getContext("2d")
      .drawImage(img[0], 0, 0, img[0].width, img[0].height);
    const pixelData = canvas.getContext("2d").getImageData(0, 0, 1, 1).data;

    $(this)
      .parent()
      .parent()
      .css(
        "background-color",
        "rgb(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + ")"
      );
  });
}

function showMoreIntroSectionText() {
  const showMorePunctuation = $(".intro-section .show-more");
  showMorePunctuation.addClass("hidden");
}

let scrollPosition = null;

// Disable scroll
function disableScroll() {
  $("body").css("overflow", "hidden");
}

// Enable scroll
function enableScroll() {
  $("body").css("overflow", "");
}

function showAdDisclosureText() {
  const addText = $(".ad-disclosure-container");
  addText.addClass("active");

  // Store the current scroll position in a data attribute
  $("body").data("scroll-position", $(window).scrollTop());

  // Disable scroll on mobile when Ad Disclosure is opened
  if ($(window).width() && $(window).width() < 479) {
    disableScroll();
  }
}

function hideAdDisclosureText(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const addText = $(".ad-disclosure-container");
  addText.removeClass("active");
  enableScroll();
}

function setCookieTopBarPromotions() {
  setCookie("top_bar_promotion", true, 1);
  const topBarPromotion = $("a.top-bar.promotion");
  topBarPromotion.remove();
}

function setCookieTopBarCampaign() {
  setCookie("top_bar_campaign", true, 1);
  const topBarCampaign = $(".top-bar.campaign");
  topBarCampaign.remove();
}

function currentLangActiveFlag() {
  const localeDropdown = $("header#header-v2 .change-locale-dropdown");
  localeDropdown.toggleClass("active");
}

function styleError404Page() {
  const bodyElement = $("body");
  const introSection = $(".intro-section");
  if (bodyElement.hasClass("error404")) {
    const bodyHeight = bodyElement.height();
    const windowHeight = $(window).height();
    const contentHeight = introSection.height();
    if (bodyHeight < windowHeight) {
      introSection.css("min-height", contentHeight + windowHeight - bodyHeight);
    }
  }
}

function styleBlogAndPromotionPost() {
  const currentWindowWidth = $(window).width();
  if (currentWindowWidth > 767) {
    let blogPostHeight = 0;
    let promotionPostHeight = 0;
    const blogPost = $(".blog-posts-holder .one-post");
    const promotionPost = $(".daily-deals .one-post");
    $.each(blogPost, function () {
      if ($(this).outerHeight() > blogPostHeight) {
        blogPostHeight = $(this).outerHeight();
      }
    });
    blogPost.css("height", blogPostHeight);
    $.each(promotionPost, function () {
      if ($(this).outerHeight() > promotionPostHeight) {
        promotionPostHeight = $(this).outerHeight();
      }
    });
    promotionPost.css("height", promotionPostHeight);
  }
}

function wrapTableElements() {
  const tableWithoutWrapper = $("section.entry-content > table");
  if (tableWithoutWrapper.length) {
    $.each(tableWithoutWrapper, function () {
      $(this).wrap("<div class='table-wrapper'></div>");
    });
  }
}

function toggleMainMenu() {
  const menuPopup = $("header#header-v2 .menu-wrapper");
  menuPopup.toggleClass("active");
  if (
    menuPopup.hasClass("active") &&
    $(window).width() &&
    $(window).width() < 479
  ) {
    disableScroll();
  } else {
    enableScroll();
  }
}

function moneyFormat(
  value,
  decimalPlaces,
  thousandSeparator,
  decimalSeparator
) {
  const decPlaces = isNaN((decimalPlaces = Math.abs(decimalPlaces)))
    ? 2
    : decimalPlaces;
  const decSeparator = decimalSeparator === undefined ? "." : decimalSeparator;
  const thouSeparator =
    thousandSeparator === undefined ? "," : thousandSeparator;
  const sign = value < 0 ? "-" : "";
  const i = parseInt((value = Math.abs(+value || 0).toFixed(decPlaces))) + "";
  let j;
  j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    sign +
    (j ? i.substr(0, j) + thouSeparator : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) +
    (decPlaces
      ? decSeparator +
        Math.abs(value - i)
          .toFixed(decPlaces)
          .slice(2)
      : "")
  );
}

function getJackpotData() {
  const jackpotAmount = $(".jackpot-amount");
  const megaMoolah = $(
    ".mega-moolah-page:not(.mega-moolah-page-without-bonuses)"
  );
  if (megaMoolah.length) {
    $.post(ajaxurl, {
      action: "jackpot_get"
    }).done(function (response) {
      jackpotAmount.html(response.data.message[0]);
      setInterval(function () {
        $(".jackpot-amount.with-ticker").each(function () {
          let value = $(this).text();
          value = value.replace(/,/g, "");
          value = parseFloat(value) + 0.01;
          $(this).text(moneyFormat(value));
        });
      }, 1000);
    });
  }
}

function animateJackpotBadge() {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(".toplist-wrapper").offset().top
    },
    500
  );
}

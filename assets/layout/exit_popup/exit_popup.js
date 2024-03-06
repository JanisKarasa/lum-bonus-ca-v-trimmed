(function ($) {
  $(document).ready(function () {
    let showExitPopup = false;
    const exitPopup = $(".exit-popup");
    if (exitPopup.length) {
      let mouseOut = false;
      let popupTimer = false;
      let isModalOpen = false;

      // enable trigger after 2 seconds
      popupTimer = false;
      setTimeout(function () {
        popupTimer = true;
      }, 2000);

      $("#forceExitPopup").removeClass("hidden");

      function showPopup() {
        if (
          (mouseOut || showExitPopup) &&
          getCookie("exitPopup") !== "true" &&
          (isMobile || popupTimer)
        ) {
          // CRO-94 new designs for popup custom event for test triggering in vwo
          let ExitPopupAppear = new CustomEvent("exitPopupAppear");
          // Dispatch the event
          document.dispatchEvent(ExitPopupAppear);

          $.each($(".exit-popup img"), function () {
            const src = $(this).attr("data-src");
            const srcset = $(this).attr("data-srcset");
            const width = $(this).attr("data-width");
            const height = $(this).attr("data-height");
            if (src) {
              $(this).attr("src", src);
            }
            if (srcset) {
              $(this).attr("srcset", srcset);
            }
            if (width) {
              $(this).attr("width", width);
            }
            if (height) {
              $(this).attr("height", height);
            }
          });
          setTimeout(function () {
            fillLogoBackground(".exit-popup img.review-logo");
            $(".exit-popup").addClass("active");
            //This function is defined in exit popup page template
            if (typeof popupDisplayedTracking === "function") {
              popupDisplayedTracking();
            }
            setCookie("exitPopup", true, 1);
            mouseOut = false;
            isModalOpen = true;
            $(window).trigger("exitPopupOpened", []);
            const swiperScript = document.createElement("script");
            swiperScript.setAttribute(
              "src",
              siteUrl + "assets/layout/swiper/swiper.min.js"
            );
            swiperScript.addEventListener("load", function () {
              const swiper = new Swiper(".exit-popup .swiper-container", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slideToClickedSlide: true,
                slidesPerView: "auto",
                coverflowEffect: {
                  rotate: 20,
                  stretch: 0,
                  depth: 350,
                  modifier: 1,
                  slideShadows: true
                }
              });
              $(".swiper-container").css("visibility", "visible");
            });
            document.body.appendChild(swiperScript);
          }, 200);
        }
      }

      // detect cursor mouse leave only top, wait 300ms and if not returned back to content trigger popup.
      $("body").mouseleave(function (event) {
        if (
          event.pageY - $(window).scrollTop() < 80 &&
          event.pageX > 20 &&
          event.pageX < $(window).width() - 20
        ) {
          mouseOut = true;
          setTimeout(function () {
            if (mouseOut) {
              showPopup();
            }
          }, 300);
        }
      });

      $("#wrapper").mouseenter(function () {
        mouseOut = false;
      });

      $(".exit-popup .close-btn-wrapper").click(function () {
        $(".exit-popup").removeClass("active");
        if (typeof popupDisplayedTracking === "function") {
          popupClosedTracking();
        }
        isModalOpen = false;
      });

      $(document).keyup(function (e) {
        if (e.key === "Escape") {
          $(".exit-popup").removeClass("active");
          isModalOpen = false;
        }
      });

      $("#forceExitPopup").click(function () {
        showExitPopup = true;
        setCookie("exitPopup", false, 1);
        showPopup();
      });

      if (isMobile && showExitPopup === false) {
        //trigger on mobile back btn

        $("html").click(function () {
          if (history.state !== "click" && getCookie("exitPopup") !== "true") {
            window.history.pushState("click", null, window.location.href);
          }
        });
      }

      // check if back button is pressed on mobile
      $(window).on("popstate", function () {
        if (history.state === null && location.hash === "") {
          showExitPopup = true;
          showPopup();
        }
      });

      // disable background scroll when popup is opened
      if ($(window).width() > 767) {
        window.addEventListener(
          "wheel",
          (e) => {
            isModalOpen && e.preventDefault();
          },
          { passive: false }
        );
        window.addEventListener(
          "touchmove",
          (e) => {
            isModalOpen && e.preventDefault();
          },
          { passive: false }
        );
      }
    } else {
      $("#forceExitPopup").addClass("hidden");
    }
  });
})(jQuery);

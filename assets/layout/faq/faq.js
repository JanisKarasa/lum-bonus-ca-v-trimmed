(function ($) {
  $(".faq-item").click(function (e) {
    const targetClass = e.target.className;
    // if youtube image was clicked - exit this function (because yt script needs to finish)
    if (
      e.target.tagName === "A" ||
      targetClass === "yt" ||
      targetClass === "play"
    ) {
      return;
    }

    e.preventDefault();
    const faqId = $(this).attr("data-id");

    $("#faq-item-answer-" + faqId).toggleClass("hidden");
    $("#faq-border-id-" + faqId).toggleClass("faq-opacity");
    $("#faq-item-" + faqId).toggleClass("faq-active");
    $("#faq-item-" + faqId).toggleClass("faq-inactive");
  });
})(jQuery);

$(document).ready(function () {
  const tag = $(".additional-text");
  const showMoreBtn = $("#show-more-intro");
  showMoreBtn.on("click", function () {
    tag.removeClass("disabled-tag");
  });
});

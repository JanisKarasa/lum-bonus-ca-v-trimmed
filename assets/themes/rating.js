let selectedRating = 0;

$(".mr-rating-star").click(function () {
  selectedRating = $(this).attr("title");
  if ($("#commentsForm").length) {
    $("#commentsForm input#rating-" + selectedRating).prop("checked", true);
  }
  $(".mr-rating-star").each(function () {
    if ($(this).attr("title") > selectedRating) {
      $(this).addClass("mr-custom-empty-star");
      $(this).removeClass("mr-custom-full-star");
    } else {
      $(this).removeClass("mr-custom-empty-star");
      $(this).addClass("mr-custom-full-star");
    }
  });
});

$("#save-rating").click(function () {
  if (selectedRating > 0) {
    $.post(ajaxurl, {
      action: "update_rating",
      post_id: $("#save-rating").attr("data-id"),
      rating: selectedRating
    }).done(function (response) {
      if (response.success === true) {
        $("label.description").html(response.data.message);
        $(".mr-star-rating").remove();
        $("#save-rating").remove();
        $(".rating-results-wrapper").remove();
        $(".mr-error").remove();
        $("#mr-spinner-rating-undefined").remove();
      }
      if (response.success === false) {
        $(".mr-error").html(response.data.message).removeClass("hidden");
        $(".mr-error-form").addClass("hidden");
      }
    });
  } else {
    $(".mr-error-form").removeClass("hidden");
  }
});

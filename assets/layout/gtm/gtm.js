// Google tag manager CTA button click triggers.
$(document).on(
  "click",
  ".add-to-cart-button, .general-description-link",
  function () {
    if (
      $("#smart-table-container").length ||
      $(".home .toplist-container").length
    ) {
      const product = $(this).closest(".bonus-item");
      dataLayer.push({ ecommerce: null });
      dataLayer.push({
        event: "select_item",
        ecommerce: {
          items: [
            {
              item_id: parseInt(product.attr("data-id")),
              item_name: product.attr("data-name"),
              item_brand: product.attr("data-brand"),
              item_variant: product.attr("data-variant"),
              index: parseInt(product.attr("data-position")),
              rating: parseFloat(product.attr("data-rating")),
              item_list_name: product.attr("data-list")
            }
          ]
        }
      });
    }
  }
);

$(document).on("click", ".cta-button, .bonus-code-review", function () {
  let product;
  let ndcGtmEvent;
  let ndcActionField;
  ndcGtmEvent = "select_item";
  if ($(this).closest("#reviewDataBonus").length) {
    product = $(this).closest(".bonus-item");
    ndcActionField = product.attr("data-list");
  } else {
    product = $(this).closest(".bottom-float");
    ndcActionField = "Sticky Promotion";
  }
  if (!$(".bonus-summary").length) {
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: ndcGtmEvent,
      ecommerce: {
        items: [
          {
            item_name: product.attr("data-name"),
            item_id: parseInt(product.attr("data-id")),
            item_brand: product.attr("data-brand"),
            item_variant: product.attr("data-variant"),
            index: 1,
            item_list_name: ndcActionField,
            rating: parseFloat(product.attr("data-rating"))
          }
        ]
      }
    });
  }
});

$(document).on("click", ".quick-search-item", function () {
  const promotionName = $(this).attr("data-name");
  let pageType;
  if ($(".review-wrapper").length) {
    pageType = "Casino";
  } else {
    pageType = "List";
  }
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "Promotion Dropdown Click",
    page_type: pageType,
    promotion_name: promotionName
  });
});

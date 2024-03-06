/* global ktag */

(function ($) {
  $(document).ready(function () {
    // Load bonus list placeholder
    let smart_table_placeholder = '<div class="loading-spinner"></div>';
    const mobileBreakpoint = 480;

    // updates bottom float element values from 1st casino bonus in toplist
    function update_bottom_float() {
      $("#bottomFloatImg").attr(
        "src",
        $("#smart-table-container .bonus-item")
          .first()
          .find(".logo")
          .attr("src")
          .replace("172px", "144px")
      );
      $("#bottomFloatImg").attr(
        "srcset",
        $("#smart-table-container .bonus-item")
          .first()
          .find(".logo")
          .attr("srcset")
          .replace("172px", "144px")
          .replace("344px", "288px")
      );
      let bottomFloatText = "";
      $("#smart-table-container .bonus-item")
        .first()
        .find(".offers")
        .find(".offer-item:not(.empty)")
        .each(function () {
          const bottomFText = $(this).find(".offer-title").html();
          bottomFloatText += bottomFText + " & ";
        });
      bottomFloatText = bottomFloatText.substring(
        0,
        bottomFloatText.length - 2
      );
      $(".bottom-float")
        .find(".main-text")
        .html(
          $("#smart-table-container .bonus-item")
            .first()
            .find(".main-text")
            .html()
        );
      $(".bottom-float")
        .find(".subtext")
        .html(
          $("#smart-table-container .bonus-item")
            .first()
            .find(".subtext")
            .html()
        );
      $(".bottom-float")
        .find(".span-cta-button-wrapper a")
        .attr(
          "href",
          $("#smartTable .one-casino").first().find("a.cta").attr("href")
        );
      $("#bottomFloatText").html(bottomFloatText);
    }

    if ($("#smart-table-container").length > 0) {
      // load table data with Ajax
      function get_table_data(showAll = false, scrollTop = true) {
        if (!showAll) {
          $("#smart-table-container").html(smart_table_placeholder);
          if (scrollTop) {
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $(".toplist-wrapper").offset().top
              },
              500
            );
          }
        } else {
          $("#showAllTr").fadeTo(0, 0);
          $("#smart-table").after(smart_table_placeholder);
        }

        const regionId = $("#regionId").val();
        const gameTypeId = $("#gameTypeId").val();
        const gameTypeName = $("#gameTypeName").val();
        const pageId = $("#pageId").val();
        const dropdownId = $("#dropdownId").val();
        const popular = $("#popular").val();
        const orderBy = $("#orderBy").val();
        const deposit = $("#depositValue").val();
        const oplistRankId = $("#oplistRankId").val();
        const toplistLength = $("#toplistLengthTest").val();
        const isHome = $("body").hasClass("home");
        const heroTitle = $(".hero-section .hero-left h1").html();

        fetch(
          `${ajaxurl}?action=get_toplist&regionId=${regionId}&gameTypeId=${gameTypeId}&gameTypeName=${gameTypeName}&pageId=${pageId}&dropdownId=${dropdownId}&popular=${popular}&orderBy=${orderBy}&deposit=${deposit}&oplistRankId=${oplistRankId}&isHome=${isHome}&heroTitle=${heroTitle}&showAll=${showAll}&toplistLength=${toplistLength}`
        )
          .then((response) => response.json())
          .then((data) => {
            data = data.data.message;
            if (showAll) {
              $("#smart-table-container").html(data[0]);
              $(".loading-spinner").remove();
            } else {
              $("#smart-table-container").html(data[0]);
              $(".loading-spinner").remove();
              update_bottom_float();
            }
            /* GDC Oplist */
            ktag.reRender("#smart-table"); // refresh ktag for newly loaded oplist

            const impressions = {
              toplistImpressions: data[1]
            };
            create_view_item_list_even_for_data_layer(impressions);
          })
          .catch((error) => {
            console.error("Error loading toplist data:", error);
          });
      }

      // dropdown item click
      $(".quick-search-item").click(function () {
        $(".quick-search-content").html($(this).html());
        $(".quick-search-item").removeClass("hidden");
        $(".quick-search-item").removeClass("btn-filter-active");
        $(this).addClass("hidden");
        $(this).addClass("btn-filter-active");
        $("#depositValue").val($(this).attr("data-deposit"));
        $("#oplistRankId").val($(this).attr("data-oplistRankId"));
        $("#orderBy").val($(this).attr("data-sort"));
        $("#gameTypeId").val($(this).attr("data-gameType"));
        $("#popular").val($(this).attr("data-filterType"));
        $("#dropdownId").val($(this).attr("data-id"));
        $(".quick-search-content").html($(this).html());

        let scrollTop = true;

        if ($(window).scrollTop() > $(".toplist-container").offset().top) {
          scrollTop = true;
        } else {
          scrollTop = false;
        }

        get_table_data(false, scrollTop);
      });

      // show All top list items
      $(document).on("click", ".show-all", function () {
        $(this).remove();
        get_table_data(true);
        /* GDC Oplist */
        ktag.reRender("#smart-table"); // refresh ktag for newly loaded oplist
      });
    } // end if smart table exits
  });
})(jQuery);

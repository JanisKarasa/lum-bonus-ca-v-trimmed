// Convert impressions from json to array and add to dataLayer. List of variable names to include in the array
const variableNames = [
  "toplistImpressions",
  "casinoImpression",
  "trendingImpressionsCasino",
  "trendingImpressionsBetting"
];

function create_view_item_list_even_for_data_layer(impressions) {
  // Create the impressions_array by filtering out undefined variables
  const impressions_array = variableNames
    .map((variableName) => {
      if (impressions[variableName] !== null) {
        return impressions[variableName];
      }
    })
    .filter((variable) => variable !== undefined);
  impressions_array.forEach((element) => {
    if (typeof element !== "undefined") {
      var ImpressionsArray = JSON.parse(element);
      dataLayer.push({ ecommerce: null });
      dataLayer.push({
        event: "view_item_list",
        ecommerce: {
          items: ImpressionsArray
        }
      });
    }
  });
}

create_view_item_list_even_for_data_layer(impressions);

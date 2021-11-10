const axios = require("axios");

export default function getSuggestions(str) {
  return axios
    .get(
      `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${process.env.VUE_APP_API_KEY}&query=${str}&resultType=city`
    )
    .then(({ data }) => data.suggestions)
    .catch((error) => {
      throw new Error(error);
    });
}

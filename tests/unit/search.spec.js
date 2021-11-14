import axios from "axios";
import getSuggestions from "../../src/middleware/API/search";

jest.mock("axios");

describe("search.js", () => {
  it("gets data from an API", async () => {
    const data = {
      suggestions: [
        {
          address: {
            city: "Moscow",
            country: "Russia",
            county: "Moscow",
            postalCode: "125009",
            state: "Central Federal District",
          },
          countryCode: "RUS",
          " label": "Russia, Moscow, Moscow",
          language: "en",
          locationId: "NT_LHHYZYCEsxCSJqwQdD6BEC",
          matchLevel: "city",
        },
      ],
    };
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: data })
    );

    await expect(getSuggestions("Moscow")).resolves.toEqual(data.suggestions);
  });

  it("gets an error from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getSuggestions("qwerty")).rejects.toThrow(errorMessage);
  });
});

import axios from 'axios';

export const fetchNewsSources = async (apiKey) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/sources?language=en&apiKey=${apiKey}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch news sources");
    }

    const data = response.data;
    return data.sources.filter(
      (source) => source.url !== "https://news.google.com"
    );
  } catch (err) {
    console.error("Error fetching news sources:", err);
    throw err;
  }
};

export const fetchNewsData = async ({
  type,
  value,
  page = 1,
  apiKey,
  pageSize = 10,
}) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("pageSize", pageSize);

    let url = "https://newsapi.org/v2/top-headlines?language=en"; // Default URL

    if (type === "category") {
      queryParams.append("category", value);
    }
    if (type === "country") {
      // Use the "everything" endpoint for country-based queries
      url = "https://newsapi.org/v2/everything?language=en";
      queryParams.append("q", value);  // 'q' can be used to search articles by country
    }
    if (type === "source") {
      queryParams.append("sources", value);
    }

    const response = await axios.get(
      `${url}&${queryParams.toString()}&apiKey=${apiKey}`
    );

    if (response.status !== 200)
      throw new Error(`Failed to fetch data for ${type}: ${value}`);

    return response.data;
  } catch (err) {
    console.error(`Error fetching data for ${type}:`, err);
    throw err;
  }
};

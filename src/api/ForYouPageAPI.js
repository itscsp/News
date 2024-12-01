export const fetchNewsSources = async (apiKey) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/sources?language=en&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news sources");
    }

    const data = await response.json();
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

    if (type === "category") queryParams.append("category", value);
    if (type === "country") queryParams.append("country", value);
    if (type === "source") queryParams.append("sources", value);

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&${queryParams.toString()}&apiKey=${apiKey}`
    );

    if (!response.ok)
      throw new Error(`Failed to fetch data for ${type}: ${value}`);

    return await response.json();
  } catch (err) {
    console.error(`Error fetching data for ${type}:`, err);
    throw err;
  }
};

import axios from "axios";

export const searchArticles = async (query, start, end) => {
  try {
    // Encode the query to handle special characters
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&order=desc&from=${start.toISOString()}&to=${end.toISOString()}&searchIn=title,description,content&language=en&apiKey=${import.meta.env.VITE_API_KEY}`;

    // Use axios to fetch data
    const response = await axios.get(url);

    // Check if the response is valid
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    // Filter out articles with the title "[Removed]"
    return response.data.articles.filter((item) => item.title !== "[Removed]") || [];
  } catch (error) {
    console.error("Error fetching the news:", error);
    return [];
  }
};

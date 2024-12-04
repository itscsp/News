import axios from "axios";
import { NewsAPIRoot } from "../utils/helpers";

export const searchArticles = async (query, start, end) => {
  try {
  
    const url = `${NewsAPIRoot}/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&order=desc&from=${start.toISOString()}&to=${end.toISOString()}&searchIn=title,description,content&language=en&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.data.articles.filter((item) => item.title !== "[Removed]") || [];
  } catch (error) {
    console.error("Error fetching the news:", error);
    return [];
  }
};

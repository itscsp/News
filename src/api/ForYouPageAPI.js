import axios from 'axios';
import { NewsAPIRoot } from '../utils/helpers';

export const fetchNewsSources = async (apiKey) => {
  try {
    const response = await axios.get(
      `${NewsAPIRoot}/sources?language=en&apiKey=${apiKey}`
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

    let url = `${NewsAPIRoot}/top-headlines?language=en&sortBy=publishedAt`; 

    if (type === "category") {
      queryParams.append("category", value);
    }
    if (type === "country") {
    
      url = `${NewsAPIRoot}/everything?language=en&sortBy=publishedAt`;
      queryParams.append("q", value); 
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

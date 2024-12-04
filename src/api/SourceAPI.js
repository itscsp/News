import axios from 'axios';
import { NewsAPIRoot } from '../utils/helpers';

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const fetchSources = async (country) => {
  const response = await axios.get(`${NewsAPIRoot}/sources`, {
    params: { language: 'en', country, apiKey },
  });
  return response.data.sources.filter(
    (source) => source.language === 'en' && source.url !== 'https://news.google.com'
  );
};

export const fetchArticlesBySource = async (sourceId) => {
  const response = await axios.get(`${NewsAPIRoot}/top-headlines`, {
    params: { language: 'en', sources: sourceId, sortBy: 'publishedAt', apiKey },
  });
  return response.data.articles.filter((article) => article.title !== '[Removed]');
};

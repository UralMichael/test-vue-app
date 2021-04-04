import { HttpClient, NEWS_URL } from "@/services/HttpCommon";

export const NewsService = {
  async getManyNews() {
    try {
      const response = await HttpClient.get(NEWS_URL);
      return response?.data?.news || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  async getNews(newsId) {
    try {
      if (!Number.isInteger(newsId)) {
        return null;
      }
      const response = await HttpClient.get(`${NEWS_URL}/${newsId}`);
      return response?.data?.news;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  async updateNews(newsId, payload) {
    try {
      if (!Number.isInteger(newsId)) {
        return false;
      }
      const response = await HttpClient.patch(`${NEWS_URL}/${newsId}`, payload);
      return response?.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async deleteNews(newsId) {
    try {
      if (!Number.isInteger(newsId)) {
        return false;
      }
      const response = await HttpClient.delete(`${NEWS_URL}/${newsId}`);
      return response?.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

import { HttpClient, USERS_URL } from "./HttpCommon";

export const UserService = {
  async getUsers() {
    try {
      const response = await HttpClient.get(USERS_URL);
      return response?.data?.users || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  async getUser(userId) {
    try {
      if (!Number.isInteger(userId)) {
        return null;
      }
      const response = await HttpClient.get(`${USERS_URL}/${userId}`);
      return response?.data?.user;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  async updateUser(userId, payload) {
    try {
      if (!Number.isInteger(userId)) {
        return false;
      }
      const response = await HttpClient.patch(
        `${USERS_URL}/${userId}`,
        payload
      );
      return response?.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async deleteUser(userId) {
    try {
      if (!Number.isInteger(userId)) {
        return false;
      }
      const response = await HttpClient.delete(`${USERS_URL}/${userId}`);
      return response?.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

import MockAdapter from "axios-mock-adapter";
import { UsersDB } from "./Users";
import { delay } from "@/utils/Delay";
import { NewsDB } from "@/mock-server/News";

const BASE_URL = "http://localhost:3000";
const USERS_URL = "/api/users";
const NEWS_URL = "/api/news";

export function mockUpClient(client) {
  const users = new UsersDB(500);
  const news = new NewsDB(250);
  const mock = new MockAdapter(client);
  console.warn("using axios-mock-adapter");

  mock.onGet(BASE_URL + USERS_URL).reply(async () => {
    await delay(1);
    return [200, { users: users.data }];
  });

  mock.onGet(BASE_URL + NEWS_URL).reply(async () => {
    await delay(1);
    return [200, { news: news.data }];
  });
}

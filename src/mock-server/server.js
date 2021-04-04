import MockAdapter from "axios-mock-adapter";
import { UsersDB } from "./Users";
import { delay } from "@/utils/Delay";

const BASE_URL = "http://localhost:3000";
const USERS_URL = "/api/users";

export function mockUpClient(client) {
  const users = new UsersDB(5);
  const mock = new MockAdapter(client);
  console.warn("using axios-mock-adapter");
  console.log(BASE_URL + USERS_URL);

  mock.onGet(BASE_URL + USERS_URL).reply(async () => {
    await delay(1);
    return [200, { users: users.data }];
  });
}

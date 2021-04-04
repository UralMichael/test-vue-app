import faker from "faker";

function getRussianUser(id) {
  faker.locale = "ru";
  const lastLetter = (str) => {
    return str.charAt(str.length - 1);
  };
  const isCorrectName = (isFemale, str) => {
    if (isFemale) {
      return lastLetter(str) === "а";
    }
    return lastLetter(str) !== "а";
  };
  const gender = faker.name.gender(true);
  const isFemale = gender.toLowerCase() === "female";
  const firstName = faker.name.firstName(gender);
  /* Current version of faker makes gender mistakes in last and middle names  */
  let middleName = faker.name.middleName(gender);
  while (!isCorrectName(isFemale, middleName)) {
    middleName = faker.name.middleName(gender);
  }
  let lastName = faker.name.lastName(gender);
  while (!isCorrectName(isFemale, lastName)) {
    lastName = faker.name.lastName(gender);
  }
  const email = faker.internet.email();
  const regDate = faker.date.past();
  return {
    id,
    firstName,
    middleName,
    lastName,
    email,
    regDate,
    hidden: false,
  };
}

export class UsersDB {
  data = [];

  constructor(usersNumber) {
    for (let i = 0; i < usersNumber; i++) {
      this.data.push(getRussianUser(i));
    }
  }
}

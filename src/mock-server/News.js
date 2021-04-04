import faker from "faker";

function createNews(id) {
  faker.locale = "ru";
  const title = faker.lorem.sentence(5);
  const text = faker.lorem.paragraph(5);
  const imgUrl = faker.image.imageUrl();
  const creationDate = faker.date.past().getTime();
  const mailing = false;
  return {
    id,
    title,
    imgUrl,
    text,
    mailing,
    creationDate,
  };
}

export class NewsDB {
  data = [];

  constructor(newsNumber) {
    for (let i = 0; i < newsNumber; i++) {
      this.data.push(createNews(i));
    }
  }
}

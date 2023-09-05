const { faker } = require("@faker-js/faker");

const createRandomUser = () => {
  return {
    name: faker.person.firstName() + " " + faker.person.lastName(),
    email: faker.internet.email(),
    password: "password@123",
    profilePicture: faker.image.avatar(),
    joinedDate: faker.date.anytime(),
  };
};

const createFakePost = () => {
  return {
    content: faker.lorem.paragraph(),
    image: Math.random() > 0.5 ? faker.image.url() : undefined,
  };
};

module.exports = { createRandomUser };

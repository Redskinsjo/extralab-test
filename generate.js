module.exports = function () {
  const { faker } = require("@faker-js/faker");
  const _ = require("lodash");
  return {
    actors: _.times(100, (n) => {
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      return {
        id: n,
        avatar: faker.image.avatar(),
        firstname,
        lastname,
        email: firstname + "." + lastname + "@" + faker.internet.domainName(),
        phone: faker.phone.phoneNumber(),
        address: {
          zip: faker.address.zipCode(),
          city: faker.address.city(),
          street: faker.address.streetName(),
          country: faker.address.country(),
        },
        careerStart: faker.date.past(),
        price: faker.finance.amount(),
        description: faker.lorem.sentence(),
      };
    }),
  };
};

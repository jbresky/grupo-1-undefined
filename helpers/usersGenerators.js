const { User } = require('../database/models');
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

module.exports = {
  usersGenerator: () => {
    let usersArr = [];
    const hashPassword = bcrypt.hashSync("Pa55word-", 8);
    let i = 0;
    while (i < 10) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);
      usersArr.push(
        User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          avatar: null,
          password: hashPassword,
          roleId: 1,
        })
      )
      i++
    };
    return usersArr;
  },
  adminsGenerator: () => {
    let adminsArr = [];
    const hashPassword = bcrypt.hashSync("Pa55word-", 8);
    let i = 0;
    while (i < 10) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);
      adminsArr.push(
        User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          avatar: null,
          password: hashPassword,
          roleId: 2,
        })
      )
      i++
    };
    return adminsArr;
  }
}
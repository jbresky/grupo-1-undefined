const { User, Transaction } = require("../database/models");
const Sequelize = require("sequelize");
const { faker } = require('@faker-js/faker');

module.exports = {
  transactionGenerator: async () => {
    let transactions = [];
    let i = 0;
    while (i < 10) {
      const randUser = await User.findOne({
        order: [Sequelize.fn("RAND")],
      });
      const description = faker.lorem.sentence();
      const amount = faker.finance.amount();
      const date = faker.date.between();
      const rndInt = Math.floor(Math.random() * 2) + 1
      transactions.push(
        Transaction.create({
          description: description,
          amount: amount,
          userId: randUser.id,
          toUserId: null,
          categoryId: rndInt,
          createdAt: date,
          deletedAt: null
        })
      );
      i++;
    }
    return transactions;
  }
}
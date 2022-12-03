var jwt = require("jsonwebtoken");

module.exports = {
  generateJwt: (id) => {
    return new Promise((resolve, reject) => {
      const payload = { id };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        },
        (err, token) => {
          if (err) {
            reject("Can not generate token");
          } else {
            resolve(token);
          }
        }
      );
    });
  },
};

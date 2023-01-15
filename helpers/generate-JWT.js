const jwt = require("jsonwebtoken");

const signToken = (any) => {

  if(!any) return;
  
  try {
    const signToken = jwt.sign(any, process.env.SECRET_KEY);
    return signToken;

  } catch (error) {    
    throw new Error({error: "Error to sign token!"});
  }
}

const decodeToken = (token) => {

  if(!token) return;
  
  try {
    const decodeToken = jwt.decode(token);
    return decodeToken;

  } catch (error) {    
    throw new Error({error: "Error to decode token!"});
  }
}

module.exports = {
  signToken,
  decodeToken
}
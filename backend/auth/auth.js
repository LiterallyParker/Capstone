const jwt = require("jsonwebtoken");
const key = "paiohuqmetxcpioveqdcvnb";

async function createToken(userObject) {

  try {
    const token = await jwt.sign({ userId: userObject.id }, key);
    return token;
  } catch (error) {
    console.error(error);
  };

};

async function checkForCorrectUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return next(new Error('Unauthorized'));
  };

  try {
    const payload = jwt.verify(token, key);

    if (payload.userId !== +req.params.userId) {
      return next(new Error('Unauthorized'));
    };

    req.userId = payload.userId;

    return next();
  } catch (error) {
    return next(error);
  }

}

module.exports = { checkForCorrectUser, createToken }
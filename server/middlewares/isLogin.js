const AppErr = require("../utils/AppErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  req.user = decodedUser.id;
  if (!decodedUser) {
    return next(new AppErr("Invalid/Expired Token, Please Login Again", 401));
  }
  next();
};

module.exports = isLogin;

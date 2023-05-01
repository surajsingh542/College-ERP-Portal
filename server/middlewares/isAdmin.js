const Admin = require("../model/Admin");
const AppErr = require("../utils/AppErr");

const isAdmin = async (req, res, next) => {
  const adminFound = await Admin.findById(req.user);
  if (!adminFound) {
    return next(new AppErr("Not Authorized, Please Login Again", 403));
  }
  next();
};

module.exports = isAdmin;

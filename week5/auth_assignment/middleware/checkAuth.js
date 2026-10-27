const { getUser } = require("../services/auth");
function checkAuth(req, res, next) {
  const uid = req.cookies.uid;
  const user = getUser(uid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
module.exports = checkAuth
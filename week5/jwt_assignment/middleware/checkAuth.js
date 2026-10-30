const { getUser } = require("../services/auth");
function checkAuth(req, res, next) {
  const uid = req.cookies.uid;
  const user = getUser(uid);
  if (!user) return res.redirect("/login");
  req.user = user;
  if(!user.role || user.role !== "admin") {
    return res.status(403).send("Forbidden: Admin Only!")
  }
  next();
}
module.exports = checkAuth
const express = require("express")
const router = express.Router()
const {getUsers,createUser, updateUser,deleteUser} = require("../controller/user")
router.route("/").get(getUsers).post(createUser)
router.route("/:id").patch(updateUser).delete(deleteUser)

module.exports = router
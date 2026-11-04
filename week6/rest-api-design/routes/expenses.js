const express = require("express");
const { createExpense,getExpenses,editExpense,deleteExpense } = require("../controller/expenses");
const router = express.Router()

router.post("/",createExpense)
router.get("/",getExpenses)
router.post("/edit",editExpense)
router.post("/delete",deleteExpense)
module.exports = router
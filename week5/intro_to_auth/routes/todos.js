const express = require("express");
const router = express.Router();
const {getTodos,submitTodo,markCompleted,getCompletedTodos,deleteTodo} = require("../controller/todos")
router.get("/",getTodos)
router.post("/submit",submitTodo)
router.post("/:id/complete", markCompleted)
router.get("/completed",getCompletedTodos)
router.post("/:id/delete", deleteTodo)
module.exports = router
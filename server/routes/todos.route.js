const { Router } = require("express");
const { todosController } = require("../controllers/todos.controller");

const router = Router();

router.post("/todos", todosController.addTodo);
router.delete("/todos/:id", todosController.deleteTodoById);
router.patch("/todos/:id", todosController.editTodoById);
router.get("/todos", todosController.getTodos);

module.exports = router;

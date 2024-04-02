const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todosController = {
  getAllTodos: async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findById(id);
      if (todo.user.toString() === payload.id) {
        await todo.remove();
        return res.json("Удалено");
      }
      return res.status(401).json("ошибка, нет доступа");
    } catch (e) {
      return res.status(401).json("Ошибка: " + e.toString());
    }
  },

  createTodo: async (req, res) => {
    const { text } = req.body;
    try {
      const todo = await Todo.create({
        user: req.user.id,
        text,
      });
    } catch (e) {
      return res.status(401).json("неверный токен");
    }
  },
};

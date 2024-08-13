const Todo = require("../models/Todo.model");

module.exports.todosController = {
  addTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        todo: req.body.todo,
      });
      return res.json(todo);
    } catch (err) {
      res.json(err);
    }
  },
  deleteTodoById: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      res.json("Дело удалено");
    } catch (err) {
      res.json(err);
    }
  },
  editTodoById: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          todo: req.body.todo,
          favorite: req.body.favorite,
        },

        { new: true }
      );
      res.json(todo);
    } catch (err) {
      res.json(err);
    }
  },
  getTodos: async (req, res) => {
    try {
      const todo = await Todo.find();
      res.json(todo);
    } catch (err) {
      res.json(err);
    }
  },
};

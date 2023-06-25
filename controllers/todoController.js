const Todo = require("../models/todo");
const errorHandler = require("../utils/errorHandler");

const getAllTodos = async (req, res) => {
  const userId = res.locals.userId;
  const todos = await Todo.find({ userId });
  res.json(todos);
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    res.json(todo);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(400).json(errorMessage);
  }
};

const createTodo = async (req, res) => {
  const userId = res.locals.userId;
  const { title, body, isActive } = req.body;
  try {
    const todo = await Todo.create({
      title,
      body,
      userId,
      ...(isActive && { isActive }),
    });

    res.json({ todo });
  } catch (error) {
    const errorMsg = errorHandler(error);
    res.status(400).json(errorMsg);
  }
};

const editTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.json({ msg: "Item Successfully updated" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(400).json(errorMessage);
  }
};

const deleteAllTodos = async (req, res) => {
  const userId = res.locals.userId;
  try {
    await Todo.deleteMany({ userId });
    res.json({ msg: "All items Successfully deleted" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(400).json(errorMessage);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ msg: "Item Successfully deleted" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(400).json(errorMessage);
  }
};

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  editTodo,
  deleteAllTodos,
  deleteTodo,
};

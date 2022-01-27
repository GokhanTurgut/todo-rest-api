import { RequestHandler } from "express";
import { getRepository } from "typeorm";

import { Todo } from "../entities/Todo";
import { Author } from "../entities/Author";

export const getTodos: RequestHandler = async (req, res) => {
  try {
    const authorRepo = getRepository(Author);
    const authorId = req.userId;
    const author = await authorRepo.findOne(authorId, { relations: ["todos"] });
    res.json({
      message: "Todos found!",
      author: `${author.firstName} ${author.lastName}`,
      todos: author.todos,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const getTodoById: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const todoId = req.params.id;
    const authorId = req.userId;
    const todo = await todoRepo.findOne(todoId, { relations: ["author"] });
    if (!todo) {
      res.status(404).json({ message: "No todo with that id found!" });
      return;
    }
    if (authorId != todo.author.id) {
      res.status(401).json({ message: "Authors does not match!" });
      return;
    }
    res.json({
      message: "Todo found!",
      author: `${todo.author.firstName} ${todo.author.lastName}`,
      todo: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline,
        priority: todo.priority,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const postTodo: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const authorRepo = getRepository(Author);
    const authorId = req.userId;
    const author = await authorRepo.findOne(authorId);
    if (!author) {
      res.status(401).json({ message: "Author does not found!" });
      return;
    }
    let todo = new Todo();
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.deadline = req.body.deadline;
    todo.priority = req.body.priority;
    todo.author = author;
    await todoRepo.save(todo);
    res.status(201).json({
      message: "Save successful!",
      author: `${author.firstName} ${author.lastName}`,
      todo: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline,
        priority: todo.priority,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const updateTodoById: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const todoId = req.params.id;
    const authorId = req.userId;
    let todo = await todoRepo.findOne(todoId, { relations: ["author"] });
    if (!todo) {
      res.status(404).json({ message: "No todo with that id found!" });
      return;
    }
    if (authorId != todo.author.id) {
      res.status(401).json({ message: "Authors does not match!" });
      return;
    }
    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.description) {
      todo.description = req.body.description;
    }
    if (req.body.deadline) {
      todo.deadline = req.body.deadline;
    }
    if (req.body.priority) {
      todo.priority = req.body.priority;
    }
    await todoRepo.save(todo);
    res.json({
      message: "Update successful!",
      author: `${todo.author.firstName} ${todo.author.lastName}`,
      todo: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline,
        priority: todo.priority,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const deleteTodoById: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const todoId = req.params.id;
    const result = await todoRepo.delete(todoId);
    if (result.affected) {
      res.json({ message: "Deleted!" });
    } else {
      res.status(404).json({ message: "No todo with that id found!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

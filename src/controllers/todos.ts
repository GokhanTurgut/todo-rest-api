import { RequestHandler } from "express";
import { getRepository } from "typeorm";

import { Todo } from "../entities/Todo";

export const getTodos: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const todos = await todoRepo.find();
    if (todos) {
      res.json({ message: "Todos found!", todos });
    } else {
      res.status(404).json({ message: "No todos exists yet!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed, error occured!", error: err });
  }
};

export const getTodoById: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const todoId = req.params.id;
    const todo = await todoRepo.findOne(todoId);
    if (todo) {
      res.json({ message: "Todo found!", todo });
    } else {
      res.status(404).json({ message: 'No todo with that id found!'});
    }
  } catch (err) {
    res.status(500).json({ message: "Failed, error occured!", error: err });
  }
};

export const postTodo: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    let todo = new Todo();
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.deadline = req.body.deadline;
    todo.priority = req.body.priority;
    await todoRepo.save(todo);
    res.status(201).json({ message: "Save successful!", todo });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occured!", error: err });
  }
};

export const updateTodoById: RequestHandler = async (req, res) => {
  try {
    const todoRepo = getRepository(Todo);
    const todoId = req.params.id;
    let todo = await todoRepo.findOne(todoId);
    if (!todo) {
      res.status(404).json({ message: 'No todo with that id found!'});
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
    res.json({ message: "Update successful!", todo });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occured!", error: err });
  }
}

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
    res.status(500).json({ message: "Failed, error occured!", error: err });
  }
};

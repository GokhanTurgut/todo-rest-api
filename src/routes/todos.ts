import express from 'express';

import * as todoController from '../controllers/todos';

const router = express.Router();

router.get('/todos', todoController.getTodos);

router.get('/todo/:id', todoController.getTodoById);

router.post('/todo', todoController.postTodo);

router.delete('/todo/:id', todoController.deleteTodoById);

router.put('/todo/:id', todoController.updateTodoById);

export default router;
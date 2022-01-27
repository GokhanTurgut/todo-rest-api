import express from 'express';

import * as todoController from '../controllers/todos';
import authChecker from '../middleware/authChecker';

const router = express.Router();

router.get('/todos', authChecker, todoController.getTodos);

router.get('/todo/:id', authChecker, todoController.getTodoById);

router.post('/todo', authChecker, todoController.postTodo);

router.delete('/todo/:id', authChecker, todoController.deleteTodoById);

router.put('/todo/:id', authChecker, todoController.updateTodoById);

export default router;
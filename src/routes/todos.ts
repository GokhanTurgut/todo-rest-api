import express from 'express';

import * as todoController from '../controllers/todos';
import authChecker from '../middleware/authChecker';

const router = express.Router();

router.get('/', authChecker, todoController.getTodos);

router.get('/:id', authChecker, todoController.getTodoById);

router.post('/', authChecker, todoController.postTodo);

router.delete('/:id', authChecker, todoController.deleteTodoById);

router.put('/:id', authChecker, todoController.updateTodoById);

export default router;
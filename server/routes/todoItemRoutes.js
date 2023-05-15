const express = require('express');
const router = express.Router();
const todoController=require('../controller/todoController')

router.post('/create_item/', todoController.createTodoItem);
router.get('/items/', todoController.getTodoItems);
router.put('/update_item/', todoController.updateTodoItem);
router.delete('/delete_item/', todoController.deleteTodoItem);

module.exports = router;
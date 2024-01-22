// Express
import express from 'express'

// Controller
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controller/todo.controller'

// Validator
import { todoValidator } from '../validator/todo.validator'

const router = express.Router()

router.get('/todo', getTodos)
router.get('/todo/:id', getTodo)
router.post('/todo', todoValidator, createTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

export default router

import express from 'express'
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controller/todo.controller'
import { todoValidator } from '../validator/todo.validator'

const router = express.Router()

router.get('/todo', getTodos)
router.get('/todo/:id', getTodo)
router.post('/todo', todoValidator, createTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

export default router

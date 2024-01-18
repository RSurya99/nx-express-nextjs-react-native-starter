import express from 'express'
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controller/todo.controller'

const router = express.Router()

router.get('/todo', getTodos)
router.get('/todo/:id', getTodo)
router.post('/todo', createTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

export default router

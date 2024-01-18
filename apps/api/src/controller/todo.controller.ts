import { TTodo } from '@nx-next-react-native-express/interface'
import { prisma } from "@nx-next-react-native-express/prisma";

export const getTodos = async (req, res) => {
  try{
    const todos: TTodo[] = await prisma.todo.findMany()
    res.status(200).json({
      data: todos,
      total: todos.length,
      meta: {
        status: 200,
        message: 'Success'
      },
    })
  }catch(err){
    res.status(500).json({
      data: {},
      meta: {
        status: 500,
        message: err.message || 'Something went wrong!'
      }
    })
  }
}

export const getTodo = async (req, res) => {
  try{
    const { id } = req.params
    const todo: TTodo = await prisma.todo.findUnique({ where: { id } })
    res.status(200).json({
      data: todo,
      meta: {
        status: 200,
        message: 'Success'
      },
    })
  }catch(err){
    res.status(500).json({
      data: {},
      meta: {
        status: 500,
        message: err.message || 'Something went wrong!'
      }
    })
  }
}

export const createTodo = async (req, res) => {
  try{
    const payload = req.body

    const todo: TTodo = await prisma.todo.create({ data: payload })

    res.status(200).json({
      data: todo,
      meta: {
        status: 200,
        message: 'Success'
      },
    })
  }catch(err){
    res.status(500).json({
      data: {},
      meta: {
        status: 500,
        message: err.message || 'Something went wrong!'
      }
    })
  }
}

export const updateTodo = async (req, res) => {
  try{
    const { id } = req.params
    const payload = req.body

    const todo: TTodo = await prisma.todo.findUnique({ where: { id } })

    if(!todo) throw new Error('Todo not found')

    const updatedTodo: TTodo = await prisma.todo.update({
      where: { id },
      data: payload
    })

    res.status(200).json({
      data: updatedTodo,
      meta: {
        status: 200,
        message: 'Success'
      },
    })
  }catch(err){
    res.status(500).json({
      data: {},
      meta: {
        status: 500,
        message: err.message || 'Something went wrong!'
      }
    })
  }
}

export const deleteTodo = async (req, res) => {
  try{
    const { id } = req.params

    const todo: TTodo = await prisma.todo.findUnique({ where: { id } })

    if(!todo) throw new Error('Todo not found')

    const deletedTodo: TTodo = await prisma.todo.delete({ where: { id } })

    res.status(200).json({
      data: deletedTodo,
      meta: {
        status: 200,
        message: 'Success'
      },
    })
  }catch(err){
    res.status(500).json({
      data: {},
      meta: {
        status: 500,
        message: err.message || 'Something went wrong!'
      }
    })
  }
}

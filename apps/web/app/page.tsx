'use client'

import { TTodo } from "@nx-next-react-native-express/interface"
import { twMerge } from 'tailwind-merge'
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

export default function Index() {
  const [loading, setLoading] = useState<boolean>(false)
  const [todos, setTodos] = useState<TTodo[]>([])

  const fetchTodos = useCallback(async () => {
    setLoading(true)
    try{
      const result = await fetch('http://localhost:3000/api/todo')
      const response = await result.json()
      setTodos(response.data)
    }finally{
      setLoading(false)
    }
  }, [])

  const updateTodoStatus = useCallback(async (id: string, val: boolean) => {
    setLoading(true)
    try{
      await fetch('http://localhost:3000/api/todo/' + id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: val
        })
      })
      await fetchTodos()
    }finally{
      setLoading(false)
    }
  }, [fetchTodos])

  const deleteTodo = useCallback(async (id: string) => {
    setLoading(true)
    try{
      await fetch('http://localhost:3000/api/todo/' + id, {
        method: 'DELETE',
      })
      await fetchTodos()
    }finally{
      setLoading(false)
    }
  }, [fetchTodos])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div className="w-full h-screen max-w-xl mx-auto py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">NX Todo</h1>
        <Link href='/todo/create' className="px-3 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300">Create Todo</Link>
      </div>
      <div className="w-full space-y-2">
        {loading ? (
          <div className="text-center text-lg text-white">Loading...</div>
        ) : (
        todos.map((todo) => (
          <>
          <div className="flex items-center justify-between">
            <div className="p-2 flex items-center gap-2">
              <input onChange={(e) => updateTodoStatus(todo.id, e.target.checked)} type="checkbox" className="w-4 h-4" />
              <h2 className={twMerge("text-xl font-semibold text-white", todo.status && 'line-through')}>{todo.title}</h2>
            </div>
            <div className="p-2 space-x-2">
              <Link href={`/todo/${todo.id}`} className="inline-block px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white transition duration-300">Edit</Link>
              <button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white transition duration-300">Delete</button>
            </div>
          </div>
          </>
        )))}
      </div>
    </div>
  );
}

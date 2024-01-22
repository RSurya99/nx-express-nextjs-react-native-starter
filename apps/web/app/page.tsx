'use client'

import { INIT_TODO } from "@nx-next-react-native-express/constant"
import { TTodo } from "@nx-next-react-native-express/interface"
import { twMerge } from 'tailwind-merge'
import { useContext, useEffect, useState } from "react"
import { TodoContext } from "../context/TodoContext"

export default function Index() {
  const { getTodos, todos, createTodo, deleteTodo, updateTodo } = useContext(TodoContext)
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false)
  const [editedData, setEditedData] = useState<TTodo>(INIT_TODO)

  const handleCreateTodo = async () => {
    await createTodo({ title: editedData.title })
    setShowCreateDialog(false)
    setEditedData(INIT_TODO)
  }

  const handleUpdateTodo = async () => {
    await updateTodo(editedData.id, editedData)
    setEditedData(INIT_TODO)
  }

  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <>
    {showCreateDialog && (
    <div id="create-dialog" className="absolute top-0 bottom-0 left-0 right-0 bg-black/25 backdrop-blur z-10 flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-100 p-8 rounded-xl">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-slate-900 mb-1">Title</label>
          <input type="text" name="title" value={editedData.title} onChange={(e) => setEditedData({ ...editedData, title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-md bg-slate-200 focus:" />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setShowCreateDialog(false)} className="px-4 py-2 bg-rose-500 text-white rounded-md">Cancel</button>
          <button onClick={handleCreateTodo} className="px-4 py-2 bg-slate-900 text-white rounded-md">Create</button>
        </div>
      </div>
    </div>
    )}
    <div className="relative w-full h-screen max-w-xl mx-auto py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">NX Todo</h1>
        <button onClick={() => setShowCreateDialog(true)} className="px-3 py-1 rounded bg-slate-500 hover:bg-slate-600 text-white transition duration-300">Create Todo</button>
      </div>
      <div className="w-full space-y-2">
        {todos.map((todo) => (
          <>
          <div className="flex items-center justify-between">
            {editedData.id === todo.id ? (
              <input type="text" value={editedData?.title} onChange={(e) => setEditedData({ ...editedData, title: e.target.value })} />
            ) : (
              <div className="flex items-center gap-2">
                <input onChange={(e) => updateTodo(todo.id, { ...todo, status: e.target.checked })} type="checkbox" className="w-4 h-4" checked={todo.status} />
                <h2 className={twMerge("text-xl font-semibold text-white", todo.status && 'line-through')}>{todo.title}</h2>
              </div>
            )}
            <div className="space-x-2">
              {editedData.id === todo.id ? (
                <button onClick={handleUpdateTodo} className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white transition duration-300">Save</button>
              ) : (
                <button onClick={() => setEditedData(todo)} className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white transition duration-300">Edit</button>
              )}
              <button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white transition duration-300">Delete</button>
            </div>
          </div>
          </>
        ))}
      </div>
    </div>
    </>
  );
}

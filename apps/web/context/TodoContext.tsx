'use client'

// React
import React from 'react';

// Api
import { todoCreateService, todoDeleteService, todoIndexService, todoUpdateService } from '@nx-next-react-native-express/service';

// Interface
import { TTodo, TTodoContext } from '@nx-next-react-native-express/interface';

export const TodoContext = React.createContext<TTodoContext>({
  todos: [],
  getTodos: () => {},
  createTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
});

export const useTodoContext = () => React.useContext(TodoContext);

export const TodoContextProvider = ({
    children,
}: { children: React.ReactNode }) => {
  const [todos, setTodos] = React.useState<TTodo[]>([]);

  const getTodos = React.useCallback(async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await todoIndexService()
        const response = await result.json()
        setTodos(response.data)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }, [])

  const createTodo = React.useCallback(async (payload: { title: string }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await todoCreateService(payload)
        const response = await result.json()
        await getTodos()
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }, [getTodos])

  const updateTodo = React.useCallback(async (id: string, payload: Partial<TTodo>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await todoUpdateService(id, payload)
        const response = await result.json()
        await getTodos()
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }, [getTodos])

  const deleteTodo = React.useCallback(async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await todoDeleteService(id)
        const response = await result.json()
        await getTodos()
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }, [getTodos])

  return (
      <TodoContext.Provider value={{
        todos,
        getTodos,
        createTodo,
        updateTodo,
        deleteTodo
      }}>
        {children}
      </TodoContext.Provider>
  );
};

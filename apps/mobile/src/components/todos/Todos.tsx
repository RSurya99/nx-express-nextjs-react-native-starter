import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import styles from "./todos.style"
import { COLORS } from "../../constants"
import { TTodo } from '@nx-next-react-native-express/interface'
import TodoCard from "../todo/TodoCard"
import { useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"

const Todos = () => {
  const router = useRouter()
  const [error, setError] = useState<any>()
  const [todos, setTodos] = useState<TTodo[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTodos = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.request({
        url: 'http://10.0.2.2:3000/api/todo',
        method: 'GET'
      })
      setTodos(response.data.data)
    }catch(err){
      setError(err)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }, [])

  const deleteTodo = useCallback(async (id: string) => {
    setLoading(true)
    try {
      await axios.request({
        url: 'http://10.0.2.2:3000/api/todo/' + id,
        method: 'DELETE'
      })
      await fetchTodos()
    }catch(err){
      setError(err)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }, [fetchTodos])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo List</Text>
        <TouchableOpacity style={styles.btnContainer} onPress={() => router.push('/create')}>
          <Text style={styles.headerBtn}>Create Todo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>{error.code}</Text>
        ) : (
          todos?.map((todo) => (
            <TodoCard
              todo={todo}
              deleteTodo={deleteTodo}
              key={`nearby-job-${todo.id}`}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Todos

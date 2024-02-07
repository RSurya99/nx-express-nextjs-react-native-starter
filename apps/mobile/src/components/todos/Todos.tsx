import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import styles from "./todos.style"
import { COLORS } from "../../constants"
import { TTodo } from '@nx-next-react-native-express/interface'
import TodoCard from "../todo/TodoCard"
import { useRouter } from "expo-router"

const Todos = () => {
  const router = useRouter()
  const isLoading = false
  const error = false
  const todos: TTodo[] = [
    {
      id: '1',
      title: 'Beli buah di pasar',
      status: true
    },
    {
      id: '2',
      title: 'Beli laptop di BEC',
      status: false
    },
  ]

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo List</Text>
        <TouchableOpacity style={styles.btnContainer} onPress={() => router.push('/create')}>
          <Text style={styles.headerBtn}>Create Todo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          todos?.map((todo) => (
            <TodoCard
              todo={todo}
              key={`nearby-job-${todo.id}`}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Todos

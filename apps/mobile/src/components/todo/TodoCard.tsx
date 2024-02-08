// React Native
import { Text, TouchableOpacity, View } from "react-native"

// Expo
import { useRouter } from "expo-router"

// Interface
import { TTodo } from '@nx-next-react-native-express/interface'

// Style
import styles from "./todo.style"

const TodoCard = ({ todo, deleteTodo }: { todo: TTodo, deleteTodo: (id: string) => void }) => {
  const router = useRouter()

  return (
    <View style={styles.cardContainer}>
      <Text style={{ textDecorationLine: todo.status ? 'line-through' : 'none' }}>{todo.title}</Text>
      <View style={styles.actionWrapper}>
        <TouchableOpacity style={styles.btnWarning} onPress={() => router.push('/todo/' + todo.id)}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDanger} onPress={() => deleteTodo(todo.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoCard

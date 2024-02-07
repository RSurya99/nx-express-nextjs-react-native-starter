import { Text, TouchableOpacity, View } from "react-native"
import { TTodo } from '@nx-next-react-native-express/interface'
import { COLORS, SIZES } from "../../constants"
import { useRouter } from "expo-router"

const TodoCard = ({ todo }: { todo: TTodo }) => {
  const router = useRouter()

  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Text>{todo.title}</Text>
      <View style={{
        flexDirection: 'row',
        gap: SIZES.small / 2
      }}>
        <TouchableOpacity style={{
          paddingHorizontal: SIZES.small,
          paddingVertical: SIZES.small / 1.5,
          backgroundColor: COLORS.warning,
          borderRadius: SIZES.small / 1.25,
        }} onPress={() => router.push('/todo/' + todo.id)}>
          <Text style={{
            color: COLORS.white,
          }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          paddingHorizontal: SIZES.small,
          paddingVertical: SIZES.small / 1.5,
          backgroundColor: COLORS.danger,
          borderRadius: SIZES.small / 1.25,
        }}>
          <Text style={{
            color: COLORS.white,
          }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoCard

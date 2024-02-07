import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const TodoDetail = () => {
  const params = useGlobalSearchParams();

  return (
    <View>
      <Text>TodoDetail - {params.id}</Text>
    </View>
  )
}

export default TodoDetail

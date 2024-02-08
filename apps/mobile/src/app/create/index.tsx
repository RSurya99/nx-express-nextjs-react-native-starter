import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import { COLORS } from "../../constants";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import styles from "./create.style";

const CreateTodo = () => {
  const router = useRouter()
  const [todo, setTodo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  const createTodo = async () => {
    setLoading(true)
    try {
      await axios.request({
        url: 'http://10.0.2.2:3000/api/todo',
        method: 'POST',
        data: {
          title: todo
        }
      })
      router.push('/')
      setTodo('')
    }catch(err){
      setError(err)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Todo</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="Input your todo here"
        />

        {error && <Text>{error.message}</Text>}

        <TouchableOpacity style={styles.btn} onPress={createTodo}>
          {loading && <ActivityIndicator size='small' color={COLORS.white} />}
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateTodo

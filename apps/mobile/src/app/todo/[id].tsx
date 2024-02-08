import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import { TTodo } from "@nx-next-react-native-express/interface";
import styles from "./todo.style";

const CreateTodo = () => {
  const params = useGlobalSearchParams()
  const router = useRouter()
  const [todo, setTodo] = useState<TTodo>({
    id: '',
    title: '',
    status: false
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  const fetchTodo = useCallback(async () => {
    setLoading(true)
    try {
      if(params.id){
        const response = await axios.request({
          url: 'http://10.0.2.2:3000/api/todo/' + params.id,
          method: 'GET'
        })
        setTodo(response.data.data)
      }
    }catch(err){
      setError(err)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchTodo()
  }, [fetchTodo])

  const updateTodo = async () => {
    setLoading(true)
    try {
      await axios.request({
        url: 'http://10.0.2.2:3000/api/todo/' + params.id,
        method: 'PUT',
        data: {
          title: todo.title,
          status: todo.status
        }
      })
      router.push('/')
    }catch(err){
      setError(err)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: SIZES.medium,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Update Todo</Text>
      </View>

      <View style={{
        marginTop: SIZES.large,
        gap: SIZES.small
      }}>
        <TextInput
          style={styles.input}
          value={todo.title}
          onChangeText={(text) => setTodo({...todo, title: text})}
          placeholder="Input your todo here"
        />

        {error && <Text>{error.message}</Text>}

        <TouchableOpacity style={styles.btn} onPress={updateTodo}>
          {loading && <ActivityIndicator size='small' color={COLORS.white} />}
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateTodo

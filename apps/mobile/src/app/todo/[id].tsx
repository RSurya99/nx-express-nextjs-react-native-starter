// React
import { useCallback, useEffect, useState } from "react";

// React Native
import { ActivityIndicator, Switch, Text, TextInput, TouchableOpacity, View } from "react-native"

// Axios
import axios from "axios";

// Expo
import { useGlobalSearchParams, useRouter } from "expo-router";

// Interface
import { TTodo } from "@nx-next-react-native-express/interface";

// Constant
import { COLORS, SIZES } from "../../constants";

// Style
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

        <View>
        <Text>Status</Text>
        <View style={styles.toggleWrapper}>
          <Switch
            style={styles.toggle}
            thumbColor={todo.status ? COLORS.primary : COLORS.lightWhite}
            value={todo.status}
            onChange={() => setTodo({...todo, status: !todo.status})}
          />
          <Text>{todo.status ? 'finished' : 'not finished'}</Text>
        </View>
        </View>

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

import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import { TTodo } from "@nx-next-react-native-express/interface";

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
          style={styles.searchInput}
          value={todo.title}
          onChangeText={(text) => setTodo({...todo, title: text})}
          placeholder="Input your todo here"
        />

        {error && <Text>{error.message}</Text>}

        <TouchableOpacity style={styles.btnContainer} onPress={updateTodo}>
          {loading && <ActivityIndicator size='small' color={COLORS.white} />}
          <Text style={styles.headerBtn}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateTodo

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small / 1.25,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small / 1.5,
  },
  searchInput: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small / 1.5,
    borderRadius: SIZES.small / 1.25,
    backgroundColor: COLORS.lightWhite,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});

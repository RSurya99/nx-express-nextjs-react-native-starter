import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { COLORS, SIZES } from "../constants";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

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
    <View
      style={{
        flex: 1,
        padding: SIZES.medium,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Todo</Text>
      </View>

      <View style={{
        marginTop: SIZES.large,
        gap: SIZES.small
      }}>
        <TextInput
          style={styles.searchInput}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="Input your todo here"
        />

        {error && <Text>{error.message}</Text>}

        <TouchableOpacity style={styles.btnContainer} onPress={createTodo}>
          {loading && <ActivityIndicator size='small' color={COLORS.white} />}
          <Text style={styles.headerBtn}>Create</Text>
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

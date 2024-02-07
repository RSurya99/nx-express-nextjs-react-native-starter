import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Stack } from 'expo-router'
import Todos from '../components/todos/Todos';
import { SIZES } from '../constants';

export const App = () => {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#FAFAFA' },
          headerShadowVisible: true,
          headerTitle: 'NX Todo',
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Todos />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

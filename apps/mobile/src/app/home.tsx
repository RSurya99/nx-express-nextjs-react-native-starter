// React
import React from 'react';

// React Native
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

// Expo
import { Stack } from 'expo-router'

// Components
import Todos from '../components/todos/Todos';

// Constants
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

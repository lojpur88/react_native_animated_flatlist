import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import SingleMovie from '../screens/SingleMovie';

const Stack = createStackNavigator();

export default function MovieStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Single Movie' component={SingleMovie} />
    </Stack.Navigator>
  );
}

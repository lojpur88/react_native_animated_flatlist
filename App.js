import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MovieStack from './src/stack';

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <MovieStack />
      </View>
    </NavigationContainer>
  );
}

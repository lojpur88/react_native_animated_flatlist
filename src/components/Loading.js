import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size='large' color='#3f3f3f' />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;

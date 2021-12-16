import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { height } from '../constants';

const SingleMovie = () => {
  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.gradient}
        >
          {/* <Image /> */}
        </LinearGradient>
      </View>
    </View>
  );
};

export default SingleMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    height: height * 0.5,
  },
});

import React from 'react';
import { View, FlatList, Animated, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { width, height, ITEM_SIZE, BACKDROP_HEIGHT } from '../constants';

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={item => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width * 1.1],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}
            >
              <Image source={{ uri: item.backdrop }} style={styles.image} />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BACKDROP_HEIGHT,
    width: width,
    position: 'absolute',
    backgroundColor: 'coral',
  },
  image: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
  },
  gradient: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute',
    bottom: 0,
  },
});

export default Backdrop;

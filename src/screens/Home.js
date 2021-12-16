import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { getMovies } from '../api';
import Backdrop from '../components/Backdrop';
import Loading from '../components/Loading';
import { ITEM_SIZE, EMPTY_ITEM_SIZE, height } from '../constants';
import ListItem from '../components/ListItem';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation }) {
  const [movies, setMovies] = useState(false);
  const isFocused = useIsFocused();

  const scrollX = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const slideAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      delay: 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const pressHandler = item => {
    Animated.timing(slideAnim, {
      toValue: height,
      delay: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        slideAnim.setValue(height);
        navigation.navigate('Single Movie', { item });
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
    };
    !movies && fetchData(movies);
  }, [movies]);

  useEffect(() => {
    isFocused && slideAnimation();
  }, [isFocused]);

  if (!movies) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        style={{ transform: [{ translateY: slideAnim }] }}
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
            <ListItem
              pressHandler={() => pressHandler(item)}
              item={item}
              translateY={translateY}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

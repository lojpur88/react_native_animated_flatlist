import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { ITEM_SIZE, SPACING } from '../constants';
import Genres from '../components/Genres';
import Rating from '../components/Rating';

const ListItem = ({ item, translateY }) => {
  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View
        style={{
          marginHorizontal: SPACING,
          padding: SPACING * 2,
          alignItems: 'center',
          transform: [{ translateY }],
          backgroundColor: '#fff',
          borderRadius: 34,
        }}
      >
        <Animated.Image
          source={{ uri: item.poster }}
          style={styles.posterImage}
        />
        <Text style={{ fontSize: 24, textAlign: 'center' }} numberOfLines={1}>
          {item.title}
        </Text>
        <Rating rating={item.rating} />
        <Genres genres={item.genres} />
        <Text style={{ fontSize: 12 }} numberOfLines={3}>
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default ListItem;

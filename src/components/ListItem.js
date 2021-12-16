import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ITEM_SIZE, SPACING } from '../constants';
import Genres from '../components/Genres';
import Rating from '../components/Rating';

const ListItem = ({ item, translateY, pressHandler }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ width: ITEM_SIZE }}
      onPress={pressHandler}
    >
      <Animated.View style={[styles.item, { transform: [{ translateY }] }]}>
        <Image source={{ uri: item.poster }} style={styles.posterImage} />
        <Text style={{ fontSize: 24, textAlign: 'center' }} numberOfLines={1}>
          {item.title}
        </Text>
        <Rating rating={item.rating} color='tomato' />
        <Genres genres={item.genres} />
        <Text style={{ fontSize: 12 }} numberOfLines={3}>
          {item.description}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  translateY: PropTypes.object.isRequired,
  pressHandler: PropTypes.func.isRequired,
};

export default ListItem;

const styles = StyleSheet.create({
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.1,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  item: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

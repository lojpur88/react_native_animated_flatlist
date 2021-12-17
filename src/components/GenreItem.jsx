import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Animated } from 'react-native';
import { height } from '../constants';

const GenreItem = ({ genre, genreDelay }) => {
  const slideUp = useRef(new Animated.Value(height)).current;

  const scaleUpAnimation = () => {
    Animated.timing(slideUp, {
      toValue: 0,
      delay: 1000 + genreDelay,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    scaleUpAnimation();
  }, [slideUp]);

  return (
    <Animated.View
      style={[styles.genreItem, { transform: [{ translateY: slideUp }] }]}
    >
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {genre}
      </Text>
    </Animated.View>
  );
};

GenreItem.propTypes = {
  genre: PropTypes.string.isRequired,
  genreDelay: PropTypes.number.isRequired,
};

export default GenreItem;

const styles = StyleSheet.create({
  genreItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    margin: 5,
  },
});

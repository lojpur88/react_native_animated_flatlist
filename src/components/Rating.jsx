import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Rating = ({ rating, starColor, numberColor }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={[styles.ratingNumber, { color: numberColor }]}>
        {rating}
      </Text>
      {r.map((type, index) => {
        return (
          <AntDesign key={index} name={type} size={12} color={starColor} />
        );
      })}
    </View>
  );
};

Rating.defaultProps = {
  starColor: 'tomato',
  numberColor: '#000',
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  starColor: PropTypes.string,
  numberColor: PropTypes.string,
};

export default Rating;

const styles = StyleSheet.create({
  ratingNumber: {
    marginRight: 10,
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

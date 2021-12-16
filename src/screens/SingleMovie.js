import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import GenreItem from '../components/GenreItem';
import Rating from '../components/Rating';

const SingleMovie = ({ route, navigation }) => {
  const { item } = route.params;

  const slideRight = useRef(new Animated.Value(-width)).current;
  const slideLeft = useRef(new Animated.Value(width)).current;
  const scaleUp = useRef(new Animated.Value(0)).current;

  const slideRightAnimation = () => {
    Animated.timing(slideRight, {
      toValue: 0,
      delay: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      finished && slideLeftAnimation();
    });
  };

  const slideLeftAnimation = () => {
    Animated.timing(slideLeft, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      finished && scaleUpAnimation();
    });
  };

  const scaleUpAnimation = () => {
    Animated.spring(scaleUp, {
      toValue: 1,
      tension: 100,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideRightAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: item.backdrop }} style={styles.backdrop}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.gradient}
        >
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign
              name='left'
              size={16}
              color='#fff'
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: '#fff' }}>Back</Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.titleWrapper,
              { transform: [{ translateX: slideRight }] },
            ]}
          >
            <Text style={styles.title}>{item.title}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.ratingWrapper,
              { transform: [{ translateX: slideLeft }] },
            ]}
          >
            <Rating
              rating={item.rating}
              starColor='yellow'
              numberColor='#fff'
            />
          </Animated.View>
          <View style={styles.genresWrapper}>
            {item.genres.map((genre, i) => {
              return (
                <GenreItem key={i} genre={genre} genreDelay={(i + 1) * 300} />
              );
            })}
          </View>
          <Animated.View
            style={[
              styles.descriptionWrapper,
              { transform: [{ scale: scaleUp }] },
            ]}
          >
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 50,
              }}
            >
              <Text style={styles.descriptionText}>
                {item.description !== ''
                  ? item.description
                  : 'No description for this movie!'}
              </Text>
            </ScrollView>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default SingleMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  goBackBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradient: {
    width,
    height,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backdrop: {
    width,
    height,
  },
  titleWrapper: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  genresWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width,
    padding: 10,
    flexWrap: 'wrap',
  },
  descriptionWrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    height: height * 0.5,
    width: '100%',
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});

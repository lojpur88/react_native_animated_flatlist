import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../constants';
import { AntDesign } from '@expo/vector-icons';

const SingleMovie = ({ route, navigation }) => {
  const { item } = route.params;

  const filledStars = Math.floor(item.rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

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
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.ratingWrapper}>
            <Text
              style={{ color: '#fff', paddingRight: 5, fontWeight: 'bold' }}
            >
              {item.rating}
            </Text>
            {r.map((type, index) => {
              return (
                <AntDesign key={index} name={type} size={12} color='yellow' />
              );
            })}
          </View>
          <View style={styles.genresWrapper}>
            {item.genres.map((genre, index) => {
              return (
                <View key={index} style={styles.genreItem}>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    {genre}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.descriptionWrapper}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 50,
              }}
            >
              <Text style={styles.descriptionText}>{item.description}</Text>
            </ScrollView>
          </View>
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
  genreItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    margin: 5,
  },
  descriptionWrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    height: height * 0.5,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});

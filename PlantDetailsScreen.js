// PlantDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PlantDetailsScreen({ route }) {
  const { name, info, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    margin: 10,
  },
});

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CategorySliderSingleItem = ({ name, imagePath }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imagePath}
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategorySliderSingleItem;
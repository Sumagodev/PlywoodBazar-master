import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from './Colors.js';

const FadeRibbonText = ({ text, colorStart=Colors.childBackground, colorEnd=Colors.mattBrownFaint }) => {
  const styles = StyleSheet.create({
    gradientContainer: {
      padding: 10,
      borderRadius: 50,
    },
    gradient: {
      flex: 1,
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 10,
    },
  });

  return (
    <LinearGradient
      colors={[colorStart, colorEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientContainer}
    >
      <Text style={styles.text}>{text}</Text>
    </LinearGradient>
  );
};

export default FadeRibbonText;
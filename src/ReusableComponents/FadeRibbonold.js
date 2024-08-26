import React from 'react';
import { Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomColors from '../styles/CustomColors.js';

const FadeRibbonText = ({ text, colorStart=CustomColors.childBackground, colorEnd=CustomColors.mattBrownFaint }) => {
  const styles = StyleSheet.create({
    gradientContainer: {
      padding: 10,
      borderRadius: 50,
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
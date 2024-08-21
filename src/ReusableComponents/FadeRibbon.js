import React from 'react';
import { Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomColors from '../styles/CustomColors.js';

const FadeRibbonText = ({ text, textColor='white', colorStart=CustomColors.childBackground, colorEnd=CustomColors.mattBrownFaint, reverseDirection=false }) => {
  const styles = StyleSheet.create({
    gradientContainer: {
      padding: 10,
      borderRadius: 50,
    },
    text: {
      color: textColor,
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 10,
    },
  });

  const gradientDirection = reverseDirection 
    ? { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } } 
    : { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };

  return (
    <LinearGradient
      colors={[colorStart, colorEnd]}
      start={gradientDirection.start}
      end={gradientDirection.end}
      style={styles.gradientContainer}
    >
      <Text style={styles.text}>{text}</Text>
    </LinearGradient>
  );
};

export default FadeRibbonText;
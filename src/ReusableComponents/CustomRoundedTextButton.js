import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomRoundedTextButton = ({ buttonText = 'SEND OTP', buttonColor = '#A52A2A', textColor = 'white', onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'flex-start', // This makes it wrap content
    elevation:5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomRoundedTextButton;

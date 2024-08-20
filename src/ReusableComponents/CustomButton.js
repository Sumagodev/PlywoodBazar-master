// CustomButton.js

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from '../styles/CustomColors';

const CustomButton = ({
  text,
  rightIcon = false,
  buttonBgColor = CustomColors.mattBrownDark,
  rightIconBgColor = CustomColors.accentGreen,
  onPress,
  textSize,
}) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: buttonBgColor}]} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        {rightIcon && (
          <View style={[styles.iconContainer, { backgroundColor: rightIconBgColor }]}>
            <MaterialCommunityIcons name="chevron-right" size={40} color= 'white' />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    elevation: 5,
    paddingVertical: 2,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: {textSize} ? {textSize} : 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
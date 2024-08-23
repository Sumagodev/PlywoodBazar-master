import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Image } from 'react-native-elements';
import  CustomColors  from '../styles/CustomColors';

const CustomInputWithLeftIcon = ({
  placeholderText = 'Enter Mobile Number',
  imageSource = require('../images/icon_phone.png'),
  containerStyle,
  iconContainerStyle,
  inputStyle,
  maxLength = 10, // Default to 9 digits
  keyboardType = 'numeric',
  onValueChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, maxLength);
    setInputValue(sanitizedText);
    if (onValueChange) {
      onValueChange(sanitizedText);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        <Image style={styles.icon} source={imageSource} />
      </View>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholderText}
        placeholderTextColor="#AEAEAE"
        maxLength={maxLength}
        keyboardType={keyboardType}
        value={inputValue}
        onChangeText={handleInputChange} // Corrected to use onChangeText
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: [CustomColors.masterBackground],
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#8B8888',
    borderWidth: 1,
  },
  iconContainer: {
    backgroundColor: CustomColors.mattBrownDark,
    width: 48,
    height: 48,
    borderRadius: 24, // Use 24 to make it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: '#AEAEAE',
    paddingLeft: 10, // Add padding for better alignment
  },
});

export default CustomInputWithLeftIcon;
import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import CustomColors from '../styles/CustomColors.js';

const CustomTextInputField = ({ 
    imagePath,
  inputType = 'text',
  placeholder = '',
  validator,
  ...rest
}) => {
  const handleOnChangeText = (text) => {
    if (validator) {
      validator(text);
    }
  };

  return (
    <View style={[styles.container]}>
      {imagePath && (
        <View style={styles.iconContainer}>
          <Image source={imagePath} style={styles.imageStyle} />
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={inputType === 'password'}
        keyboardType={
          inputType === 'number' ? 'numeric' : inputType === 'email'
            ? 'email-address'
            : 'default'
        }
        onChangeText={handleOnChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
    flexDirection: 'row',
    backgroundColor: CustomColors.mattBrownFaint,
    borderRadius: 50,
    shadowColor: CustomColors.shadowColorGray,
    shadowRadius: 50,
    elevation: 5,
    borderWidth: 0.6,
    borderColor: CustomColors.shadowColorGray,
  },
  iconContainer: {
    height: 45, 
    width: 45, 
    borderRadius: 50,
    margin: 2,
    backgroundColor: CustomColors.mattBrownDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingStart: 5,
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: CustomColors.mattBrownDark,
  }
});

export default CustomTextInputField;
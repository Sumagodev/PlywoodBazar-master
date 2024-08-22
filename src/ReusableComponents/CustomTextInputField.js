import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomTextInputField = ({ 
    imagePath,
  inputType = 'text',
  placeholder = '',
  validator,
  customWidth='100%',
    ...rest
}) => {
  const handleOnChangeText = (text) => {
    if (validator) {
      validator(text);
    }
  };

  return (
      <View style={[styles.container,{width:customWidth,rest,height: wp(11)}]}>
      {imagePath && (
        <View style={styles.iconContainer}>
          <Image source={imagePath} style={styles.imageStyle} />
        </View>
      )}
      <TextInput
      selectionColor={CustomColors.mattBrownDark}
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
    shadowColor: CustomColors.shadowColorGray,
    shadowRadius: 50,
    elevation: 5,
    borderWidth: 0.6,
    borderColor: CustomColors.searchBackground,
    borderColor:CustomColors.searchBgColor,
    borderRadius:50,
  },
  iconContainer: {
    height: wp(10), 
    width: wp(10), 
    borderRadius: 50,
    margin:1,
    backgroundColor: CustomColors.mattBrownDark,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  input: {
    fontSize: wp(4),
    color: '#000000',
    paddingStart: wp(2),
  },
  imageStyle: {
    height: wp(7),
    width: wp(7),
    borderRadius: 25,
    backgroundColor: CustomColors.mattBrownDark,
  }
});

export default CustomTextInputField;
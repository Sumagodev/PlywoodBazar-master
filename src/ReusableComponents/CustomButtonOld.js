// CustomButton.js

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from '../styles/CustomColors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


const CustomButtonOld = ({
  text,
  rightIcon = false,
  buttonBgColor = CustomColors.colorNewButton,
  rightIconBgColor = CustomColors.accentGreen,
  onPress,
  textSize = wp(5),
  paddingHorizontal=0
}) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonBgColor,paddingHorizontal:paddingHorizontal }]} onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.text, { fontSize: textSize }]}>{text}</Text>
        {rightIcon && (
          <View style={[styles.iconContainer, { backgroundColor: rightIconBgColor }]}>
            <MaterialCommunityIcons name="chevron-right" size={40} color='white' />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight:500,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal:wp(4),
    paddingVertical:wp(1)
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButtonOld;
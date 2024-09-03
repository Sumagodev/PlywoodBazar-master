import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomColors from '../styles/CustomColors';

const CustomButtonNew = ({
  text,
  rightIcon = false,
  leftIconPath = null,
  buttonBgColor = CustomColors.mattBrownDark,
  rightIconBgColor = CustomColors.accentGreen,
  leftIconBgColor = CustomColors.accentGreen,
  onPress,
  textSize = 16,
  fontWeight = 'bold',
  paddingHorizontal = wp(2),
  paddingVertical = wp(2),
  ...rest
}) => {
  return (
    <Pressable style={[styles.button, { backgroundColor: buttonBgColor }, rest]} onPress={onPress}>
        <View style={styles.container}>
        {leftIconPath && (
          <View style={[styles.iconContainer, { backgroundColor: leftIconBgColor }]}>
            <Image source={leftIconPath} style={styles.leftIcon} size={50} />
          </View>
        )}
        <Text style={[styles.text, { fontSize: textSize, fontWeight: fontWeight, paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical }]}>{text}</Text>
        {rightIcon && (
          <View style={[styles.iconContainer, { backgroundColor: rightIconBgColor }]}>
            <Image source={rightIcon} style={styles.leftIcon} size={50} />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    elevation: 5,
    alignSelf: 'flex-start', // This will make the button wrap its content
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily:'Poppins-Bold',
    paddingHorizontal: wp(5),
    paddingVertical: wp(1),
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default CustomButtonNew;
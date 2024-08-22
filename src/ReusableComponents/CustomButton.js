import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomColors from '../styles/CustomColors';

const CustomButton = ({
  text,
  rightIcon = false,
  leftIconPath = null,
  buttonBgColor = CustomColors.mattBrownDark,
  rightIconBgColor = CustomColors.accentGreen,
  leftIconBgColor = CustomColors.accentGreen,
  onPress,
  textSize = 16,
  fontWeight = 'bold'
}) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonBgColor }]} onPress={onPress}>
      <View style={styles.container}>
        {leftIconPath && (
          <View style={[styles.iconContainer, { backgroundColor: leftIconBgColor }]}>
            <Image source={leftIconPath} style={styles.leftIcon} size={50} />
          </View>
        )}
        <Text style={[styles.text, { fontSize: textSize, fontWeight: fontWeight }]}>{text}</Text>
        {rightIcon && (
          <View style={[styles.iconContainer, { backgroundColor: rightIconBgColor }]}>
            <MaterialCommunityIcons name="chevron-right" size={40} color="white" />
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
    alignSelf: 'flex-start', // This will make the button wrap its content
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: wp(1),
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default CustomButton;
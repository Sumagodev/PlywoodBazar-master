import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

const FlashSaleAnimatedCard = ({ gifSource }) => {
  const textColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(textColor, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(textColor, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [textColor]);

  const interpolatedColor = textColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'yellow'],
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.textStyleTop, { color: interpolatedColor }]}>
        ! Flash Sale !
      </Animated.Text>
      <FastImage
        source={gifSource}
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Animated.Text style={[styles.textStyleBottom, { color: interpolatedColor }]}>
        ! Flash Sale !
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(40),
    height: wp(48),
    backgroundColor: 'black',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gif: {
    width: '80%',
    height: '80%',
  },
  textStyleTop: {
    fontSize: wp(6),
    fontWeight: 'bold',
    position: 'absolute',
    textDecorationStyle: 'double',
    textShadowColor: 'yellow',
    textShadowRadius: 20,
    textShadowOffset: { height: 1, width: 1 },
    top: 10,
  },
  textStyleBottom: {
    fontSize: wp(6),
    fontWeight: 'bold',
    position: 'absolute',
    textDecorationStyle: 'double',
    textShadowColor: 'yellow',
    textShadowRadius: 20,
    textShadowOffset: { height: 1, width: 1 },
    bottom: 10,
  },
  
});

export default FlashSaleAnimatedCard;
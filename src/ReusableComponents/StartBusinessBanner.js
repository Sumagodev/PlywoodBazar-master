import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomButton from './CustomButton';

const StartBusinessBanner = () => {
  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start'}}>
        <Text style={styles.freeStyle}>FREE</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textStyle}>Let's start your </Text>
          <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>business</Text>
        </View>
      </View>
      <View style={{ width: wp(3) }} />
      <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Text style={[styles.freeStyle, {backgroundColor: '#9d7b5f'} ]}/>
        <CustomButton text="Start now" buttonBgColor="#67462A" textSize={wp(4)} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: wp(2),
    width: wp(100),
    backgroundColor: '#9d7b5f',
  },
  textStyle: {
    fontSize: wp(4.6),
    color: 'white',
  },
  freeStyle: {
    color: '#5a432f',
    borderRadius: 50,
    backgroundColor: '#fae1cc',
    paddingHorizontal: wp(4),
    paddingVertical: wp(1),
    textAlign: 'center',
    fontSize: wp(3),
    alignSelf: 'flex-start',
  },
});

export default StartBusinessBanner;
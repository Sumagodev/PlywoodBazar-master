import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomButton from './CustomButton';

const AddOpportunitiesHomeBanner = ({onPress}) => { 
  return (
    <View style={styles.wrapper}>    
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start'}}>
        <View style={{ flexDirection: 'row' ,alignSelf:'center'}}>
          <Text style={styles.textStyle}>Fill Now The</Text>
          <Text style={[styles.textStyle, { fontWeight:800 }]}> Form</Text>
         <View style={{alignSelf:'center',marginLeft:wp(5),borderRadius:50,borderColor:'#BC9B80',borderWidth:wp(1)}}>
         <CustomButton text={"Add Opportunities"} onPress={onPress}></CustomButton>
         </View>
        </View>
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
    backgroundColor: '#9D7B5F',
  },
  textStyle: {
    fontSize: wp(4.6),
    color: 'white',
    alignSelf:'center'
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

export default AddOpportunitiesHomeBanner;
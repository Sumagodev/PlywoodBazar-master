import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <>
      {props.backbtnshowpage && (
        <View style={[styles1.flexbetween, {backgroundColor:'#fff'}]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
            <Image source={require('../../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
          </TouchableOpacity>
          <View>
            <Text style={styles1.categry}>Product Name</Text>
          </View>
          <View></View>
          {/* <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} /> */}
        </View>
      )}

      {props.stackHeader && (
      <View style={[styles1.flexbetween, {position:'relative'}]}>
          <TouchableOpacity onPress={() => props.rootProps.navigation.goBack()} style={{position:'absolute', top:10, left:0}}>
            <Image source={require('../../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles1.categry}>{props.screenName}</Text>
          {/* <Image source={require('../../../assets/img/notification.png')} style={styles1.imgsmall} /> */}
        </View>
      )}


      {props.normal && (
        <View style={[styles1.flexbetween, {paddingHorizontal: wp(2), alignItems: 'center', backgroundColor: '#fff'}]}>
          <TouchableOpacity onPress={() => props.rootProps.navigation.goBack()}>
            <Image source={require('../../../assets/img/logo.png')} style={{width: wp(50), height: wp(10)}} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles1.categry}>{props.screenName}</Text>

          <View></View>
          {/* <Image source={require('../../../assets/img/notification.png')} style={styles1.imgsmall} /> */}
        </View>
      )}
    </>
  );
}
const styles1 = StyleSheet.create({
  flexbetween: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    // borderColor: '#ccc',
    // borderBottomWidth: 1,
    // borderStyle: 'solid',
  },
  imgsmall: {
    width: wp(6),
    height: hp(3),
  },
  categry: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Manrope-Medium',
  },
});

import { View, Text, ScrollView, Pressable, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../assets/stylecomponents/Style';
import Entypo from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Header from '../navigation/customheader/Header';

export default function GeneralInfo(props) {
  const navigation = useNavigation()
  return (
    <>
      <Header stackHeader={true} screenName={'General info'} rootProps={props} />
      <ScrollView style={[styles.padinghr, styles.bgwhite]}>
        {/* <View style={styles1.flexbetween}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
        </Pressable>
        <Text style={styles1.categry}>My Orders</Text>
        <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} />
      </View> */}

        <TouchableOpacity style={[styles1.card_main, { marginTop: 20, }]}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/img/tearm.png')} style={styles1.imgfluid} resizeMode="contain" />
            <Text style={styles1.nameheading}>Terms & Conditions</Text>
          </View>
          <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles1.card_main}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/img/lock.png')} style={styles1.imgfluid} resizeMode="contain" />
            <Text style={styles1.nameheading}>Payment Related</Text>
          </View>
          <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles1.card_main}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/img/feedback.png')} style={styles1.imgfluid} resizeMode="contain" />
            <Text style={styles1.nameheading}>Feedback & Suggestions</Text>
          </View>
          <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
const styles1 = StyleSheet.create({
  flexbetween: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
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
  imgfluid: {
    width: wp(6),
    height: hp(3),
    marginRight: 10,
  },
  card_main: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 10,
    fontFamily: 'Manrope-Medium',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameheading: {
    color: '#000000',
    fontFamily: 'Manrope-Medium',
  },
});

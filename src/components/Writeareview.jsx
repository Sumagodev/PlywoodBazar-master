import {View, Text, ScrollView, Image, Pressable, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../../assets/stylecomponents/Style';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function Writeareview() {
  return (
    <ScrollView style={[styles.padinghr, styles.bgwhite]}>
      <View style={styles1.flexbetween}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
        </Pressable>
        <Text style={styles1.categry}>Write a Review</Text>
        <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} />
      </View>

      <View style={styles1.flexrow}>
        <Image source={require('../../assets/img/imgtre.png')} style={styles1.imgproduct} />
        <View>
          <Text style={{fontSize: 14, fontFamily: 'Manrope-Medium', color: '#000'}}></Text>
          <Text style={{fontSize: 12, marginTop: 5, color: '#777777', fontFamily: 'Manrope-Medium'}}></Text>
        </View>
      </View>
      <Text style={[styles1.labelform, {marginTop: 15, color: '#000', fontFamily: 'Manrope-Bold', marginBottom: 5}]}>Add Photo or Video </Text>
      <View style={[styles1.formgroup, styles1.card_main]}>
        <View style={styles1.borderupload}>
          <Image source={require('../../assets/img/Cloudupload.png')} style={{width: wp(16), height: hp(8), alignItems: 'center', marginLeft: 10}} />
          <Text>Click here to upload</Text>
        </View>
      </View>
      <View style={styles1.flexbetwen}>
        <Text style={styles1.headingmain}>Rating</Text>
        <Pressable onPress={() => navigate.navigate('AllProducts')}>
          <Text style={styles1.viewall}>4/5</Text>
        </Pressable>
      </View>
      <View style={styles1.card_main}>
        <AntDesign name="star" color="#E7B84E" size={34} />
        <AntDesign name="star" color="#E7B84E" size={34} />
        <AntDesign name="star" color="#E7B84E" size={34} />
        <AntDesign name="star" color="#E7B84E" size={34} />
        <AntDesign name="staro" color="#E7B84E" size={34} />
      </View>
      <Text style={[styles1.labelform, {marginTop: 15, color: '#000', fontFamily: 'Manrope-Bold', marginBottom: 5}]}>Add Photo or Video </Text>
      <TextInput multiline={true} numberOfLines={8} style={[styles1.card_main1textarea]} placeholder="Additional details about your requirement..." />
      <Text style={{alignItems: 'flex-end', fontSize: 11, display: 'flex', textAlign: 'right', marginBottom: 30}}>400 characters remaining</Text>

      <TouchableOpacity onPress={() => navigate.navigate('Mobilenumber')} style={styles.btnbg}>
        <Text style={[styles.textbtn, {fontFamily: 'Manrope-Regular'}]}>Submit </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles1 = StyleSheet.create({
  card_main1textarea: {
    height: 120,
    textAlignVertical: 'top',
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  headingmain: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#000',
  },
  flexrow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  imgproduct: {
    width: wp(20),
    height: hp(10),
  },
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
  card_main: {
    borderWidth: 1,
    // height:45,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 10,
    fontFamily: 'Manrope-Medium',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  viewall: {
    color: '#B08218',
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
  },
  flexbetwen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});

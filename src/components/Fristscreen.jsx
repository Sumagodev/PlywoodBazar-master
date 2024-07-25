import { View, StyleSheet, Text, Image, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import styles from '../../assets/stylecomponents/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
export default function Fristscreen() {
  const navigate = useNavigation()
  return (
    <>
      <View style={[styles.bgwhite, styles.flex1, styles.positionrelative, styles.padinghr]}>
        <View style={styles1.logobox}>
          <Image source={require('../../assets/img/logo.png')} style={styles1.logosize} resizeMode='contain' />
        </View>
        <ImageBackground source={require('../../assets/img/Blurr.png')} style={[styles1.imglogcentr, { width: wp(100), height: hp(90) }]} />
        <View style={[styles1.flexend, styles1.paddingbtm]}>
          <Text style={styles1.heading1}>Welcome to the</Text>
          <Text style={[styles1.heading1, { color: '#B08218' }]}>Plywood</Text>
          <Text style={[styles1.heading1, styles1.mb20]}>Bazar</Text>
          <Pressable onPress={() => navigate.navigate('Mobilenumber')} style={styles.btnbg}>
            <Text style={[styles.textbtn, { fontFamily: 'Manrope-Medium' }]}>Get Started</Text>
          </Pressable>
          <Text style={[styles.textcenter, { marginTop: 10, }]}>I’m already a member</Text>
        </View>


      </View>
    </>
  )
}
const styles1 = StyleSheet.create({
  logobox: {
    flex: 1,
    width: wp(95),
    height: hp(18),
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  logosize: {
    width: wp(60),
    height: hp(15),
  },
  mb20: {
    marginBottom: 25,
  },
  btnstartd: {
    backgroundColor: '#B08218',
  },
  imglogcentr: {
    // opacity:0.5,

    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  flexend: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: 2,
  },
  heading1: {
    fontFamily: 'Manrope-ExtraBold',
    color: '#383737',
    fontSize: 35
  },
  paddingbtm: {
    paddingBottom: 60,
  }
})
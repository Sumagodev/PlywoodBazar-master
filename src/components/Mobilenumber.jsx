import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { sentOtp } from '../services/User.service';
import Header from '../navigation/customheader/Header';
export default function Mobilenumber(props) {
  const phoneInput = useRef()
 

  const navigation = useNavigation()
  const [phone, setPhone] = useState("");

  const handleSubmit =async () => {
    try {      


      if (phone && phone.length == 10) {

        let obj = {
          phone
        }
        let {data:res} = await sentOtp(obj);
        console.log(res, "data")
        if(res.message){
          toastSuccess(res.message)
          // console.log(JSON.stringify(res,null,2))
          navigation.navigate("Verifymobilenumber", { data: phone })
        }
      }
      else {
        errorToast("Please enter a valid phone number !!!")
        return;
      }
    } catch (error) {
      errorToast(error)
    }
  }


  return (
    <>

       
  
      <View style={{backgroundColor:'#fff', height:hp(6), paddingVertical:10}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
            <Image source={require('../../assets/img/backbtn.png')} style={{width:wp(3), height:wp(3), padding:11}} resizeMode="contain" />
          </TouchableOpacity>
          </View>
      


      <View style={[styles.bgwhite, styles.flex1, styles.positionrelative, styles.padinghr]}>
    
      
      
      
      
      
        <ImageBackground source={require('../../assets/img/Blurr.png')} style={[styles1.imglogcentr, { width: wp(100), height: hp(80) }]} >

         
          <Pressable style={styles1.logobox}>
             <Image source={require('../../assets/img/backbtn.png')} style={styles1.logosize} resizeMode='contain' />
            <Image source={require('../../assets/img/logo.png')} style={styles1.logosize} resizeMode='contain' />
          </Pressable>
          <View style={[styles1.flexend, styles1.paddingbtm, { width: wp(90), alignSelf: "center" }]}>
            <View style={styles1.paddingtop20}>
              <Text style={styles1.heading}>Enter your Mobile </Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

              <PhoneInput
              placeholder='Enter your Mobile Number'
                ref={phoneInput}
                defaultValue={`${phone}`}
                value={`${phone}`}
                disableArrowIcon
                defaultCode="IN"
                layout="first"
                maxLength={10}
                onChangeText={(text) => {
                  
                  if (text.length > 10 || phone.length >10) {
                    Keyboard.dismiss();
                    return
                  }  else {
                    setPhone(text);
                  }
                  
                }}
                withDarkTheme
                withShadow
                textContainerStyle={{
                  height: hp(6), paddingHorizontal: 5, backgroundColor: '#fff',
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16, paddingVertical: 0, width: wp(80),
                  fontSize:10
                }}
                containerStyle={{
                  height: hp(6),
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16, paddingHorizontal: 0, backgroundColor: '#fff', paddingVertical: 0, width: wp(90),
                }}
                autoFocus
                style={{ backgroundColor: 'green', backgroundColor: 'green' }}
              />
            </KeyboardAvoidingView>

            <View style={[{ marginVertical: 45, }]}>
              <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, { width: wp(90) }]}>
                <Text style={styles.textbtn}>Send OTP</Text>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: wp(93), marginTop: 20 }]}>
                <Text style={styles1.btnTxt}>Not a user ?</Text><Text style={[styles1.btnTxt, { color: "#C28C28", marginLeft: 10, fontSize: 15 }]}>Register</Text>
              </TouchableOpacity>
              

              <TouchableOpacity onPress={() => navigation.navigate("BottomBar", { screen: "Home" })} style={[{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: wp(93), marginTop: 20 }]}>
                <Text style={styles1.btnTxt}>Click here to go back to</Text><Text style={[styles1.btnTxt, { color: "#C28C28", marginLeft: 10, fontSize: 15 }]}>Home</Text>
              </TouchableOpacity>
            
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  )
}

const styles1 = StyleSheet.create({
  bottomfixed: {
    height: hp(55),
    // backgroundColor:'red',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  wrapper: {
    borderWidth: 0.8,
    borderColor: '#B08218',
    borderStyle: 'solid',
    borderRadius: 16,
  },
  paddingtop20: {
    marginTop: 30,
    paddingBottom: 30,
  },
  heading: {
    fontFamily: 'Manrope-Bold',
    color: '#383737',
    fontSize: wp(6) ,
    marginVertical: 10,
  },
  textcont: {
    fontFamily: 'Manrope-Regular',
    color: '#383737',
    fontSize: 15,
  }
  ,
  mbboot: {
    fontSize: 13,
    marginTop: 15,
    fontFamily: 'Outfit-Medium',

  },
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
    height: hp(18),
    marginBottom: 250
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
    paddingBottom: 10,
  }

})
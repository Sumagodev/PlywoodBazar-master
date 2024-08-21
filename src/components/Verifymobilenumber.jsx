import {Image, ScrollView, View, Text, SafeAreaView, Pressable, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import styles from '../../assets/stylecomponents/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TextInput, useTheme } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { loginUser, sentOtp, setToken } from '../services/User.service';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import { isAuthorisedContext } from '../navigation/Stack/Root';

export default function Verifymobilenumber(props) {
  const [phone, setPhone] = useState('');

  const [otp, setOtp] = useState('');

  const navigation = useNavigation();
  const focused = useIsFocused();

  const [isAuthorized, setIsAuthorized] = useContext(isAuthorisedContext);
  const handleSubmit = async () => {
    try {
      if (otp && otp.length != 6) {
        errorToast('Invalid otp please check your OTP again !!!');
        return;
      }

      let obj = {
        phone,
        otp,
      };
      console.log('sending response');
      let { data: res } = await loginUser(obj);
      if (res) {
        // console.log(JSON.stringify(res,null,2), "cke tokkene")
        await setToken(res.token);
        setIsAuthorized(true);
        navigation.navigate('BottomBar');
      }
    } catch (err) {
      console.log(err, 'ERRO');
      errorToast(err);
    }
  };

  const resendOtp = async () => {
    try {      


      if (phone && phone.length == 10) {

        let obj = {
          phone
        }
        let {data:res} = await sentOtp(obj);
        console.log(obj, "data adfasdfasdfa")
        if(res.message){
          toastSuccess(res.message)
         
        }
      }
      else {
        errorToast("Please enter a valid phone number !!!")
        return;
      }
    } catch (error) {
      errorToast(error)
    }
  };

  useEffect(() => {
    if (focused && props.route.params.data) {
      setPhone(props.route.params.data); 
    }
  }, [focused, props.route.params.data]);

  return (
    <>

    
            <View style={{borderBottomWidth:1, borderBottomColor:'#ccc', backgroundColor:'#fff', paddingHorizontal:wp(5), paddingVertical:wp(3), flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}> 
                    <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
                </Pressable>
                <Text style={{color:'#000', fontFamily:'Poppins-Medium', fontSize:wp(5) }}>Enter Your OTP</Text>
                <Text></Text>
            </View>
    <ScrollView style={[styles.bgwhite, { flex: 1 }]}>
      <View style={[styles.padinghr]}>
        <View style={styles1.paddingtop20}>
          {/* <Text style={styles1.heading}>Enter Your OTP</Text> */}
          <Text style={styles1.textcont}>
            Otp Send <Text style={{ fontFamily: 'Manrope-Bold', color: '#383737' }}>+91 {phone}.</Text>
          </Text>
        </View>
        <View style={[{ width: wp(100), display: 'flex', alignSelf: 'center' }]}>
          {/* <OtpInputs
            handleChange={code => {
              setOtp(code);
            }}
            
            numberOfInputs={6}
            secureTextEntry={true}
            inputStyles={[styles1.container, {borderRadius: 5, borderColor: '#C28C28', width: wp(12), textAlign: 'center'}]}
            inputContainerStyles={{margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
          /> */}
          <OTPInputView
            style={{ width: wp(90), marginHorizontal: 20, height: 100 }}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad={false}
            codeInputFieldStyle={[styles1.container, { borderRadius: 5, borderColor: '#C28C28', width: wp(12), textAlign: 'center', color:'#000' }]}
            codeInputHighlightStyle={[styles1.container, { borderRadius: 5, borderColor: '#C28C28', width: wp(12), textAlign: 'center', color:'#000' }]}
            onCodeFilled={code => {
              setOtp(code);
            }}
            />
        </View>
     
        <TouchableOpacity onPress={() => resendOtp()}   style={[styles.btnbg1, { width: wp(93) }]}>
          <Text style={[{color:'#000', alignSelf:'flex-end', fontFamily:'Poppins-Medium', fontSize:12}]}>Resend OTP </Text>
        </TouchableOpacity>

        {/* <Text>Asdfasdf</Text> */}
     
      </View>
    </ScrollView>
      <View style={[styles1.bottomfixed, { paddingHorizontal: 15 }]}>
        <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, { width: wp(93) }]}>
          <Text style={styles.textbtn}>Confirm</Text>
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('Register')} style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: wp(93), marginTop: 20 }]}>
          <Text style={styles1.btnTxt}>Not a user ?</Text>
          <Text style={[styles1.btnTxt, { color: '#C28C28', marginLeft: 10, fontSize: 15 }]}>Register</Text>
        </Pressable>
        <Text></Text>
      </View>
</>
  );
}
const styles1 = StyleSheet.create({

  imgsmall:{
    width: wp(6),
    height: hp(3),
  },
  bottomfixed: {
    position:'absolute',
    bottom:0,
    // height: hp(55),
    // backgroundColor:'red',
    // display: 'flex',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },

  btnTxt: {
    fontSize: 14,
    color: '#000',
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
    fontSize: 26,
    marginVertical: 10,
  },
  textcont: {
    fontFamily: 'Manrope-Regular',
    color: '#383737',
    fontSize: 15,
  },
  mbboot: {
    fontSize: 13,
    marginTop: 15,
    fontFamily: 'Outfit-Medium',
  },
  container: {
    borderColor: 'red',
    borderWidth: 0.3,
  },
});

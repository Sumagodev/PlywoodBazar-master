import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import CustomColors from '../styles/CustomColors';
import CustomInputWithLeftIcon from '../ReusableComponents/CustomInputWithLeftIcon';
import VerifyOtp from './VerifyOtp';
import { sendOtpService } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';

export default Login = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(false);

  const handleSendOTP  = async () => {
    const mobileNumberPattern = /^[6-9][0-9]{9}$/;
    try {    
    if (!mobileNumberPattern.test(mobileNumber)) {
      setError(true); // Set error state if the input is invalid
    } else {
      setError(false); // Clear error if the input is valid
      console.log('Sending OTP to', mobileNumber);
      // Proceed with OTP sending logic here
      let obj = {
        phone:mobileNumber
      }
      let {data:res} = await sendOtpService(obj);
      if(res.message){
        toastSuccess(res.message)
        // console.log(JSON.stringify(res,null,2))
        navigation.navigate("VerifyOtp", mobileNumber)
      } else {
        errorToast("Please enter a valid phone number !!!")
        return;
      }
    }
  } 
   catch (error) {
      errorToast(error)
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logo1.png')}
          style={styles.logo}
          resizeMode="center"
        />
      </View>
      <Text style={styles.sampleTitle}>LOGIN</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <ImageBackground
            source={require('../images/card_bg_login.png')}
            style={styles.cardImage}
            imageStyle={styles.cardImageRounded}
          >
            <CustomInputWithLeftIcon
              placeholderText="Enter your phone number"
              maxLength={10}
              keyboardType="numeric"
              onValueChange={value => setMobileNumber(value)} // Update state on change
              containerStyle={{ backgroundColor: '#F0F0F0' }}
              iconContainerStyle={{ backgroundColor: CustomColors.mattBrownDark }}
              inputStyle={{ color: '#000' }}
            />
                  {error && <Text style={styles.errorText}>Please enter a valid 10-digit mobile number.</Text>}
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
              <CustomRoundedTextButton
                buttonText="SEND OTP"
                buttonColor={CustomColors.mattBrownDark}
                onPress={handleSendOTP} // Trigger OTP sending
              />
            </View>
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
              <Text
                style={{
                  color: CustomColors.mattBrownDark,
                  fontSize: 20,
                  fontWeight: '600',
                  lineHeight: 50,
                }} onPress={()=>navigation.navigate('VerifyOtp',mobileNumber)}
              >REGISTER
              </Text>
            </View>
            <View style={{ width: '100%', height: '100%' }}>
              <Image
                resizeMode="stretch"
                source={require('../images/login_image_1.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:[CustomColors.masterBackground],
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 50,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    aspectRatio: 3,
  },
  sampleTitle: {
    fontFamily: 'Poppins-Thin',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardImageRounded: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop:10,
    width:'80%',
    alignSelf:'center',
    fontFamily:'Poppins-Light'
  },
});

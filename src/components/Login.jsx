import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import CustomColors from '../styles/CustomColors';
import CustomInputWithLeftIcon from '../ReusableComponents/CustomInputWithLeftIcon';
import { sendOtpService } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';

export default Login = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(false);

  const handleSendOTP = async () => {
    const mobileNumberPattern = /^[6-9][0-9]{9}$/;
    try {
      if (!mobileNumberPattern.test(mobileNumber)) {
        setError(true);
      } else {
        setError(false);
        console.log('Sending OTP to', mobileNumber);
        let obj = { phone: mobileNumber };
        let { data: res } = await sendOtpService(obj);
        if (res.message) {
          toastSuccess(res.message);
          navigation.navigate("VerifyOtp", mobileNumber);
        } else {
          errorToast("Please enter a valid phone number !!!");
          return;
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };

  return (
  <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  onValueChange={value => setMobileNumber(value)}
                  containerStyle={{ backgroundColor: '#F0F0F0' }}
                  iconContainerStyle={{ backgroundColor: CustomColors.mattBrownDark }}
                  inputStyle={{ color: '#000' }}
                />
                {error && <Text style={styles.errorText}>Please enter a valid 10-digit mobile number.</Text>}
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                  <CustomRoundedTextButton
                    buttonText="SEND OTP"
                    buttonColor={CustomColors.mattBrownDark}
                    onPress={handleSendOTP}
                  />
                </View>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                  <Text
                    style={styles.registerText}
                    onPress={() => navigation.navigate('VerifyOtp', mobileNumber)}
                  >
                    REGISTER
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    resizeMode="stretch"
                    source={require('../images/login_image_1.png')}
                    style={styles.bottomImage}
                  />
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.masterBackground,
    alignItems: 'center',
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
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
    fontFamily: 'Poppins-Light',
  },
  registerText: {
    color: CustomColors.mattBrownDark,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 50,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Ensures the image stays at the bottom
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});

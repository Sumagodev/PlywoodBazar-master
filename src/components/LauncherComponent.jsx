import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import CustomColors from '../styles/CustomColors';
import CustomInputWithLeftIcon from '../ReusableComponents/CustomInputWithLeftIcon';
import { sendOtpForVerification, sendOtpService } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import LoadingDialog from '../ReusableComponents/LoadingDialog';

export default function LauncherComponent() {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(false);
  const[loadingDialog,setLoadingDialog]=useState(false);

  // Memoize the OTP handler to avoid re-creation on each render
  const handleSendOTP = useCallback(async () => {
    const mobileNumberPattern = /^[6-9][0-9]{9}$/;
    setLoadingDialog(true)
    if (!mobileNumberPattern.test(mobileNumber)) {
      setError(true);
      setLoadingDialog(false)
      return;
    }

    try {
      setError(false);
      const obj = { phone: mobileNumber };
      const { data: res } = await sendOtpForVerification(obj);
      
      if (res.message) {
        toastSuccess(res.message);
        setLoadingDialog(false)

        navigation.navigate('VerifyOTPOnLaunch', { mobileNumber:mobileNumber });
      } else {
        errorToast(res.message);
        setLoadingDialog(false)

      }
    } catch (error) {
      errorToast(`Error: ${error.message || error}`);
      setLoadingDialog(false)

    }
  }, [mobileNumber, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/img/logonew.png')}
              style={styles.logo}
              resizeMode="center"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.titleSmall}>Verify with a valid number you can access vendors, products, and our other services</Text>

          

          {/* Card Section */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <ImageBackground
                source={require('../../assets/img/main_bg.jpg')}
                style={styles.cardImage}
                imageStyle={styles.cardImageRounded}
              >
                <View style={styles.contentContainer}>
                  <CustomInputWithLeftIcon
                    placeholderText="Enter your phone number"
                    maxLength={10}
                    keyboardType="numeric"
                    onValueChange={setMobileNumber}
                    containerStyle={styles.inputContainer}
                    iconContainerStyle={styles.iconContainer}
                    inputStyle={styles.inputStyle}
                  />
                  {error && (
                    <Text style={styles.errorText}>
                      Enter a valid 10-digit mobile number.
                    </Text>
                  )}

                  {/* Send OTP Button */}
                  <View style={styles.buttonWrapper}>
                    <CustomRoundedTextButton
                      buttonText="SEND OTP"
                      buttonColor={CustomColors.mattBrownDark}
                      onPress={handleSendOTP}
                    />
                  </View>

                  {/* Register Link */}
                  {/* <View style={styles.buttonWrapper}>
                    <Text
                      style={styles.registerText}
                     
                    >
                      Connecting Business Peoples Worldwide
                    </Text>
                  </View> */}

                  {/* Hero Image */}
                  <Image
                    resizeMode="contain"
                    style={styles.heroImage}
                    source={require('../../assets/img/hero1.png')}
                  />
                </View>
              </ImageBackground>
            </View>
          </View>
          <LoadingDialog visible={loadingDialog}></LoadingDialog>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
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
  title: {
    fontFamily: 'Poppins-Thin',
    fontSize: widthPercentageToDP(6),
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
  },
  titleSmall: {
    alignSelf:'center',
    textAlign:'center',
    color:'#AEAEAE',
    fontSize: widthPercentageToDP(4),
    marginBottom: 30,
    marginHorizontal:widthPercentageToDP(6)
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    flex: 1,
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#F0F0F0',
  },
  iconContainer: {
    backgroundColor: CustomColors.mattBrownDark,
  },
  inputStyle: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    fontFamily: 'Poppins-Light',
  },
  buttonWrapper: {
    marginBottom:20,
    alignSelf: 'center',
    marginTop: 20,
  },
  registerText: {
    color: CustomColors.mattBrownDark,
    fontSize: widthPercentageToDP(4.5),
    fontWeight: '600',
    lineHeight: 50,
  },
  heroImage: {
    backgroundColor: 'transparent',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(35),
  },
});

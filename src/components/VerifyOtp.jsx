import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import CustomColors  from '../styles/CustomColors';
import OtpRow from '../ReusableComponents/OtpRow';

export default VerifyOtp = ({route}) => {
  const navigate = useNavigation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(60); // Start timer at 60 seconds
  const [canResend, setCanResend] = useState(false); // Control resend button state
  const mobileNumber=route.params
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown); // Clear interval when component unmounts or timer reaches 0
    } else {
      setCanResend(true); // Enable resend button when timer reaches 0
    }
  }, [timer]);
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);

  };
  const handleVerifyOTP = () => {
    const otpPattern = /^[0-9]{4}$/; // Regex to match exactly 4 digits

    if (!otpPattern.test(otp)) {
      setError(true); // Set error state if the input is invalid
    } else {
      setError(false); // Clear error if the input is valid
      console.log('Verifying OTP:', otp);
      // Proceed with OTP verification logic here
    }
  };

  const handleResendOtp = () => {
    if (canResend) {
      // Implement your OTP sending logic here
      console.log('Resending OTP to', mobileNumber);
      setTimer(60); // Reset timer for 60 seconds
      setCanResend(false); // Disable the resend button until the timer ends
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logo1.png')} // Replace with your actual logo image
          style={styles.logo}
          resizeMode="center"
        />
      </View>
      <Text style={styles.sampleTitle}>VERIFY OTP</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <ImageBackground
            source={require('../images/card_bg_login.png')} // Your card background image
            style={styles.cardImage}
            imageStyle={styles.cardImageRounded} // Apply rounded corners only to the top
          >
            {/* Add any content inside the card here */}
            <View style={{alignSelf:'center',marginTop:30,marginBottom:30}}>
                <Text style={{fontFamily:'Poppins-Light',color:'#000000'}}>A 4 Digit code has been sent to {mobileNumber} </Text>
            </View>
            <OtpRow onOtpChange={handleOtpChange} />
            {error && <Text style={styles.errorText}>Please enter a valid 4-digit OTP.</Text>}
            <View style={{alignSelf:'center', marginTop:20}}>
              <CustomRoundedTextButton buttonText='VERIFY' buttonColor={CustomColors.mattBrownDark}
              onPress={handleVerifyOTP}
              ></CustomRoundedTextButton>
            </View>
            <View style={{alignSelf:'center',marginTop:20}}>
                <Text style={{fontFamily:'Poppins-Light',color:'#000000'}}>Didn't receive the code ?
                <Text
                  style={{
                    lineHeight: 36,
                    color: canResend ? CustomColors.mattBrownDark : 'gray', // Disable the resend button when canResend is false
                    fontWeight: 800,
                    fontFamily: 'Poppins-Bold',
                  }}
                  onPress={handleResendOtp}
                  disabled={!canResend} // Disable interaction if canResend is false
                >    Resend
                </Text>
                </Text>
                {!canResend && (
                <Text style={{ fontFamily: 'Poppins-Light', color: '#000000', marginTop: 10 }}>
                  You can resend OTP in {timer} seconds
                </Text>
              )}
            </View>
            <View style={{with:'100%',height:'100%'}}>
            <Image resizeMode='stretch' source={require('../images/login_image_1.png')}   style={{with:'100%',height:'100%'}}></Image>
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
    backgroundColor: CustomColors.masterBackground,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  logoContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop:50,
    alignItems: 'center',
  },
  logo: {
    width: '80%', // Make the logo take the full width
    height: undefined, // Allow height to be calculated based on the aspect ratio
    aspectRatio: 3, // Adjust this ratio according to your image's actual aspect ratio
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
    justifyContent: 'flex-end', // Align the card to the bottom
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%', // Adjust this to control how much space the card occupies
    backgroundColor: '#fff',
    borderTopLeftRadius: 60, // Only round top-left corner
    borderTopRightRadius: 60, // Only round top-right corner
    overflow: 'hidden', // Ensure the image respects the rounded corners
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 10, // Shadow for iOS
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardImageRounded: {
    borderTopLeftRadius: 60, // Only round top-left corner
    borderTopRightRadius: 60, // Only round top-right corner
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

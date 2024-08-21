import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FadeRibbonText from './src/ReusableComponents/FadeRibbon';
import CustomTextInputField from './src/ReusableComponents/CustomTextInputField';
import LikeProduct from './src/ReusableComponents/ProductsYouMayLike';
import CustomButton from './src/ReusableComponents/CustomButton';
import CustomColors from './src/styles/CustomColors';
import OtpRow from './src/ReusableComponents/OtpRow';
import NewArrivalProductCard from './src/ReusableComponents/NewArrivalProductCard';

export default function App() {
  return (
    /*
      <SafeAreaView style={{flex:1}}>
      <RootStack />
      <Toast />
    </SafeAreaView>
    */
    <View style={styles.container}>
      {/*
      {/* button with image 
      <CustomButton
        buttonBgColor={CustomColors.mattBrownDark}
        text="Icon Button" 
        rightIcon={true}
        rightIconBgColor="green" 
        onPress={submitOtp} 
      />
      <View style={styles.spacer} />

      {/* button without image 
      <CustomButton 
        buttonBgColor={CustomColors.mattBrownDark}
        text="No Icon" 
        onPress={() => console.log('Button Pressed')} 
      />
      <View style={styles.spacer} />

      <OtpRow onOtpChange={handleOtpChange} />

      <View style={styles.spacer} />

      <FadeRibbonText text="A very long text for testing"/>
      <View style={styles.spacer} />
      
      <FadeRibbonText text="A very long text for testing" />
      <View style={styles.spacer} />
      
      <CustomTextInputField
        imagePath={require('./assets/img/backbtn.png')}
        inputType="password"
        placeholder="Enter your password"
        validator={ () => console.log('Validate method') }
      />
      <View style={styles.spacer} />
      
      {/* //ProductsYouMayLike 
      <View style={{flexDirection:'row'}}>
      <LikeProduct imagePath={require('./assets/img/products_you_may_like_bg.png')} name='Greenlam Laminates' location='Chennai' price='3360' 
      onCallPressed={()=>{console.log("product item called");}}
      onGetQuotePressed={()=>{console.log("get quote called");}}
      onCardPressed = {()=>{console.log("master card called");}}
      />
      
      <LikeProduct imagePath={require('./assets/img/products_you_may_like_bg.png')} name='Greenlam Laminates' location='Chennai' price='3360' 
      onCallPressed={()=>{console.log("product item called");}}
      onGetQuotePressed={()=>{console.log("get quote called");}}
      onCardPressed={()=>{console.log("get quote called");}} />
      </View>
      <View style={styles.spacer} />
      

      <NewArrivalProductCard imagePath={require('./assets/img/products_you_may_like_bg.png')} name='Greenlam Laminates' location='Chennai' price='3360' 
      isVerified={true}
      onCallPressed={()=>{console.log("product item called");}}
      onGetQuotePressed={()=>{console.log("get quote called");}}
      onCardPressed={()=>{console.log("get quote called");}} />
      <View style={styles.spacer} />

      <NewArrivalProductCard imagePath={require('./assets/img/products_you_may_like_bg.png')} name='Greenlam Laminates' location='Chennai' price='3360' 
      onCallPressed={()=>{console.log("product item called");}}
      onGetQuotePressed={()=>{console.log("get quote called");}}
      onCardPressed={()=>{console.log("get quote called");}} />
      */}

<FadeRibbonText text="A very long text for testing" />
<FadeRibbonText text="A very long text for testing" reverseDirection={true} textColor='black'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.masterBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: { width: 20, height: 20, },
  row: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space between inputs
    alignItems: 'center', // Center align items vertically
    padding: 10, // Optional padding around the row
  },
});
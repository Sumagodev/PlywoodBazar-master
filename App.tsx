import React from 'react';
import Toast from 'react-native-toast-message';
import RootStack from './src/navigation/Stack/Root';
import axios from 'axios';
export const axiosApiInstance = axios.create();
import {View} from 'react-native'
import NewArrivalProductCard from './src/ReusableComponents/NewArrivalProductCard';

function App(): JSX.Element {
  return (
    /*
    <SafeAreaView style={{flex:1}}>
      <RootStack />
      <Toast />
    </SafeAreaView>
    */
    // <View style={styles.container}>
    //   {/* button with image */}
    //   <CustomButton
    //     buttonBgColor={CustomColors.mattBrownDark}
    //     text="Icon Button" 
    //     rightIcon={true}
    //     rightIconBgColor="green" 
    //     onPress={submitOtp} 
    //   />
    //   <View style={styles.spacer} />

    //   {/* button without image */}
    //   <CustomButton 
    //     buttonBgColor={CustomColors.mattBrownDark}
    //     text="No Icon" 
    //     onPress={() => console.log('Button Pressed')} 
    //   />
    //   <View style={styles.spacer} />

    //   <OtpRow onOtpChange={handleOtpChange} />

    //   <View style={styles.spacer} />

    //   <FadeRibbonText text="A very long text for testing"/>
    //   <View style={styles.spacer} />
      
    //   <FadeRibbonText text="A very long text for testing" />
    //   <View style={styles.spacer} />
      
    //   <CustomTextInputField
    //     imagePath={require('./assets/img/backbtn.png')}
    //     inputType="password"
    //     placeholder="Enter your password"
    //     validator={ () => console.log('Validate method') }
    //   />
    //   <View style={styles.spacer} />
      
    //   {/* //ProductsYouMayLike */}
    //   <LikeProduct imagePath={require('./assets/img/products_you_may_like_bg.png')} name='Greenlam Laminates' location='Chennai' price='3360' 
    //   onCallPress={()=>{console.log("product item called");}}
    //   onGetQuotePress={()=>{console.log("get quote called");}}
    //   />
    //   <View style={styles.spacer} />
    <View style={styles.container}>
      <NewArrivalProductCard imagePath={require('./assets/img/products_you_may_like_bg.png')} name='Greenlam Laminates' location='Chennai' price='3360' 
      onCallPressed={()=>{console.log("product item called");}}
      onGetQuotePressed={()=>{console.log("get quote called");}}
      onCardPressed={()=>{console.log("get quote called");}} />
    </View>
  );
}
export default App;
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
// import { iconsucees } from "../../assets/img/Successfull.png";
// import { Image } from 'react-native-svg';

export const PaymentSuccess = (props) => {



  return (


    <View style={{ display: 'flex', flex: 1, backgroundColor:'#fff', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Image source={require('../../assets/img/successfullyicon1.png')} style={internalcss.imgfluid} />
      <Text style={{fontSize:20, paddingVertical:10}}>Thank you for your Payment!</Text>
      <Text style={{fontSize:16, marginVertical:12,}}> Your Payment ID is <Text style={{fontFamily: 'Manrope-Bold', color:'#000', fontSize:18,}}>{props.route.params?.orderId} </Text></Text>
      <Text style={{fontSize:15,color:'#000', textAlign:'center' }}>  You will receive a booking confirmation email on registerd Email Id.</Text>
    </View>
  )
}

const internalcss = StyleSheet.create({
  imgfluid:{
      width:60,
      height:60,
  }
})
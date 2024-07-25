import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
// import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { adminUrl, url } from '../services/url.service';
import AutoHeightWebView from 'react-native-autoheight-webview'


export default function PaymentWebView(props) {
  console.log(props.route.params?.url)
  const navigation = useNavigation()
  const [paymentUrl, setPaymentUrl] = useState("")

  useEffect(() => {
    if (props.route.params?.url) {
      setPaymentUrl(props.route.params?.url)
    }
  }, [props.route.params?.url])


  const [orderId, setOrderId] = useState(new Date().getTime())




  const handleWebViewState = (e) => {
    console.log(e, "WEB VIEW STATE", e?.url.includes(adminUrl), adminUrl)
    if (e?.url.includes(adminUrl)) {
      console.log(e?.url, "Payment Successfull")

      toastSuccess("Payment Successfull, Package Activated Successfully")

      navigation.navigate("PaymentSuccess", { orderId: orderId })
      return 0
    }
    else if (e?.url == "https://admin.deliveryladka.com/forgot-password") {
      errorToast("Payment Failed")
      navigation.goBack()
    }
  }
  return (
    <>
    <AutoHeightWebView 
      // automaticallyAdjustContentInsets={false}
      // javaScriptEnabled={true}
      // domStorageEnabled={true} 
      onNavigationStateChange={(e) => handleWebViewState(e)} source={{ uri: paymentUrl }} style={{ flex: 1 }} />
      </>
  )
}
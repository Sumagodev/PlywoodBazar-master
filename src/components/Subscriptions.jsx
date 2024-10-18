import { useNavigation, CommonActions } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ImageBackground, NativeEventEmitter, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { getAllsubscription } from '../services/Subscription.service';
import { getDecodedToken, getToken } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { adminUrl } from '../services/url.service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import GradientRibbon from '../ReusableComponents/GradientRibbon';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import ApiClient from '../payment/ApiClient';
import {
  BackHandler,
  NativeModules,
} from "react-native";
import HyperSdkReact from "hyper-sdk-react";

export default function Subscriptions(props) {
  const navigation = useNavigation();
  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const [selectedSubscriptionObj, setSelectedSubscriptionObj] = useState(null);
  const [userToken, setUserToken] = useState('');
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const getSubscriptions = async () => {
    try {
      let token = await getToken();
      let decoded = await getDecodedToken();
      const { data: res } = await getAllsubscription(`role=${decoded.role}`);
      if (res) {
        setUserToken(decoded.token);
        setSubscriptionArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  const startPaymentForHdfc = useCallback((subscriptionObj) => {
    // setIsLoaderActive(true);
    // console.log("Payment started");
    // console.log(userToken);
    // ApiClient.sendPostRequest(
    //   "https://api.plywoodbazar.com/test/usersubscription/initiateJuspayPaymentForSubcription",
    //   subscriptionObj,
    //   userToken,
    //   {
    //     onResponseReceived: (response) => {
    //       let parsedResponse;
    //       try {
    //         parsedResponse = typeof response === "string" ? JSON.parse(response) : response;
    //       } catch (error) {
    //         console.error("Failed to parse response:", error);
    //         return;
    //       }

    //       const sdkPayload = parsedResponse.sdk_payload;
    //       HyperSdkReact.openPaymentPage(JSON.stringify(sdkPayload));
    //     },
    //     onFailure: (error) => {
    //       console.error("POST request failed:", error);
    //       setIsLoaderActive(false);
    //     },
    //   }
    // );

    navigation.navigate('Checkout', {
      p1Count: 1,
      p2Count: 2,
      p1Price: 100,
      p2Price: 200,
    })
  }, [userToken]);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);

    const hyperEventListener = (resp) => {
      const data = JSON.parse(resp);
      const orderId = data.orderId;
      const event = data.event || "";

      switch (event) {
        case "initiate_result":
        case "hide_loader":
          setIsLoaderActive(false);
          break;

        case "process_result":
          const innerPayload = data.payload || {};
          const status = innerPayload.status || "";
          if (status === "backpressed" || status === "user_aborted") {
            // Handle backpress or user-aborted case
          } else {
            navigation.navigate("Response", { orderId: orderId });
          }
          break;
        default:
          console.log(data);
      }
    };

    eventEmitter.addListener("HyperEvent", hyperEventListener);

    const backHandlerListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => !HyperSdkReact.isNull() && HyperSdkReact.onBackPressed()
    );

    return () => {
      eventEmitter.removeListener("HyperEvent", hyperEventListener);
      backHandlerListener.remove();
    };
  }, [navigation]);

  const handleSubscriptionSelect = (item) => {
    setSelectedSubscriptionObj(item);
  };

  useEffect(() => {
    if (selectedSubscriptionObj) {
      startPaymentForHdfc(selectedSubscriptionObj);
    }
  }, [selectedSubscriptionObj, startPaymentForHdfc]);

  const renderNewSubscriptionItem = ({ item }) => {
    const durationText = item?.noOfMonth
      ? `${item?.noOfMonth} ${item?.noOfMonth > 1 ? 'months' : 'month'}`
      : 'No Validity';

    return (
      <View style={stylesCard.cardContainer}>
        <LinearGradient colors={['#cc8d19', '#C08F64']} style={stylesCard.periodContainer}>
          <Text style={stylesCard.periodText}>{durationText}</Text>
        </LinearGradient>
        <View style={stylesCard.contentContainer}>
          <Text style={stylesCard.titleText} numberOfLines={2} ellipsizeMode='tail'>{item?.description}</Text>
          <Text style={stylesCard.priceText}>
            ₹ {item?.price} + <Text style={stylesCard.gstText}>18% GST</Text>
          </Text>
          <Text style={stylesCard.durationText}>
            For {item?.advertisementDays > 1 ? `${item?.advertisementDays} Days` : `${item?.advertisementDays} Day`}
          </Text>
          <View style={{ marginBottom: wp(5) }}>
            <GradientRibbon feature1={item?.numberOfAdvertisement != 0 ? `${item?.numberOfAdvertisement} Advertisements` : 'No Advertisements'} feature2={item?.numberOfSales != 0 ? `${item?.numberOfSales} Flash sales` : 'No Flash sales'} />
          </View>
          <View style={stylesCard.buttonStyle}>
            <CustomButtonNew
              paddingHorizontal={wp(8)}
              paddingVertical={wp(3)}
              text='Buy Now'
              onPress={() => handleSubscriptionSelect(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header normal={true} screenName={'Subscriptions'} rootProps={props} />
      <ImageBackground source={require('../../assets/img/main_bg.jpg')} style={{ flex: 1, overflow: 'hidden' }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <FlatList data={subscriptionArr} renderItem={renderNewSubscriptionItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: 50 }} />
        </View>
        <View style={[{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: wp(5) }]}>
          <CustomButtonNew
            paddingHorizontal={wp(8)}
            paddingVertical={wp(3)}
            text='Skip Now'
            onPress={() => navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomBar', params: { register: true } }],
              })
            )}
          />
        </View>
      </ImageBackground>
      {isLoaderActive && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </>
  );
}




const stylesCard = StyleSheet.create({
  cardContainer: {
    width:'90%',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    marginLeft: wp(14), // Space for the floating circle
    alignSelf:'center',
    marginVertical:wp(5)
  },
  periodContainer: {
    width: wp(25),
    height: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cc8d19',
    padding: wp(1),
    borderRadius: wp(25),
    position: 'absolute',
    left: -wp(11), // Half the width of the circle
    top: '50%', // Center vertically based on the height of the card
    transform: [{ translateY: -32 }], // Half the height of the circle to offset it upwards
  },
  periodText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  contentContainer: {
    marginLeft: wp(12), // Adjust to match the position of the text
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#cc8d19',
  },
  gstText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#cc8d19',
  },
  durationText: {
    fontSize: wp(3),
    color: '#000',
    fontWeight: 600,
    marginTop: wp(1),
  },
  featuresContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flex: 1

  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  buttonStyle: {
    marginTop: wp(3),
    position: 'absolute',
    bottom: wp(-10),
    alignSelf: 'flex-end'
  },
});
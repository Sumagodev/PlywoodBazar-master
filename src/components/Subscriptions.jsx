import { useNavigation, CommonActions } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { getAllsubscription } from '../services/Subscription.service';
import { buySubscription, getAllSubscriptionbyUserId } from '../services/UserSubscription.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { getDecodedToken, getToken } from '../services/User.service';
import { adminUrl } from '../services/url.service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SubscriptionCard from '../ReusableComponents/SubscriptionCard';
import LinearGradient from 'react-native-linear-gradient';
import GradientRibbon from '../ReusableComponents/GradientRibbon';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
export default function Subscriptions(props) {
  const navigation = useNavigation();
  console.log(JSON.stringify(props, null, 2), "propspropspropspropsprops")
  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const [selectedSubscriptionObj, setSelectedSubscriptionObj] = useState(null);
  const getSubscriptions = async () => {
    try {
      let token = await getToken();
      console.log(token, 'check tokkls===========');
      let decoded = await getDecodedToken();
      console.log(decoded, 'decode');
      const { data: res } = await getAllsubscription(`role=${decoded.role}`);
      if (res) {
        console.log(res.data);
        setSubscriptionArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleWebViewState = e => {
    console.log(e, 'WEB VIEW STATE');
    if (e?.urltoastSuccess == adminUrl) {
      toastSuccess('Payment Successfull, Package Activated Successfully');
      navigate.navigate('MySubscriptions');
    } else {
      toastSuccess('Payment Failed');
      navigate.navigate('MySubscriptions');
    }
  };

  const handleSubmit = async (item) => {
    if (!item) return; // Prevent execution if no subscription is selected
    try {
      let obj = { ...selectedSubscriptionObj };
      const { data: res } = await buySubscription(obj);
      console.log('res.message', res);
      if (res) {
        toastSuccess(res.message);


        if (res?.data && res?.data.instrumentResponse) {
          let instrumentResponse = res?.data.instrumentResponse;
          if (instrumentResponse?.redirectInfo) {
            navigation.navigate('PaymentWebView', { url: instrumentResponse?.redirectInfo.url });
            return 0;
          }
        } else {
          errorToast('`Phonepe is not working.Please Try Some another Payment Method');
        }
        return 0;
        // toastSuccess(res.message);
        // navigation.goBack();
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    if (selectedSubscriptionObj) {
      handleSubmit(selectedSubscriptionObj);
    }
  }, [selectedSubscriptionObj]);


  const renderNewSubscriptionItem = ({ item, index }) => {
    const durationText = item?.noOfMonth
      ? `${item?.noOfMonth} ${item?.noOfMonth > 1 ? 'months' : 'month'}`
      : 'No Validity';

    return (
      <>
        <View style={stylesCard.cardContainer}>
          <LinearGradient colors={['#cc8d19', '#C08F64']} // Adjust gradient colors

            style={stylesCard.periodContainer}>
            <Text style={stylesCard.periodText}>{durationText}</Text>
          </LinearGradient>
          <View style={stylesCard.contentContainer}>
            <Text style={stylesCard.titleText} numberOfLines={2} ellipsizeMode='tail'>{item?.description}</Text>
            <Text style={stylesCard.priceText}>
              ₹ {item?.price} + <Text style={stylesCard.gstText}>18% GST</Text></Text>


            <Text style={stylesCard.durationText}>
              For {item?.advertisementDays > 1 ? `${item?.advertisementDays} Days` : `${item?.advertisementDays} Day`}
            </Text>

            <View style={{ marginBottom: wp(5) }}>
              <GradientRibbon feature1={item?.numberOfAdvertisement != 0 ? `${item?.numberOfAdvertisement} Advertisements` : 'No Advertisements'} feature2={item?.numberOfSales != 0 ? `${item?.numberOfSales} Flash sales` : 'No Flash sales'} />
            </View>


            <View style={stylesCard.buttonStyle} >
              <CustomButtonNew
                paddingHorizontal={wp(8)}
                paddingVertical={wp(3)}
                text='Buy Now'
                onPress={() => { setSelectedSubscriptionObj(item); }}
              />
            </View>
          </View>

        </View>
      </>
    );
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <Header normal={true} screenName={'Subscriptions'} rootProps={props} />
      <ImageBackground source={require('../../assets/img/main_bg.jpg')} style={{ flex: 1, overflow: 'hidden' }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <FlatList data={subscriptionArr} renderItem={renderNewSubscriptionItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: 50 }} />



          {props.route?.params?.register && props.route?.params?.register == true ? (
            <TouchableOpacity onPress={() => navigation.navigate('BottomBar', { screen: 'Home' })} style={[{ width: wp(90), display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
              <Text style={[styles.textbtn, { color: '#ddc99b' }]}>
                Skip <FontAwesome name="angle-double-right" size={21} color="#ddc99b" />{' '}
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

        </View>
        <View style={[{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: wp(5) }]} >
          <CustomButtonNew
            paddingHorizontal={wp(8)}
            paddingVertical={wp(3)}
            text='Skip'
            onPress={() => navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomBar', params: { register: true } }],
              })
            )}
          />
        </View>

      </ImageBackground>
    </>
  );
}
const styles1 = StyleSheet.create({
  flexbetween: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  imgsmall: {
    width: wp(6),
    height: hp(3),
  },
  categry: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Manrope-Medium',
  },
  imgfluid: {
    width: wp(6),
    height: hp(3),
    marginRight: 10,
  },
  card_main: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    // width: wp(90),
    // marginHorizontal: 20,
  },
  nameheading: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
  },
});





const stylesCard = StyleSheet.create({
  cardContainer: {
    margin: wp(2),
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    marginLeft: 40, // Space for the floating circle
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
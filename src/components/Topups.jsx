import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { getAllTopup } from '../services/Topup.service';
import { getDecodedToken } from '../services/User.service';
import { buyTopup } from '../services/UserTopup.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import MyTopUpItem from '../ReusableComponents/MyTopUpItem';
import CustomColors from '../styles/CustomColors';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
export default function Topups(props) {
  const navigation = useNavigation();
  const [isLoadingallcompo, setIsLoadingallcompo] = useState(false);
  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const [selectedSubscriptionObj, setSelectedSubscriptionObj] = useState(null);
  const getSubscriptions = async () => {
    setIsLoadingallcompo(true);
    try {
      let decoded = await getDecodedToken();
      const { data: res } = await getAllTopup(`role=${decoded.role}`);
      if (res) {
        console.log(res.data);
        setSubscriptionArr(res.data);
        setIsLoadingallcompo(false)
      }
    } catch (error) {
      errorToast(error);
      setIsLoadingallcompo(false)
    } finally {
      setIsLoadingallcompo(false)
    }
  };

  useEffect(() => {
    if (selectedSubscriptionObj) {
      handleSubmit(selectedSubscriptionObj);
    }
  }, [selectedSubscriptionObj]);



  const handleSubmit = async (item) => {
    if (!item) return; // Prevent execution if no subscription is selected

    console.log('Selected Subscription:', item);

    try {
      const { data: res } = await buyTopup(item);
      if (res) {
        toastSuccess(res.message);
        if (res?.data && res?.data.instrumentResponse) {
          let instrumentResponse = res?.data.instrumentResponse;
          if (instrumentResponse?.redirectInfo) {
            navigation.navigate("PaymentWebView", { url: instrumentResponse?.redirectInfo.url });
            return 0;
          }
        } else {
          errorToast("Phonepe is not working. Please Try Some another Payment Method");
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };


  const renderMyTopupItem = ({ item, index }) => {

    const myItem = {
      description: item?.description,
      validity: 'Valid Till Subcription',
      price: item?.price,
      numberOfAdvertisement: item?.numberOfAdvertisement,
      daysOfAdvertisement: item?.advertisementDays,
      daysOfSale: item?.saleDays,
      numberOfSale: item?.numberOfSales ? item?.numberOfSales : 0,
      fullItem: item
    };
    return (
      <MyTopUpItem topUpItem={myItem} onPress={() => { setSelectedSubscriptionObj(item) }}></MyTopUpItem>
    );
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <Header normal={true} screenName={'Topups'} rootProps={props} />
      {
        isLoadingallcompo ?
          <LoadingDialog size="large" color={CustomColors.mattBrownDark} style={{ marginTop: wp(5), marginBottom: wp(5) }} />
          :
          <ImageBackground source={require('../../assets/img/main_bg.jpg')} style={{ flex: 1, overflow: 'hidden' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: wp(6), marginVertical: wp(2), fontWeight: 800, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>My Topups</Text>
              {subscriptionArr.length > 0 ? (
                <FlatList data={subscriptionArr} renderItem={renderMyTopupItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: 50, alignSelf: 'center' }} />
              ) : (
                <View style={{ height: hp(70), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16, alignSelf: 'center', color: '#000', marginVertical: 20 }}>No Topups</Text>
                </View>
              )}


            </View>
          </ImageBackground>
      }
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
    width: wp(90),
    marginHorizontal: 20,
  },
  nameheading: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
  },
});

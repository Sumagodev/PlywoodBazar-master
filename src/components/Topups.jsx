import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import {getAllTopup} from '../services/Topup.service';
import {getDecodedToken} from '../services/User.service';
import {buyTopup} from '../services/UserTopup.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
export default function Topups(props) {
  const navigation = useNavigation();

  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const [selectedSubscriptionObj, setSelectedSubscriptionObj] = useState(null);
  const getSubscriptions = async () => {
    try {
      let decoded = await getDecodedToken();
      const {data: res} = await getAllTopup(`role=${decoded.role}`);
      if (res) {
        console.log(res.data);
        setSubscriptionArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleSubmit = async () => {
    try {
      let obj = {...selectedSubscriptionObj};
      const {data: res} = await buyTopup(obj);
      if (res) {
        toastSuccess(res.message);
        if (res?.data && res?.data.instrumentResponse) {
            let instrumentResponse = res?.data.instrumentResponse;
            if (instrumentResponse?.redirectInfo) {
               navigation.navigate("PaymentWebView", { url: instrumentResponse?.redirectInfo.url })
             return 0
            }
        } else {
            errorToast(
                "`Phonepe is not working.Please Try Some another Payment Method"
            );
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const renderSubscriptionItem = ({item, index}) => {
    return (
      <Pressable onPress={() => setSelectedSubscriptionObj(item)} style={[styles1.card_main, {marginTop: 20}, selectedSubscriptionObj?._id == item?._id && {borderColor: '#B08218'}]}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles1.nameheading}>{item?.name}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Description : </Text>
          <Text>{item?.description}</Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Price : </Text>
          <Text>₹ {item?.price}</Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Number of Advertisement :</Text>
          <Text>
            {item?.numberOfAdvertisement} for {item?.advertisementDays} days
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Number Of Sales :</Text>
          <Text>
            {item?.numberOfSales ? item?.numberOfSales : 0} for {item?.saleDays} days
          </Text>
        </View>
      </Pressable>
    );
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <Header stackHeader={true} screenName={'Topups'} rootProps={props} />
      <View style={{backgroundColor: '#fff', flex: 1}}>
        {subscriptionArr.length > 0 ? (
          <FlatList data={subscriptionArr} renderItem={renderSubscriptionItem} keyExtractor={(item, index) => index} contentContainerStyle={{paddingBottom: 50}} />
        ) : (
          <View style={{height: hp(70), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, alignSelf: 'center', color: '#000', marginVertical: 20}}>No Topups</Text>
          </View>
        )}

        {selectedSubscriptionObj && selectedSubscriptionObj?._id && (
          <Pressable onPress={() => handleSubmit()} style={[styles.btnbg, {width: wp(90), marginHorizontal: 20, marginBottom: 15}]}>
            <Text style={styles.textbtn}>Buy Topup</Text>
          </Pressable>
        )}
      </View>
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

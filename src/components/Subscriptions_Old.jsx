import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import {getAllsubscription} from '../services/Subscription.service';
import {buySubscription, getAllSubscriptionbyUserId} from '../services/UserSubscription.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
import {getDecodedToken, getToken} from '../services/User.service';
import {adminUrl} from '../services/url.service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function Subscriptions(props) {
  const navigation = useNavigation();
console.log(JSON.stringify(props,null,2),"propspropspropspropsprops")
  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const [selectedSubscriptionObj, setSelectedSubscriptionObj] = useState(null);
  const getSubscriptions = async () => {
    try {
      let token = await getToken();
      console.log(token, 'check tokkls===========');
      let decoded = await getDecodedToken();
      console.log(decoded, 'decode');
      const {data: res} = await getAllsubscription(`role=${decoded.role}`);
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

  const handleSubmit = async () => {
    try {
      let obj = {...selectedSubscriptionObj};
      const {data: res} = await buySubscription(obj);
      if (res) {
        toastSuccess(res.message);
        if (res?.data && res?.data.instrumentResponse) {
          let instrumentResponse = res?.data.instrumentResponse;
          if (instrumentResponse?.redirectInfo) {
            navigation.navigate('PaymentWebView', {url: instrumentResponse?.redirectInfo.url});
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

  const renderSubscriptionItem = ({item, index}) => {
    return (
      <>
        <Pressable onPress={() => setSelectedSubscriptionObj(item)} style={[styles1.card_main, {marginTop: 20}, selectedSubscriptionObj?._id == item?._id && {borderColor: '#B08218'}]}>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Text style={[styles1.nameheading, {marginBottom: 10, color: '#797979'}]}>{item?.name}</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 3}}>
              <Text style={{fontSize: wp(5), fontFamily: 'Poppins-Bold', color: '#b08218'}}>₹ {item?.price}</Text>
              <Text style={{fontSize: 10, color: '#b08218', marginTop: 5}}>+18% GST</Text>
            </View>
          </View>
          <View style={{alignSelf:'center'}}>
            {item?.noOfMonth ? (
              <Text style={{color:'#b08218', fontFamily: 'Poppins-Medium'}}>
                {item?.noOfMonth} {item?.noOfMonth > 1 ? 'months' : 'month'}
              </Text>
            ) : (
              <Text style={{color:'#b08218', fontFamily: 'Poppins-Medium'}}>No Validity</Text>
            )}
          </View>

          <View style={{alignSelf: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium', paddingVertical:10}}>{item?.description}</Text>
            <Text style={{color: '#b08218', fontSize: wp(4.3), fontFamily: 'Poppins-Medium'}}>{item?.numberOfSales != 0 ? `${item?.numberOfSales} Flash sales` : 'No Flash sales'}</Text>
            <Text>For {item?.saleDays > 1 ? `${item?.saleDays} Days` : `${item?.saleDays} Day`}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#b08218', fontSize: wp(4.3), fontFamily: 'Poppins-Medium'}}>{item?.numberOfAdvertisement != 0 ? `${item?.numberOfAdvertisement} Advertisements` : 'No Advertisements'}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {item?.advertisementDays > 0 && <Text style={{color: '#000', fontFamily: 'Poppins-Medium', fontSize: 12}}>For {item?.advertisementDays > 1 ? `${item?.advertisementDays} Days` : `${item?.advertisementDays} Day`}</Text>}
          </View>

          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            {item.messageArr &&
              item.messageArr.length > 0 &&
              item.messageArr.map((ele, indexX) => {
                return <Text style={{color: '#000', fontFamily: 'Poppins-Medium', fontSize: 12}}>{ele?.message}</Text>;
              })}
          </View>

          {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{color:'#797979', fontFamily:'Poppins-Regular'}}>Number of Advertisement :</Text>
          <Text style={{color:'#000', fontFamily:'Poppins-Medium', fontSize:12}}>
          {item?.numberOfAdvertisement} for {item?.advertisementDays} days
          </Text>
          </View>
          
          
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{color:'#797979', fontFamily:'Poppins-Regular'}}>Number Of Sales :</Text>
          <Text style={{color:'#000', fontFamily:'Poppins-Medium',fontSize:12 }}>
            {item?.numberOfSales ? item?.numberOfSales : 0} for {item?.saleDays} days
            </Text>
            </View>

            
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{color:'#797979', fontFamily:'Poppins-Regular'}}>Purchased On :</Text>
            <Text style={{color:'#000', fontFamily:'Poppins-Medium', fontSize:12}}> {moment(item?.createdAt).format('DD-MM-YYYY')}</Text>
          </View> */}
        </Pressable>
        {selectedSubscriptionObj && selectedSubscriptionObj?._id &&  props.route?.params?.register  && props.route?.params?.register ==true &&(
              <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, {width: '100%', marginVertical:15,}]}>
                <Text style={[styles.textbtn, {fontSize: wp(4)}]}>Buy Subscription</Text>
              </TouchableOpacity>
            )}
   
      </>
    );
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <Header stackHeader={true} screenName={'Subscriptions'} rootProps={props} />
      <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal: 10}}>
        <FlatList data={subscriptionArr} renderItem={renderSubscriptionItem} keyExtractor={(item, index) => index} contentContainerStyle={{paddingBottom: 50}} />
        {/* {selectedSubscriptionObj && selectedSubscriptionObj?._id && (
          <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, {width: wp(90), marginHorizontal: 20, marginBottom: 15}]}>
            <Text style={styles.textbtn}>Skip</Text>
          </TouchableOpacity>
        )} */}
        {props.route?.params?.register  && props.route?.params?.register ==true ? (
            <TouchableOpacity onPress={() => navigation.navigate('BottomBar', {screen: 'Home'})} style={[{width: wp(90), display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}]}>
            <Text style={[styles.textbtn, {color: '#ddc99b'}]}>
              Skip <FontAwesome name="angle-double-right" size={21} color="#ddc99b" />{' '}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
          <View style={{width: wp(50)}}>
            {selectedSubscriptionObj && selectedSubscriptionObj?._id && (
              <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, {width: '100%', marginHorizontal: 20, marginBottom: 15}]}>
                <Text style={[styles.textbtn, {fontSize: wp(4)}]}>Buy Subscription</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
    // width: wp(90),
    // marginHorizontal: 20,
  },
  nameheading: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
  },
});

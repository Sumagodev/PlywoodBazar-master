import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {getAllSubscriptionbyUserId, usersubscriptionMailId} from '../services/UserSubscription.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
export default function MySubscriptions(props) {
  const navigation = useNavigation();

  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const getSubscriptions = async () => {
    try {
      const {data: res} = await getAllSubscriptionbyUserId();
      if (res) {
        console.log(res.data);
        setSubscriptionArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handlemailUserSubscription = async id => {
    try {
      let {data: res} = await usersubscriptionMailId(id);
      console.log(res, 'dataa');
      if (res.message) {
        toastSuccess(res.message);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const renderSubscriptionItem = ({item, index}) => {
    return (
      <View style={[styles1.card_main, {marginTop: 10}]}>
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
          <Text>Start Date : </Text>
          <Text>{moment(item?.startDate).format('DD-MM-YYYY')}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>End Date : </Text>
          <Text>{moment(item?.endDate).format('DD-MM-YYYY')}</Text>
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
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Purchased On :</Text>
          <Text>{moment(item?.createdAt).format('DD-MM-YYYY')}</Text>
        </View>

        <View style={{display: 'flex', alignItems: 'flex-end', marginTop: hp(2)}}>
          <TouchableOpacity onPress={() => handlemailUserSubscription(item._id)} style={{backgroundColor: '#000', borderRadius: 5, width: wp(25), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontSize: 11, padding: 5}}>
              <EvilIcons name="envelope" size={15} color="#fff" style={{marginTop: hp(4)}} /> Send Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <Header stackHeader={true} screenName={'My Subscriptions'} rootProps={props} />
      <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal:10}}>
        {subscriptionArr.length > 0 ? (
          <FlatList data={subscriptionArr} showsVerticalScrollIndicator={false} renderItem={renderSubscriptionItem} keyExtractor={(item, index) => index} contentContainerStyle={{paddingBottom: 10}} />
        ) : (
          <View style={{height: hp(85), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, alignSelf: 'center', color: '#000', marginVertical: 20}}>You have No Subscription</Text>
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Subscriptions',{register:false})} style={[styles.btnbg, { marginBottom: 15}]}>
          <Text style={styles.textbtn}>Buy Subscription</Text>
        </TouchableOpacity>
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

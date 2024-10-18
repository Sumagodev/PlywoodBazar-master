import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, Pressable, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Header from '../navigation/customheader/Header';
import {getLeadsById} from '../services/leads.service';
import {getDecodedToken} from '../services/User.service'; 
import {errorToast} from '../utils/toastutill';
import MyActivityItem from '../ReusableComponents/MyActivityItem';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
export default function RecentActivity(props) {
  const navigation = useNavigation();

  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const [selectedSubscriptionObj, setSelectedSubscriptionObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getSubscriptions = async () => {
    try {
      setIsLoading(true)
      let decodedObj = await getDecodedToken();

      const {data: res} = await getLeadsById(decodedObj?.userId);
      if (res) {
        setSubscriptionArr(res.data);
        setIsLoading(false)
      }
    } catch (error) {
      errorToast(error);
      setIsLoading(false)
    }
  };
 
  
  const renderSubscriptionItem = ({item, index}) => {
    return (
      <Pressable style={[styles1.card_main, {marginTop:10, }, selectedSubscriptionObj?._id == item?._id && {borderColor: '#B08218'}]}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles1.nameheading}>{item?.name}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Phone : </Text>
          <Text>{item?.phone}</Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Email : </Text>
          <Text>{item?.email}</Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Contacted On : </Text>
          <Text>{moment(item?.createdAt).format('DD-MM-YYYY')}</Text>
        </View>
      </Pressable>
    );
  };
  const renderRecentActivityItem= ({item, index}) => {
    console.log('=====>',item.name)
    const activityItem={
      name:item.name,
      productName:item?.productObj?.name,
      price:item?.productObj?.sellingprice,
      date:moment(item?.createdAt).format('DD-MM-YYYY')
    }
    return (
      <MyActivityItem activityItem={activityItem}></MyActivityItem>
    );
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <Header normal={true} screenName={'Recent Activity'} rootProps={props}  />
      <View style={{backgroundColor: '#fff', flex: 1}}>
            <View style={{flex:1,backgroundColor: '#FFF4EC',}}>

      <Text style={{fontSize:wp(6),marginVertical:wp(2),fontWeight:800,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>My Activity</Text>

 {
          isLoading ?
            <LoadingDialog size={'large'} color={CustomColors.mattBrownDark} width={wp(50)} />
            : null
        }
        {
          subscriptionArr.length > 0 ? 
          <FlatList data={subscriptionArr} showsVerticalScrollIndicator={false} renderItem={renderRecentActivityItem} keyExtractor={(item, index) => index} contentContainerStyle={{paddingBottom: 10,alignSelf:'center'}} />
          
          :
          <View style={{height:hp(80), display:'flex', alignItems:'center', justifyContent:'center'}}>

            <Text style={{fontSize:19, color:'#000', alignSelf:'center'}}>No  Recent Activity</Text> 
          </View>
        }
       </View>
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
    paddingVertical: wp(1),
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

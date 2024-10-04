import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../navigation/customheader/Header';
import { getDecodedToken, getUserById } from '../services/User.service';
import { getLeadsBycreatedById } from '../services/leads.service';
import { errorToast } from '../utils/toastutill';
import MyLeadItem from '../ReusableComponents/MyLeadItem';
export default function Leads(props) {
  const navigation = useNavigation();

  const [leadsArr, setleadsArr] = useState([]);
  const [selectedSubscriptionObj, setSelectedSubscriptionObj] = useState(null);
  const [userObj, setUserObj] = useState({});
  const [userSubscriptionExpired, setUserSubscriptionExpired] = useState(true);
  const [userSubscriptionBlocked, setUserSubscriptionBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getSubscriptions = async () => {
    try {
      setIsLoading(true)
      let decodedObj = await getDecodedToken();

      const { data: res } = await getLeadsBycreatedById(decodedObj?.userId);

      console.log("start array========================", res.data[0] , "==================end array")
      
      if (res) {
        console.log(res.data.length)
        setleadsArr(res.data);
        setIsLoading(false)
      }
    } catch (error) {
      errorToast(error);
      setIsLoading(false)
    }
  };

  const handleGetUser = async () => {
    try {
      let decoded = await getDecodedToken();
      let { data: res } = await getUserById(decoded.userId)
      if (res.data) {
        // console.log(res.data, "dataa")
        setUserObj(res.data);
        setUserSubscriptionExpired(res.data.userSubscriptionExpired)
        setUserSubscriptionBlocked(res.data.isBlocked)
      }
    }
    catch (err) {
      errorToast(err)
    }
  }

  const renderSubscriptionItem = ({ item, index }) => {
    return (
      <Pressable style={[styles1.card_main, { marginTop: 20 }, selectedSubscriptionObj?._id == item?._id && { borderColor: '#B08218' }]}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles1.nameheading}>{item?.userObj?.companyObj?.name}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Phone : </Text>
          <Text>{item?.phone}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Email : </Text>
          <Text>{item?.email}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Contacted On : </Text>
          <Text>{moment(item?.createdAt).format('DD-MM-YYYY')}</Text>
        </View>
      </Pressable>
    );
  };

  const renderMyLeadsItem = ({ item, index }) => {
    const leadItem={
      name:item?.name,
      
      date:moment(item?.createdAt).format('DD-MM-YYYY')
    }
    return (
      <MyLeadItem leadItem={leadItem}></MyLeadItem>
    );
  };

  useEffect(() => {
    getSubscriptions();
    handleGetUser();
  }, []);

  return (
    <>
      <Header normal={true} screenName={'Leads'} rootProps={props} />
    <View style={{flex:1,backgroundColor: '#FFF4EC',}}>
    <View style={{flex:1, paddingHorizontal:10,alignItems:'center'}}>

      <Text style={{fontSize:wp(6),marginVertical:wp(2),fontWeight:800,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>My Leads</Text>
      
       {
          isLoading ?
            <ActivityIndicator size={'large'} color={CustomColors.mattBrownDark} width={wp(50)} />
            : null
        }
      
      {
        (userSubscriptionExpired == false) && (userSubscriptionBlocked == false) ?
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={{ paddingVertical: 15 , textAlign:'center', color:'#000'}}>No Leads found</Text>}
            data={leadsArr} renderItem={renderMyLeadsItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: 50 }} />
          :
          userSubscriptionBlocked ?
            <>
             
              <Text style={{ paddingHorizontal: 20, paddingVertical: 15 }}>Your subscription has been blocked by admin please contact admin for further details   </Text>
             
            </>
            :

            <>
            <View style={{height:hp(80), display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Text style={{ paddingHorizontal: 20, paddingVertical: 15, textAlign:'center' }}>You have {leadsArr ? leadsArr.length : 0} leads , get a subscription to view the leads   </Text>
              </View>
            </>

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
    paddingVertical: 12,
    borderRadius: 5,
    // width: wp(90),
    
    // marginHorizontal: 20,
  },
  nameheading: {
    color: '#000000',
    fontSize: wp(4),
    fontFamily: 'Manrope-Bold',
    marginBottom:5,
  },
});

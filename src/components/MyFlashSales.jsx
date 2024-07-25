import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { deleteFlashSalebyId, getAllFlashSalesbyUserId } from '../services/FlashSales.service';
import { getDecodedToken, getUserById } from '../services/User.service';
import { generateImageUrl } from '../services/url.service';
import { PRIMARY_COLOR } from '../utils/constants';
import { errorToast, toastSuccess } from '../utils/toastutill';

export default function MyFlashSales(props) {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [saleArr, setSaleArr] = useState([]);
  const [userSubscriptionExpired, setUserSubscriptionExpired] = useState(true);
  const [userDataObj, setUserDataObj] = useState({});

  const handleGetUser = async () => {
    try {
      let decoded = await getDecodedToken()
      let { data: res } = await getUserById(decoded.userId)
      if (res.data) {
        setUserDataObj(res.data)
        setUserSubscriptionExpired(res.data.userSubscriptionExpired)
      }
    }
    catch (err) {
      errorToast(err)
    }
  }
  const getSubscriptions = async () => {
    try {
      let decodedObj = await getDecodedToken();

      const { data: res } = await getAllFlashSalesbyUserId(decodedObj?.userId);
      if (res) {
        setSaleArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleDeleteFlashSale = async (id) => {
    try {
      const { data: res } = await deleteFlashSalebyId(id);
      if (res) {
        toastSuccess(res.message)
        getSubscriptions()
      }
    } catch (error) {
      errorToast(error)
    }
  }

  const renderSubscriptionItem = ({ item, index }) => {
    return (
      <View style={[styles1.card_main, { marginTop: 10 }]}>
        <View style={styles1.manageContainer}>
          <TouchableOpacity style={{marginHorizontal: 1, width:22, height:22,display:'flex', alignItems:'center', justifyContent:'center',  borderRadius:50, backgroundColor:'green'}} onPress={() => navigation.navigate("EditFlashSale", { data: item?._id })}>
            <FontAwesomeIcon name="edit" size={10} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 10, width:20, height:20,display:'flex', alignItems:'center', justifyContent:'center',  borderRadius:50, backgroundColor:'red', marginVertical: 2}} onPress={() => handleDeleteFlashSale(item?._id)}>
            <FontAwesomeIcon name="trash-o" size={10}  color='#fff' />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: generateImageUrl(item?.productId?.mainImage) }}  style={{width: wp(95), height: wp(40),}} resizeMode='cover' />
     
      <View style={{padding:10}}>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom:5, alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles1.nameheading}>{item?.productId?.name}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Selling Price : </Text>
          <Text>₹{item?.salePrice}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Price : </Text>
          <Text>₹ {item?.price}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Start Date : </Text>
          <Text>{moment(item?.startDate).format('DD-MM-YYYY')}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>End Date : </Text>
          <Text>{moment(item?.endDate).format('DD-MM-YYYY')}</Text>
        </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (focused) {
      getSubscriptions();
      handleGetUser()
    }
  }, [focused]);

  return (
    <>
      <Header stackHeader={true} screenName={'Your Flash Sales'} rootProps={props} />
      <View style={{backgroundColor:'#fff', flex:1}}>

    
      {
        saleArr.length > 0 ?  <FlatList data={saleArr} renderItem={renderSubscriptionItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: hp(10) }} />
        :
          <View style={{height:hp(80), display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:16, alignSelf:'center', color:'#000', marginVertical:20}}>No Flash sales</Text>

          </View>
      }

      
      
      
      {
        (userSubscriptionExpired || userDataObj?.numberOfSales <= 0) &&
        <Text style={{ paddingHorizontal: 10 }}>
          You do not have a valid subscription , subscribe one to add a flash sale
        </Text>
      }
      {
        (userDataObj?.isBlocked) &&
        <Text style={{ paddingHorizontal: 10, fontSize:16, color:'#000'  }}>
          Your subscription has been blocked by admin please contact admin for further details
        </Text>
      }
    
      </View>
      {
        (userDataObj?.numberOfSales > 0 && !userSubscriptionExpired && !userDataObj?.isBlocked) &&
        <Pressable onPress={() => navigation.navigate('AddFlashSales')} style={[styles.btnbg, { width: wp(90), marginHorizontal: 20, marginBottom: 15 }]}>
          <Text style={styles.textbtn}>Create a Flash Sale</Text>
        </Pressable>
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
    // paddingHorizontal: 10,
    overflow:'hidden',
    // paddingVertical: 12,
    borderRadius: 5,
    // width: wp(90),
    marginHorizontal: 10,
  },
  nameheading: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
  },
  manageContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: wp(95),
  },
});

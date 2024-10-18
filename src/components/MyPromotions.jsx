import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { deleteAdvertisement, getAllAdvertisements } from '../services/Advertisement.service';
import { getAllFlashSalesbyUserId } from '../services/FlashSales.service';
import { getAllProducts } from '../services/Product.service';
import { generateImageUrl } from '../services/url.service';
import { getDecodedToken, getUserById } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR, WHITE_COLOR } from '../utils/constants';
import CustomColors from '../styles/CustomColors';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
export default function MyPromotions(props) {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [saleArr, setSaleArr] = useState([]);
  const [userSubscriptionExpired, setUserSubscriptionExpired] = useState(true);
  const [userDataObj, setUserDataObj] = useState({});
  const [isLoadingallcompo, setIsLoadingallcompo] = useState(false);
  const getSubscriptions = async () => {
    setIsLoadingallcompo(true)
    try {
      let decodedObj = await getDecodedToken();

      const { data: res } = await getAllAdvertisements(decodedObj?.userId);
      if (res) {
        console.log(JSON.stringify(res.data, null, 2));
        setSaleArr(res.data);
        setIsLoadingallcompo(false)
      }
    } catch (error) {
      errorToast(error);
      setIsLoadingallcompo(false)
    }finally{
      setIsLoadingallcompo(false)
    }
  };

  const handleDeletePromotions = async id => {
    try {
      const { data: res } = await deleteAdvertisement(id);
      if (res) {
        toastSuccess(res.message);
        getSubscriptions();
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleGetUser = async () => {
    try {
      let decoded = await getDecodedToken();
      let { data: res } = await getUserById(decoded.userId);
      if (res.data) {
        setUserDataObj(res.data);
        setUserSubscriptionExpired(res.data.userSubscriptionExpired);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const renderSubscriptionItem = ({ item, index }) => {
    return (
      <View style={[styles1.card_main, { marginTop: 10 }]}>
        <View style={styles1.manageContainer}>
          <TouchableOpacity style={{ marginHorizontal: 1, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: 'green' }} onPress={() => navigation.navigate('EditPromotions', { data: item?._id })}>
            <FontAwesomeIcon name="edit" size={10} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginHorizontal: 10, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: 'red' }} onPress={() => handleDeletePromotions(item?._id)}>
            <FontAwesomeIcon name="trash-o" size={10} color="#fff" />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: generateImageUrl(item?.productId?.mainImage) }} style={{ width: wp(95), height: wp(40) }} resizeMode="cover" />

        <View style={{ padding: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles1.nameheading}>{item?.productId?.name}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Selling Price : </Text>
            <Text>₹{item?.productId?.sellingprice}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Price : </Text>
            <Text>₹ {item?.productId?.price}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Start Date : </Text>
            <Text>{moment(item?.startDate).format('DD-MM-YYYY')}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>End Date : </Text>
            <Text>{moment(item?.endDate).format('DD-MM-YYYY')}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Message : </Text>
            <Text>{item?.message}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {

    console.log('itemx',JSON.stringify(item))
    return (
      <Pressable style={stylesCard.container}>

      <Image 
  style={{ width: '100%', height: wp(45), borderRadius: wp(5), resizeMode: 'contain' }} 
  source={
    item?.image && item.image !== "null"
      ? { uri: generateImageUrl(item.image) }
      : item?.productId?.mainImage 
        ? { uri: generateImageUrl(item.productId.mainImage) }
        : require('../../assets/img/logo_1.png') // Fallback to a default image
  }
/>
        <View style={stylesCard.imageStyle}>
          <Pressable
            style={{ marginHorizontal: 10, width: wp(10), height: wp(10), display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#cc8d19', marginVertical: 2 }}
            onPress={() => {
              handleDeletePromotions(item?._id);
            }}>
            <FontAwesomeIcon name="trash-o" size={wp(5)} color="#fff" />
          </Pressable>
          <Pressable style={{ marginHorizontal: 1, width: wp(10), height: wp(10), display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#cc8d19' }} onPress={() => navigation.navigate('EditPromotions', { data: item?._id })}>
            <FontAwesomeIcon name="edit" size={wp(5)} color="#fff" />
          </Pressable>
        </View>


        <Text style={stylesCard.headStyle}>{item?.productId?.name}</Text>
        <View style={stylesCard.table}>
          <View style={stylesCard.tableRow}>
            <Text style={stylesCard.valueTextStyle} ellipsizeMode="tail" numberOfLines={2}>
              {'\u20B9'} {item?.productId?.sellingprice}
            </Text>
          </View>
          <View style={stylesCard.tableRow}>
            <Text style={[stylesCard.valueTextStyleLight, { textDecorationLine: 'line-through' }]} ellipsizeMode="tail" numberOfLines={1}>
              {'\u20B9'}
              {item?.productId?.price}
            </Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: wp(2) }}>
          <Text style={{ fontSize: wp(3.5) }}>From : </Text>
          <Text style={{ fontSize: wp(3.5) }}>{moment.utc(item?.startDate).format('DD-MM-YYYY')}</Text>

          <Text style={{ fontSize: wp(3.5), marginHorizontal: wp(2) }}>To : </Text>
          <Text style={{ fontSize: wp(3.5) }}>{moment.utc(item?.endDate).format('DD-MM-YYYY')}</Text>
          </View>
      </Pressable>
    );
  };

  useEffect(() => {
    if (focused) {
      getSubscriptions();
      handleGetUser();
    }
  }, [focused]);

  return (
    <>
      <Header normal={true} screenName={'Your Promotions'} rootProps={props} />

        {
            isLoadingallcompo?
            <LoadingDialog size="large" color={CustomColors.mattBrownDark} style={{ marginTop: wp(5), marginBottom: wp(5) }} />
            :
             <View style={{ backgroundColor: CustomColors.mattBrownFaint, flex: 1 }}>
        <View style={reviewStyle.container}>
          <Text style={reviewStyle.title}>My Promotions</Text>

          {userSubscriptionExpired == false && userDataObj?.numberOfAdvertisement > 0 && !userDataObj?.isBlocked && (
            <View style={reviewStyle.addBtn} ><CustomButtonNew paddingHorizontal={wp(6)} onPress={() => navigation.navigate('AddAdvertisement')} textSize={wp(4)} text={"Add"}></CustomButtonNew></View>
          )}
        </View>

        {saleArr && saleArr.length > 0 ? (
          <FlatList data={saleArr} renderItem={renderItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: hp(10) }} />
        ) : (
          <View style={{ height: hp(85), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: wp(5), color: '#000' }}>No Promotions</Text>
          </View>
        )}
        {userSubscriptionExpired && <Text style={{ paddingHorizontal: 15 }}>You do not have a valid subscription , subscribe one to add an advertisement</Text>}
        {userDataObj?.numberOfAdvertisement <= 0 && <Text style={{ paddingHorizontal: 15 }}>You do not have a enough balance in your account , subscribe one to add an advertisement</Text>}
        {userDataObj?.isBlocked && <Text style={{ paddingHorizontal: 15 }}>Your subscription has been blocked by admin please contact admin for further details</Text>}

        {/* {userSubscriptionExpired == false && userDataObj?.numberOfAdvertisement > 0 && !userDataObj?.isBlocked && (
          <TouchableOpacity onPress={() => navigation.navigate('AddAdvertisement')} style={[styles.btnbg, {marginHorizontal: 10, marginBottom: 15}]}>
            <Text style={styles.textbtn}>Create an advertisement</Text>
          </TouchableOpacity>
        )} */}
      </View>}
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
    overflow: 'hidden',
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
    marginTop: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: wp(95),
  },
});

const stylesCard = StyleSheet.create({
  container: {
    margin: wp(2),
    flex: 1,
    height: wp(75),
    elevation: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: wp(5),
  },
  imageStyle: {
    borderRadius: wp(5),
    width: '100%',
    height: '60%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    

  },
  table: {
    marginHorizontal: wp(2),
    width: '100%',
  },
  headStyle: {
    color: '#5a432f',
    textAlign: 'center',
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginVertical: wp(2),
    marginStart: wp(2),
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp(0.3),
  },
  nameStyle: {
    color: CustomColors.mattBrownDark,
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  keyTextStyle: {
    color: 'black',
    flex: 1,
  },
  valueTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp(3.5),
    flex: 1,
    paddingRight: wp(4),
  },
  valueTextStyleLight: {
    color: 'gray',
    fontSize: wp(3.5),
    flex: 1,
    paddingRight: wp(4),
  },
});

const reviewStyle = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: wp(5),
    width: wp(85),
    justifyContent: 'center',
    alignItems: 'flex-start',
    
  },
  title: {
    fontSize: wp(5.5),
    fontWeight: 'bold',

  },
  addBtn: {
    borderRadius: 50, borderColor: '#BC9B80',
    borderWidth: wp(1),
    position: 'absolute',
    right: 0
  },
});

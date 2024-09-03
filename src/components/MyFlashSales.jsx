import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { deleteFlashSalebyId, getAllFlashSalesbyUserId } from '../services/FlashSales.service';
import { getDecodedToken, getUserById } from '../services/User.service';
import { generateImageUrl } from '../services/url.service';
import { PRIMARY_COLOR } from '../utils/constants';
import { errorToast, toastSuccess } from '../utils/toastutill';
import FlashSaleItemWithDiscount from '../ReusableComponents/FlashSaleItemWithDiscount';
import FlashSaleItem from '../ReusableComponents/FlashSaleItem';
import FadeRibbonText from '../ReusableComponents/FadeRibbon';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';

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
    console
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

  const renderItem = ({item, index}) => {
    return (
      <Pressable style={stylesCard.container}>
       
        <Image style={{width:'100%',height:'50%',borderRadius:wp(5)}} source={{uri: generateImageUrl(item?.productId?.mainImage)}} />
        <View style={stylesCard.imageStyle}>       
        <Pressable
          style={{marginHorizontal: 10, width: wp(10), height: wp(10), display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#674c35', marginVertical: 2}}
          onPress={() => {
            handleDeleteFlashSale(item?._id)
          }}>
          <FontAwesomeIcon name="trash-o" size={wp(5)} color="#fff" />
        </Pressable>
        <Pressable style={{marginHorizontal: 1, width: wp(10), height: wp(10), display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#674c35'}} onPress={() => navigation.navigate('EditFlashSale', {data: item?._id})}>
          <FontAwesomeIcon name="edit" size={wp(5)} color="#fff" />
        </Pressable>
        </View>
      

        <Text style={stylesCard.headStyle}>{item?.productId?.name}</Text>
        <View style={stylesCard.table}>
          <View style={stylesCard.tableRow}>
            <Text style={stylesCard.valueTextStyle} ellipsizeMode="tail" numberOfLines={2}>
              {'\u20B9'} {item?.salePrice}
            </Text>
          </View>
          <View style={stylesCard.tableRow}>
            <Text style={[stylesCard.valueTextStyleLight, {textDecorationLine: 'line-through'}]} ellipsizeMode="tail" numberOfLines={1}>
              {'\u20B9'}
              {item?.price}
            </Text>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: wp(2)}}>
          <Text style={{fontSize:wp(3)}}>From : </Text>
          <Text style={{fontSize:wp(3)}}>{moment(item?.startDate).format('DD-MM-YYYY')}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: wp(2)}}>
          <Text style={{fontSize:wp(3)}}>To      : </Text>
          <Text style={{fontSize:wp(3)}}>{moment(item?.endDate).format('DD-MM-YYYY')}</Text>
        </View>
      </Pressable>
    );
  };

  const renderFlashItem = ({ item, index }) => {
    return (
      <View  style={{paddingVertical:wp(1)}}>
       <FlashSaleItem 
      onDeletePress={()=>{handleDeleteFlashSale(item?._id)}}
      imagePath={{uri: generateImageUrl(item?.productId?.mainImage)}}
        actualPrice={item?.price}
        name={item?.productId?.name}
        salePrice={item?.salePrice}
        offPercentage={item?.discountValue}
        id={item?._id}
     />
     
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
      <Header normal={true} screenName={'Your Flash Sales'} rootProps={props} />
      <View style={{backgroundColor:'#fff', flex:1}}>
    <View style={{flexDirection:'row',justifyContent:'center',marginTop:wp(3)}}>

    <Text style={{fontSize:wp(6),fontWeight:800,}}>My Flash Sale</Text>
    <View style={{borderRadius:50,borderColor:'#BC9B80',borderWidth:wp(1),marginLeft:wp(5)} }><CustomButtonNew  textSize={wp(3)} paddingHorizontal={wp(7)} text={"ADD"} onPress={()=>{navigation.navigate('AddFlashSales')}}/></View>
    </View>
    
     <View style={{height:wp(15),justifyContent:'center', marginHorizontal:wp(2)}}>
     <FadeRibbonText reverseDirection={true}></FadeRibbonText>
     <Image source={require('../../assets/img/flash_sale.png')}  style={{width:wp(30),height:wp(15),position:'absolute',resizeMode:'contain'}} ></Image>
     <View style={{ flexDirection:'row', position:'absolute',justifyContent:'flex-start' ,alignItems:'baseline',marginStart:wp(32)}}>
     <Text style={{fontSize:wp(5.5),fontWeight:800,color:'black'}}>Dont Miss Out</Text>
     <Text style={{fontSize:wp(3.5),fontWeight:800,color:'white',marginStart:wp(2)}}> Our Flash Sale</Text>
     </View>
     </View>

      {
        saleArr.length > 0 ?  <FlatList data={saleArr} renderItem={renderItem} numColumns={2} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: hp(10) }} />
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
      {/* {
        (userDataObj?.numberOfSales > 0 && !userSubscriptionExpired && !userDataObj?.isBlocked) &&
        <Pressable onPress={() => navigation.navigate('AddFlashSales')} style={[styles.btnbg, { width: wp(90), marginHorizontal: 20, marginBottom: 15 }]}>
          <Text style={styles.textbtn}>Create a Flash Sale</Text>
        </Pressable>
      } */}
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
const stylesCard = StyleSheet.create({
  container: {
    margin: wp(2),
    width: wp(46),
    height: wp(60),
    elevation: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: wp(5),
  },
  imageStyle: {
    borderRadius: wp(5),
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingHorizontal:wp(2),
    paddingVertical:wp(2)
    
  },
  table: {
    marginHorizontal: wp(2),
    width: '100%',
  },
  headStyle: {
    color: '#5a432f',
    textAlign: 'center',
    fontSize: wp(4),
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
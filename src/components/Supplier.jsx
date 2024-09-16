import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState,useContext} from 'react';
import {FlatList, Image, ImageBackground, Share ,Linking, Pressable, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, LinearGradient, Button,Alert} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Header from '../navigation/customheader/Header';
import {getAllProductsBySupplierId, getProductYouMayLike} from '../services/Product.service';
import {generateImageUrl} from '../services/url.service';
import {checkForValidSubscriptionAndReturnBoolean, getDecodedToken, getUserById, getUserUserById,topProfilesHomePage} from '../services/User.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { isAuthorisedContext } from '../navigation/Stack/Root';
import {addReview, getReviewForProduct} from '../services/ProductReview.service';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {createLead} from '../services/leads.service';
import ReviewsItem from '../ReusableComponents/ReviewsItem';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import ProductsYouMayLike from '../ReusableComponents/ProductsYouMayLike';
import NewArrivalProductCard from '../ReusableComponents/NewArrivalProductCard';
import TopProfilesVerticalCard from '../ReusableComponents/TopProfilesVerticalCard';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CustomColors from '../styles/CustomColors';
import ProductsCardWithoutLocation from '../ReusableComponents/ProductsCardWithoutLocation';

export default function Supplier(props) {
  const navigate = useNavigation();
  const focused = useIsFocused();
  const [productReviewArr, setProductReviewArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAuthorized] = useContext(isAuthorisedContext);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [userId, setUserId] = useState(null);
  const [infolist, setInfolist] = useState([
    {
      activeimgimg: require('../../assets/img/activeprofile.png'),
      noactiveimg: require('../../assets/img/profile.png'),
      textinfo: 'Profile',
      active: true,
    },
    {
      activeimgimg: require('../../assets/img/activeproductt1.png'),
      noactiveimg: require('../../assets/img/productt1.png'),
      textinfo: 'Our Products',
      active: false,
    },
  ]);

  const [videoArr, setVideoArr] = useState([]);

  const [supplierObj, setSupplierObj] = useState({});
  const [productsArr, setProductsArr] = useState([]);
  const [productYouMayLikeArray, setProductsYouMayLike] = useState([]);
  const [topProfileArray, setTopProfileArray] = useState([]);

  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [userid, setuserid] = useState('');
  const [supplerid, setsupplerid] = useState('');
  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const [whatappnumber, setWhatappnumber] = useState();
  const roletype = ['DISTRIBUTOR', 'MANUFACTURER/IMPORTER', 'DEALER'];

  const activetab = index => {
    let temp = [...infolist];
    temp = temp.map((el, ind) => {
      if (ind == index) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
    setInfolist([...temp]);
  };

  // const handleCreateLead = async ()=> {
  //   try {
  //     let obj = {

  //       phone: supplierObj?.phone,
  //       email: supplierObj?.email,
  //       createdById: userObj?._id,
  //     };
  //     let { data: res } = await createLead(obj);
  //     if (res.message) {
  //       successToast(res.message);

  //     }
  //   } catch (err) {
  //     errorToast(err);
  //   }
  // };

  const handleGetProductYouMayLike = async () => {
    try {
      let { data: res } = await getProductYouMayLike();
      if (res.data) {
        setProductsYouMayLike(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetTopProfiles = async () => {
    try {
      let { data: res } = await topProfilesHomePage();
      if (res.data) {
        setTopProfileArray(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handelwhatappclick = () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        navigate.navigate('Subscriptions', { register: false })
        return 0;
      }
      Linking.openURL(`https://api.whatsapp.com/send/?phone=${supplierObj?.phone}`);
    }
    else {
      navigate.navigate('Login')
    }
  };

  const handleViewProfileClick = (item) => {
    console.log('xxxx ---------')
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        navigate.navigate('Subscriptions', { register: false })
        return 0;
      }
      navigate.navigate('Supplier', { data: item }) 
    }
    else {
      errorToast('You need to login to access this feature');
      navigate.navigate('Login')
    }
  };

  
  const handelcallbtn = () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        navigate.navigate('Subscriptions', { register: false })
        return 0;
      }

      Linking.openURL(`tel:${supplierObj?.phone}`);
    }
    else {
      navigate.navigate('Login')
    }

  }



const handelclickcmail = () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        navigate.navigate('Subscriptions', { register: false })
        return 0;
      }
      Linking.openURL(`mailto:${supplierObj?.email}`);
    }
    else {
      navigate.navigate('Login')
    }
  };
  const handeleClickShare = async () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        navigate.navigate('Subscriptions', { register: false })
        return 0;
      }
      try {
        const result = await Share.share({
          message: `Check out this supplier: https://plywoodbazar.com/Supplier/${userId}`,
        });
    
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with activity type of result.activityType
            console.log('Shared with activity type: ', result.activityType);
          } else {
            // Shared successfully
            console.log('Shared successfully');
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed the share dialog
          console.log('Share dismissed');
        }
      } catch (error) {
        console.log('Error sharing: ', error.message);
      }
    }
    else {
      navigate.navigate('Login')
    }
  };
  const handleGetQuoteClick = (item) => {

    console.log(JSON.stringify(item),'zzzzzzxv');
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        navigate.navigate('Subscriptions', { register: false })
        return 0;
      }
      //navigate.navigate('Productdetails', {data: item.productSlug})
      navigate.navigate('Productdetails', {data: item?.product?.slug})

    }
    else {
      errorToast('You need to login to access this feature');
      navigate.navigate('Login')
    }
  };

  const handleGetQuoteClick2 = (item) => {

    console.log(JSON.stringify(item),'zzzzzzxv');
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        navigate.navigate('Subscriptions', { register: false })
        return 0;
      }
      //navigate.navigate('Productdetails', {data: item.productSlug})
      navigate.navigate('Productdetails', {data: item?.slug})

    }
    else {
      errorToast('You need to login to access this feature');
      navigate.navigate('Login')
    }
  };
  const handleGetProductReview = async id => {

    try {
      let {data: res} = await getReviewForProduct(`userId=${id}`);
      if (res.message) {
        setProductReviewArr(res.data);
      }
    } catch (err) {
      toastError(err);
    }
  };

  const HandleCheckValidSubscription = async () => {
    try {
      let decoded = await getDecodedToken();
      if (decoded) {
        if (decoded?.user?.name) {
          setName(decoded?.user?.name);
        }

        let {data: res} = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
        if (res.data) {
          console.log(
            'setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
            res.data,
            'setCurrentUserHasActiveSubscription,setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
          );
          setCurrentUserHasActiveSubscription(res.data);
        }
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const HandleGetProductBySupplierId = async id => {
    try {
      let {data: res} = await getAllProductsBySupplierId(id);
      if (res.data) {
        // console.log(JSON.stringify(res.data, null, 2), "products")
        setProductsArr(res.data);
        

      }
    } catch (err) {
      errorToast(err);
    }
  };
  const HandleGetUserById = async id => {
    console.log('=================', id, '==========================');

    try {
      if (!id) {
        return null;
      }
      let {data: res} = await getUserUserById(id);
      console.log('=================', res, '==========================');

      if (res.data) {
        setSupplierObj(res.data);
        setVideoArr(res?.data?.videoArr?.map(el => ({...el, isPaused: false})));
      }
    } catch (err) {
      errorToast(err);
    }
  };
 
  const onBuffer = val => console.log(val);
  const videoError = val => console.error(val);
  const getauthuser = async () => {
    let decoded = await getDecodedToken();
    if (decoded && decoded?._id) {
      setuserid(decoded?._id);
      getUserById(decoded?._id);
    }
  };

  useEffect(() => {
    if (focused) {
      console.log(JSON.stringify(props.route.params.data, null, 2), 'props.route.params.data');
      if (props?.route?.params?.data?._id) {
        HandleGetUserById(props?.route?.params?.data?._id);
        setUserId(props?.route?.params?.data?._id);
        setsupplerid(props?.route?.params?.data?._id);
        HandleCheckValidSubscription();
        HandleGetProductBySupplierId(props?.route?.params?.data?._id);
        handleGetProductYouMayLike();
        handleGetTopProfiles();
      }
    }
  }, [props.route.params.data, focused]);

  useEffect(() => {
    if (supplierObj && supplierObj._id) {
      if (supplierObj._id == props.route.params.data._id) {
        setShowEditIcon(true);
      } else {
        setShowEditIcon(false);
      }

      handleGetProductReview(supplierObj._id);
    }
  }, [supplierObj]);
  const renderinfolist = ({item, index}) => {
    return (
      <View>
        {item.active == true ? (
          <Pressable style={[styles1.flexfrow, styles1.activemain]}>
            <Text style={styles1.activtext}>{item.textinfo}</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => activetab(index)} style={[styles1.flexfrow]}>
            <Text>{item.textinfo}</Text>
          </Pressable>
        )}
      </View>
    );
  };


  const rendershopcategory = ({item, index}) => {
    return <ImageBackground source={{uri: generateImageUrl(item.image)}} imageStyle={{borderRadius: 10}} style={styles1.category} resizeMode="cover"></ImageBackground>;
  };

  const ReviewsItem1 = ({item, index}) => {
    console.log('rrrr',JSON.stringify(item))
    return <ReviewsItem reviewItem={item} />;
  };
  const ProductsYouMayLike1 = ({item, index}) => {
    return <NewArrivalProductCard  onCallPressed={()=>{handelcallbtn(item)}} onGetQuotePressed={()=>{handleGetQuoteClick(item)}} onCardPressed={() => navigate.navigate('Productdetails', {data: item.productSlug})} imagePath={{ uri: generateImageUrl(item?.product?.mainImage)}} isVerified={item.isVerified} name={item.productName} location={item.cityName} price={item?.price}></NewArrivalProductCard>;
  };
  const Products1 = ({item, index}) => {
    console.log('QAZXC',generateImageUrl(item?.mainImage))
    return <ProductsCardWithoutLocation  onGetQuotePressed={()=>{handleGetQuoteClick2(item)}} onCallPressed={()=>{handelcallbtn(item)}} onPress={() => navigate.navigate('Productdetails', {data: item.slug})} imagePath={{uri:generateImageUrl(item?.mainImage)}} isVerified={item.isVerified} name={item.name} location={'Nahsik'} price={item.price} sellingprice={item.sellingprice}/>
  };
  const Topprofiles = ({item, index}) => {
    console.log('xx',item.name);
    const { cityName, stateName } = item;

  // Check if cityName or stateName are null, 'null', or empty strings, and build the address
  const validCity = cityName && cityName !== 'null' ? cityName : '';
  const validState = stateName && stateName !== 'null' ? stateName : '';

  // Return the combined address, trimming any extra spaces
  const location= `${validCity} ${validState}`.trim();
    return <TopProfilesVerticalCard  onViewPress={()=>{handleViewProfileClick(item)}} name={item?.companyName} imagePath={{ uri: generateImageUrl(item.profileImage) }} rating={item.rating} Product={item?.productsCount}  address={location} onPress={{}} onCallPress={() => handelcallbtn(item?.phone)}  />;
  };
  const handlePauseAndUnpause = index => {
    let tempArr = videoArr;
    tempArr[index].isPaused = tempArr[index].isPaused;
    setVideoArr([...videoArr]);
  };

  const renderourproductvideo = ({item, index}) => {
    return (
      <Pressable style={{marginRight: 10, marginVertical: 15}} onPress={() => handlePauseAndUnpause(index)}>
        {item.video ? (
          <Video
            onBuffer={onBuffer} // Callback when remote video is buffering
            onError={videoError}
            minLoadRetryCount={5}
            paused={item.isPaused}
            source={{uri: generateImageUrl(item.video)}}
            style={{borderWidth: 0.5, borderColor: '#D9D9D9', borderStyle: 'solid', padding: 2, borderRadius: 10, width: wp(95), height: 250, overflow: 'hidden'}}
            resizeMode="cover"
          />
        ) : (
          <Text>No Video</Text>
        )}
      </Pressable>
    );
  };

  const checkActiveSection = () => {
    let tempObj = infolist.find(el => el.active);
    return tempObj?.textinfo;
  };

  const handleModelshow = () => {
    if (!currentUserHasActiveSubscription) {
      errorToast('You do not have a valid subscription to perform this action');
      return 0;
    }
    setModalVisible(true);
  };
  const handleSubmitReview = async e => {
    try {
      if (!currentUserHasActiveSubscription) {
        errorToast('You do not have a valid subscription to perform this action');
        return 0;
      }
      if (name == '') {
        errorToast('Please enter a name');
        return;
      }
      if (message == '') {
        errorToast('Please enter a Message');
        Alert.alert('Validation Error', 'Please enter a Message.');
        return;
      }
      if (!(supplierObj && supplierObj._id)) {
      console.log('supplierObj._id',supplierObj._id);
      
        errorToast('Something went wrong please close the app and open again ');
        return;
      }
      let obj = {
        rating,
        message,
        name,
        userId: supplierObj._id,
      };
      let { data: res } = await addReview(obj);
      if (res.message) {
        toastSuccess(res.message);
        setModalVisible(false);
        handleGetProductReview(supplierObj?._id);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const ListHeader = () => {
    return (
      <View style={{backgroundColor: '#FFF8EC', flex: 1}}>
        <View style={[styles1.positionrelative, {position: 'relative', height: hp(21)}]}>
          {showEditIcon && userid == supplerid && (
            <Pressable onPress={() => navigate.navigate('Editprofile')} style={styles1.abosoluicon}>
              <AntDesign name="edit" size={17} color="#848993" />
            </Pressable>
          )}
          {supplierObj.bannerImage && supplierObj.bannerImage && supplierObj.bannerImage ? <Image source={{uri: generateImageUrl(supplierObj.bannerImage)}} style={styles1.imgfluid} /> : <Image source={require('../../assets/img/cover.png')} style={[styles1.imgfluid]} />}
          {supplierObj?.profileImage && supplierObj.profileImage != '' ? <Image source={{uri: generateImageUrl(supplierObj?.profileImage)}} style={styles1.logo} /> : <Image source={require('../../assets/img/profile1.png')} style={[styles1.logo]} />}
        </View>

        <View style={[styles1.padinghr, {marginTop: wp(17), paddingHorizontal: 10}]}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{width: wp(75), alignItems: 'center'}}>
              <View style={styles1.infoadd}>
                <Text style={[styles1.infotext, {fontFamily: 'Poppins-Bold', fontSize: wp(5.5)}]}>{supplierObj?.companyObj?.name}</Text>
              </View>

              {/* <TouchableOpacity style={styles1.infoadd} onPress={handelwhatappclick}>
              <FontAwesome name='whatsapp' size={20} color='green' />
              <Text style={{fontSize:wp(4), fontFamily:'Poppins-Medium'}}>  {supplierObj?.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles1.infoadd} onPress={handelclickcmail}>
              <FontAwesome name='envelope-o' size={16} color='#e34133' />
              <Text style={{fontSize:wp(4), fontFamily:'Poppins-Medium', fontSize:wp(3),  color:'#000'}}>  {supplierObj?.email}</Text>
              </TouchableOpacity> */}

              <View style={styles1.infoadd}>
                <Pressable onPress={() => Linking.openURL(`${supplierObj?.companyObj?.googleMapsLink}`)} style={[styles1.infoadd]}>
                  <FontAwesomeIcon name="map-marker" style={{marginHorizontal: wp(3)}} size={wp(5)} color={CustomColors.mattBrownDark} />
                  <Text style={[styles1.infotext, {width: wp(70), fontSize: 14}]}>{supplierObj?.companyObj?.address}</Text>
                </Pressable>
              </View>

              <View style={[styles1.infoadd, {justifyContent: 'flex-start'}]}>
                <FontAwesomeIcon name="star" style={{marginHorizontal: wp(3)}} size={wp(5)} color={CustomColors.mattBrownDark} />
                <Text style={{fontFamily: 'Poppins-Medium', marginHorizontal: wp(1)}}>{supplierObj?.rating}</Text>
                {supplierObj?.companyObj?.gstNumber ? (
                  <>
                    <Image source={require('../../assets/img/addcheck.png')} style={styles1.imgsmall} resizeMode="center" />
                    <Text style={[styles1.infotext]}>
                      <Text style={{fontFamily: 'Poppins-Medium', fontWeight: 'bold'}}>{supplierObj.companyObj.gstNumber}</Text>
                    </Text>
                  </>
                ) : null}
              </View>
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity style={[styles1.callbtn, {backgroundColor: '#39AB68'}]} onPress={()=>{handelcallbtn()}}>
                <Ionicons name="call" size={25} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles1.callbtn, {backgroundColor: '#FFF3E9'}]} onPress={()=>{handelclickcmail()}}>
                <FontAwesome name="envelope-o" size={25} color="#624832" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles1.callbtn, {backgroundColor: '#39AB68'}]} onPress={()=>{handelwhatappclick()}}>
                <FontAwesome name="whatsapp" size={25} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles1.callbtn, {backgroundColor: '#FFF3E9'}]} onPress={()=>{handeleClickShare()}}>
                <FontAwesome name="share" size={23} color="#624832" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <FlatList data={infolist} renderItem={renderinfolist} keyExtractor={(item, index) => `${index}`} horizontal />
          </View>

          {checkActiveSection() == 'Profile' && (
            <>
              <View style={[styles1.flexbetwen, {flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: wp(1)}]}>
                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Ionicons name="business" size={32} color="#000" />
                  </View>
                  <View style={{margin: wp(1), alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Nature of Business</Text>
                    <Text style={{alignSelf: 'flex-start',width:wp(60)}}>{supplierObj?.companyObj?.natureOfBusiness ? supplierObj?.companyObj?.natureOfBusiness : 'Not provided'} </Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <AntDesign name="tags" size={32} color="#000" />
                  </View>
                  <View style={{margin: wp(1), alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>GST No.</Text>
                    <Text style={{alignSelf: 'center',width:wp(60)}}>{supplierObj?.companyObj?.gstNumber ? supplierObj?.companyObj?.gstNumber : 'Not provided'} </Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Ionicons name="calendar" size={32} color="#000" />
                  </View>
                  <View style={{margin: wp(1), alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Year of Establishment</Text>
                    <Text style={{alignSelf: 'flex-start',width:wp(60)}}>{supplierObj?.companyObj?.yearOfEstablishment ? supplierObj?.companyObj?.yearOfEstablishment : 'Not provided'}</Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Ionicons name="call" size={32} color="#000" />
                  </View>
                  <View style={{margin: wp(1), alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Landline</Text>
                    <Text style={{alignSelf: 'flex-start',width:wp(60)}}>{currentUserHasActiveSubscription ? (supplierObj?.landline ? supplierObj?.landline : 'Not provided') : "You don't have subscription"}</Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <AntDesign name="contacts" size={32} color="#000" />
                  </View>
                  <View style={{margin: wp(1), alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Contact Person Name</Text>
                    <Text style={{alignSelf: 'flex-start',width:wp(60)}}>{supplierObj?.name ? supplierObj?.name : 'Not provided'} </Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <FontAwesome name="birthday-cake" size={30} color="#000" />
                  </View>
                  <View style={{margin: wp(1), alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>BirthDate</Text>
                    <Text style={{alignSelf: 'flex-start',width:wp(60)}}>{supplierObj?.aniversaryDate ? moment(supplierObj?.aniversaryDate).format('YYYY-MM-DD') : 'Not provided'}</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <View>
                    <Text style={[styles1.headertext, {right: wp(-12)}]}>Reviews</Text>
                  </View>
                  <View style={{alignSelf: 'flex-end', right: wp(-23)}}>
                    <CustomButtonNew text={'Add Reviews'} paddingHorizontal={wp(5)} textSize={wp(4)} buttonColor={'#573C26'} onPress={() => handleModelshow()} />
                  </View>
                </View>
                {productReviewArr && productReviewArr.length > 0 ? (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <FlatList data={productReviewArr.slice(0, 2)} renderItem={ReviewsItem1} style={{paddingVertical: 10}} keyExtractor={(item, index) => `${index}`} />
                    <View style={{alignSelf: 'center'}}>
                      <CustomButtonNew text={'Show more..'} paddingHorizontal={wp(5)} textSize={wp(4)} buttonColor={'#573C26'} onPress={() => navigate.navigate('ReviewsPage', {data: supplierObj._id})} />
                    </View>
                  </View>
                ) : (
                  <View style={{height: hp(20), backgroundColor: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: wp(4), color: '#000'}}>No Reviews Founds</Text>
                  </View>
                )}
              </View>

              <View>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <View>
                    <Text style={styles1.headertext}>Products You May Like</Text>
                  </View>
                </View>
                <View style={{marginVertical: wp(1)}}>
                  <FlatList data={productYouMayLikeArray.slice(0, 2)} renderItem={ProductsYouMayLike1} style={{paddingVertical: 10}} keyExtractor={(item, index) => `${index}`} />
                </View>
              </View>
            </>
          )}
          {checkActiveSection() == 'Our Products' && (
            <>
              <View style={styles1.flexbetwen}>
                {/* <Pressable onPress={() => navigate.navigate('AllProducts')}>
                  <Text style={styles1.viewall}>View All</Text>
                </Pressable> */}
              </View>
              {productsArr && productsArr?.length > 0 ? (
                <FlatList data={productsArr} renderItem={Products1} style={{paddingVertical: 10}} keyExtractor={(item, index) => `${index}`} />
              ) : (
                <View style={{height: hp(20), backgroundColor: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: wp(4), color: '#000'}}>No Products Founds</Text>
                </View>
              )}
              <View>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <View>
                    <Text style={[styles1.headertext, {right: wp(-12)}]}>Reviews</Text>
                  </View>
                  <View style={{alignSelf: 'flex-end', right: wp(-23)}}>
                    <CustomButtonNew text={'Add Reviews'} paddingHorizontal={wp(5)} textSize={wp(4)} buttonColor={'#573C26'} onPress={() => handleModelshow()} />
                  </View>
                </View>
                {productReviewArr && productReviewArr.length > 0 ? (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <FlatList data={productReviewArr.slice(0, 2)} renderItem={ReviewsItem1} style={{paddingVertical: 10}} keyExtractor={(item, index) => `${index}`} />
                    <View style={{alignSelf: 'center'}}>
                      <CustomButtonNew text={'Show more..'} paddingHorizontal={wp(5)} textSize={wp(4)} buttonColor={'#573C26'} onPress={()=>{navigate.navigate('ReviewsPage', {data: supplierObj._id})}} />
                    </View>
                  </View>
                ) : (
                  <View style={{height: hp(20), backgroundColor: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: wp(4), color: '#000'}}>No Reviews Founds</Text>
                  </View>
                )}
              </View>
              <View>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <View>
                    <Text style={styles1.headertext}>Top Profile</Text>
                  </View>
                </View>
                {dataArray && dataArray.length > 0 ? (
                  <View style={{marginVertical: wp(2)}}>
                    <FlatList data={topProfileArray.slice(-4)} renderItem={Topprofiles} style={{paddingVertical: 10}} keyExtractor={(item, index) => `${index}`} numColumns={2} />
                  </View>
                ) : (
                  <View style={{height: hp(20), backgroundColor: 'FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: wp(4), color: '#000'}}>No Profile Founds</Text>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    );
  };
  const ListFooter = () => {
    return (
      <View style={{backgroundColor: '#ffff'}}>
        {checkActiveSection() == 'Home' && (
          <View style={{paddingHorizontal: 10}}>
            <View style={styles1.padinghr}>
              <View style={styles1.flexbetwen}>
                <Text style={styles1.headingmain}>Our Videos</Text>
                {/* <Pressable onPress={() => navigate.navigate('AllProducts')}>
                  <Text style={styles1.viewall}>View All</Text>
                </Pressable> */}
              </View>

              {videoArr && videoArr?.length > 0 ? (
                <FlatList data={videoArr} scrollEnabled={false} renderItem={renderourproductvideo} keyExtractor={(item, index) => `${index}`} />
              ) : (
                <View style={{height: hp(20), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: wp(4), color: '#000'}}>No Videos Found </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles1.bgwhite, styles1.flex1, {flex: 1}]}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={{backgroundColor: '#fff'}}
        //Header to show above listview
        ListHeaderComponent={ListHeader}
        //Footer to show below listview
        ListFooterComponent={ListFooter}
        // renderItem={ItemView}
        // ListEmptyComponent={EmptyListMessage}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles1.centeredView}>
          <View style={styles1.modalView}>
            <View style={{padding: 20}}>
              <Text style={styles1.modalText}>Add Review</Text>
              <TextInput style={styles1.modalTextInput} onChangeText={e => setName(e)} value={name} placeholder="Please Enter name" placeholderTextColor={'#000'} />
              <TextInput multiline={true} style={styles1.modalTextInput} onChangeText={e => setMessage(e)} value={message} placeholder="Please Enter message" placeholderTextColor={'#000'} />
              <Rating imageSize={30} onFinishRating={e => setRating(e)} style={{paddingVertical: 6}} />
            </View>
            <TouchableOpacity style={styles1.yellowButton} onPress={() => handleSubmitReview()}>
              <Text style={{color: 'white', fontSize: wp(5), fontWeight: 'bold', alignSelf: 'center'}}>Submit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={{width: wp(8), height: wp(8), backgroundColor: '#fff', marginTop: 30, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/img/close.png')} style={{width: wp(3), height: hp(3)}} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles1 = StyleSheet.create({
  callbtn: {
    backgroundColor: '#b08218',
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    elevation: 10,

    alignItems: 'center',

    justifyContent: 'center',
    gap: 10,

    borderRadius: 30,
    marginBottom: 5,
    padding: wp(2.3),
    margin: wp(1),
    width: wp(13),
    height: wp(13),
  },
  BorderBottom: {
    flex: 1,
    width: wp(90),
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: 'yellow',

    // flexDirection: 'row',
  },

  modalText: {
    // fontWeight: "bold",
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 22,
    marginBottom: 25,
    alignSelf: 'center',
  },
  modalTextInput: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    width: '100%',
    borderRadius: 30,
    marginVertical: 15,
    padding: 16,
    color: 'black',
  },
  yellowButton: {
    backgroundColor: '#6C4F37',
    paddingVertical: 13,
    paddingHorizontal: 40,

    marginTop: 15,
    width: '100%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#F4EDDB',
    borderRadius: 30,
    // paddingHorizontal: 15,
    // paddingVertical: 30,
    width: wp(80),
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pgr: {
    color: '#666666',
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    marginBottom: 5,
  },

  boxproduct: {
    backgroundColor: '#F4EDDB',
    padding: 10,
    position: 'relative',
    borderRadius: 10,
    width: wp(45),
    marginRight: 20,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.41,
    elevation: 2,
  },
  imgphone: {
    width: wp(14),
    height: hp(7),
    position: 'absolute',
    top: -10,
    right: -10,
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 100,
    zIndex: 5,
  },
  headingproduct: {
    color: '#000',
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    paddingVertical: 4,
  },
  infoproduct: {
    marginVertical: 5,
  },
  producthead: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },
  abslut: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderTopLeftRadius: 10,
    backgroundColor: '#e7b84e',
  },
  imageheight: {
    height: hp(12),
    width: wp(43.6),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  imageheight1: {
    height: hp(20),
    width: wp(93.5),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  btnquote: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#B08218',
    right: 0,
    color: '#fff',
    padding: 5,
    borderTopLeftRadius: 10,
  },
  sofcontet: {
    position: 'absolute',
    top: 5,
    color: '#fff',
    textAlign: 'center',
    left: 0,
    right: 0,
  },
  category: {
    width: wp(33),
    height: hp(20),
    borderRadius: 10,
    marginRight: 10,
  },
  quoutbox: {
    position: 'relative',
    width: wp(55),
  },
  headingmain: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#000',
  },
  activtext: {
    color: '#000',
    fontWeight: 'bold',
  },
  activemain: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  flexfrow: {
    flex: 1,
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    marginRight: 15,
    marginVertical: 15,
    padding: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infotext: {
    color: '#444444',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    //  textAlign:"center",
  },
  infoadd: {
    // display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    // gap: 10,
    // marginTop: 5,
  },
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
    width: wp(100),
    height: hp(25),
    zIndex: 0,
  },
  logo: {
    width: wp(28),
    height: wp(28),
    position: 'absolute',
    // top : hp(20),
    borderRadius: 150,
    bottom: wp(-15),
    // left: 20,
    zIndex: 9999999,
    alignSelf: 'center',
    borderWidth: wp(1),
    borderColor: '#FFFFFF',
  },
  viewall: {
    color: '#B08218',
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
  },
  flexbetwen: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  abosoluicon: {
    position: 'absolute',
    top: 10,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    lineHeight: 25,
    zIndex: 999,
  },
  cardwrap: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
    elevation: 10,
    margin: wp(1),
    width: wp(90),
  },

  carddata: {
    height: wp(13),
    width: wp(13),
    padding: wp(1),
    backgroundColor: '#EBCCAC',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: wp(1),
    marginRight: wp(2.5),
  },
  container: {
    padding: wp(2),
    width: wp(100),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  contentContainer: {
    elevation: 5,
    borderRadius: wp(25),
    width: '90%',
    paddingStart: wp(14),
    paddingVertical: wp(1),
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingBottom: wp(8),
  },
  rowStyle: {
    flexDirection: 'row',
    marginBottom: wp(2),
    marginTop: wp(6),
    alignItems: 'center',
  },
  headingStyle: {
    color: '#000',
    fontSize: wp(5),
    fontWeight: 'bold',
    marginRight: wp(3),
  },
  imageContainer: {
    elevation: 5,
    marginStart: wp(2),
    borderRadius: wp(25),
    height: wp(22),
    width: wp(22),
    position: 'absolute',
    backgroundColor: 'blue',
    top: 0,
    left: 0,
  },
  image: {
    height: wp(22),
    width: wp(22),
    borderRadius: wp(25),
  },
  headertext: {
    marginVertical: wp(4),
    fontSize: wp(5),
    fontWeight: 'bold',
  },
});

const datadata = [
  {
    imagePath: require('../../assets/img/g1.png'),
    name: 'Sakshi Malik',
    rating: 4.5,
    message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.',
  },
  {
    imagePath: require('../../assets/img/india.png'),
    name: 'dsds Malik',
    rating: 4.5,
    message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.',
  },
  {
    imagePath: require('../../assets/img/india.png'),
    name: 'dsds Malik',
    rating: 4.5,
    message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.',
  },
  {
    imagePath: require('../../assets/img/india.png'),
    name: 'asdsa Malik',
    rating: 4.5,
    message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.',
  },
];

const dataArray = [
  {
    imagePath: require('../../assets/img/india.png'),
    name: 'Product 1',
    price: 100,
    location: 'New York',
    isVerified: true,
    onCallPressed: () => console.log('Call pressed for Product 1'),
    onGetQuotePressed: () => console.log('Get Quote pressed for Product 1'),
    onCardPressed: () => console.log('Card pressed for Product 1'),
  },
  {
    imagePath: require('../../assets/img/india.png'),
    name: 'Product 2',
    price: 150,
    location: 'Los Angeles',
    isVerified: false,
    onCallPressed: () => console.log('Call pressed for Product 2'),
    onGetQuotePressed: () => console.log('Get Quote pressed for Product 2'),
    onCardPressed: () => console.log('Card pressed for Product 2'),
  },
  {
    imagePath: require('../../assets/img/india.png'),
    name: 'Product 3',
    price: 200,
    location: 'Chicago',
    isVerified: true,
    onCallPressed: () => console.log('Call pressed for Product 3'),
    onGetQuotePressed: () => console.log('Get Quote pressed for Product 3'),
    onCardPressed: () => console.log('Card pressed for Product 3'),
  },
  // Add more objects as needed
];

const dataArray1 = [
  {
    imagePath: require('../../assets/img/india.png'),
    products: 4,
    rating: 4.5,
    address: '123 Main St, New York, NY',
    name: 'Ravi',
  },
  {
    imagePath: require('../../assets/img/india.png'),
    products: 10,
    rating: 4.0,
    address: '456 Oak St, Los Angeles, CA',
    name: 'Ravi',
  },
  {
    imagePath: require('../../assets/img/india.png'),
    products: 23,
    rating: 5.0,
    address: '789 Pine St, Chicago, IL',
    name: 'Ravi',
  },
  // Add more objects as needed
];


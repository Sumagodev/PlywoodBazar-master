import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Linking, Pressable, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, LinearGradient, Button } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Header from '../navigation/customheader/Header';
import { getAllProductsBySupplierId } from '../services/Product.service';
import { generateImageUrl } from '../services/url.service';
import { checkForValidSubscriptionAndReturnBoolean, getDecodedToken, getUserById, getUserUserById } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { addReview, getReviewForProduct } from '../services/ProductReview.service';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { createLead } from '../services/leads.service';
import ReviewsItem from '../ReusableComponents/ReviewsItem';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import ProductsYouMayLike from '../ReusableComponents/ProductsYouMayLike';
import NewArrivalProductCard from '../ReusableComponents/NewArrivalProductCard';
import TopProfilesVerticalCard from '../ReusableComponents/TopProfilesVerticalCard';

export default function Supplier(props) {
  const navigate = useNavigation();
  const focused = useIsFocused();
  const [productReviewArr, setProductReviewArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
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

  const handelwhatappclick = () => {
    if (!currentUserHasActiveSubscription) {
      errorToast('You do not have a valid subscription to perform this action');
      return 0;
    }
    Linking.openURL(`https://api.whatsapp.com/send/?phone=${supplierObj?.phone}`);
  };

  const handelcallbtn = () => {
    if (!currentUserHasActiveSubscription) {
      errorToast('You do not have a valid subscription to perform this action');
      return 0;
    }

    Linking.openURL(`tel:${supplierObj?.phone}`);
  };
  const handelclickcmail = () => {
    if (!currentUserHasActiveSubscription) {
      errorToast('You do not have a valid subscription to perform this action');
      return 0;
    }
    Linking.openURL(`mailto:${supplierObj?.email}`);
  };

  const handleGetProductReview = async id => {
    try {
      let { data: res } = await getReviewForProduct(`userId=${id}`);
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

        let { data: res } = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
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
      let { data: res } = await getAllProductsBySupplierId(id);
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
        return null

      }
      let { data: res } = await getUserUserById(id);
      console.log('=================', res, '==========================');

      if (res.data) {
        setSupplierObj(res.data);
        setVideoArr(res?.data?.videoArr?.map(el => ({ ...el, isPaused: false })));
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
      console.log(JSON.stringify(props.route.params.data, null, 2), "props.route.params.data")
      if (props?.route?.params?.data?._id) {
        HandleGetUserById(props?.route?.params?.data?._id);
        setsupplerid(props?.route?.params?.data?._id);
        HandleCheckValidSubscription();
        HandleGetProductBySupplierId(props?.route?.params?.data?._id);
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
  const renderinfolist = ({ item, index }) => {
    return (
      <View >
        {item.active == true ? (
          <Pressable style={[styles1.flexfrow, styles1.activemain,]}>
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

  const rendershopcategory = ({ item, index }) => {
    return <ImageBackground source={{ uri: generateImageUrl(item.image) }} imageStyle={{ borderRadius: 10 }} style={styles1.category} resizeMode="cover"></ImageBackground>;
  };

  const ReviewsItem1 = ({ item, index }) => {
    return <ReviewsItem reviewItem={item} />
  }
  const ProductsYouMayLike1 = ({ item, index }) => {
    return <NewArrivalProductCard onCardPressed={() => navigate.navigate('Productdetails', { data: item.productSlug })} imagePath={require("../../assets/img/g1.png")} isVerified={item.isVerified} name={item.name} location={'Nahsik'} price={item.price}></NewArrivalProductCard>;
  }
  const Products1 = ({ item, index }) => {
    return <NewArrivalProductCard onPress={() => navigate.navigate('Productdetails', { data: item.slug })} mainImage={item.mainImage} isVerified={item.isVerified} name={item.name} location={'Nahsik'} price={item.price} sellingprice={item.sellingprice}></NewArrivalProductCard>;
  }
  const Topprofiles = ({ item, index }) => {
    return <TopProfilesVerticalCard imagePath={item.imagePath} name={item.name} products={item.products} rating={item.rating} address={'Nashik'} />
  }
  const handlePauseAndUnpause = index => {
    let tempArr = videoArr;
    tempArr[index].isPaused = tempArr[index].isPaused;
    setVideoArr([...videoArr]);
  };

  const renderourproductvideo = ({ item, index }) => {
    return (
      <Pressable style={{ marginRight: 10, marginVertical: 15 }} onPress={() => handlePauseAndUnpause(index)}>
        {item.video ? (
          <Video
            onBuffer={onBuffer} // Callback when remote video is buffering
            onError={videoError}
            minLoadRetryCount={5}
            paused={item.isPaused}
            source={{ uri: generateImageUrl(item.video) }}
            style={{ borderWidth: 0.5, borderColor: '#D9D9D9', borderStyle: 'solid', padding: 2, borderRadius: 10, width: wp(95), height: 250, overflow: 'hidden' }}
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
      if (!(supplierObj && supplierObj._id)) {
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

      <View style={{ backgroundColor: '#FFF8EC', flex: 1 }}>

        <View style={[styles1.positionrelative, { position: 'relative', height: hp(21) }]}>
          {showEditIcon && userid == supplerid && (
            <Pressable onPress={() => navigate.navigate('Editprofile')} style={styles1.abosoluicon}>
              <AntDesign name="edit" size={17} color="#848993" />
            </Pressable>
          )}
          {supplierObj.bannerImage && supplierObj.bannerImage && supplierObj.bannerImage ? <Image source={{ uri: generateImageUrl(supplierObj.bannerImage) }} style={styles1.imgfluid} /> : <Image source={require('../../assets/img/cover.png')} style={[styles1.imgfluid]} />}
          {supplierObj?.profileImage && supplierObj.profileImage != '' ? <Image source={{ uri: generateImageUrl(supplierObj?.profileImage) }} style={styles1.logo} /> : <Image source={require('../../assets/img/profile1.png')} style={[styles1.logo]} />}
        </View>


        <View style={[styles1.padinghr, { marginTop: wp(17), paddingHorizontal: 10 }]}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ width: wp(75), alignItems: "center" }}>
              <View style={styles1.infoadd}>

                <Text style={[styles1.infotext, { fontFamily: 'Poppins-Bold', fontSize: wp(5.5) }]}>{supplierObj?.companyObj?.name}</Text>
              </View>

              {/* <TouchableOpacity style={styles1.infoadd} onPress={handelwhatappclick}>
              <FontAwesome name='whatsapp' size={20} color='green' />
              <Text style={{fontSize:wp(4), fontFamily:'Poppins-Medium'}}>  {supplierObj?.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles1.infoadd} onPress={handelclickcmail}>
              <FontAwesome name='envelope-o' size={16} color='#e34133' />
              <Text style={{fontSize:wp(4), fontFamily:'Poppins-Medium', fontSize:wp(3),  color:'#000'}}>  {supplierObj?.email}</Text>
              </TouchableOpacity> */}


              <Pressable onPress={() => Linking.openURL(`${supplierObj?.companyObj?.googleMapsLink}`)} style={[styles1.infoadd, { right: wp(-5) }]}>
                <Image source={require('../../assets/img/location.png')} style={[styles1.imgsmall]} resizeMode="center" />
                <Text style={[styles1.infotext, { width: wp(70), fontSize: 14 }]}>{supplierObj?.companyObj?.address}</Text>
              </Pressable>

              <View style={styles1.infoadd}>
                <Text style={[styles1.infotext, { fontWeight: "bold" }]}>
                  <AntDesign name="star" size={14} color="#6C4F37" /> {''}
                  <Text style={{ fontFamily: 'Poppins-Medium' }}>
                    {supplierObj?.rating}

                  </Text>
                  <Image source={require('../../assets/img/addcheck.png')} style={styles1.imgsmall} resizeMode="center" />
                  <Text style={[styles1.infotext]}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: "bold" }}>{supplierObj?.companyObj?.gstNumber}54544475645244657</Text>
                  </Text>
                </Text>

              </View>
            </View>
            <View style={{ alignItems: 'center', flexDirection: "row" }}>
              <TouchableOpacity style={[styles1.callbtn, { backgroundColor: "#39AB68" }]} onPress={handelcallbtn}>
                <Ionicons name="call" size={25} color="#fff" />

              </TouchableOpacity>

              <TouchableOpacity style={[styles1.callbtn, { backgroundColor: "#FFF3E9" }]} onPress={handelclickcmail}>
                <FontAwesome name="envelope-o" size={25} color="#624832" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles1.callbtn, { backgroundColor: "#39AB68" }]} onPress={handelwhatappclick}>
                <FontAwesome name="whatsapp" size={25} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles1.callbtn, { backgroundColor: "#FFF3E9" }]} onPress={handelclickcmail}>
                <FontAwesome name="share" size={23} color="#624832" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <FlatList data={infolist} renderItem={renderinfolist} keyExtractor={(item, index) => `${index}`} horizontal />

          </View>



          {checkActiveSection() == 'Profile' && (
            <>
              <View style={[styles1.flexbetwen, { flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: wp(1) }]}>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Image source={require('../../assets/img/g5.png')} style={{ height: wp(5), width: wp(5) }} />
                  </View>
                  <View style={{ margin: wp(1), alignItems: 'center', width: wp(25) }}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Nature of Business</Text>
                    <Text style={{ alignSelf: 'center' }}>{supplierObj?.companyObj?.natureOfBusiness ? supplierObj?.companyObj?.natureOfBusiness : 'Not provided'} </Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Image source={require('../../assets/img/g6.png')} style={{ height: wp(7), width: wp(6) }} />
                  </View>
                  <View style={{ margin: wp(1), alignItems: 'center', width: wp(25) }}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>GST No.</Text>
                    <Text style={{ alignSelf: 'center' }}>{supplierObj?.companyObj?.gstNumber ? supplierObj?.companyObj?.gstNumber : 'Not provided'} </Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Image source={require('../../assets/img/g4.png')} style={{ height: wp(5), width: wp(5) }} />
                  </View>
                  <View style={{ margin: wp(1), alignItems: 'center', width: wp(25) }}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Year of Establishment</Text>
                    <Text style={{ alignSelf: 'center' }}>{supplierObj?.companyObj?.yearOfEstablishment ? supplierObj?.companyObj?.yearOfEstablishment : 'Not provided'}</Text>

                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Image source={require('../../assets/img/g2.png')} style={{ height: wp(5), width: wp(5) }} />
                  </View>
                  <View style={{ margin: wp(1), alignItems: 'center', width: wp(25) }}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Landline</Text>
                    <Text style={{ alignSelf: 'center' }}>{currentUserHasActiveSubscription ? (supplierObj?.landline ? supplierObj?.landline : 'Not provided') : "You don't have subscription"}</Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Image source={require('../../assets/img/g3.png')} style={{ height: wp(5), width: wp(5) }} />
                  </View>
                  <View style={{ margin: wp(1), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Contact Person Name</Text>
                    <Text style={{ alignSelf: 'center' }}>{supplierObj?.name ? supplierObj?.name : "Not provided"} </Text>
                  </View>
                </View>

                <View style={styles1.cardwrap}>
                  <View style={styles1.carddata}>
                    <Image source={require('../../assets/img/g1.png')} style={{ height: wp(5), width: wp(5) }} />
                  </View>
                  <View style={{ margin: wp(1), alignItems: 'center', width: wp(25) }}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>BirthDate</Text>
                    <Text style={{ alignSelf: 'center' }}>{supplierObj?.aniversaryDate ? moment(supplierObj?.aniversaryDate).format('YYYY-MM-DD') : 'Not provided'}</Text>
                  </View>
                </View>
              </View>
              <View >
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                  <View>
                    <Text style={[styles1.headertext, { right: wp(-12) }]}>Reviews</Text>
                  </View>
                  <View style={{ alignSelf: "flex-end", right: wp(-23) }}><CustomRoundedTextButton buttonText={'Add Reviews'} buttonColor={'#573C26'} onPress={() => handleModelshow()} /></View>
                </View>
                {productReviewArr && productReviewArr.length > 0 ? (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList data={productReviewArr.slice(0, 2)} renderItem={ReviewsItem1} style={{ paddingVertical: 10 }} keyExtractor={(item, index) => `${index}`} />
                    <View style={{ alignSelf: "center" }}><CustomRoundedTextButton buttonText={'Show More'} buttonColor={'#573C26'} onPress={() => handleModelshow()} /></View>
                  </View>
                ) : (
                  <View style={{ height: hp(20),backgroundColor: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp(4), color: '#000' }}>No Reviews Founds</Text>
                  </View>
                )}
              </View>

              <View >
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                  <View>
                    <Text style={styles1.headertext}>Products may you like</Text>
                  </View>
                </View>
                <View style={{ marginVertical: wp(2) }}>
                  <FlatList data={dataArray.slice(0, 2)} renderItem={ProductsYouMayLike1} style={{ paddingVertical: 10 }} keyExtractor={(item, index) => `${index}`} />
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
                <FlatList data={productsArr} renderItem={Products1} style={{ paddingVertical: 10 }} keyExtractor={(item, index) => `${index}`} />
              ) : (
                <View style={{ height: hp(20),backgroundColor: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: wp(4), color: '#000' }}>No Products Founds</Text>
                </View>
              )}
              <View >
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                  <View>
                    <Text style={[styles1.headertext, { right: wp(-12) }]}>Reviews</Text>
                  </View>
                  <View style={{ alignSelf: "flex-end", right: wp(-23) }}><CustomRoundedTextButton buttonText={'Add Reviews'} buttonColor={'#573C26'} onPress={() => handleModelshow()} /></View>
                </View>
                {productReviewArr && productReviewArr.length > 0 ? (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList data={productReviewArr.slice(0, 2)} renderItem={ReviewsItem1} style={{ paddingVertical: 10 }} keyExtractor={(item, index) => `${index}`} />
                    <View style={{ alignSelf: "center" }}><CustomRoundedTextButton buttonText={'Show More'} buttonColor={'#573C26'} onPress={() => handleModelshow()} /></View>
                  </View>
                ) : (
                  <View style={{ height: hp(20),backgroundColor: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp(4), color: '#000' }}>No Reviews Founds</Text>
                  </View>
                )}
              </View>
              <View >
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                  <View>
                    <Text style={styles1.headertext}>Top Profile</Text>
                  </View>
                </View>
                {dataArray && dataArray.length > 0 ? (
                <View style={{ marginVertical: wp(2) }}>
                  <FlatList data={dataArray1} renderItem={Topprofiles} style={{ paddingVertical: 10 }} keyExtractor={(item, index) => `${index}`} numColumns={2} />
                </View>
    ): (
                  <View style={{ height: hp(20), backgroundColor: 'FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp(4), color: '#000' }}>No Profile Founds</Text>
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
      <View style={{ backgroundColor: '#ffff' }}>
        {checkActiveSection() == 'Home' && (
          <View style={{ paddingHorizontal: 10 }}>
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
                <View style={{ height: hp(20), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: wp(4), color: '#000' }}>No Videos Found </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles1.bgwhite, styles1.flex1, { flex: 1 }]}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={{ backgroundColor: '#fff' }}
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
          <View style={{padding:20}}>
            <Text style={styles1.modalText}>Add Review</Text>
            <TextInput style={styles1.modalTextInput} onChangeText={e => setName(e)} value={name} placeholder="Please Enter name" placeholderTextColor={'#000'} />
            <TextInput multiline={true} style={styles1.modalTextInput} onChangeText={e => setMessage(e)} value={message} placeholder="Please Enter message" placeholderTextColor={'#000'} />
            <Rating imageSize={30} onFinishRating={e => setRating(e)} style={{ paddingVertical: 6}} />
           </View>
            <TouchableOpacity style={styles1.yellowButton} onPress={() => handleSubmitReview()}>
              <Text style={{ color: 'white',fontSize:wp(5),fontWeight:"bold" ,alignSelf:"center"}}>Submit</Text>
            </TouchableOpacity>
            </View>
          

          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: wp(8), height: wp(8), backgroundColor: '#fff', marginTop: 30, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../assets/img/close.png')} style={{ width: wp(3), height: hp(3) }} resizeMode="contain" />
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
    width: wp(9)

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
    alignSelf:'center'
  },
  modalTextInput: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    width: '100%',
    borderRadius: 30,
    marginVertical: 15,
    padding: 16,
    color:"black"
  },
  yellowButton: {
  
    backgroundColor: '#6C4F37',
    paddingVertical: 13,
    paddingHorizontal: 40,
    
    marginTop: 15,
    width:"100%",
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
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
    fontWeight: "bold",
   
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
    justifyContent: "center",
    alignSelf: "center"
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
    height: hp(18),
    position: 'absolute',
    // top : hp(20),
    borderRadius: 150,
    bottom: wp(-15),
    // left: 20,
    zIndex: 9999999,
    alignSelf: "center",
    borderWidth: wp(1),
    borderColor: "#FFFFFF"
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
    width: wp(45),
  },


  carddata:
  {
    height: wp(9),
    width: wp(9),
    padding: wp(0.8),
    backgroundColor: '#EBCCAC',
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'space-evenly',
    marginVertical: wp(1)
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
    paddingBottom: wp(8)
  },
  rowStyle: {
    flexDirection: 'row',
    marginBottom: wp(2),
    marginTop: wp(6),
    alignItems: 'center'
  },
  headingStyle: {
    color: '#000',
    fontSize: wp(5),
    fontWeight: 'bold',
    marginRight: wp(3)
  },
  imageContainer: {
    elevation: 5,
    marginStart: wp(2),
    borderRadius: wp(25),
    height: wp(22),
    width: wp(22),
    position: 'absolute',
    backgroundColor: 'blue',
    top: 0, left: 0,
  },
  image: {
    height: wp(22),
    width: wp(22),
    borderRadius: wp(25),
  },
  headertext: {
    fontSize: wp(5),
    fontWeight: "bold"
  }
});


  const datadata = [
    {
      imagePath: require("../../assets/img/g1.png"),
      name: 'Sakshi Malik',
      rating: 4.5,
      message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.'
    },
    {
      imagePath: require("../../assets/img/g1.png"),
      name: 'dsds Malik',
      rating: 4.5,
      message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.'
    },
    {
      imagePath: require("../../assets/img/g1.png"),
      name: 'dsds Malik',
      rating: 4.5,
      message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.'
    },
    {
      imagePath: require("../../assets/img/g1.png"),
      name: 'asdsa Malik',
      rating: 4.5,
      message: 'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.'
    },
  ]

  const dataArray = [
    {
      imagePath: require("../../assets/img/g1.png"),
      name: 'Product 1',
      price: 100,
      location: 'New York',
      isVerified: true,
      onCallPressed: () => console.log('Call pressed for Product 1'),
      onGetQuotePressed: () => console.log('Get Quote pressed for Product 1'),
      onCardPressed: () => console.log('Card pressed for Product 1'),
    },
    {
      imagePath: require("../../assets/img/g1.png"),
      name: 'Product 2',
      price: 150,
      location: 'Los Angeles',
      isVerified: false,
      onCallPressed: () => console.log('Call pressed for Product 2'),
      onGetQuotePressed: () => console.log('Get Quote pressed for Product 2'),
      onCardPressed: () => console.log('Card pressed for Product 2'),
    },
    {
      imagePath: require("../../assets/img/g1.png"),
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
    imagePath: require("../../assets/img/g1.png"),
    products: 4,
    rating: 4.5,
    address: '123 Main St, New York, NY',
    name:"Ravi"

  },
  {
    imagePath: require("../../assets/img/g1.png"),
    products: 10,
    rating: 4.0,
    address: '456 Oak St, Los Angeles, CA',
    name:"Ravi"
  },
  {
    imagePath: require("../../assets/img/g1.png"),
    products: 23,
    rating: 5.0,
    address: '789 Pine St, Chicago, IL',
    name:"Ravi"
  },
  // Add more objects as needed
];


// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import React, {useEffect, useState} from 'react';
// import {FlatList, Image, ImageBackground, Linking, Pressable, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity} from 'react-native';
// import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import Video from 'react-native-video';
// import Header from '../navigation/customheader/Header';
// import {getAllProductsBySupplierId} from '../services/Product.service';
// import {generateImageUrl} from '../services/url.service';
// import {checkForValidSubscriptionAndReturnBoolean, getDecodedToken, getUserById, getUserUserById} from '../services/User.service';
// import {errorToast, toastSuccess} from '../utils/toastutill';
// import moment from 'moment';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import {addReview, getReviewForProduct} from '../services/ProductReview.service';
// import {Rating, AirbnbRating} from 'react-native-ratings';
// import {createLead} from '../services/leads.service';
// export default function Supplier(props) {
//   const navigate = useNavigation();
//   const focused = useIsFocused();
//   const [productReviewArr, setProductReviewArr] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showEditIcon, setShowEditIcon] = useState(false);
//   const [infolist, setInfolist] = useState([
//     {
//       activeimgimg: require('../../assets/img/material-samble.png'),
//       noactiveimg: require('../../assets/img/nonmaterial-samble.png'),
//       textinfo: 'Home',
//       active: true,
//     },
//     {
//       activeimgimg: require('../../assets/img/activeprofile.png'),
//       noactiveimg: require('../../assets/img/profile.png'),
//       textinfo: 'Profile',
//       active: false,
//     },
//     {
//       activeimgimg: require('../../assets/img/activeproductt1.png'),
//       noactiveimg: require('../../assets/img/productt1.png'),
//       textinfo: 'Our Products',
//       active: false,
//     },
//     {
//       activeimgimg: require('../../assets/img/activeproductt1.png'),
//       noactiveimg: require('../../assets/img/productt1.png'),
//       textinfo: 'Reviews',
//       active: false,
//     },
//   ]);

//   const [videoArr, setVideoArr] = useState([]);

//   const [supplierObj, setSupplierObj] = useState({});
//   const [productsArr, setProductsArr] = useState([]);

//   const [name, setName] = useState('');
//   const [rating, setRating] = useState(0);
//   const [message, setMessage] = useState('');
//   const [userid, setuserid] = useState('');
//   const [supplerid, setsupplerid] = useState('');
//   const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
//   const [whatappnumber, setWhatappnumber] = useState();
//   const roletype = ['DISTRIBUTOR', 'MANUFACTURER/IMPORTER', 'DEALER'];

//   const activetab = index => {
//     let temp = [...infolist];
//     temp = temp.map((el, ind) => {
//       if (ind == index) {
//         el.active = true;
//       } else {
//         el.active = false;
//       }
//       return el;
//     });
//     setInfolist([...temp]);
//   };

//   // const handleCreateLead = async ()=> {
//   //   try {
//   //     let obj = {

//   //       phone: supplierObj?.phone,
//   //       email: supplierObj?.email,
//   //       createdById: userObj?._id,
//   //     };
//   //     let { data: res } = await createLead(obj);
//   //     if (res.message) {
//   //       successToast(res.message);

//   //     }
//   //   } catch (err) {
//   //     errorToast(err);
//   //   }
//   // };

//   const handelwhatappclick = () => {
//     if (!currentUserHasActiveSubscription) {
//       errorToast('You do not have a valid subscription to perform this action');
//       return 0;
//     }
//     Linking.openURL(`https://api.whatsapp.com/send/?phone=${supplierObj?.phone}`);
//   };

//   const handelcallbtn = () => {
//     if (!currentUserHasActiveSubscription) {
//       errorToast('You do not have a valid subscription to perform this action');
//       return 0;
//     }

//     Linking.openURL(`tel:${supplierObj?.phone}`);
//   };
//   const handelclickcmail = () => {
//     if (!currentUserHasActiveSubscription) {
//       errorToast('You do not have a valid subscription to perform this action');
//       return 0;
//     }
//     Linking.openURL(`mailto:${supplierObj?.email}`);
//   };

//   const handleGetProductReview = async id => {
//     try {
//       let {data: res} = await getReviewForProduct(`userId=${id}`);
//       if (res.message) {
//         setProductReviewArr(res.data);
//       }
//     } catch (err) {
//       toastError(err);
//     }
//   };

//   const HandleCheckValidSubscription = async () => {
//     try {
//       let decoded = await getDecodedToken();
//       if (decoded) {
//         if (decoded?.user?.name) {
//           setName(decoded?.user?.name);
//         }

//         let {data: res} = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
//         if (res.data) {
//           console.log(
//             'setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
//             res.data,
//             'setCurrentUserHasActiveSubscription,setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
//           );
//           setCurrentUserHasActiveSubscription(res.data);
//         }
//       }
//     } catch (err) {
//       errorToast(err);
//     }
//   };

//   const HandleGetProductBySupplierId = async id => {
//     try {
//       let {data: res} = await getAllProductsBySupplierId(id);
//       if (res.data) {
//         // console.log(JSON.stringify(res.data, null, 2), "products")
//         setProductsArr(res.data);
//       }
//     } catch (err) {
//       errorToast(err);
//     }
//   };
//   const HandleGetUserById = async id => {
//     console.log('=================', id , '==========================');

//     try {
//       if(!id){
//         return null

//       }
//       let {data: res} = await getUserUserById(id);
//     console.log('=================', res , '==========================');

//       if (res.data) {
//         setSupplierObj(res.data);
//         setVideoArr(res?.data?.videoArr?.map(el => ({...el, isPaused: false})));
//       }
//     } catch (err) {
//       errorToast(err);
//     }
//   };

//   const onBuffer = val => console.log(val);
//   const videoError = val => console.error(val);
//   const getauthuser = async () => {
//     let decoded = await getDecodedToken();
//     if (decoded && decoded?._id) {
//       setuserid(decoded?._id);
//       getUserById(decoded?._id);

//     }
//   };

//   useEffect(() => {
//     if (focused) {
//       console.log(JSON.stringify(props.route.params.data, null, 2), "props.route.params.data")
//       if(props?.route?.params?.data?._id){
//       HandleGetUserById(props?.route?.params?.data?._id);
//       setsupplerid(props?.route?.params?.data?._id);
//       HandleCheckValidSubscription();
//       HandleGetProductBySupplierId(props?.route?.params?.data?._id);
//       }
//     }
//   }, [props.route.params.data, focused]);

//   useEffect(() => {
//     if (supplierObj && supplierObj._id) {
//       if (supplierObj._id == props.route.params.data._id) {
//         setShowEditIcon(true);
//       } else {
//         setShowEditIcon(false);
//       }

//       handleGetProductReview(supplierObj._id);
//     }
//   }, [supplierObj]);
//   const renderinfolist = ({item, index}) => {
//     return (
//       <>
//         {item.active == true ? (
//           <Pressable style={[styles1.flexfrow, styles1.activemain]}>
//             <Image source={item.activeimgimg} style={styles1.imgsmall} resizeMode="contain" />
//             <Text style={styles1.activtext}>{item.textinfo}</Text>
//           </Pressable>
//         ) : (
//           <Pressable onPress={() => activetab(index)} style={[styles1.flexfrow]}>
//             <Image source={item.noactiveimg} style={styles1.imgsmall} resizeMode="contain" />
//             <Text>{item.textinfo}</Text>
//           </Pressable>
//         )}
//       </>
//     );
//   };

//   const rendershopcategory = ({item, index}) => {
//     return <ImageBackground source={{uri: generateImageUrl(item.image)}} imageStyle={{borderRadius: 10}} style={styles1.category} resizeMode="cover"></ImageBackground>;
//   };

//   const renderourproduct = ({item, index}) => {

//     return (
//       <>
//         <Pressable onPress={() => navigate.navigate('Productdetails', {data: item.slug})} style={styles1.boxproduct}>
//           {item?.mainImage ? (
//             <>
//               <Image source={require('../../assets/img/call.png')} style={styles1.imgphone} />
//               <Image source={{uri: generateImageUrl(item.mainImage)}} style={[styles1.imgfluid, {width: '100%'}]} />
//               <View style={styles1.infoproduct}>
//                 <Text style={styles1.producthead}>{item.name}</Text>
//                 <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
//                   {item?.price && <Text style={[styles1.producthead, {textDecorationLine: 'line-through'}]}>₹{item?.price}</Text>}
//                   <Text style={[styles1.producthead, {color: '#B08218', paddingLeft: 5}]}>₹{item?.sellingprice}</Text>
//                 </View>
//               </View>
//             </>
//           ) : (
//             <Text style={{color: '#000'}}>No Images</Text>
//           )}
//         </Pressable>
//       </>
//     );
//   };

//   const renderReviews = ({item, index}) => {
//     return (
//       <>
//         {/* <Pressable onPress={() => navigate.navigate('Productdetails', { data: item.slug })} style={[styles1.boxproduct, { width: wp(95), marginBottom: 20, justifyContent: "flex-start" }]}> */}
//         <Pressable style={[styles1.boxproduct, {width: wp(95), marginBottom: 20, justifyContent: 'flex-start'}]}>
//           <View>
//             <Text style={[styles1.producthead, {textAlign: 'left', marginBottom: 10, fontSize: 16, fontWeight: 'bold'}]}>{item.name}</Text>
//             <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
//               <Text style={[styles1.producthead, {textAlign: 'left'}]}>{item?.message}</Text>
//               <Text style={[styles1.producthead, {color: '#B08218', textAlign: 'left', paddingLeft: 5}]}>
//                 ({item?.rating} <AntDesign name="star" size={9} color="#b08218" />){' '}
//               </Text>
//             </View>
//           </View>
//         </Pressable>
//       </>
//     );
//   };

//   const handlePauseAndUnpause = index => {
//     let tempArr = videoArr;
//     tempArr[index].isPaused = tempArr[index].isPaused;
//     setVideoArr([...videoArr]);
//   };

//   const renderourproductvideo = ({item, index}) => {
//     return (
//       <Pressable style={{marginRight: 10, marginVertical: 15}} onPress={() => handlePauseAndUnpause(index)}>
//         {item.video ? (
//           <Video
//             onBuffer={onBuffer} // Callback when remote video is buffering
//             onError={videoError}
//             minLoadRetryCount={5}
//             paused={item.isPaused}
//             source={{uri: generateImageUrl(item.video)}}
//             style={{borderWidth: 0.5, borderColor: '#D9D9D9', borderStyle: 'solid', padding: 2, borderRadius: 10, width: wp(95), height: 250, overflow: 'hidden'}}
//             resizeMode="cover"
//           />
//         ) : (
//           <Text>No Video</Text>
//         )}
//       </Pressable>
//     );
//   };

//   const checkActiveSection = () => {
//     let tempObj = infolist.find(el => el.active);
//     return tempObj?.textinfo;
//   };

//   const handleModelshow = () => {
//     if (!currentUserHasActiveSubscription) {
//       errorToast('You do not have a valid subscription to perform this action');
//       return 0;
//     }
//     setModalVisible(true);
//   };
//   const handleSubmitReview = async e => {
//     try {
//       if (!currentUserHasActiveSubscription) {
//         errorToast('You do not have a valid subscription to perform this action');
//         return 0;
//       }
//       if (name == '') {
//         errorToast('Please enter a name');
//         return;
//       }
//       if (!(supplierObj && supplierObj._id)) {
//         errorToast('Something went wrong please close the app and open again ');
//         return;
//       }
//       let obj = {
//         rating,
//         message,
//         name,
//         userId: supplierObj._id,
//       };
//       let {data: res} = await addReview(obj);
//       if (res.message) {
//         toastSuccess(res.message);
//         setModalVisible(false);
//         handleGetProductReview(supplierObj?._id);
//       }
//     } catch (err) {
//       errorToast(err);
//     }
//   };

//   const ListHeader = () => {
//     return (
//       <View style={{backgroundColor: '#fff', flex: 1}}>
//         <View style={styles1.padinghr}>
//           <Header stackHeader={true} screenName={roletype.includes(supplierObj?.role) ? supplierObj?.role : 'SUPPLIER'} rootProps={props} />
//         </View>
//         <View style={[styles1.positionrelative, {position: 'relative', height: hp(21)}]}>
//           {showEditIcon && userid == supplerid && (
//             <Pressable onPress={() => navigate.navigate('Editprofile')} style={styles1.abosoluicon}>
//               <AntDesign name="edit" size={17} color="#848993" />
//             </Pressable>
//           )}
//           {supplierObj.bannerImage && supplierObj.bannerImage && supplierObj.bannerImage ? <Image source={{uri: generateImageUrl(supplierObj.bannerImage)}} style={styles1.imgfluid} /> : <Image source={require('../../assets/img/cover.png')} style={[styles1.imgfluid]} />}
//           {supplierObj?.profileImage && supplierObj.profileImage != '' ? <Image source={{uri: generateImageUrl(supplierObj?.profileImage)}} style={styles1.logo} /> : <Image source={require('../../assets/img/profile1.png')} style={[styles1.logo]} />}
//         </View>
//         {supplierObj?.isVerified && <Image source={require('../../assets/img/verified.png')} resizeMode="contain" style={{width: 70, height: 70, top: hp(27), right: 10, position: 'absolute'}} />}

//         <View style={[styles1.padinghr, {marginTop: 60, paddingHorizontal: 10}]}>
//           <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
//             <View style={{width: wp(65)}}>
//               <View style={styles1.infoadd}>
//                 <Image source={require('../../assets/img/ghar.png')} style={styles1.imgsmall} resizeMode="contain" />
//                 <Text style={[styles1.infotext, {fontFamily: 'Poppins-Bold', width: wp(60)}]}>{supplierObj?.companyObj?.name}</Text>
//               </View>

//               {/* <TouchableOpacity style={styles1.infoadd} onPress={handelwhatappclick}>
//               <FontAwesome name='whatsapp' size={20} color='green' />
//               <Text style={{fontSize:wp(4), fontFamily:'Poppins-Medium'}}>  {supplierObj?.phone}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles1.infoadd} onPress={handelclickcmail}>
//               <FontAwesome name='envelope-o' size={16} color='#e34133' />
//               <Text style={{fontSize:wp(4), fontFamily:'Poppins-Medium', fontSize:wp(3),  color:'#000'}}>  {supplierObj?.email}</Text>
//               </TouchableOpacity> */}

//               <View style={styles1.infoadd}>
//                 <Image source={require('../../assets/img/addcheck.png')} style={styles1.imgsmall} resizeMode="contain" />
//                 <Text style={styles1.infotext}>
//                   GST No. <Text style={{fontFamily: 'Poppins-Medium'}}>{supplierObj?.companyObj?.gstNumber}</Text>
//                 </Text>
//               </View>
//               <Pressable onPress={() => Linking.openURL(`${supplierObj?.companyObj?.googleMapsLink}`)} style={styles1.infoadd}>
//                 <Image source={require('../../assets/img/location.png')} style={styles1.imgsmall} resizeMode="contain" />
//                 <Text style={[styles1.infotext, {width: wp(50)}]}>{supplierObj?.companyObj?.address}</Text>
//               </Pressable>

//               <View style={styles1.infoadd}>
//                 <Image source={require('../../assets/img/rating.png')} style={styles1.imgsmall} resizeMode="contain" />
//                 <Text style={styles1.infotext}>
//                   Rating .{' '}
//                   <Text style={{fontFamily: 'Poppins-Medium'}}>
//                     {supplierObj?.rating}
//                     <AntDesign name="star" size={10} color="#b08218" />
//                   </Text>
//                 </Text>
//               </View>
//             </View>
//             <View style={{width: wp(28), display: 'flex', alignItems: 'flex-end'}}>
//               <TouchableOpacity style={styles1.callbtn} onPress={handelcallbtn}>
//                 <Ionicons name="call" size={12} color="#fff" />
//                 <Text style={{fontSize: wp(3), fontFamily: 'Poppins-Medium', color: '#fff'}}>Call</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles1.callbtn} onPress={handelwhatappclick}>
//                 <FontAwesome name="whatsapp" size={12} color="#fff" />
//                 <Text style={{fontSize: wp(3), fontFamily: 'Poppins-Medium', color: '#fff'}}>Whatsapp</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles1.callbtn} onPress={handelclickcmail}>
//                 <FontAwesome name="envelope-o" size={12} color="#fff" />
//                 <Text style={{fontSize: wp(3), fontFamily: 'Poppins-Medium', color: '#fff'}}>Send EMail</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <FlatList data={infolist} renderItem={renderinfolist} keyExtractor={(item, index) => `${index}`} horizontal />

//           {checkActiveSection() == 'Home' && (
//             <>
//               <View style={styles1.flexbetwen}>
//                 <Text style={styles1.headingmain}>Our Images </Text>
//               </View>

//               {supplierObj?.imagesArr && supplierObj?.imagesArr?.length > 0 ? (
//                 <FlatList data={supplierObj?.imagesArr} renderItem={rendershopcategory} keyExtractor={(item, index) => `${index}`} horizontal />
//               ) : (
//                 <View style={{height: hp(20), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//                   <Text style={{fontSize: wp(4), color: '#000'}}>No images Found </Text>
//                 </View>
//               )}
//             </>
//           )}

//           {checkActiveSection() == 'Profile' && (
//             <>
//               <View style={[styles1.flexbetwen, {display: 'flex', flexDirection: 'column'}]}>

//               <View style={styles1.BorderBottom}>
//                   <Text>Contact Person Name</Text>
//                   <Text>{supplierObj?.name ? supplierObj?.name : "Not provided"} </Text>
//                 </View>

//                 <View style={styles1.BorderBottom}>
//                   <Text>Nature of Business</Text>
//                   <Text>{supplierObj?.companyObj?.natureOfBusiness ? supplierObj?.companyObj?.natureOfBusiness : 'Not provided'} </Text>
//                 </View>

//                 <View style={styles1.BorderBottom}>
//                   <Text>Year of Establishment</Text>
//                   <Text>{supplierObj?.companyObj?.yearOfEstablishment ? supplierObj?.companyObj?.yearOfEstablishment : 'Not provided'}</Text>
//                 </View>

//                 <View style={styles1.BorderBottom}>
//                   <Text>GST No.</Text>
//                   <Text>{supplierObj?.companyObj?.gstNumber ? supplierObj?.companyObj?.gstNumber : 'Not provided'} </Text>
//                 </View>

//                 <View style={styles1.BorderBottom}>
//                   <Text>BirthDate</Text>
//                   <Text>{supplierObj?.aniversaryDate ? moment(supplierObj?.aniversaryDate).format('YYYY-MM-DD') : 'Not provided'}</Text>
//                 </View>
//                 <View style={styles1.BorderBottom}>
//                   <Text>Landline</Text>
//                   <Text>{currentUserHasActiveSubscription ? (supplierObj?.landline ? supplierObj?.landline : 'Not provided') : "You don't have subscription"}</Text>
//                 </View>

//               </View>
//             </>
//           )}
//           {checkActiveSection() == 'Our Products' && (
//             <>
//               <View style={styles1.flexbetwen}>
//                 <Text style={styles1.headingmain}>Our Products </Text>
//                 {/* <Pressable onPress={() => navigate.navigate('AllProducts')}>
//                   <Text style={styles1.viewall}>View All</Text>
//                 </Pressable> */}
//               </View>
//               {productsArr && productsArr?.length > 0 ? (
//                 <FlatList data={productsArr} renderItem={renderourproduct} style={{paddingVertical: 10}} keyExtractor={(item, index) => `${index}`} numColumns={2} />
//               ) : (
//                 <View style={{height: hp(20), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//                   <Text style={{fontSize: wp(4), color: '#000'}}>No Products Founds</Text>
//                 </View>
//               )}
//             </>
//           )}

//           {checkActiveSection() == 'Reviews' && (
//             <>
//               <View style={styles1.flexbetwen}>
//                 <Text style={styles1.headingmain}>Reviews</Text>
//                 <Pressable style={styles1.yellowButton} onPress={() => handleModelshow()}>
//                   <Text style={{color: 'white'}}>Add Review</Text>
//                 </Pressable>
//               </View>
//               {productReviewArr && productReviewArr.length > 0 ? (
//                 <FlatList data={productReviewArr} renderItem={renderReviews} style={{paddingVertical: 10}} keyExtractor={(item, index) => `${index}`} />
//               ) : (
//                 <View style={{height: hp(20), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//                   <Text style={{fontSize: wp(4), color: '#000'}}>No Reviews Founds</Text>
//                 </View>
//               )}
//             </>
//           )}
//         </View>
//       </View>
//     );
//   };
//   const ListFooter = () => {
//     return (
//       <View style={{backgroundColor: '#ffff'}}>
//         {checkActiveSection() == 'Home' && (
//           <View style={{paddingHorizontal: 10}}>
//             <View style={styles1.padinghr}>
//               <View style={styles1.flexbetwen}>
//                 <Text style={styles1.headingmain}>Our Videos</Text>
//                 {/* <Pressable onPress={() => navigate.navigate('AllProducts')}>
//                   <Text style={styles1.viewall}>View All</Text>
//                 </Pressable> */}
//               </View>

//               {videoArr && videoArr?.length > 0 ? (
//                 <FlatList data={videoArr} scrollEnabled={false} renderItem={renderourproductvideo} keyExtractor={(item, index) => `${index}`} />
//               ) : (
//                 <View style={{height: hp(20), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//                   <Text style={{fontSize: wp(4), color: '#000'}}>No Videos Found </Text>
//                 </View>
//               )}
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View style={[styles1.bgwhite, styles1.flex1, {flex: 1}]}>
//       <FlatList
//         keyExtractor={(item, index) => index.toString()}
//         style={{backgroundColor: '#fff'}}
//         //Header to show above listview
//         ListHeaderComponent={ListHeader}
//         //Footer to show below listview
//         ListFooterComponent={ListFooter}
//         // renderItem={ItemView}
//         // ListEmptyComponent={EmptyListMessage}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles1.centeredView}>
//           <View style={styles1.modalView}>
//             <Text style={styles1.modalText}>Add a review here</Text>
//             <TextInput style={styles1.modalTextInput} onChangeText={e => setName(e)} value={name} placeholder="Please Enter name" placeholderTextColor={'#000'} />
//             <TextInput multiline={true} style={styles1.modalTextInput} onChangeText={e => setMessage(e)} value={message} placeholder="Please Enter message" placeholderTextColor={'#000'} />
//             <Rating imageSize={20} onFinishRating={e => setRating(e)} style={{paddingVertical: 10}} />
//             <TouchableOpacity style={styles1.yellowButton} onPress={() => handleSubmitReview()}>
//               <Text style={{color: 'white'}}>Submit</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity onPress={() => setModalVisible(false)} style={{width: wp(8), height: wp(8), backgroundColor: '#fff', marginTop: 30, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//             <Image source={require('../../assets/img/close.png')} style={{width: wp(3), height: hp(3)}} resizeMode="contain" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }
// const styles1 = StyleSheet.create({
//   callbtn: {
//     backgroundColor: '#b08218',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderStyle: 'solid',
//     elevation: 10,
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//     // padding:10,
//     paddingHorizontal: 4,
//     paddingVertical: hp(0.7),
//     borderRadius: 4,
//     marginBottom: 5,
//     width: '100%',
//   },
//   BorderBottom: {
//     borderBottomColor: 'rgba(0,0,0,0.2)',
//     borderBottomWidth: 1,
//     flex: 1,
//     width: wp(90),
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     display: 'flex',
//     flexDirection: 'row',
//   },

//   modalText: {
//     // fontWeight: "bold",
//     fontFamily: 'Manrope-ExtraBold',
//     fontSize: 18,
//     marginBottom: 25,
//   },
//   modalTextInput: {
//     borderColor: 'rgba(0,0,0,0.2)',
//     borderWidth: 1,
//     width: '100%',
//     borderRadius: 10,
//     marginVertical: 15,
//     paddingHorizontal: 15,
//   },
//   yellowButton: {
//     backgroundColor: '#E7B84E',
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   modalView: {
//     // margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 30,
//     width: wp(95),
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   pgr: {
//     color: '#666666',
//     fontFamily: 'Manrope-Regular',
//     fontSize: 12,
//     marginBottom: 5,
//   },

//   boxproduct: {
//     backgroundColor: '#fff',
//     padding: 10,
//     position: 'relative',
//     borderRadius: 10,
//     width: wp(45),
//     marginRight: 20,
//     overflow: 'visible',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4.41,
//     elevation: 2,
//   },
//   imgphone: {
//     width: wp(14),
//     height: hp(7),
//     position: 'absolute',
//     top: -10,
//     right: -10,
//     borderColor: '#fff',
//     borderWidth: 5,
//     borderRadius: 100,
//     zIndex: 5,
//   },
//   headingproduct: {
//     color: '#000',
//     fontFamily: 'Manrope-Bold',
//     fontSize: 12,
//     paddingVertical: 4,
//   },
//   infoproduct: {
//     marginVertical: 5,
//   },
//   producthead: {
//     textAlign: 'center',
//     color: '#000',
//     fontSize: 12,
//     fontFamily: 'Manrope-Medium',
//   },
//   abslut: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     paddingVertical: 4,
//     paddingHorizontal: 7,
//     borderTopLeftRadius: 10,
//     backgroundColor: '#e7b84e',
//   },
//   imageheight: {
//     height: hp(12),
//     width: wp(43.6),
//     borderTopRightRadius: 10,
//     borderTopLeftRadius: 10,
//     overflow: 'hidden',
//   },
//   imageheight1: {
//     height: hp(20),
//     width: wp(93.5),
//     borderTopRightRadius: 10,
//     borderTopLeftRadius: 10,
//     overflow: 'hidden',
//   },
//   btnquote: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: '#B08218',
//     right: 0,
//     color: '#fff',
//     padding: 5,
//     borderTopLeftRadius: 10,
//   },
//   sofcontet: {
//     position: 'absolute',
//     top: 5,
//     color: '#fff',
//     textAlign: 'center',
//     left: 0,
//     right: 0,
//   },
//   category: {
//     width: wp(33),
//     height: hp(20),
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   quoutbox: {
//     position: 'relative',
//     width: wp(55),
//   },
//   headingmain: {
//     fontSize: 16,
//     fontFamily: 'Manrope-Bold',
//     color: '#000',
//   },
//   activtext: {
//     color: '#B08218',
//   },
//   activemain: {
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//     borderBottomColor: '#B08218',
//   },
//   flexfrow: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 2,
//     alignItems: 'center',
//     marginRight: 15,
//     marginVertical: 15,
//     padding: 5,
//   },
//   infotext: {
//     color: '#444444',
//     fontSize: 12,
//     fontFamily: 'Manrope-Regular',
//   },
//   infoadd: {
//     display: 'flex',
//     // alignItems: 'center',
//     flexDirection: 'row',
//     gap: 10,
//     marginTop: 5,
//   },
//   flexbetween: {
//     display: 'flex',
//     flexDirection: 'row',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//   },
//   imgsmall: {
//     width: wp(6),
//     height: hp(3),
//   },
//   categry: {
//     fontSize: 18,
//     color: '#000',
//     fontFamily: 'Manrope-Medium',
//   },
//   imgfluid: {
//     width: wp(100),
//     height: hp(20),
//     zIndex: 0,
//   },
//   logo: {
//     width: wp(24),
//     height: hp(12),
//     position: 'absolute',
//     // top : hp(20),
//     borderRadius: 150,
//     bottom: -40,
//     left: 20,
//     zIndex: 9999999,
//   },
//   viewall: {
//     color: '#B08218',
//     fontSize: 16,
//     fontFamily: 'Manrope-Medium',
//   },
//   flexbetwen: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: 15,
//   },
//   abosoluicon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     borderRadius: 50,
//     backgroundColor: '#fff',
//     width: 25,
//     height: 25,
//     lineHeight: 25,
//     zIndex: 999,
//   },
// });




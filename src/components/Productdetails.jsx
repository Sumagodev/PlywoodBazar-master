import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Linking, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearTextGradient } from 'react-native-text-gradient';
import styles from '../../assets/stylecomponents/Style';
import { isAuthorisedContext } from '../navigation/Stack/Root';
import { createLead } from '../services/leads.service';
import { getProductById, getSimilarProducts } from '../services/Product.service';
import { generateImageUrl } from '../services/url.service';
import { checkForValidSubscriptionAndReturnBoolean, getDecodedToken } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import Header from '../navigation/customheader/Header';
import CustomColors from '../styles/CustomColors';
import CustomButton from '../ReusableComponents/CustomButton';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewArrivalProductCard from '../ReusableComponents/NewArrivalProductCard';
import StartBusinessBanner from '../ReusableComponents/StartBusinessBanner';
import { addProductReview, addReview, getReviewForProductNew } from '../services/ProductReview.service';
import ReviewsItem from '../ReusableComponents/ReviewsItem';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function Productdetails(props) {
  const [isAuthorized] = useContext(isAuthorisedContext);
  const [supplierObj, setSupplierObj] = useState({});


  const [productObj, setProductObj] = useState(null);
  // const  productObj?.createdByObj._id);

  const [imageArr, setImagesArr] = useState([]);
  const [decodecode, setdecodecode] = useState('');
  const navigation = useNavigation();

  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const [similarProductsArr, setSimilarProductsArr] = useState([]);
  console.log('decodecode', decodecode);

  const focused = useIsFocused();
  const [readmore, setReadmore] = useState(false);
  const [activeclass, setActiveclass] = useState('Product Specification');
  const [authorized, setIsAuthorized] = useContext(isAuthorisedContext);
  const [isloding, setIsloding] = useState(false);
  const [productId, setProductId] = useState('');
  const [productOwnerId, setProdutOwnerId] = useState('');
  const [nameForReview, setNameForReview] = useState(decodecode);
  const [messageForReview, setMessageForReview] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [userid, setuserid] = useState();
  const [sellingprice, setsellingprice] = useState();
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [value, setvalue] = useState('Get Latest Price');
  console.log('loggedInUserId', loggedInUserId);
  console.log('hhhh', value);

  const [productReviewArr, setProductReviewArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const HandleGetUserById = async id => {
    console.log('=================', id, '==========================');

    try {
      if (!id) {
        return null;
      }
      let { data: res } = await getUserUserById(id);
      console.log('=================', res, '==========================');

      if (res.data) {
        setSupplierObj(res.data);
        setVideoArr(res?.data?.videoArr?.map(el => ({ ...el, isPaused: false })));
      }
    } catch (err) {
      errorToast(err);
      console.log('errorToast4', err);
    }
  };


  const renderReviewItem = ({ item }) => {
    console.log(JSON.stringify(item), 'renderReviewItem'); // This will log the item to the console
    return <ReviewsItem reviewItem={item} />;
  };

  const getProductObj = async () => {
    setIsloding(true)
    try {


      const { data: res } = await getProductById(props?.route?.params?.data);
      console.log('props?.route?.params?.data', res);
      setuserid(res.data._id);
      setsellingprice(res.data.sellingprice);

      if (res) {
        //console.log(JSON.stringify(res.data, null, 2), 'dataxxx');

        console.log(res.data, 'proObj')
        let tempObj = res.data;
        tempObj.imageArr = tempObj.imageArr.filter(el => el.image != '');

        setProductObj(res.data);
        setProductId(res.data._id)
        setProdutOwnerId(res.data.createdById)
        let imaArr = [
          {
            image: res.data.mainImage,
          },
        ];
        imaArr = [...imaArr, ...res.data.imageArr];
        setImagesArr(imaArr);

        getAllSimilarProducts(res.data.categoryId);

        let tempArr = [
          {
            name: 'Brand',
            value: res.data?.brandObj?.name,
          },
          {
            name: 'Thickness',
            value: res.data.specification.thickness,
          },
          {
            name: 'Usage/Application',
            value: res.data.specification.application,
          },
          {
            name: 'Grade',
            value: res.data.specification.grade,
          },
          {
            name: 'Color',
            value: res.data.specification.color,
          },
          // {
          //   name: 'Size',
          //   value: res.data.specification.size,
          // },
          {
            name: 'Wood Type',
            value: res.data.specification.wood,
          },
          {
            name: 'Glue Used',
            value: res.data.specification.glue,
          },
          {
            name: 'Warranty',
            value: res.data.specification.warranty,
          },
        ];
        setcategoryname1(tempArr);
        setIsloding(false)
        console.log('ZXCVBNM',productId)
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handelcallbtn = (phone) => {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigation.navigate('Subscriptions', { register: false }),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
      return;
    }

    Linking.openURL(`tel:${phone}`);
  };
  const getAllSimilarProducts = async id => {
    try {
      //console.log('getting all similar');
      const { data: res } = await getSimilarProducts(id);
      if (res) {
        setSimilarProductsArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleGetProductReview = async id => {
    console.log('>>>>>>>', id);
    try {
      let { data: res } = await getReviewForProductNew(`productId=${id}`);

      if (res.message) {
        setProductReviewArr(res.data);
        //console.log('>>>>>>>', res.data);
      }
    } catch (err) {
      console.log('Errrrrrr', err);
    }
  };

  useEffect(() => {
    if (focused) {
      HandleCheckValidSubscription();
      getProductObj();
    }
  }, [focused, props?.route?.params?.data]);

  useEffect(() => {
    if (focused) {
      handleGetProductReview(productId)
    }
  }, [productId]);

  const handleContactSupplier = async () => {
    try {
      const decodedToken = await getDecodedToken();
      console.log('decodedToken', decodedToken);

      let obj = {
        userId: decodedToken?.user?._id,
        phone: decodedToken?.user?.phone,
        email: decodedToken?.user?.email,
        name: decodedToken?.user?.name,
        productId: productObj?._id,
        createdById: productObj?.createdById,
      };
      let { data: res } = await createLead(obj);


      if (res.message) {

        if (isAuthorized) {
          toastSuccess(res.message);
          console.log('res.message', res.message);
          (res.message);
          setLoading(false)
          if (!currentUserHasActiveSubscription) {
            Alert.alert(
              'Subscription Required',
              'You do not have a valid subscription to perform this action.',
              [
                {
                  text: 'Go to Subscriptions',
                  style: { color: "red" },
                  onPress: () => navigation.navigate('Subscriptions', { register: false }),
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
              { cancelable: true }
            );
            return;
          }
          Linking.openURL(`tel:${productObj?.createdByObj?.phone}`);
          // Linking.openURL(`tel:${decodedToken?.user?.phone}`);
        }
        else {
          Alert.alert(
            'Login Required',
            'Please login to access this feature.',
            [
              {
                text: 'Go to Login',
                onPress: () => navigation.navigate('Login'),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            { cancelable: true }
          );
        }

      }
    } catch (err) {
      errorToast(err);
      console.log('errorToast2', err);

    }
  };

  const HandleCheckValidSubscription = async () => {
    try {
      let decoded = await getDecodedToken();


      if (decoded) {
        setLoggedInUserId(decoded.userId)
        setdecodecode(decoded.user.name.toString())
        let { data: res } = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
        console.log('setCurrentUserHasActiveSubscription', res);
        if (res.data) {

          setCurrentUserHasActiveSubscription(res.data);


        }
      }
    } catch (err) {
      errorToast(err);
      console.log('errorToast2', errorToast);
    }
  };
  const handleModelshow = () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        setLoading(false)
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigation.navigate('Subscriptions', { register: false }),

            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      setModalVisible(true);
    } else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );

    }
  };




  const handleSubmitReview = async e => {
    try {
      //   if (!currentUserHasActiveSubscription) {
      //   Alert.alert(
      //     'Subscription Required',
      //     'You do not have a valid subscription to perform this action.',
      //     [
      //       {
      //         text: 'Go to Subscriptions',
      //         style: { color: "red" },
      //         onPress: () => navigation.navigate('Subscriptions', { register: false }),
      //       },
      //       {
      //         text: 'Cancel',
      //         style: 'cancel',
      //       },
      //     ],
      //     { cancelable: true }
      //   );
      //   return;
      // }




      console.log('xInside......')

      if (nameForReview == '') {
        errorToast('Please enter a name');
        Alert.alert('Validation Error', 'Please enter a Name.');
        return;
      }
      if (messageForReview == '') {
        errorToast('Please enter a Message');
        Alert.alert('Validation Error', 'Please enter a Message.');
        return;
      }
      if (rating =='') {
        errorToast('Please Add a Rating');
        return;
      }
      setModalVisible(false);
      let obj = {
        rating,
        message: messageForReview,
        name: nameForReview,
        userId: productObj?.createdByObj._id,
        addedby:loggedInUserId,
        productId:productId,
      };
      
      console.log(obj,'objzxcccc')


      let { data: res } = await addProductReview(obj);
      if (res.message) {

        toastSuccess(res.message);
        setModalVisible(false);
        setMessageForReview('');
        setNameForReview('')
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const [productinfo, setproductinfo] = useState([
    {
      categoryname1: 'Product Specification',
    },

    {
      categoryname1: 'Product Description',
    },
  ]);
  const [categoryname1, setcategoryname1] = useState([]);

  const renderproductinfo = ({ item, index }) => {
    if (item.categoryname1 == 'line') {
      return <View style={{ width: wp(0.5), backgroundColor: CustomColors.mattBrownDark, marginHorizontal: wp(3) }}></View>;
    } else {
      return (
        <Pressable onPress={() => setActiveclass(item.categoryname1)}>
          <Text style={[item.categoryname1 == activeclass ? styles1.activeproduct : styles1.card_main]}>{item.categoryname1}</Text>
        </Pressable>
      );
    }
  };

  const rendercategoryname1 = ({ item, index }) => {
    return (
      <View style={styles1.prdutspacef}>
        <Text style={styles1.heding}>{item.name}</Text>
        <Text style={styles1.conte}>{item.value}</Text>
      </View>
    );
  };

  const handleContactSupplierClick = () => {

    if (isAuthorized) {

      if (!currentUserHasActiveSubscription) {
        setLoading(false)
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigation.navigate('Subscriptions', { register: false }),

            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      handleContactSupplier()


    }
    else {
      setLoading(false)
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }
  const handleGetQuoteClick = (item) => {
    console.log('item?.slug ', item?.slug);

    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigation.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      navigation.navigate('Productdetails', { data: item?.slug })
    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }
  const renderSimilarProducts = ({ item, index }) => {
    console.log('***********=>', JSON.stringify(item));
    return (
      <NewArrivalProductCard
        imagePath={{ uri: generateImageUrl(item?.productImage) }}
        price={item?.price}
        name={item?.productName}
        location={item?.cityName}
        isVerified={item?.isVerified} // Check if item.approved is "APPROVED"
        onCallPressed={() => { handelcallbtn(item?.userMobileNumber) }}
        onGetQuotePressed={() => { handleGetQuoteClick(item) }}

        onCardPressed={() => navigation.navigate('Productdetails', { data: item?.slug })}></NewArrivalProductCard>
    );
  };
  const TakeSellingPrice = (price) => {
    console.log('***')
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigation.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      console.log('selling price')
      setvalue(price)
    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  };
  const ListHeader = () => {
    // View to set in Header
    return (
      <>

        {/* <View style={styles1.flexbetween}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
          </Pressable>
          <Text style={styles1.categry}>Product</Text>
        </View> */}
      </>
    );
  };

  const ListFooter = () => {
    return (
      <View>
        {imageArr.length === 0 ? (
          <View style={{ height: wp(30), justifyContent: 'center', alignItems: 'center' }}>
            <Text>No images uploaded</Text>
          </View>
        ) : (
          <SliderBox images={imageArr.map(el => generateImageUrl(el.image))} sliderBoxHeight={hp(30)} dotColor="#B08218" inactiveDotColor="#D9D9D9" circleLoop resizeMethod={'resize'} resizeMode={'cover'} ImageComponentStyle={{ width: '100%', borderRadius: 5 }} imageLoadingColor="#2196F3" />
        )}

        <View style={styles1.detailsContainer}>
          <View>
            <Text style={styles1.productname}>{productObj?.name}</Text>
          </View>

          <View style={styles1.infoHeaderStyle}>
            <FlatList data={productinfo} keyExtractor={(item, index) => `${index}`} renderItem={renderproductinfo} horizontal contentContainerStyle={{ justifyContent: 'space-between' }} />
            <View style={{ width: wp(1), height: '100%', position: 'absolute', backgroundColor: CustomColors.mattBrownDark }}></View>
          </View>

          {activeclass === 'Product Specification' ? (
            <FlatList
              data={categoryname1}
              keyExtractor={(item, index) => `${index}`}
              renderItem={rendercategoryname1}
              style={{ maxHeight: hp(93), width: '100%' }}
              contentContainerStyle={{ marginVertical: wp(5) }}
              nestedScrollEnabled={true} // Added for nested scrolling
            />
          ) : (
            <Text style={styles1.descpriionttext}>{productObj?.longDescription}</Text>
          )}

          {sellingprice ? (<TouchableOpacity style={{ alignSelf: 'center', marginVertical: wp(6) }}>
            <CustomButtonNew
              text={value}
              paddingHorizontal={wp(5)}
              onPress={() => { TakeSellingPrice(sellingprice), console.log('7777') }}
            />

          </TouchableOpacity>) : (<TouchableOpacity style={{ alignSelf: 'center', marginVertical: wp(6) }}>

          </TouchableOpacity>)}




          <LinearGradient colors={['#cc8d19', '#cc8d19', '#f1e8d1']} style={gradientStyle.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <View style={gradientStyle.card}>
              <TouchableOpacity onPress={() => { navigation.navigate('Supplier', { data: productObj?.createdByObj }) }} style={{ flexDirection: 'row' }} >
                {productObj?.createdByObj?.userObj?.isVerified && <Image source={require('../../assets/img/verified.png')} resizeMode="contain" style={{ width: wp(15), height: wp(15) }} />}
                <Text style={gradientStyle.title}>{currentUserHasActiveSubscription ? `${productObj?.createdByObj?.userObj?.companyObj?.name} (${productObj?.brandObj?.name})` : `${productObj?.createdByObj?.userObj?.companyObj?.name}`.slice(0, 4) + '***'}</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', marginTop: wp(1) }}>
                <Icon name="map-marker-radius" color="white" size={wp(8)} />
                <Text style={{ color: 'white', marginLeft: wp(1) }}>{currentUserHasActiveSubscription ? productObj?.createdByObj?.userObj?.companyObj?.address || 'NA' : `${productObj?.createdByObj?.userObj?.companyObj?.address}`.slice(0, 2) + '***'}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="check-circle-outline" color="white" size={wp(8)} />
                <Text style={{ color: 'white', marginLeft: wp(1) }}>{currentUserHasActiveSubscription ? productObj?.createdByObj?.userObj?.companyObj?.gstNumber || 'NA' : `${productObj?.createdByObj?.userObj?.companyObj?.gstNumber}`.slice(0, 2) + '***'}</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', flex: 1, marginTop: wp(2) }}>
                {loading === 'true' ? (<ActivityIndicator size={'large'} color={CustomColors.mattBrownDark} width={wp(50)} />) : (<CustomButtonNew text={'Contact Supplier'} textSize={wp(4)} paddingHorizontal={wp(5)} onPress={() => { handleContactSupplierClick(), setLoading(true) }}></CustomButtonNew>)}

              </View>
            </View>
          </LinearGradient>
          <View>
            {isAuthorized === 'false' && (
              <View style={{ marginVertical: wp(5) }}>
                <StartBusinessBanner />
              </View>
            )}
          </View>

          {/* <ImageBackground source={require('../../assets/img/bg_similar_products.png')}> */}
          <View style={similarProductsStyle.container}>

            <View style={[styles.padinghr, { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: wp(7), marginBottom: 10 }]}>
              <Text style={[styles1.headingmain]}>Similar Products</Text>
              <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => navigation.navigate('AllProducts', { type: '' })} />
            </View>
            <ScrollView
              // Set the fixed height for the scrollable area
              nestedScrollEnabled={true} // Enable nested scrolling
            >
              <FlatList

                data={similarProductsArr.slice(0, 3)}
                renderItem={renderSimilarProducts}
                keyExtractor={(item, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false} // Disable FlatList's internal scrolling
              />
            </ScrollView>
          </View>
          {/* </ImageBackground> */}
        </View>

        <View style={{ marginTop: wp(10) }}></View>


        <View style={reviewStyle.container}>
          <Text style={reviewStyle.title}>Review</Text>
          <View style={reviewStyle.addBtn}><CustomButtonOld textSize={wp(4)} text={"Add"} onPress={() => { handleModelshow() }}></CustomButtonOld></View>
        </View>
        <ScrollView
          contentContainerStyle={{ marginVertical: wp(5) }} // Set the fixed height for the scrollable area
          nestedScrollEnabled={true} // Enable nested scrolling
        >

          <FlatList
            data={productReviewArr.slice(0, 3)}
            renderItem={renderReviewItem}
            keyExtractor={(item, index) => `${index}`}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Disable FlatList's internal scrolling
          />
        </ScrollView>

        <View style={{ alignSelf: 'center', marginBottom: wp(5) }}>
          <CustomButtonNew paddingHorizontal={wp(6)} text={'View More..'} textSize={wp(4)} onPress={() => { navigation.navigate('ReviewsPage', { data: productId ,type:'product'}) }}></CustomButtonNew>
        </View>

        {/* {authorized && (
          <TouchableOpacity onPress={() => handleContactSupplier()} style={[styles.btnbg, {marginBottom: 15}]}>
            <Text style={styles.textbtn}>Contact Supplier</Text>
          </TouchableOpacity>
        )} */}

      </View>
    );
  };

  return (
    <View style={[styles.bgwhite, styles.flex1]}>
      {isloding ? (
        <ActivityIndicator size={'large'} color={CustomColors.mattBrownDark} width={wp(50)} />
      ) : (
        productObj && productObj._id && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            data={[]} // Empty data as you're using it for header and footer only
          />
        )
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <View style={{ padding: 20 }}>
              <Text style={styles2.modalText}>Add Review</Text>
              <TextInput style={styles2.modalTextInput} onChangeText={(e) => setNameForReview(e)} value={nameForReview} placeholder="Please Enter name" placeholderTextColor={'#000'} />
              <TextInput multiline={true} style={styles2.modalTextInput} onChangeText={(e) => setMessageForReview(e)} value={messageForReview} placeholder="Please Enter message" placeholderTextColor={'#000'} />
              <Rating imageSize={30} onFinishRating={e => setRating(e)} style={{ paddingVertical: 6 }} />
            </View>
            <TouchableOpacity style={styles2.yellowButton} onPress={() => handleSubmitReview()}>
              <Text style={{ color: 'white', fontSize: wp(5), fontWeight: 'bold', alignSelf: 'center' }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { setModalVisible(false), setMessageForReview(''), setNameForReview('') }} style={{ width: wp(8), height: wp(8), backgroundColor: '#fff', marginTop: 30, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../assets/img/close.png')} style={{ width: wp(3), height: hp(3) }} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles1 = StyleSheet.create({
  sliderhome: {
    marginVertical: 15,
  },
  headingmain: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#000',
  },
  headerslid: {
    width: wp(95),
    height: hp(25),
    borderRadius: 6,
  },
  priceproce: {
    textAlign: 'center',
    fontFamily: 'Manrope-Medium',
    color: '#000',
  },
  sizeprod: {
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
    color: '#000',
    marginVertical: 5,
    fontSize: 10,
  },
  sizelenth: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlign: 'center',
  },
  infoproduct: {
    marginVertical: 5,
  },
  sizelenth: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlign: 'center',
  },
  infoproduct: {
    marginVertical: 5,
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
  flexbetwen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  imgsize: {
    width: wp(30),
    height: hp(10),
  },
  textmainlogo: {
    color: '#666666',
    fontSize: 12,
    paddingRight: 10,
  },
  flexrow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: wp(60),
  },
  flexrowq: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  flexrowq1: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    // marginVertical:10,
  },
  imgsmall1: {
    width: wp(30),
    height: hp(10),
  },
  ratingsection: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  gradentcolor: {
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
    marginVertical: 10,
    // paddingBottom: 20,
  },
  heding: {
    width: '40%',
    color: '#613A19',
    fontWeight: 800,
    fontSize: wp(4),
    fontFamily: 'Manrope-Medium',
  },
  prdutspacef: {
    paddingHorizontal: wp(10),
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 0.8,
    paddingTop: 10,
    // marginVertical:12,
  },
  conte: {
    fontFamily: 'Manrope-Medium',
    color: '#000',
    fontSize: 12,
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
  productname: {
    marginVertical: wp(4),
    color: '#000000',
    fontSize: wp(6),
    fontWeight: 800,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Manrope-Medium',
  },
  descpriionttext: {
    fontSize: wp(4),
    paddingVertical: wp(6),
    paddingHorizontal: wp(10),
    fontFamily: 'Manrope-Regular',
  },
  textmore: {
    color: '#B08218',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',

    // paddingTop:13
  },
  card_main: {
    marginLeft: wp(2),
    color: '#8E8E8E',
    fontFamily: 'Manrope-Medium',
    fontSize: wp(3.5),
    width: '80%',
  },
  activeproduct: {
    fontFamily: 'Manrope-Medium',
    color: '#000000',
    fontSize: wp(3.5),
    width: '80%',
  },
  boxproduct: {
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative',
    borderRadius: 10,
    width: wp(50),
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
  cityboxproduct: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 10,
    width: wp(30),
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
  logobround: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 10,
    width: wp(32),
    marginRight: 20,
    overflow: 'visible',
  },

  imgfluid: {
    width: wp(45),
    height: hp(20),
    borderRadius: 10,
    // marginBottom:10,
  },
  viewall: {
    color: '#B08218',
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
  },
  flexbetwen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
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
  producthead: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },

  detailsContainer: {
    backgroundColor: '#FFFFFF',


    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    marginTop: -wp(7),
  },
  infoHeaderStyle: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(80),
    padding: wp(3),
    backgroundColor: '#F5F1E8',
    elevation: wp(7),
    borderTopEndRadius: wp(5),
    borderBottomStartRadius: wp(5),
  },
  gradientDetailsCard: {},
});

const gradientStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: wp(90),
    marginVertical: wp(5),
    flex: 1,
    borderRadius: wp(5),
    marginHorizontal: wp(5),
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },

  title: {
    width: '87%',
    marginLeft: wp(2),
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    width: '87%',
  },
});

const similarProductsStyle = StyleSheet.create({
  container: {
    paddingHorizontal: wp(1),
    paddingVertical: wp(5),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    paddingVertical: wp(3),
  },
  scrollContainer: {
    backgroundColor: 'red',
    flex: 1,
  },
});
const reviewStyle = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: wp(5),
    width: wp(85),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',

  },
  addBtn: {
    borderRadius: 50, borderColor: '#BC9B80',
    borderWidth: wp(1),
    position: 'absolute',
    right: 0
  },
});

const styles2 = StyleSheet.create({
  callbtn: {
    backgroundColor: '#b08218',
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    elevation: 1,

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
    backgroundColor: '#cc8d19',
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

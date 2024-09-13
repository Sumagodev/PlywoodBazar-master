import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList,Linking, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {LinearTextGradient} from 'react-native-text-gradient';
import styles from '../../assets/stylecomponents/Style';
import {isAuthorisedContext} from '../navigation/Stack/Root';
import {createLead} from '../services/leads.service';
import {getProductById, getSimilarProducts} from '../services/Product.service';
import {generateImageUrl} from '../services/url.service';
import {checkForValidSubscriptionAndReturnBoolean, getDecodedToken} from '../services/User.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
import Header from '../navigation/customheader/Header';
import CustomColors from '../styles/CustomColors';
import CustomButton from '../ReusableComponents/CustomButton';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewArrivalProductCard from '../ReusableComponents/NewArrivalProductCard';
import StartBusinessBanner from '../ReusableComponents/StartBusinessBanner';
import {addReview, getReviewForProduct} from '../services/ProductReview.service';
import ReviewsItem from '../ReusableComponents/ReviewsItem';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';

export default function Productdetails(props) {
  const [isAuthorized] = useContext(isAuthorisedContext);

  const [productObj, setProductObj] = useState(null);
  const [imageArr, setImagesArr] = useState([]);
  const navigation = useNavigation();
  const [productReviewArr, setProductReviewArr] = useState([]);

  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const [similarProductsArr, setSimilarProductsArr] = useState([]);
  const focused = useIsFocused();
  const [readmore, setReadmore] = useState(false);
  const [activeclass, setActiveclass] = useState('Product Specification');
  const [authorized, setIsAuthorized] = useContext(isAuthorisedContext);
  const [isloding, setIsloding] = useState(false);
  const [productId, setProductId] = useState('');
  const [productOwnerId, setProdutOwnerId] = useState('');
  const getProductObj = async () => {
    setIsloding(true)
    try {
     
      const {data: res} = await getProductById(props?.route?.params?.data);
      if (res) {
        console.log(JSON.stringify(res.data, null, 2), 'dataxxx');
        let tempObj = res.data;
        tempObj.imageArr = tempObj.imageArr.filter(el => el.image != '');

        handleGetProductReview(res.data._id);
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
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handelcallbtn = (phone) => {
    if (!currentUserHasActiveSubscription) {
      errorToast('You do not have a valid subscription to perform this action');
      return 0;
    }

    Linking.openURL(`tel:${phone}`);
  };
  const getAllSimilarProducts = async id => {
    try {
      console.log('getting all similar');
      const {data: res} = await getSimilarProducts(id);
      if (res) {
        setSimilarProductsArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleGetProductReview = async id => {
    console.log('', id);
    try {
      let {data: res} = await getReviewForProduct(`userId=${id}`);

      if (res.message) {
        setProductReviewArr(res.data);
      }
    } catch (err) {
      console.log('Errrrrrr>>>>>>>>>>>>>>>>>>>', err);
    }
  };

  useEffect(() => {
    if (focused) {
      HandleCheckValidSubscription();
      getProductObj();
    }
  }, [focused, props?.route?.params?.data]);

  const handleContactSupplier = async () => {
    try {
      const decodedToken = await getDecodedToken();
      console.log(decodedToken);
      let obj = {
        userId: decodedToken?.user?._id,
        phone: decodedToken?.user?.phone,
        email: decodedToken?.user?.email,
        name: decodedToken?.user?.name,
        productId: productObj?._id,
        createdById: productObj?.createdById,
      };
      let {data: res} = await createLead(obj);
      if (res.message) {
        toastSuccess(res.message);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const HandleCheckValidSubscription = async () => {
    try {
      let decoded = await getDecodedToken();
      if (decoded) {
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

  const [productinfo, setproductinfo] = useState([
    {
      categoryname1: 'Product Specification',
    },

    {
      categoryname1: 'Product Description',
    },
  ]);
  const [categoryname1, setcategoryname1] = useState([]);

  const renderproductinfo = ({item, index}) => {
    if (item.categoryname1 == 'line') {
      return <View style={{width: wp(0.5), backgroundColor: CustomColors.mattBrownDark, marginHorizontal: wp(3)}}></View>;
    } else {
      return (
        <Pressable onPress={() => setActiveclass(item.categoryname1)}>
          <Text style={[item.categoryname1 == activeclass ? styles1.activeproduct : styles1.card_main]}>{item.categoryname1}</Text>
        </Pressable>
      );
    }
  };

  const rendercategoryname1 = ({item, index}) => {
    return (
      <View style={styles1.prdutspacef}>
        <Text style={styles1.heding}>{item.name}</Text>
        <Text style={styles1.conte}>{item.value}</Text>
      </View>
    );
  };

  const renderHighlights = ({item, index}) => {
    return (
      <Pressable style={styles1.boxproduct} onPress={() => navigation.navigate('Productdetails', {data: item?.slug})}>
        <Image source={require('../../assets/img/call.png')} style={styles1.imgphone} />
        <Image source={{uri: generateImageUrl(item.mainImage)}} style={styles1.imgfluid} />
        <View style={styles1.infoproduct}>
          <Text style={styles1.producthead}>{item.name}</Text>
          <Text style={styles1.sizeprod}>
            Size (Sq ft): <Text style={styles1.sizelenth}>{item?.specification?.size ? item?.specification?.size : 'N.A.'}</Text>
          </Text>
          <Text style={styles1.priceproce}>
            ₹ {item?.price}
            <Text style={styles1?.sqirft}>Sq ft</Text>
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderSimilarProducts = ({item, index}) => {
    console.log('***********=>', item);
    return (
      <NewArrivalProductCard
        imagePath={{uri: generateImageUrl(item?.mainImage)}}
        price={item?.price}
        name={item?.name}
        location="Location"
        isVerified={item?.approved === "APPROVED"} // Check if item.approved is "APPROVED"
        onCallPressed={() => {handelcallbtn(item?.createdByObj?.companyObj?.phone)}}
        onGetQuotePressed={() => {}}
        onCardPressed={() => navigation.navigate('Productdetails', {data: item?.slug})}></NewArrivalProductCard>
    );
  };
  const renderReviews = ({item, index}) => {
    console.log('***********=>', item);
    return (
      <ReviewsItem
        reviewItem={{ imagePath:{uri: generateImageUrl(item?.mainImage)},
          message:item.name,
          name:item.name,
          rating:4
        }
      
      }

        ></ReviewsItem>
    );
  };

  const ListHeader = () => {
    // View to set in Header
    return (
      <>
        {/*       <Header stackHeader={true} screenName={productObj?.name ? productObj?.name : '' } rootProps={props} />
         */}
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
          <View style={{height: wp(30), justifyContent: 'center', alignItems: 'center'}}>
            <Text>No images uploaded</Text>
          </View>
        ) : (
          <SliderBox images={imageArr.map(el => generateImageUrl(el.image))} sliderBoxHeight={hp(30)} dotColor="#B08218" inactiveDotColor="#D9D9D9" circleLoop resizeMethod={'resize'} resizeMode={'cover'} ImageComponentStyle={{width: '100%', borderRadius: 5}} imageLoadingColor="#2196F3" />
        )}

        <View style={styles1.detailsContainer}>
          <View>
            <Text style={styles1.productname}>{productObj?.name}</Text>
          </View>

          <View style={styles1.infoHeaderStyle}>
            <FlatList data={productinfo} keyExtractor={(item, index) => `${index}`} renderItem={renderproductinfo} horizontal contentContainerStyle={{justifyContent: 'space-between'}} />
            <View style={{width: wp(1), height: '100%', position: 'absolute', backgroundColor: CustomColors.mattBrownDark}}></View>
          </View>

          {activeclass === 'Product Specification' ? (
            <FlatList
              data={categoryname1}
              keyExtractor={(item, index) => `${index}`}
              renderItem={rendercategoryname1}
              style={{maxHeight: hp(93), width: '100%'}}
              contentContainerStyle={{marginVertical: wp(5)}}
              nestedScrollEnabled={true} // Added for nested scrolling
            />
          ) : (
            <Text style={styles1.descpriionttext}>{productObj?.longDescription}</Text>
          )}

          <TouchableOpacity style={{alignSelf: 'center' ,marginVertical:wp(6)}}>
            <CustomButtonNew text={'Get Latest Price'} paddingHorizontal={wp(5)} onPress={()=>{console.log('Latest Price')}} />
          </TouchableOpacity>

          <LinearGradient colors={['#5a432f', '#5a432f', '#f1e8d1']} style={gradientStyle.container} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            <View style={gradientStyle.card}>
              <View style={{flexDirection: 'row'}}>
                {productObj?.createdByObj?.userObj?.isVerified && <Image source={require('../../assets/img/verified.png')} resizeMode="contain" style={{width: wp(15), height: wp(15)}} />}
                <Text style={gradientStyle.title}>{currentUserHasActiveSubscription ? `${productObj?.createdByObj?.userObj?.companyObj?.name} (${productObj?.brandObj?.name})` : `${productObj?.createdByObj?.userObj?.companyObj?.name}`.slice(0, 4) + '***'}</Text>
              </View>

              <View style={{flexDirection: 'row',marginTop:wp(1)}}>
                <Icon name="map-marker-radius" color="white" size={wp(8)} />
                <Text style={{color: 'white', marginLeft: wp(1)}}>{currentUserHasActiveSubscription ? productObj?.createdByObj?.userObj?.companyObj?.address || 'NA' : `${productObj?.createdByObj?.userObj?.companyObj?.address}`.slice(0, 2) + '***'}</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="check-circle-outline" color="white" size={wp(8)} />
                <Text style={{color: 'white', marginLeft: wp(1)}}>{currentUserHasActiveSubscription ? productObj?.createdByObj?.userObj?.companyObj?.gstNumber || 'NA' : `${productObj?.createdByObj?.userObj?.companyObj?.gstNumber}`.slice(0, 2) + '***'}</Text>
              </View>
              <View style={{justifyContent:'flex-end',alignSelf:'flex-end', flex:1,marginTop:wp(2)}}>
              <CustomButtonNew text={'Contact Supplier'} textSize={wp(4)} paddingHorizontal={wp(5)} onPress={()=>{console.log('Aaaaaa')}}></CustomButtonNew>
              </View>
            </View>
          </LinearGradient>

          <StartBusinessBanner></StartBusinessBanner>
          {/* <ImageBackground source={require('../../assets/img/bg_similar_products.png')}> */}
            <View style={similarProductsStyle.container}>
             
            <View style={[styles.padinghr, {alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',  marginTop: wp(7),marginBottom: 10}]}>
                <Text style={[styles1.headingmain]}>Similar Products</Text>
                <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => navigation.navigate('AllProducts', {type: ''})}/>
              </View>
              <ScrollView
                  // Set the fixed height for the scrollable area
               nestedScrollEnabled={true} // Enable nested scrolling
              >
                <FlatList
              
                  data={similarProductsArr.slice(0,2)}
                  renderItem={renderSimilarProducts}
                  keyExtractor={(item, index) => `${index}`}
                  showsVerticalScrollIndicator={false}
                 scrollEnabled={false} // Disable FlatList's internal scrolling
                />
              </ScrollView>
            </View>
          {/* </ImageBackground> */}
        </View>
      
         <View style={{marginTop:wp(10)}}></View>


        <View style={reviewStyle.container}>
          <Text style={reviewStyle.title}>Review</Text>
          <View style={reviewStyle.addBtn}><CustomButtonOld  textSize={wp(4)} text={"Add"}></CustomButtonOld></View>
        </View>
        <ScrollView
                style={{marginVertical:wp(5)}} // Set the fixed height for the scrollable area
                nestedScrollEnabled={true} // Enable nested scrolling
              >
               
                <FlatList
                  data={similarProductsArr.slice(0,2)}
                  renderItem={renderReviews}
                  keyExtractor={(item, index) => `${index}`}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false} // Disable FlatList's internal scrolling
                />
              </ScrollView>

              <View style={{alignSelf:'center',marginBottom:wp(5)}}>
              <CustomButtonNew  paddingHorizontal={wp(6)} text={'View More..'} textSize={wp(3.5)} onPress={()=>{navigation.navigate('ReviewsPage', {data: productOwnerId})}}></CustomButtonNew>
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
    elevation: wp(3),
    
    borderTopLeftRadius:wp(10),
    borderTopRightRadius:wp(10),
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
    shadowOffset: {width: 0, height: 2},
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
    alignSelf:'center',
    marginVertical: wp(5),
    width:wp(85),
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',
   
  },
  addBtn: {
    borderRadius:50,borderColor:'#BC9B80',
    borderWidth:wp(1),
    position:'absolute',
    right:0
  },
});

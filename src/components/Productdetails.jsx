import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
export default function Productdetails(props) {
  const [productObj, setProductObj] = useState(null);
  const [imageArr, setImagesArr] = useState([]);
  const navigation = useNavigation();

  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);

  const [similarProductsArr, setSimilarProductsArr] = useState([]);
  const focused = useIsFocused();
  const [readmore, setReadmore] = useState(false);
  const [activeclass, setActiveclass] = useState('Product Specification');
  const [authorized, setIsAuthorized] = useContext(isAuthorisedContext);

  const getProductObj = async () => {
    try {
      const { data: res } = await getProductById(props?.route?.params?.data);
      if (res) {
        console.log(JSON.stringify(res.data, null, 2), 'data');
        let tempObj = res.data
        tempObj.imageArr = tempObj.imageArr.filter(el => el.image != "")


        setProductObj(res.data);
        let imaArr = [{
          image:res.data.mainImage
        }]
        imaArr =[...imaArr,...res.data.imageArr];
        setImagesArr(imaArr)
        
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllSimilarProducts = async id => {
    try {
      console.log('getting all similar');
      const { data: res } = await getSimilarProducts(id);
      if (res) {
        setSimilarProductsArr(res.data);
      }
    } catch (error) {
      errorToast(error);
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
      let { data: res } = await createLead(obj);
      if (res.message) {
        toastSuccess(res.message);
      }
    } catch (err) {
      errorToast(err);
    }
  };




  const HandleCheckValidSubscription = async () => {
    try {
      let decoded = await getDecodedToken()
      if (decoded) {

        let { data: res } = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId)
        if (res.data) {
          console.log("setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription", res.data, "setCurrentUserHasActiveSubscription,setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription")
          setCurrentUserHasActiveSubscription(res.data)
        }
      }
    }
    catch (err) {
      errorToast(err)
    }
  }





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
    return (
      <Pressable onPress={() => setActiveclass(item.categoryname1)}>
        <Text style={[item.categoryname1 == activeclass ? styles1.activeproduct : styles1.card_main]}>{item.categoryname1}</Text>
      </Pressable>
    );
  };

  const rendercategoryname1 = ({ item, index }) => {
    return (
      <View style={styles1.prdutspacef}>
        <Text style={styles1.heding}>{item.name}</Text>
        <Text style={styles1.conte}>{item.value}</Text>
      </View>
    );
  };

  const renderHighlights = ({ item, index }) => {
    return (
      <Pressable style={styles1.boxproduct} onPress={() => navigation.navigate('Productdetails', { data: item?.slug })}>
        <Image source={require('../../assets/img/call.png')} style={styles1.imgphone} />
        <Image source={{ uri: generateImageUrl(item.mainImage) }} style={styles1.imgfluid} />
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

  const ListHeader = () => {
    //View to set in Header
    return (
      <>
      
      
      <Header stackHeader={true} screenName={productObj?.name ? productObj?.name : '' } rootProps={props} />
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
    //View to set in Header
    return (
      <>
      {
        imageArr.length === 0 ? 
        <View style={{height:250, display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Text>No images uploaded</Text>
        </View>
        :
        <SliderBox
          images={imageArr.map(el => generateImageUrl(el.image))}
          sliderBoxHeight={200}
          dotColor="#B08218"
          inactiveDotColor="#D9D9D9"
          //   autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
          ImageComponentStyle={{
            borderRadius: 15,
            width: '94%',
            marginTop: 5,
            marginLeft: -20,
          }}
          imageLoadingColor="#2196F3"
        />
      }
        <View>
          <Text style={styles1.productname}>{productObj?.name}</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <FlatList data={productinfo} keyExtractor={(item, index) => `${index}`} renderItem={renderproductinfo} horizontal contentContainerStyle={{ paddingVertical: 5 }} />
        </View>
        {activeclass == 'Product Specification' ? (
          <FlatList data={categoryname1} keyExtractor={(item, index) => `${index}`} renderItem={rendercategoryname1} scrollEnabled style={{ maxHeight: hp(93), width: '100%' }} contentContainerStyle={{ paddingVertical: 5, marginBottom: 30 }} />
        ) : (
          <Text style={styles1.descpriionttext}>
            {productObj?.longDescription}
          </Text>
        )}
        <View style={[styles1.flexrow, { position: "relative", width: wp(95), paddingVertical: 10, marginTop: 10 }]}>
          <Pressable onPress={() => currentUserHasActiveSubscription && navigation.navigate("Supplier", { data: productObj?.createdByObj })}>
            <LinearTextGradient style={styles1.gradentcolor} locations={[0, 1]} colors={['#F74D57', '#6D4EE9']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}>
              <Text>
                {currentUserHasActiveSubscription ? `${productObj?.createdByObj?.userObj?.companyObj?.name ? `${productObj?.createdByObj?.userObj?.companyObj?.name} (${productObj?.brandObj?.name})` : `Plywood Bazar (${productObj?.brandObj?.name})`}` : `${productObj?.createdByObj?.userObj?.companyObj?.name ? `${productObj?.createdByObj?.userObj?.companyObj?.name}` : "Plywood Bazar"}`.slice(0, 4) + "***"}
              </Text>
            </LinearTextGradient>
          </Pressable>
          {
            productObj?.createdByObj?.userObj?.isVerified &&
            <Image source={require('../../assets/img/verified.png')} resizeMode='contain' style={{ width: 70, height: 70, position: "absolute", right: 10 }} />
          }
        </View>
        <View style={[styles1.ratingsection, ]}>

          <Image source={{ uri: generateImageUrl(productObj?.brandObj?.image) }} style={styles1.imgsmall1} resizeMode="contain" />
          
          <View style={styles1.ratingarea}>
            <View style={styles1.flexrow}>
              <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} />
              <Text style={styles1.textmainlogo}>
                {`${currentUserHasActiveSubscription ? (productObj?.createdByObj?.userObj?.companyObj?.address ? productObj?.createdByObj?.userObj?.companyObj?.address : "NA") : (productObj?.createdByObj?.userObj?.companyObj?.address ? `${productObj?.createdByObj?.userObj?.companyObj?.address}` : "NA").slice(0, 2) + "***"}`}
              </Text>
            </View>
              
            <View style={styles1.flexrowq1}>
              <Image source={require('../../assets/img/check.png')} style={{ width: 20, height: 20 }} />
              <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Manrope-Bold' }}>
                GST - <Text style={{ color: '#333333', fontSize: 12, fontFamily: 'Manrope-Regular' }}>
                  {currentUserHasActiveSubscription ? (productObj?.createdByObj?.userObj?.companyObj?.gstNumber ? productObj?.createdByObj?.userObj?.companyObj?.gstNumber : "NA") : ((productObj?.createdByObj?.userObj?.companyObj?.gstNumber ? `${productObj?.createdByObj?.userObj?.companyObj?.gstNumber}` : "NA").slice(0, 2) + "***")}
                </Text>
              </Text>
            </View>

          </View>
        </View>
        {authorized && (
          <TouchableOpacity onPress={() => handleContactSupplier()} style={[styles.btnbg, { marginBottom: 15 }]}>
            <Text style={styles.textbtn}>Contact Supplier</Text>
          </TouchableOpacity>
        )}

        <View style={styles1.flexbetwen}>
          <Text style={styles1.headingmain}>Similar Products</Text>
          <Pressable onPress={() => navigation.navigate('AllProducts')}>
            <Text style={styles1.viewall}>View All</Text>
          </Pressable>
        </View>
        <FlatList style={styles.mttop10} contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }} data={similarProductsArr} horizontal renderItem={renderHighlights} keyExtractor={(item, index) => `${index}`} />
      </>
    );
  };

  return (
    <View style={[styles.padinghr, styles.bgwhite, styles.flex1]}>
      {productObj && productObj?._id && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          //Header to show above listview
          ListHeaderComponent={ListHeader}
          //Footer to show below listview
          ListFooterComponent={ListFooter}
        // renderItem={ItemView}
        // ListEmptyComponent={EmptyListMessage}
        />
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
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },
  prdutspacef: {
    // marginTop:20,
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
    marginVertical: 10,
    color: '#000',
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'Manrope-Medium',
  },
  descpriionttext: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
  },
  textmore: {
    color: '#B08218',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    // paddingTop:13
  },
  card_main: {
    color: '#8E8E8E',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    marginRight: 12,
  },
  activeproduct: {
    fontFamily: 'Manrope-Medium',
    color: '#B08218',
    fontSize: 12,
    marginRight: 12,
    marginBottom: 1,
    paddingBottom: 1,
    borderBottomColor: '#B08218',
    borderBottomWidth: 0.8,
    paddingBottom: 5,
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
});

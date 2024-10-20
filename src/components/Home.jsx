import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/stylecomponents/Style';
import Header from '../ReusableComponents/Header';
import { getForHomepage } from '../services/Advertisement.service';
import { getBlogApi } from '../services/Blog.service';
import { getBlogVideoApi } from '../services/BlogVideo.service';
import { getAllCategories } from '../services/Category.service';
import { getAllFlashSales } from '../services/FlashSales.service';
import { addUserRequirement } from '../services/UserRequirements.service';
import { generateImageUrl } from '../services/url.service';
import { errorToast, toastSuccess } from '../utils/toastutill';

// import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Home() {

  const navigate = useNavigation();
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
  const [isloding, setIsloding] = useState(false);
  const [categoryArr, setCategoryArr] = useState([]);
  const [flashSalesArr, setFlashSalesArr] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [advertisementsArr, setAdvertisementsArr] = useState([]);
  const {height, width} = useWindowDimensions();

  const focused = useIsFocused();

  const [blogsArr, setBlogsArr] = useState([]);
  const [blogVideoArr, setBlogVideoArr] = useState([]);

  const handleGetBlogs = async () => {
    try {
      let {data: res} = await getBlogApi();
      if (res.data) {
        // console.log(res.data, 'res.data');
        setBlogsArr(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetBlogVideo = async () => {
    try {
      let {data: res} = await getBlogVideoApi();
      if (res.data) {
        setBlogVideoArr(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (focused) {
      handleGetBlogs();
      handleGetBlogVideo();
    }
  }, [focused]);

  const handleSubmitRequirement = async () => {
    try {
      // alert("Asd")
      if (name == '') {
        errorToast('Name cannot be empty');
        return;
      }
      if (phone == '') {
        errorToast('Mobile number cannot be empty');
        return;
      }
      if (address == '') {
        errorToast('Address cannot be empty');
        return;
      }
      if (productName == '') {
        errorToast('Product cannot be empty');
        return;
      }

      let obj = {
        name,
        phone,
        address,
        productName,
      };

      let {data: res} = await addUserRequirement(obj);

      if (res.message) {
        toastSuccess(res.message);
        setName('');
        setPhone('');
        setAddress('');
        setProductName('');
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetSubscriptions = async () => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() - 1); // even 32 is acceptable
      let endDate = `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1 < 10 ? '0' : '') + (tomorrow.getMonth() + 1)}-${(tomorrow.getDate() + 1 < 10 ? '0' : '') + tomorrow.getDate()}`;

      let {data: res} = await getAllFlashSales('endDate=' + endDate);
      if (res.data) {
        // console.log(res.data, "flash sales")
        setFlashSalesArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleNestedcategories = async () => {
    setIsloding(true)
    try {
      let {data: res} = await getAllCategories('level=1');
      if (res.data && res.data?.length > 0) {
        setCategoryArr(res.data);
        setIsloding(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAdvvertisementForHomepage = async () => {
    try {
      let {data: res} = await getForHomepage();
      if (res.data) {
        // console.log(res.data, "data")
        setAdvertisementsArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };
  useEffect(() => {
    if (focused) {
      handleGetAdvvertisementForHomepage();
      handleNestedcategories();
      handleGetSubscriptions();
    }
  }, [focused]);

  const generateRandomDigits = () => {
    return Math.floor(Math.random() * (3 - 0 + 1)) + 0;
  };

  const categoryColorArr = [
    {
      bacolor: '#FFF9E6',
      bgimgcolor2: '#FFE6E6',
    },
    {
      bgimgcolor2: '#DBE8FF',
      bacolor: '#DFF2FF',
    },
    {
      bgimgcolor2: '#FFE8FD',
      bacolor: '#FFE6E6',
    },
    {
      bgimgcolor2: '#FFE8FD',
      bacolor: '#FFE6E6',
    },
  ];

  const rendercategory = ({item, index}) => {
    // console.log(JSON.stringify(item, null, 2), "item")
    return (
      <>
      {
        isloding ? 
        <ShimmerPlaceHolder style={{width:wp(50), height:hp(27), marginRight:10}}    />

        :
        <TouchableOpacity
          onPress={() => navigate.navigate('BottomBar', {screen: 'Shop', params: {data: item?._id}})}
          // style={[styles1.categorybix, {width: wp(75), marginRight:wp(4), paddingBottom: 50, elevation:2, backgroundColor: categoryColorArr[generateRandomDigits()].bacolor, display: 'flex', justifyContent: 'center', alignItems: 'center'}]}>
          style={[styles1.categorybix, {width: wp(60), marginRight: wp(4), overflow: 'hidden', paddingBottom: 50, elevation: 2, backgroundColor: '#FFF9E6', display: 'flex', justifyContent: 'center', alignItems: 'center'}]}>
          <Image source={{uri: generateImageUrl(`${item?.image}`)}} style={[styles1.imgsize, {borderRadius: 10}]} resizeMode="center" />
          <Text style={styles1.centername}>{item.name}</Text>
        </TouchableOpacity>
       } 
      
        
      </>
    );
  };

  const renderHighlights = ({item, index}) => {
    return (
      <Pressable onPress={() => navigate.navigate('Productdetails', {data: item.productSlug})} style={styles1.boxproduct}>
        <Image source={require('../../assets/img/call.png')} style={styles1.imgphone} />
        {item.isVideo ? (
          <Video source={{uri: generateImageUrl(item.image)}} style={{height: 140, width: '100%'}} resizeMode="cover" loop paused={false} />
        ) : (
          // <AutoHeightWebView
          //   //               javaScriptEnabled={true}
          //   //               scrollEnabled={false}
          //   //               allowsFullscreenVideo={true}
          //   //               userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
          //   //  (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          //   source={{uri: generateImageUrl(item.image)}}
          //   style={{height: 170, width: '100%'}}
          // />
          <Image source={{uri: generateImageUrl(item.image)}} style={styles1.imgfluid} />
        )}
        <View style={styles1.infoproduct}>
          <Text style={styles1.producthead}>{item.message}</Text>
        </View>
      </Pressable>
    );
  };

  const renderProduct = ({item, index}) => {
    return (
      <Pressable onPress={() => navigate.navigate('Productdetails', {data: item.slug})} style={styles1.boxproduct}>
        <Image source={require('../../assets/img/call.png')} style={styles1.imgphone} />
        <Image source={{uri: generateImageUrl(item.mainImage)}} style={styles1.imgfluid} />
        <View style={styles1.infoproduct}>
          <Text style={styles1.producthead}>{item.name}</Text>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles1.producthead, {textDecorationLine: 'line-through'}]}>₹{item?.price}</Text>
            <Text style={[styles1.producthead, {color: '#B08218', paddingLeft: 5}]}>₹{item?.sellingprice}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderSale = ({item, index}) => {
    return (
      <Pressable style={styles1.boxproduct} onPress={() => navigate.navigate('Productdetails', {data: item?.productId?.slug})}>
        <View style={{position: 'relative'}}>
          <Image source={{uri: generateImageUrl(item?.productId?.mainImage)}} style={styles1.imgfluid} />
          <View style={{position: 'absolute', height: '100%', width: '100%', zIndex: 100, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>Ends on</Text>
            <Text style={{color: 'white'}}>{moment(item.startDate).format('DD / MM / YYYY')}</Text>
          </View>
        </View>
        <View style={[styles1.infoproduct]}>
          <Text style={[styles1.producthead,{textAlign:'left', marginBottom:4, fontFamily:'Manrope-Bold'}]}>{item?.productId?.name}</Text>
          <View style={{display: 'flex', flexDirection: 'column', gap: 3}}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 3}}>
              <Text style={[styles1.producthead, {textDecorationLine: 'line-through'}]}>₹{item?.price}</Text>
              <Text style={{fontSize: 9}}>{item.pricetype ? item.pricetype  : ' Sq Ft' }</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', gap: 1}}>
              <Text style={[styles1.producthead, {color: '#B08218', paddingLeft: 5}]}>₹{item?.salePrice}</Text>
              <Text style={{fontSize: 9, color: '#B08218'}}>{item.pricetype ? item.pricetype  : 'Sq Ft' }</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderBlogs = ({item, index}) => {
    return (
      <View style={{width: wp(65), borderColor: 'rgba(0,0,0,0.2)', marginRight: 10, borderWidth: 1, borderRadius: 10, overflow: 'hidden'}}>
        <Image source={{uri: generateImageUrl(item.image)}} style={{height: hp(17), width: wp(65), borderTopLeftRadius: 10, borderTopRightRadius: 10}} resizeMode="stretch" />
        <View style={{paddingHorizontal: 10}}>
          <Text style={{marginTop: 10, color: '#fcaf17'}}>{item?.name}</Text>
          <TouchableOpacity onPress={() => navigate.navigate('BlogDetails', {data: item._id})}>
            <Text style={{color: '#000', marginTop: 10, marginBottom: 10}}>
              Read More <AntDesign name="arrowright" color="#000" size={15} />{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderVideo = ({item, index}) => {
    return (
      <>
        <View style={{width: wp(85), marginRight: 10}}>
          <YoutubePlayer height={200} play={false} videoId={item.url?.split('embed/')[1]} style={{resizeMode: 'cover', borderRadius: 20}} />

          {/* <AutoHeightWebView
          //           javaScriptEnabled={true}
          //           scrollEnabled={false}
          //           allowsFullscreenVideo={true}
          //           userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
          //  (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          source={{uri: item.url}}
          style={{height: 250, width: '100%'}}
        /> */}
          <Text style={{marginTop: -2, color: '#b08218', fontSize: 12, textAlign: 'center'}}>{item?.name}</Text>
        </View>
      </>
    );
  };

  // const flatlistref = useRef(null);

  // const handelscroll1 = index => {
  //   let scrollviewflat = flatlistref.current;
  //   let newindex = index;
  //   console.log(newindex, 'chk index');
  //   scrollviewflat.scrollToIndex({animated: true, index: newindex});
  // };

  // const sliderimg = [
  //   {
  //     img: require('../../assets/img/Image.png'),
  //   },
  //   {
  //     img: require('../../assets/img/headerimg.png'),
  //   },
  //   {
  //     img: require('../../assets/img/videoimg.png'),
  //   },
  //   {
  //     img: require('../../assets/img/Image.png'),
  //   },
  // ];

  return (
    <>
      <View style={[styles.padinghr, styles.bgwhite]}>
        <FlatList
        showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          //Header to show above listview
          removeClippedSubviews={true}
          ListHeaderComponent={
            <>
              <Header slidersection />
            </>
          }
          //Footer to show below listview
          ListFooterComponent={
            <>
              {/* <View style={{width: width}}>
                <FlatList
                  data={sliderimg}
                  ref={flatlistref}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  pagingEnabled
                  renderItem={({item, index}) => {
                    return (
                      <View style={{width: width}}>
                        <Image source={item.img} style={{height: hp(30), width: wp(95), resizeMode: 'contain'}} />
                      </View>
                    );
                  }}
                />

                <FlatList
                  data={sliderimg}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  // pagingEnabled
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity onPress={() => handelscroll1(index)} style={{marginRight: wp(10)}}>
                        <Image source={item.img} style={{height: wp(20), width: wp(20), resizeMode: 'contain'}} />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View> */}

              <Pressable Pressable onPress={() => navigate.navigate('Categories')}>
                <Text style={[styles1.headingmain, {marginBottom: 15}]}> Product Categories</Text>
              </Pressable>

              <FlatList
                data={categoryArr}
                keyExtractor={(item, index) => `${index}`}
                horizontal
                // numColumns={2}
                renderItem={rendercategory}
                // columnWrapperStyle={{justifyContent: 'space-between'}}
                // scrollEnabled={false} style={{width: '100%'}}
                contentContainerStyle={{paddingVertical: 5, paddingBottom: 10}}
              />

              <View style={styles1.flexbetwen}>
                <Text style={styles1.headingmain}>New Products</Text>
                <Pressable onPress={() => navigate.navigate('AllProducts', {type: ''})}>
                  <Text style={styles1.viewall}>View All</Text>
                </Pressable>
              </View>
              <FlatList style={styles.mttop10} contentContainerStyle={{paddingTop: 5, paddingBottom: 10}} data={advertisementsArr} horizontal renderItem={renderHighlights} keyExtractor={(item, index) => `${index}`} />

              <View style={styles1.flexbetwen}>
                <Text style={styles1.headingmain}>Flash Sales</Text>
                <Pressable onPress={() => navigate.navigate('AllProducts')}>
                  <Text style={styles1.viewall}>View All</Text>
                </Pressable>
              </View>
              <FlatList style={styles.mttop10} contentContainerStyle={{paddingTop: 5, paddingBottom: 10}} data={flashSalesArr} horizontal renderItem={renderSale} keyExtractor={(item, index) => `${index}`} />

              {/* <View style={[styles1.flexbetwen, {width: wp(95)}]}>
                <Text style={[styles1.headingmain]}>Our Blogs </Text>
                <TouchableOpacity onPress={() => navigate.navigate('Blogs')}>
                  <Text style={styles1.viewall}>View All</Text>
                </TouchableOpacity>
              </View> */}

                <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginBottom:10, }}>
                  <Text  style={[styles1.headingmain]}>Our Blogs</Text>
                  <TouchableOpacity onPress={() => navigate.navigate('Blogs')}>
                  <Text style={styles1.viewall}>View All</Text>
                  </TouchableOpacity>
                </View>

              <FlatList contentContainerStyle={{paddingTop: 5, paddingBottom: 10}} data={blogsArr} horizontal renderItem={renderBlogs} keyExtractor={(item, index) => `${index}`} />

              <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginBottom:10, marginTop:10,}}>
                  <Text  style={[styles1.headingmain]}>Our Videos</Text>
                  <TouchableOpacity onPress={() => navigate.navigate('Blogs')}>
                  <Text style={styles1.viewall}>View All</Text>
                  </TouchableOpacity>
                </View>
              <FlatList style={styles.mttop10} contentContainerStyle={{paddingTop: 5, paddingBottom: 10}} data={blogVideoArr} horizontal renderItem={renderVideo} keyExtractor={(item, index) => `${index}`} />

              {/* <FlatList data={categoryProductBelowArr} renderItem={renderCategoryContainer} keyExtractor={(item, index) => `${index}`} /> */}
              <Text style={[styles1.textqoute, {marginTop: hp(3)}]}>Get free quotes </Text>
              <Text style={styles1.textqoute}>from multiple sellers</Text>
              <View style={[styles1.flexevenely, {gap: 10}]}>
                <View style={[styles.flex1, styles1.col4]}>
                  <View style={{width: wp(15), height: wp(15), backgroundColor: '#b08218', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <MaterialCommunityIcons name="message-processing" size={19} color="#fff" />
                  </View>
                  <Text style={styles1.tellcontnt}>Tell us what You Need</Text>
                </View>

                <View style={[styles.flex1, styles1.col4]}>
                  <View style={{width: wp(15), height: wp(15), backgroundColor: '#b08218', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FontAwesome name="money" size={19} color="#fff" />
                  </View>
                  <Text style={styles1.tellcontnt}>Receive free quotes from sellers</Text>
                </View>

                <View style={[styles.flex1, styles1.col4]}>
                  <View style={{width: wp(15), height: wp(15), backgroundColor: '#b08218', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FontAwesome5 name="handshake" size={19} color="#fff" />
                  </View>
                  <Text style={styles1.tellcontnt}>Seal The Deal</Text>
                </View>
              </View>
              <Text
                style={[
                  styles1.textqoute,
                  {
                    marginVertical: 15,
                    color: '#E7B84E',
                    fontSize: 20,
                    marginBottom: 16,
                  },
                ]}>
                Tell us your Requirement
              </Text>
              <TextInput
                style={styles1.mbboot}
                mode="outlined"
                label="Enter Your Name"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#848993',
                    accent: '#ffffff',
                    primary: '#848993',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
                onChangeText={e => setName(e)}
                value={name}
              />
              <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setPhone(e)}
                value={phone}
                maxLength={10}
                keyboardType={'numeric'}
                label="Enter your mobile number"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#848993',
                    accent: '#ffffff',
                    primary: '#848993',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              />
              <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setAddress(e)}
                value={address}
                label="Enter your address"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#848993',
                    accent: '#ffffff',
                    primary: '#848993',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              />
              <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setProductName(e)}
                value={productName}
                label="Enter Product / Service name"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#f5f5f5',
                    accent: '#ffffff',
                    primary: '#666666',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                    fontSize: 8,
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              />

              <TouchableOpacity onPress={() => handleSubmitRequirement()} style={[styles.btnbg, {marginBottom: 50}]}>
                <Text style={styles.textbtn}>Submit Requirement </Text>
              </TouchableOpacity>
            </>
          }
        />
      </View>
    </>
  );
}
const styles1 = StyleSheet.create({
  mbboot: {
    fontSize: 13,
    marginBottom: 10,
    fontFamily: 'Outfit-Medium',
  },
  tellcontnt: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
    fontFamily: 'Manrope-Regular',
  },
  col4: {
    alignItems: 'center',
  },
  imgresponsive: {
    width: wp(20),
    height: hp(10),
  },
  flexevenely: {
    marginTop: 10,
    display: 'flex',
    // alignItems:'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  textqoute: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Manrope-Medium',
    marginBottom: 5,
    fontSize: 18,
  },
  btnstart: {
    backgroundColor: '#fff',
    borderColor: '#6193B5',
    marginTop: 12,
    padding: 6,
    textAlign: 'center',
    fontSize: 9,
    width: wp(30),
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'Manrope-Regular',
  },
  textcenter: {
    color: '#6193B5',
    fontSize: 10,
    textAlign: 'center',
  },
  pgre: {
    color: '#888888',
    fontFamily: 'Manrope-Light',
    fontSize: 10,
  },
  headngsell: {
    color: '#000',
    fontFamily: 'Manrope-Regular',
    marginBottom: 5,
  },
  imgflex1: {
    flex: 1,
    width: wp(26),
    height: hp(13),
  },
  flexontent: {
    flex: 2,
  },
  morebox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#ebf4fa',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  morebox1: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#E4EFEC',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  morebox2: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#F8ECF0',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },

  logobrands: {
    width: 90,
    height: 60,
  },
  imgrounder: {
    width: wp(20),
    height: hp(10),
  },
  cityname: {
    textAlign: 'center',
  },
  sqirft: {
    fontSize: 10,
    color: '#8E8E8E',
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
  imgsize: {
    width: wp(100),
    height: wp(40),
  },
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
  logoheader: {
    width: wp(40),
    height: hp(8),
  },
  headermain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowflex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  bgimgcolor: {
    backgroundColor: 'red',
    width: wp(),
  },
  categorystyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col6: {
    width: wp(46),
  },
  categorybix: {
    backgroundColor: '#FFF9E6',
    borderRadius: 10,
    marginBottom: 15,
    // padding: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  categorybix2: {
    backgroundColor: '#ffe6e6',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    minHeight: 150,

    position: 'relative',
  },
  centername: {
    position: 'absolute',
    bottom: 15,
    color: '#000',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  youtube: {
    height: 300,
    resizeMode: 'cover',
  },
});

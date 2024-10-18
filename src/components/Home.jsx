import { useIsFocused, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { FlatList, Linking, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, useWindowDimensions, Alert, TextInput, ScrollView, RefreshControl } from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { isAuthorisedContext } from '../navigation/Stack/Root';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/stylecomponents/Style';
import Header from '../ReusableComponents/Header';
import { GetDealershipOpportunities, getForHomepage } from '../services/Advertisement.service';
import { getBlogApi } from '../services/Blog.service';
import { getBlogVideoApi } from '../services/BlogVideo.service';
import { getAllCategories } from '../services/Category.service';
import { getAllFlashSales } from '../services/FlashSales.service';
import { addUserRequirement } from '../services/UserRequirements.service';
import { generateImageUrl } from '../services/url.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { checkForValidSubscriptionAndReturnBoolean, getDecodedToken, getUserById, getUserUserById, topProfilesHomePage } from '../services/User.service';
// import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import LikeProduct from '../ReusableComponents/ProductsYouMayLike';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import CustomButton from '../ReusableComponents/CustomButton';
import NewArrivalProductCard from '../ReusableComponents/NewArrivalProductCard';
import TopProfilesCard from '../ReusableComponents/TopProfilesCard';
import CustomSearchComponent from '../ReusableComponents/CustomSearchComponent';
import CustomTextInputField from '../ReusableComponents/CustomTextInputField';
import CategorySlider from '../ReusableComponents/CategorySlider';
import StartBusinessBanner from '../ReusableComponents/StartBusinessBanner';
import BlogsItem from '../ReusableComponents/BlogsItem';
import BottomBanner from '../ReusableComponents/BottomBanner';
import TopProfileHomeCard from '../ReusableComponents/TopProfileHomeCard';
import ZoomInfiniteScrollImplementation from '../ReusableComponents/ZoomInfiniteScrollImplementation';
import Carousel from 'react-native-snap-carousel';
import StateItem from '../ReusableComponents/StateItem';
import FlashSaleComponent from '../ReusableComponents/FlashSaleComponent';
import AddOpportunitiesHomeBanner from '../ReusableComponents/AddOpportunitiesHomeBanner';
import FadeRibbonText from '../ReusableComponents/FadeRibbon';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import CustomColors from '../styles/CustomColors';
import FlashSaleItemWithDiscount from '../ReusableComponents/FlashSaleItemWithDiscount';
import NewArrivalProductCardVertical from '../ReusableComponents/NewArrivalProductCardVertical';
import OpportunitiesItem from '../ReusableComponents/OpportunitiesItem';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';
import { getProductYouMayLike, searchHomeProduct } from '../services/Product.service';
import { stateDetails } from '../services/State.service';
import debounce from 'lodash.debounce';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home() {
  const navigate = useNavigation();
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const [isloding, setIsloding] = useState(false);
  const [applyFormModal, setApplyFromModal] = useState(false);
  const [categoryArr, setCategoryArr] = useState([]);
  const [flashSalesArr, setFlashSalesArr] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [location, setLocation] = useState('');
  const [queryy, setQuery] = useState('');
  const [brand, setBrand] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [Role, setRole] = useState('');
  const [loading, setloading] = useState(false);
  const [advertisementsArr, setAdvertisementsArr] = useState([]);
  const [topprofiles, settopprofiles] = useState([]);
  const [stateDetailss, setstateDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { height, width } = useWindowDimensions();
  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const [isAuthorized] = useContext(isAuthorisedContext);
  const focused = useIsFocused();

  const [blogsArr, setBlogsArr] = useState([]);
  const [oppdata, setoppdata] = useState([]);
  const [blogVideoArr, setBlogVideoArr] = useState([]);
  const [likeproductarray, setlikeproductarray] = useState([]);
  const [addressInFromFiled, setAddressInFormFiled] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  useEffect(() => {
    const showToast = () => {
      Toast.show({
        type: 'error',
        text1: 'Reload',
        text2: 'for new updates!',
        position: 'top',
        visibilityTime: 3000, // Toast visible for 3 seconds
      });
    };

    let intervalId;

    if (focused) {
      // Start the interval when the screen is focused
      intervalId = setInterval(() => {
        showToast();
      }, 60000); // Every 1 minute
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [focused]);
  useEffect(() => {
    if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      const timer = setTimeout(() => {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Subscription',
              style: 'default',
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Skip for now',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
      }, 20000); // 20 seconds delay
  
      return () => clearTimeout(timer); // Clear timeout if the component is unmounted
    }
  }
  }, [currentUserHasActiveSubscription]);
// const handleSearch = (query) => {
//   if (query) {
//     const filtered = datas.filter((item) =>
//       item.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredData(filtered);
//   } else {
//     setFilteredData(datas); // Show full list if query is empty
//   }
// };
const handleSearch = async (query) => {
  setIsLoading(true)
  setQuery(query)
  // query = query.trim();
  if (query != '' && query?.length > 1) {
    try {


      let { data: res } = await searchHomeProduct(query);
      if (res.data) {
        setFilteredData(res.data);
        setIsLoading(false)
        setSearchQuery(false)
        if (filteredData.length === 0) {
          setSearchQuery(true)
          setIsLoading(false)
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  } else {
    setFilteredData([])
    setIsLoading(false)
    setSearchQuery(false)
  }
};

// Debounced search function (waits 300ms after user stops typing)
// const debouncedSearch = useCallback(
//   debounce((query) => handleSearch(query), 10),
//   []
// );

// const handleInputChange = (text) => {
//   setQuery(text)
//   debouncedSearch(text);
//   // setIsLoading(true) // Call debounced search function
//   // setSearchQuery(true);
//   if (!text) {
//     setSearchQuery(false);
//   }

// };

const gotosearchlist = () => {
  if (filteredData.length === 1) {
    setSearchQuery(false)
    gototopprofile(filteredData[0])
    setQuery('')

  } else {
    setSearchQuery(false)
    navigate.navigate('SearchScreen', { Data: queryy })
    setQuery('');
    setFilteredData([])
  }
}
const renderItem = ({ item }) =>
(
  <View style={{ flex: 1, width: wp(80), borderBottomWidth: 1, borderBottomColor: '#CDC2A1' }}>
    <TouchableOpacity style={stylesSearch.item} onPress={() => { gototopprofile(item); setQuery(''); setSearchQuery(false) }}>
      <Text style={stylesSearch.itemText}>{item?.companyObj?.name}</Text>
    </TouchableOpacity>
  </View>
);

const renderItem1 = ({ item }) =>

(
  <View style={{ flex: 1, width: wp(80), borderBottomWidth: 1, borderBottomColor: '#CDC2A1' }}>
    <TouchableOpacity style={stylesSearch.item} onPress={() => { gotoSearch(item); setQuery(''); setSearchQuery(false) }}>
      <Text style={stylesSearch.itemText}>{item?.companyObj?.name}</Text>
    </TouchableOpacity>
  </View>
);


const handleGetBlogs = async () => {
  try {
    let { data: res } = await getBlogApi();
    if (res.data) {
      setBlogsArr(res.data);
    }
  } catch (err) {
  }
};
const handleopportunitydata = async () => {
  try {
    let { data: res } = await GetDealershipOpportunities();
    if (res.data) {
      setoppdata(res.data);
    }
  } catch (err) {
    console.log(err);
  }
};
const gototopprofile = (item) => {
  // if (isAuthorized) {
  //   if (!currentUserHasActiveSubscription) {
  //     Alert.alert(
  //       'Subscription Required',
  //       'You do not have a valid subscription to perform this action.',
  //       [
  //         {
  //           text: 'Go to Subscriptions',
  //           style: { color: "red" },
  //           onPress: () => navigate.navigate('Subscriptions', { register: false }),
  //         },
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //       ],
  //       { cancelable: true }
  //     );
  //     return;
  //   }
  //   // Linking.openURL(tel:${phone});
  navigate.navigate('Supplier', { data: item })
  setFilteredData([])


  // }
  // else {
  //   Alert.alert(
  //     'Login Required',
  //     'Please login to access this feature.',
  //     [
  //       {
  //         text: 'Go to Login',
  //         onPress: () => navigate.navigate('Login'),
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // }
};
const gotoSearch = () => {
  // if (isAuthorized) {
  //   if (!currentUserHasActiveSubscription) {
  //     Alert.alert(
  //       'Subscription Required',
  //       'You do not have a valid subscription to perform this action.',
  //       [
  //         {
  //           text: 'Go to Subscriptions',
  //           style: { color: "red" },
  //           onPress: () => navigate.navigate('Subscriptions', { register: false }),
  //         },
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //       ],
  //       { cancelable: true }
  //     );
  //     return;
  //   }
  //   // Linking.openURL(tel:${phone});
  navigate.navigate('SearchScreen', { Data: queryy })
  setFilteredData([])
  // }
  // else {
  //   Alert.alert(
  //     'Login Required',
  //     'Please login to access this feature.',
  //     [
  //       {
  //         text: 'Go to Login',
  //         onPress: () => navigate.navigate('Login'),
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // }
};
const getauthuser = async () => {
  let decoded = await getDecodedToken();
  if (decoded) {
    setRole(decoded.role)
  }
};

const handleGetBlogVideo = async () => {
  try {
    let { data: res } = await getBlogVideoApi();
    if (res.data) {
      setBlogVideoArr(res.data);
    }
  } catch (err) {
    console.log(err);
  }
};
const handleproductyoumaylike = async () => {
  try {
    let { data: res } = await getProductYouMayLike();
    if (res.data) {
      setlikeproductarray(res.data);
      setRefreshing(false);
    }
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  if (focused) {
    // handleInputChange();
    handleGetBlogs();
    handleGetBlogVideo();
    handleproductyoumaylike();
    handleopportunitydata();
    handlestates();
    getauthuser();

  }
}, []);

const handleSubmitRequirement = async () => {
  try {
    if (name == '') {
      errorToast('Name cannot be empty');
      return;
    }
    if (phone == '') {
      errorToast('Mobile number cannot be empty');
      return;
    }
    if (addressInFromFiled == '') {
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
    setloading(true)
    let { data: res } = await addUserRequirement(obj);

    if (res.message) {
      console.log('xxxxxxx', res.message)
      toastSuccess(res.message);
      setloading(false)
      // Alert.alert(res.message)
      setName('');
      setPhone('');
      setAddressInFormFiled('');
      setProductName('');
    }
  } catch (err) {
    errorToast(err);
    setloading(false)
  }
};
const handleApplySubmitRequirement = async () => {
  setApplyFromModal(true)
  try {
    if (organizationName == '') {
      errorToast('Name cannot be empty');
      return;
    }
    if (productName == '') {
      errorToast(' Product Name cannot be empty');
      return;
    }
    if (type == '') {
      errorToast('Type number cannot be empty');
      return;
    }
    if (brand == '') {
      errorToast('Brand cannot be empty');
      return;
    }
    if (location == '') {
      errorToast('Location cannot be empty');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorToast('Product cannot be empty');
      return;
    }


    let obj = {
      name,
      phone,
      address,
      productName,
    };

    let { data: res } = await addUserRequirement(obj);

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



const handelcallbtn = (phone) => {
  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigate.navigate('Subscriptions', { register: false }),
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
  } else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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
useEffect(() => {
  HandleCheckValidSubscription();
}, [isAuthorized])

const HandleCheckValidSubscription = async () => {
  try {
    let decoded = await getDecodedToken();
    console.log('decoded', decoded);

    setCurrentUserId(decoded?.userId)
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
const handleGetSubscriptions = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1); // even 32 is acceptable
    let endDate = `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1 < 10 ? '0' : '') + (tomorrow.getMonth() + 1)}-${(tomorrow.getDate() + 1 < 10 ? '0' : '') + tomorrow.getDate()}`;

    let { data: res } = await getAllFlashSales('endDate=' + endDate);
    if (res.data) {
      setFlashSalesArr(res.data);
      console.log('flashArr', JSON.stringify(res.data))
      console.log('flashArr', res.data.length)

    }
  } catch (err) {
    errorToast(err);
  }
};

const handleNestedcategories = async () => {
  setIsloding(true);
  try {
    let { data: res } = await getAllCategories('level=1');
    if (res.data && res.data?.length > 0) {
      setCategoryArr(res.data);
      setIsloding(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetAdvvertisementForHomepage = async () => {
  try {
    let { data: res } = await getForHomepage();
    if (res.data) {
      setAdvertisementsArr(res.data);

    }
  } catch (err) {
    errorToast(err);
  }
};
const handletopProfiles = async () => {
  try {
    let { data: res } = await topProfilesHomePage();
    if (res.data) {

      settopprofiles(res.data);

    }
  } catch (err) {
    errorToast(err);
  }
};
const handlestates = async () => {
  try {
    let { data: res } = await stateDetails();
    if (res.data) {

      setstateDetails(res.data);


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
    handletopProfiles();
  }
}, []);

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

const rendercategory = ({ item, index }) => {
  // console.log(JSON.stringify(item, null, 2), "item")
  return (
    <>
      {isloding ? (
        <ShimmerPlaceHolder style={{ width: wp(50), height: hp(27), marginRight: 10 }} />
      ) : (
        <TouchableOpacity
          onPress={() => navigate.navigate('BottomBar', { screen: 'Shop', params: { data: item?._id } })}
          // style={[styles1.categorybix, {width: wp(75), marginRight:wp(4), paddingBottom: 50, elevation:2, backgroundColor: categoryColorArr[generateRandomDigits()].bacolor, display: 'flex', justifyContent: 'center', alignItems: 'center'}]}>
          style={[styles1.categorybix, { width: wp(60), marginRight: wp(4), overflow: 'hidden', paddingBottom: 50, elevation: 2, backgroundColor: '#FFF9E6', display: 'flex', justifyContent: 'center', alignItems: 'center' }]}>
          <Image source={{ uri: generateImageUrl(`${item?.image}`) }} style={[styles1.imgsize, { borderRadius: 10 }]} resizeMode="center" />
          <Text style={styles1.centername}>{item.name}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
const rendercategorySlider = ({ item, index }) => {
  // console.log(JSON.stringify(item, null, 2), "item")
  return <>{isloding ? <ShimmerPlaceHolder style={{ width: wp(50), height: hp(27), marginRight: 10 }} /> : <CategorySlider data={categoryArr}></CategorySlider>}</>;
};
const GotoFlash = () => {
  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigate.navigate('Subscriptions', { register: false }),
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
    navigate.navigate('AddFlashSales')

  }
  else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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
const GotoFlashSaleCallIcon = (item) => {
  console.log('calldta', item.productId.createdByObj.phone);

  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigate.navigate('Subscriptions', { register: false }),
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
    handelcallbtn(item?.productId?.createdByObj?.phone)
  }
  else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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
const FlashSaleProduct = (item) => {


  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigate.navigate('Subscriptions', { register: false }),
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
    navigate.navigate('Productdetails', { data: item?.productId?.slug })
  }
  else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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
const GotoGetQuote = (item) => {
  if (isAuthorized) {
    navigate.navigate('Productdetails', { data: item?.product?.slug })
  }
  else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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

const renderProductsYouMayLike = ({ item, index }) => {
  return <LikeProduct imagePath={item?.product?.mainImage && item?.product?.mainImage != " " ? { uri: generateImageUrl(item?.product?.mainImage) } : require('../../assets/img/logo_1.png')} dataItem={item} name={item.productName} location={item.cityName} onCallPress={() => handelcallbtn(item.createdByObj.companyObj.phone)} onGetQuotePress={() => { GotoGetQuote(item) }} onPress={() => navigate.navigate('Productdetails', { data: item?.product?.slug })} />

};

const renderNewArrivals = ({ item, index }) => {
  console.log('zxcv', JSON.stringify(item))
  // return <NewArrivalProductCardVertical horizontal newProductItem={{ imagePath: require('../../assets/img/ply_sample.png'), isVerified: true, name: item.productSlug, location: 'Nashik' }} ></NewArrivalProductCardVertical>;
  return <NewArrivalProductCardVertical horizontal newProductItem={item} image={item?.image && item?.image != "" ? { uri: generateImageUrl(item?.image) } : require('../../assets/img/logo_1.png')} onPress={() => navigate.navigate('Productdetails', { data: item.productSlug })} onCallPress={() => handelcallbtn(item?.phone)}></NewArrivalProductCardVertical>;
};



const renderFlashSale = ({ item, index }) => {
  console.log('itemitem', item);

  return (
    <View style={{ marginHorizontal: wp(1) }}>
      <FlashSaleItemWithDiscount imagePath={item?.productId?.mainImage && item?.productId?.mainImage != "" ? { uri: generateImageUrl(item?.productId?.mainImage) } : require('../../assets/img/logo_1.png')}
        actualPrice={item?.price}
        name={item?.productId?.name}
        salePrice={item?.salePrice}
        duration={10}
        offPercentage={item?.discountValue}
        discountType={item?.discountType}
        EndDate={item?.endDate}
        onCallPress={() => { console.log('CallPressCalled'), GotoFlashSaleCallIcon(item) }}
        onCardPress={() => { console.log('CardPressCalled'), FlashSaleProduct(item) }}
      ></FlashSaleItemWithDiscount>
    </View>
  );
};

const renderSale = ({ item, index }) => {
  return (
    <Pressable style={styles1.boxproduct} onPress={() => navigate.navigate('Productdetails', { data: item?.productId?.slug })}>
      <View style={{ position: 'relative' }}>
        <Image source={{ uri: generateImageUrl(item?.productId?.mainImage) }} style={styles1.imgfluid} />
        <View style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 100, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Ends on</Text>
          <Text style={{ color: 'white' }}>{moment(item.startDate).format('DD / MM / YYYY')}</Text>
        </View>
      </View>
      <View style={[styles1.infoproduct]}>
        <Text style={[styles1.producthead, { textAlign: 'left', marginBottom: 4, fontFamily: 'Manrope-Bold' }]}>{item?.productId?.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Text style={[styles1.producthead, { textDecorationLine: 'line-through' }]}>₹{item?.price}</Text>
            <Text style={{ fontSize: 9 }}>{item.pricetype ? item.pricetype : ' Sq Ft'}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Text style={[styles1.producthead, { color: '#B08218', paddingLeft: 5 }]}>₹{item?.salePrice}</Text>
            <Text style={{ fontSize: 9, color: '#B08218' }}>{item.pricetype ? item.pricetype : 'Sq Ft'}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};



const renderBlogs = ({ item, index }) => {
  return <BlogsItem item={item}></BlogsItem>;
};
const renderVideo = ({ item, index }) => {
  return (
    <>
      <View style={{ width: wp(85), height: wp(47), marginRight: wp(2), marginLeft: wp(2), borderRadius: 15, overflow: 'hidden' }}>
        <YoutubePlayer height={wp(47)} play={false} videoId={item.url?.split('embed/')[1]} style={{ resizeMode: 'cover', borderRadius: 20 }} />
      </View>
    </>
  );
};
const renderOpportunities = ({ item, index }) => {
  console.log('datiii', item);
  console.log('datiii', item.userId);
  console.log('datiii', currentUserId);

  if (item.userId === currentUserId) {
    return null;
  } else {
    return (
      // <OpportunitiesItem opportunityItem={{ imagePath: { uri: generateImageUrl(item.image) }, title: item.name, isExclusive: true }} onApplyPress={() => applymodal()} ></OpportunitiesItem>
      <OpportunitiesItem opportunityItem={{ imagePath: item?.image && item?.image != "" ? { uri: generateImageUrl(item?.image) } : require('../../assets/img/logo_1.png'), title: item.Brand, isExclusive: true, stateName: item?.stateName }} onApplyPress={() => { gotoApplyOpportunities(item) }} ></OpportunitiesItem>
    );
  }

};



const GotoProductspage = () => {
  navigate.navigate('AllProducts', { type: '' })
  // if (isAuthorized) {
  //   // if (!currentUserHasActiveSubscription) {
  //   //   errorToast('You do not have a valid subscription to perform this action');
  //   //   navigate.navigate('Subscriptions', { register: false })
  //   //   return 0;
  //   // }

  //   navigate.navigate('AllProducts', { type: '' })

  // }
  // else {
  //   navigate.navigate('Login')
  // }
}

const GotoAddProduct = () => {
  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigate.navigate('Subscriptions', { register: false }),
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

    navigate.navigate('AddAdvertisement')

  }
  else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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
const applymodal = () => {
  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      errorToast('You do not have a valid subscription to perform this action');
      navigate.navigate('Subscriptions', { register: false })
      return 0;
    }

    setApplyFromModal(true)

  }
  else {
    navigate.navigate('Login')
  }
}
const Gotoopportunities = () => {
  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigate.navigate('Subscriptions', { register: false }),
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

    navigate.navigate('AddDealershipOpportunitiesForm')

  }
  else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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

const gotoApplyOpportunities = (item) => {
  if (isAuthorized) {
    if (!currentUserHasActiveSubscription) {
      Alert.alert(
        'Subscription Required',
        'You do not have a valid subscription to perform this action.',
        [
          {
            text: 'Go to Subscriptions',
            style: { color: "red" },
            onPress: () => navigate.navigate('Subscriptions', { register: false }),
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

    navigate.navigate('ApplyOppFor', { Data: item })

  }
  else {
    Alert.alert(
      'Login Required',
      'Please login to access this feature.',
      [
        {
          text: 'Go to Login',
          onPress: () => navigate.navigate('Login'),
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

const handleRefresh = () => {
  setRefreshing(true);
  handleGetAdvvertisementForHomepage();
  handleNestedcategories();
  handleGetSubscriptions();
  handletopProfiles();
  //  handleInputChange();
  handleGetBlogs();
  handleGetBlogVideo();
  handleproductyoumaylike();
  handleopportunitydata();
  handlestates();
  getauthuser();

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
    <View style={[styles.bgwhite]}>

      <View style={{ alignItems: 'center', marginTop: wp(3) }}>
        {
          filteredData.length > 0 ? (
            filteredData.length === 1 && queryy !== '' ? (
              <ScrollView
                style={{
                  backgroundColor: CustomColors.searchBackground,
                  position: 'absolute',
                  zIndex: 10,
                  marginTop: wp(13),
                  padding: wp(5),
                  borderRadius: wp(5),
                  borderWidth: 1,
                  borderColor: '#CDC2A1',
                }}
              >
                <FlatList
                  data={filteredData.slice(0, 1)} // Show only 1 entry
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem} // Render single item
                  scrollEnabled={true}
                />
              </ScrollView>
            ) : (
              <ScrollView
                style={{
                  backgroundColor: CustomColors.searchBackground,
                  position: 'absolute',
                  zIndex: 10,
                  marginTop: wp(13),
                  padding: wp(5),
                  borderRadius: wp(5),
                  borderWidth: 1,
                  borderColor: '#CDC2A1',
                }}
              >
                <FlatList
                  data={filteredData.slice(0, 8)} // Show up to 10 entries
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem1} // Render multiple items
                  scrollEnabled={true}
                />
              </ScrollView>
            )
          ) : searchQuery ? (
            <View
              style={{
                backgroundColor: CustomColors.searchBackground,
                position: 'absolute',
                zIndex: 10,
                marginTop: wp(13),
                padding: wp(5),
                borderRadius: wp(5),
                borderWidth: 1,
                borderColor: '#CDC2A1',
                width: '88%',
                flex: 1,
              }}
            >
              <Text style={stylesSearch.itemText}>No results found</Text>
            </View>
          ) : null
        }





        <View style={[stylesSearch.mainContainer]}>
          <TouchableOpacity style={stylesSearch.iconContainer} onPress={() => gotosearchlist()}>
            <Image style={stylesSearch.iconImageStyle} source={require('../../assets/img/ic_search.png')}></Image>
          </TouchableOpacity>
          <TextInput
            style={stylesSearch.input}
            placeholder={'Search with  keywords'}
            onChangeText={(e) => handleSearch(e)}
            value={queryy}
          />
          <View style={{ marginHorizontal: wp(3) }}>

            {
              isLoading ?
                <ActivityIndicator size={'small'} color={CustomColors.mattBrownDark} />
                : null
            }
          </View>
        </View>


      </View>
      <View style={{ zIndex: -1 }}>
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          ListFooterComponent={
            < >
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


              <>{isloding ? <ShimmerPlaceHolder style={{ width: wp(100), height: wp(22), marginRight: 10 }} /> : <CategorySlider data={categoryArr}></CategorySlider>}</>
              {/* <FlatList style={[styles.padinghr]}
                data={categoryArr}
                keyExtractor={(item, index) => `${index}`}
                horizontal
                //  olumns={2}
                renderItem={rendercategorySlider}
                // columnWrapperStyle={{justifyContent: 'space-between'}}
                // scrollEnabled={false} style={{width: '100%'}}
                contentContainerStyle={{paddingVertical: 5, paddingBottom: 10}}
              /> */}

              <View


                style={{ marginTop: wp(5), paddingBottom: wp(5) }}
              >
                <View style={[styles.padinghr, styles1.flexbetwen, { marginBottom: wp(6) }]}>
                  {/* <FadeRibbonText colorStart={CustomColors.mattBrownDark} text={"New Arrival"} paddingHorizontal={wp(10)} fontSize={wp(6)} fontWeight={800} colorEnd='white'></FadeRibbonText> */}
                  <Text style={{ fontSize: wp(6), fontWeight: 800, color: '#000' }}>New Arrivals</Text>
                  <Pressable >

                    <CustomButtonNew textSize={wp(4)} text="Add" paddingVertical={wp(2)} paddingHorizontal={wp(6)} onPress={() => GotoAddProduct()} />
                  </Pressable>
                </View>
                <Carousel
                  data={advertisementsArr}
                  renderItem={renderNewArrivals}
                  sliderWidth={wp(100)}
                  itemWidth={wp(45)}
                  loop={true}
                  autoplay={true}
                  autoplayDelay={1000}
                  autoplayInterval={3000}
                  layout={'default'}
                  inactiveSlideScale={0.78}
                  inactiveSlideOpacity={1}
                  contentContainerStyle={{}

                  }
                />
              </View>

              <Text style={styles1.topprofiletext} >Top Profiles</Text>
              <Carousel
                data={topprofiles}
                renderItem={({ item }) => (
                  <TopProfileHomeCard title={item.companyName} image={item.bannerImage && item.bannerImage != " " ? { uri: generateImageUrl(item.bannerImage) } : require('../../assets/img/logo_1.png')} rating={item.rating} Product={item.productsCount} onPress={() => gototopprofile(item)} onCallPress={() => handelcallbtn(item?.phone)} item={item} />
                )}
                sliderWidth={wp(100)}
                itemWidth={wp(80)}
                loop={true}
                autoplay={true}
                autoplayDelay={1000}
                autoplayInterval={3000}
                layout={'default'}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={1}
                contentContainerStyle={{ marginBottom: wp(5) }}
              />








              {isAuthorized === 'false' && (
                <View style={{ marginVertical: wp(5) }}>
                  <StartBusinessBanner />
                </View>
              )}
              <LinearGradient
                colors={['#BF9F65', '#BF9F65', '#F1E8D1']} // Gradient colors (left to right)
                style={[styles1.tableimagewrap, styles1.padinghr]} // Apply the gradient to this style
                start={{ x: 0, y: 1 }} // Start point of the gradient
              // end={{ x: 1, y: 1 }}   // End point of the gradient (horizontal)
              >


                <View style={[styles1.textwrap]}>
                  <Text style={{ fontSize: wp(3.5) }}>Unlock endless possibilities</Text>
                  <Text style={{ fontSize: wp(3.5) }}>with our</Text>
                  <TouchableOpacity style={{ flexDirection: 'row', marginTop: 0 }} onPress={() => { navigate.navigate('Subscriptions', { register: false }) }}>
                    <Text style={{ fontSize: wp(4.5), color: '#FFFFFF', fontWeight: 'bold' }}>Subscription!</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: wp(1), height: wp(6), width: wp(6) }} >
                      <Image
                        source={require('../../assets/img/subicon.png')} // Replace with your image path
                        style={{ height: 25, width: 25 }}
                      />
                    </View>

                  </TouchableOpacity>

                </View>
                <View style={styles1.imagewrap}>
                  <Image
                    source={require('../../assets/img/hero2.png')} // Replace with your image path
                    style={styles1.image1}
                  />
                </View>

              </LinearGradient>
              {/* <LinearGradient

                colors={['#cc8d19', '#E0C7AD', '#F1E8D1', '#FFFFFF']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{ marginTop: wp(5), paddingBottom: wp(5) }}
              > */}
              {/* <View style={styles1.flexbetwen}> 
                <Text style={styles1.headingmain}>New Products</Text>
                <Pressable onPress={() => navigate.navigate('AllProducts', {type: ''})}>
                  <Text style={styles1.viewall}>View All</Text>
                </Pressable>
              </View>
              <FlatList style={styles.mttop10} contentContainerStyle={{paddingTop: 5, paddingBottom: 10}} data={advertisementsArr} horizontal renderItem={renderHighlights} keyExtractor={(item, index) => `${index}`} /> */}

              <View style={[styles.padinghr, styles1.flexbetwen]}>
                <Text style={[styles1.headingmain, { fontWeight: 800, color: 'black', marginBottom: wp(5) }]}>Flash Sales</Text>
                <Pressable >
                  <CustomButtonOld textSize={wp(4)} text={"Add"} onPress={() => { GotoFlash() }}></CustomButtonOld>
                </Pressable>
              </View>
              <View style={{ flexDirection: 'row', paddingHorizontal: wp(2), }}
              >
                <FlashSaleComponent style={[styles.padinghr, { position: 'absolute' }]}></FlashSaleComponent>
                <FlatList style={[styles.mttop10, { paddingHorizontal: wp(4) }]} contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }} data={flashSalesArr} horizontal renderItem={renderFlashSale} keyExtractor={(item, index) => `${index}`} />
              </View>



              <View style={[styles.padinghr, styles1.flexbetwen]}>
                <Text style={styles1.headingmain}>Products You May Like</Text>
                <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => GotoProductspage()} />
              </View>
              <FlatList
                style={styles.mttop10}
                contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }}
                data={likeproductarray}
                horizontal
                columnWrapperStyle={styles.columnWrapper} // Style for aligning columns
                renderItem={renderProductsYouMayLike}
                keyExtractor={(item, index) => `${index}`}
              />

              <View>

                <Text style={[styles1.headingmain, { marginVertical: wp(5), marginBottom: wp(5), alignSelf: 'center' }]} numberOfLines={1} ellipsizeMode="tail">States</Text>
                <Carousel
                  data={stateDetailss}
                  renderItem={({ item }) => (
                    <StateItem item={item} onPress={() => { navigate.navigate('VendorListByState', { data: item, xState: item?.stateId?._id }) }}></StateItem>
                  )}
                  sliderWidth={wp(100)}
                  itemWidth={wp(35)}
                  loop={true}
                  autoplay={true}
                  autoplayDelay={1000}

                  autoplayInterval={5000}
                  layout={'default'}
                  inactiveSlideScale={0.60}
                  inactiveSlideOpacity={0.9}
                  contentContainerStyle={{ marginBottom: wp(5) }}
                />
              </View>

              <View style={[styles.padinghr, { alignSelf: 'center', alignItems: 'center', width: '100%', height: wp(40) }]} >

                <Image source={require('../../assets/img/deal6.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
              </View>
              {
                Role === 'MANUFACTURER/IMPORTER' || Role === 'DISTRIBUTOR' ?

                  <Pressable style={{ margin: wp(2), marginVertical: wp(5) }} >
                    <CustomButtonNew textSize={wp(4)} text="Add Opportunities" paddingVertical={wp(2)} paddingHorizontal={wp(6)} onPress={() => Gotoopportunities()} />
                  </Pressable>
                  :
                  null
              }



              <FlatList data={oppdata} horizontal renderItem={renderOpportunities} keyExtractor={(item, index) => `${index}`} />






              <View style={[styles.padinghr, styles1.videoCardHome]}>

                <Text style={[styles1.headingmain]}>Videos</Text>
                <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => { navigate.navigate('Blogs', { data: false }) }} />
              </View>
              <FlatList data={blogVideoArr} horizontal renderItem={renderVideo} keyExtractor={(item, index) => `${index}`} />

              <View style={[styles.padinghr, { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: wp(7), marginBottom: 10 }]}>
                <Text style={[styles1.headingmain]}>Blogs</Text>
                <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => { navigate.navigate('Blogs', { data: true }) }} />
              </View>

              <FlatList contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }} data={blogsArr} horizontal renderItem={renderBlogs} keyExtractor={(item, index) => `${index}`} />






              <View style={styles1.containerForm}>
                <Text style={styles1.textStyle}>TELL US YOUR REQUIREMENT</Text>
                <View style={styles1.textFieldContainer}>
                  <View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Name*' onChangeText={value => setName(value)} value={name} /><View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Mobile Number*' onChangeText={(value) => {
                    const sanitizedText = value.replace(/[^0-9]/g, '').slice(0, 10);
                    setPhone(sanitizedText)
                    value = sanitizedText
                  }

                  } inputType='number' maxLength={10} value={phone} /><View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Address*' onChangeText={value => setAddressInFormFiled(value)} value={addressInFromFiled} />
                  <View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Product/Service*' onChangeText={value => setProductName(value)} value={productName} />
                  <View style={{ height: wp(1) }} />
                </View>
                <View style={styles1.btnContainer}>
                  <TouchableOpacity onPress={() => { handleSubmitRequirement() }}>
                    {loading ? <ActivityIndicator size="large" color='#ffffff' style={{ marginTop: wp(5), marginBottom: wp(5) }} />
                      :
                      <Text style={{ color: 'white', paddingVertical: wp(4), fontSize: wp(4), fontWeight: 'bold', width: '100%', textAlign: 'center' }}>SUBMIT</Text>

                    }
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginVertical: wp(40), marginTop: wp(7) }}>
                <BottomBanner></BottomBanner>
              </View>




              <Modal
                animationType="slide"
                transparent={true}
                visible={applyFormModal}
                onRequestClose={() => {
                  setApplyFromModal(!applyFormModal);
                }}>
                <View style={styles1.centeredView}>
                  <View style={styles1.containerForm}>
                    <Text style={styles1.textStyle}>Apply Form</Text>
                    <View style={styles1.textFieldContainer}>
                      <View style={{ height: wp(1) }} />
                      <CustomTextInputField placeholder='Organization Name*' onChangeText={value => setOrganizationName(value)} /><View style={{ height: wp(1) }} />
                      <CustomTextInputField placeholder='Type*' onChangeText={value => setType(value)} /><View style={{ height: wp(1) }} />
                      <CustomTextInputField placeholder='Product' onChangeText={value => setProductName(value)} /><View style={{ height: wp(1) }} />
                      <CustomTextInputField placeholder='Brand' onChangeText={value => setBrand(value)} /><View style={{ height: wp(1) }} />
                      <CustomTextInputField placeholder='Location' onChangeText={value => setLocation(value)} /><View style={{ height: wp(1) }} />
                      <CustomTextInputField placeholder='Email' onChangeText={value => setEmail(value)} inputType='email' /><View style={{ height: wp(1) }} />
                    </View>
                    <View style={styles1.btnContainer}>
                      <TouchableOpacity onPress={() => { handleApplySubmitRequirement() }}>
                        <Text style={{ color: 'white', paddingVertical: wp(4), fontSize: wp(4), fontWeight: 'bold', width: '100%', textAlign: 'center' }}>SUBMIT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => setApplyFromModal(false)} style={{ width: wp(8), height: wp(8), backgroundColor: '#fff', marginTop: 30, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/img/close.png')} style={{ width: wp(3), height: hp(3) }} resizeMode="contain" />
                  </TouchableOpacity>
                </View>

              </Modal>

            </>
          }
        />
      </View>


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
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },
  flexbetwen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: wp(5)
  },
  imgsize: {
    width: wp(100),
    height: wp(40),
  },
  sliderhome: {
    marginVertical: 15,
  },
  headingmain: {
    fontSize: wp(5),
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
  columnWrapper: {
    justifyContent: 'space-between', // Ensures spacing between columns
  },
  topProfileContainer: {
    paddingBottom: 20,
  },
  topProfileHeading: {
    paddingTop: 20,
    paddingBottom: 20,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontWeight: 600,
    fontSize: 22,
    alignSelf: 'center',
  },
  videoCardHome: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: wp(7),
    borderRadius: 50
  },
  tableimagewrap: {
    flex: 1,
    height: wp(38),
    backgroundColor: '#3498db',
    borderRadius: 30,
    // borderWidth:1,
    bordercolor: '#000000',
    marginTop: wp(15),
    marginHorizontal: wp(1),
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    justifyContent: "center"
  },
  image1: {
    width: wp(60),  // Set your desired width
    height: wp(50), // Set your desired height
    resizeMode: 'contain', // Optional: control how the image fits,
    bottom: wp(5),


  },
  imagewrap: {

    justifyContent: 'flex-end',
    alignItems: "flex-end",
    // left: 10,
    // bottom: 60
    position: 'absolute',
    alignSelf: "flex-end",
    // marginLeft:30
  },
  textwrap: {

    // alignItems: 'center',
    justifyContent: 'center',
    // top: 120,
    marginTop: wp(15),
    marginHorizontal: 15,
    width: wp(60),

  },
  centeredView: {

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  containerForm: {
    elevation: 5,
    backgroundColor: '#f4eddb',
    borderRadius: 25,
    width: wp(75),
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: wp(7)
  },
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: wp(4),
    marginTop: wp(8),
    marginBottom: wp(3),
  },
  textFieldContainer: {
    width: '85%',
    marginBottom: wp(15),
  },
  btnContainer: {
    position: 'absolute',
    backgroundColor: CustomColors.colorNewButton,
    bottom: 0,
    width: '100%',
    justifyContent: 'center'
  },
  topprofilewrap: {
    paddingVertical: wp(5)
    // alignItems: 'center',
    // justifyContent: 'center'

  },
  topprofiletext: {
    marginTop: wp(5),
    fontSize: wp(5),
    fontWeight: 'bold',
    alignSelf: "center"
  },
  imagebg: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp(10)
    // paddingLeft:wp(10)
  },
});

const stylesSearch = StyleSheet.create({

  mainContainer: {
    backgroundColor: CustomColors.searchBackground,
    borderRadius: wp(10),
    flexDirection: 'row',
    width: wp(90),
    height: wp(12.5),
    padding: wp(0.5),
    borderColor: '#CDC2A1',
    borderWidth: wp(0.3),
    alignItems: "center",
    justifyContent: "center",
    // position:'absolute'
  },
  iconContainer: {
    backgroundColor: CustomColors.mattBrownDark,
    width: wp(9),
    height: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(10),
  },
  iconImageStyle: {
    width: wp(7),
    height: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    marginHorizontal: wp(3),
    fontSize: wp(4)
  },
  item: {
    //  backgroundColor: '#f9f9f9', // Light background color
    paddingTop: 6,
    paddingHorizontal: 20, // Add padding inside the item
    borderRadius: 8, // Rounded corners
    marginBottom: 6, // Space between items
    // borderWidth: 1,

  },
  itemText: {
    fontSize: 16,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
const datas = [
  { id: '1', name: 'Laminates/Veneers' },
  { id: '2', name: 'Commercial plywood' },
  { id: '3', name: 'Block Board' },
  { id: '4', name: 'Waterproof plywood' },
  { id: '5', name: 'Decorative Laminates' },
  { id: '6', name: 'Marine Plywood' },
];
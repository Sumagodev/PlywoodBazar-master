import {ScrollView,Linking, View, Text, SafeAreaView, FlatList, Image, Pressable, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {TextInput, useTheme} from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StackRouter, useNavigation} from '@react-navigation/native';
import {generateImageUrl} from '../services/url.service';
import {getAllProducts} from '../services/Product.service';
import Header from '../navigation/customheader/Header';
import NewArrivalProductCard from '../ReusableComponents/NewArrivalProductCard';
import CustomTextInputField from '../ReusableComponents/CustomTextInputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StartBusinessBanner from '../ReusableComponents/StartBusinessBanner';
import {errorToast, toastSuccess} from '../utils/toastutill';
import { checkForValidSubscriptionAndReturnBoolean, getDecodedToken } from '../services/User.service';

export default function AllProducts(props) {
  const navigate = useNavigation();
  const [productArr, setProductArr] = useState([]);
  const [categoryid, setCategoryid] = useState('');
  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);

  const getProducts = async () => {
    try {
      let query = '';
      if (categoryid != '') {
        query += `category=${categoryid}`;
      }
      const {data: res} = await getAllProducts(query);
      if (res) {
        setProductArr(res.data);
        console.log('Allproducts',res.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
    HandleCheckValidSubscription();
  }, []);

  useEffect(() => {
    if (props?.route.params?.data) {
      setCategoryid(props?.route.params?.data);
    }
  }, [props]);
  const handelcallbtn = (phone) => {
    if (!currentUserHasActiveSubscription) {
      errorToast('You do not have a valid subscription to perform this action');
      return 0;
    }

    Linking.openURL(`tel:${phone}`);
  };
  const HandleCheckValidSubscription = async () => {
    try {
      let decoded = await getDecodedToken();
      if (decoded) {
        if (decoded?.user?.name) {
          //setName(decoded?.user?.name);
        }

        let {data: res} = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
        if (res.data) {
          console.log(
            'XX',
            res.data,
            'XX',
          );
          setCurrentUserHasActiveSubscription(res.data);
        }
      }
    } catch (err) {
      errorToast(err);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      {/* <Header stackHeader={true} screenName={'All Products'} rootProps={props} /> */}

      <Text style={styles.headingTextStyle}>All Products</Text>
      <View style={styles.searchRow}>
        <CustomTextInputField customWidth={wp(70)} placeholder="Search Here" imagePath={require('../../assets/img/ic_search.png')} inputType="text" />
        <Pressable style={styles.filterIconStyle} onPress={() => {}}>
          <Icon name="tune" size={wp(5)} color={'white'} />
        </Pressable>
      </View>
      <FlatList
  data={[...productArr, ...(productArr.length % 8 !== 0 ? ['banner-placeholder'] : [])]}
  keyExtractor={(item, index) => `${index}`}
  renderItem={({ item, index }) => {
    // Check if it's a banner placeholder
    console.log(item,'AllItem')
    if (item === 'banner-placeholder' || ((index + 1) % 8 === 0)) {
      return (
        <View>
          <NewArrivalProductCard
            imagePath={{ uri: generateImageUrl(item?.mainImage) }}
            price={item?.price}
            name={item?.name}
            location="Location"
            isVerified={item?.approved === "APPROVED"} // Check if item.approved is "APPROVED"
            onCallPressed={() => {handelcallbtn(item?.createdByObj?.companyObj?.phone)}}
            onGetQuotePressed={() => {}}
            onCardPressed={() => navigate.navigate('Productdetails', { data: item?.slug })}
          />
          <StartBusinessBanner />
        </View>
      );
    } else {
      return (
        <NewArrivalProductCard
          imagePath={{ uri: generateImageUrl(item.mainImage) }}
          price={item?.price}
          name={item.name}
          location="Location"
          isVerified={item?.approved === "APPROVED"} // Check if item.approved is "APPROVED"          onCallPressed={() => {}}
          onGetQuotePressed={() => {}}
          onCallPressed={() => {handelcallbtn(item?.createdByObj?.companyObj?.phone)}}
          onCardPressed={() => navigate.navigate('Productdetails', { data: item?.slug })}
        />
      );
    }
  }}
  scrollEnabled
  numColumns={1}
  style={{ maxHeight: hp(93), width: '100%', backgroundColor: 'white' }}
  contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: wp(2),
  },
  headingTextStyle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: wp(2),
    marginBottom: wp(5),
  },
  searchRow: {
    justifyContent: 'space-evenly',
    width: '100%',
    flexDirection: 'row',
  },
  filterIconStyle: {
    backgroundColor: CustomColors.mattBrownDark,
    borderRadius: wp(11),
    width: wp(11),
    height: wp(11),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

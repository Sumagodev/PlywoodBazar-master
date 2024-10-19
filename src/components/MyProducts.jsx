import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View ,ActivityIndicator} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { deleteById, getAllProducts } from '../services/Product.service';
import { generateImageUrl } from '../services/url.service';
import { getDecodedToken } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR, WHITE_COLOR } from '../utils/constants';
import ProductItemVertical from '../ReusableComponents/ProductItemVertical';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';
import LoadingDialog from '../ReusableComponents/LoadingDialog';

export default function MyProducts(props) {
  const focused = useIsFocused()
  const navigation = useNavigation();
  const [isLoadingallcompo, setIsLoadingallcompo] = useState(false);
  const [subscriptionArr, setSubscriptionArr] = useState([]);
  const getSubscriptions = async () => {
    setIsLoadingallcompo(true)
    try {
      let decodedObj = await getDecodedToken();
      const { data: res } = await getAllProducts(`page=1&perPage=1000&userId=${decodedObj?.userId}`);
      if (res) {
        console.log(JSON.stringify(res.data, null, 2));
        setSubscriptionArr(res.data);
        setIsLoadingallcompo(false)
      }
    } catch (error) {
      errorToast(error);
      setIsLoadingallcompo(false)
    }finally{
    setIsLoadingallcompo(false)
    }
  };

  const handleDeleteProduct = (id) => {
    try {
      Alert.alert('Alert', 'Do you really want to delete this product.', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: async () => {
            let { data: res } = await deleteById(id);
            if (res) {
              toastSuccess(res.message);
              getSubscriptions()
            }
          }
        },
      ]);
    } catch (error) {
      errorToast(error)
    }
  }


  const renderSubscriptionItem = ({ item, index }) => {
    return (
      <View style={[styles1.card_main, { marginTop: 20, padding: 0 }]}>
        <View style={styles1.manageContainer}>
          <TouchableOpacity style={{ marginHorizontal: 1, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: 'green' }} onPress={() => navigation.navigate("EditProduct", { data: item?._id })}>
            <FontAwesomeIcon name="edit" size={10} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 10, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: 'red', marginVertical: 2 }} onPress={() => handleDeleteProduct(item?._id)}>
            <FontAwesomeIcon name="trash-o" size={12} color='#fff' />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: generateImageUrl(item?.mainImage) }} style={{ width: wp(95), height: wp(40), }} resizeMode='stretch' />
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles1.nameheading, { marginBottom: 10 }]}>{item?.name}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Selling Price : </Text>
            <Text>{item?.sellingprice}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Price : </Text>
            <Text>₹ {item?.price}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Approval Status :</Text>
            <Text>{item?.approved}</Text>
          </View>
        </View>

      </View>

    );
  };
  const renderMyProductItem = ({ item, index }) => {

    console.log('&&&&&&', JSON.stringify(item));

    const productItem = {
      name: item?.name,
      imagePath: { uri: generateImageUrl(item?.mainImage) },
      sellingPrice: item?.sellingprice,
      price: item?.price,
      approval: item?.approved

    }
    return (
      <ProductItemVertical onDeletePress={() => handleDeleteProduct(item?._id)} product={productItem} onEditPress={() => navigation.navigate("EditProduct", { data: item?._id })} ></ProductItemVertical>
    );
  };

  useEffect(() => {
    if (focused) {

      getSubscriptions();
    }
  }, [focused]);

  return (
  <>
      <Header normal={true} screenName={'Your Products'} rootProps={props} />
    {
            isLoadingallcompo?
            <LoadingDialog size="large" color={CustomColors.mattBrownDark} style={{ marginTop: wp(5), marginBottom: wp(5) }} />
            :
              <View style={styles1.mainContainer}>
      <View style={reviewStyle.container}>
        <Text style={reviewStyle.title}>Your Products</Text>
        <View style={reviewStyle.addBtn} ><CustomButtonOld onPress={() => navigation.navigate('AddProducts')} textSize={wp(4)} text={"Add"}></CustomButtonOld></View>
      </View>

      {
        subscriptionArr.length > 0 ? <FlatList data={subscriptionArr} numColumns={2} renderItem={renderMyProductItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: hp(10) }} />
          :
          <View style={{ height: hp(80), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, alignSelf: 'center', color: '#000', marginVertical: 20 }}>No Product </Text>

          </View>

      }

      {/* <TouchableOpacity onPress={() => navigation.navigate('AddProducts')} style={[styles.btnbg, {width: wp(90), marginHorizontal: 20, marginBottom: 15}]}>
        <Text style={styles.textbtn}>Add New Product</Text>
      </TouchableOpacity> */}
    </View>
            }
    </>
  );
}
const styles1 = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFF4EC',
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
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
    width: wp(6),
    height: hp(3),
    marginRight: 10,
  },
  card_main: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    overflow: 'hidden',
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
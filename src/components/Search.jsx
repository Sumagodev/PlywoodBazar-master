import {View, Text, StyleSheet, Pressable, FlatList, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../navigation/customheader/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {searchProduct} from '../services/Product.service';
import {getDecodedToken, searchVendorFromDb} from '../services/User.service';
import {errorToast} from '../utils/toastutill';
import ProductItemHorizontal from '../ReusableComponents/ProductItemHorizontal';
import { generateImageUrl } from '../services/url.service';

export default function Search(props) {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [productArr, setProductArr] = useState([]);
  const [allProductsArr, setAllProducts] = useState([]);
  const [searchVendor, setSearchVendor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
console.log('allProductsArr',allProductsArr);

  const handleSearchFromDb = async value => {
    try {
      const decodedToken = await getDecodedToken();
      let role = '';
      if (decodedToken) {
        role = decodedToken.role;
      }
      setSearchQuery(value);
      if (value != '' && value?.length > 1) {
        const {data: res} = await searchVendorFromDb(`search=${value}&role=${role}`);
        console.log(`search=${value}&role=${role}`);
        
        if (res && res.data?.length > 0) {
          setProductArr(res.data);
        } else {
          setProductArr([]);
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };
  const handleSearchProductFromDb = async value => {
    try {
      const decodedToken = await getDecodedToken();
      let role = '';
      if (decodedToken) {
        role = decodedToken.role;
      }
      setSearchQuery(value);
      if (value != '' && value?.length > 1) {
        const {data: res} = await searchProduct(value);
        console.log(value);
        
        if (res && res.data?.length > 0) {
          setAllProducts(res.data);
        } else {
            setAllProducts([]);
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };


  const handleGetProducts = async source => {
    console.log('functioncalled');

    setIsloding(true);
    setIsLoading1(true);
    try {
      let query = `role=${role}&perPage=${limit}`;
      query += `&page=${page}`;

      if (usertypes && usertypes.length > 0 && usertypes.filter(el => el.checked == true).length > 0) {
        let tempArr = usertypes.filter(el => el.checked == true);
        if (query == '') {
          query = `userTypes=${tempArr.map(el => el.name)}`;
        } else {
          let temArr = tempArr.map(el => el.name);

          query = `${query}&userTypes=${tempArr.map(el => el.name)}`;
        }
      }
      if (categoryData && categoryData.filter(el => el.checked == true).length > 0) {
        let tempArr = categoryData.filter(el => el.checked == true);
        if (query == '') {
          query = `categories=${tempArr.map(el => el._id)}`;
        } else {
          query = `${query}&categories=${tempArr.map(el => el._id)}`;
        }
      }
      if (brandArr && brandArr.filter(el => el.checked == true).length > 0) {
        let tempArr = brandArr.filter(el => el.checked == true);
        if (query == '') {
          query = `vendors=${tempArr.map(el => el._id)}`;
        } else {
          query = `${query}&vendors=${tempArr.map(el => el._id)}`;
        }
      }
      if (citiesDisplayArr && citiesDisplayArr.filter(el => el.checked == true).length > 0) {
        let tempArr = citiesDisplayArr.filter(el => el.checked == true);
        if (query == '') {
          query = `locations=${tempArr.map(el => el._id)}`;
        } else {
          query = `${query}&locations=${tempArr.map(el => el._id)}`;
        }
      }
      if (statesDisplayArr && statesDisplayArr.filter(el => el.checked == true).length > 0) {
        let tempArr = statesDisplayArr.filter(el => el.checked == true);
        if (query == '') {
          query = `state=${tempArr.map(el => el._id)}`;
        } else {
          query = `${query}&state=${tempArr.map(el => el._id)}`;
        }
      }
      if (minPrice) {
        if (query == '') {
          query = `minPrice=${minPrice}`;
        } else {
          query = `${query}&minPrice=${minPrice}`;
        }
      }
      if (maxPrice) {
        if (query == '') {
          query = `maxPrice=${maxPrice}`;
        } else {
          query = `${query}&maxPrice=${maxPrice}`;
        }
      }
      if (qry) {
        if (query == '') {
          query = `q=${qry}`;
        } else {
          query = `${query}&q=${qry}`;
        }
      }
      if (role && role != '') {
        if (query == '') {
          query = `role=${role}`;
        } else {
          query = `${query}&role=${role}`;
        }
      }
      if (rating) {
        if (query == '') {
          query = `rating=${rating}`;
        } else {
          query = `${query}&rating=${rating}`;
        }
      }




      console.log(query,"QQQQ");


      let response = await getAllProducts(query);
      //let { data: res } = await getAllUsers(query,source);
      res = response.data;
      //console.log('AllDataX=>',response)
      if (res.data && res?.data?.length > 0) {
        Promise.resolve()
          .then(() => {
            // setProductsArr(res?.data);
            setTotal(res?.total);
            setIsLoading1(false);
            if (page > 1 && res?.data?.length > 0) {
              nextPageIdentifierRef.current = page;
              setProductsArr([...productsArr, ...res?.data]);
            } else {
              setProductsArr(res?.data);
              setIsLoading1(false);
            }
            setIsLoading(false);
            setIsLoading1(false);
            page == 1 && setIsFirstPageReceived(true);
          })
          .then(() => {
            setIsloding(false);
            setIsLoading1(false);
          });
      } else {
        Promise.resolve()
          .then(() => {
            setProductsArr([]);
            setTotal(0);
            setIsLoading1(false);
          })
          .then(() => {
            setIsloding(false);
            setIsLoading1(false);
          });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Axios Error=>Cancelled ', error);
        setIsLoading1(false);
      } else {
        setIsLoading(false);
        setIsLoading1(false);
        errorToast(error);
      }
    }
  };

  const handleRedirect = obj => {
    navigation.navigate('Supplier', {data: obj});
  };

  useEffect(() => {
    if (focused) {
      setProductArr([]);
      setSearchQuery('');
    }
  }, [focused]);

  const renderSearchItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleRedirect(item)} style={{paddingVertical: 10, borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1}}>
        <Text style={{color: '#000'}}>{item?.companyObj?.name ? item?.companyObj?.name : item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderSearchProductItem = ({item, index}) => {
    const product={
        imagePath:{uri:generateImageUrl(item?.mainImage)},
        name:item?.name,
        sellingPrice:item?.sellingprice,
        price:item?.price,
        approval:item?.isVerified

    }
    return (
      <ProductItemHorizontal product={product} onPress={() => navigation.navigate('Productdetails', {data: item?.slug})}></ProductItemHorizontal>
    );
  };
  return (
    <>
      {/* <Header normal={"normal"} /> */}

      <Header normal={true} screenName={'Search product'} rootProps={props} />

      <View style={styles.container}>
        {/* <View style={[styles.flexRow, {marginTop: 25}]}>
          { <Pressable style={styles.flexRow} onPress={() => { setSearchVendor(false); setProductArr([]); setSearchQuery("") }}>
                        <View style={[styles.radioOuter, searchVendor == false ? { borderColor: "#E7B84E", backgroundColor: "#E7B84E" } : { borderColor: "rgba(0,0,0,0.2)", backgroundColor: "white" }]}>
                            <View style={styles.radioInner}></View>
                        </View>
                        <Text>Search By Product</Text>
                    </Pressable> }
        </View> */}

          <View style={{display: 'flex', justifyContent:'center' ,alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection: 'row', gap: 5,justifyContent: 'space-between'}}>
            {/* <TypeWriter typing={1}> asdf asdf asdfa sdf asdfadffa asdf asdfaf</TypeWriter> */}
            <View style={[stylesSearch.mainContainer]}>
              <View style={stylesSearch.iconContainer}>
                <Image style={stylesSearch.iconImageStyle} source={require('../../assets/img/ic_search.png')}></Image>
              </View>
              <TextInput
                style={stylesSearch.input}
                placeholder={'Search..'}
                // onChangeText={e => setQuery(e)}
                onChangeText={value => handleSearchProductFromDb(value)}
              />
            </View>

            <TouchableOpacity onPress={() => this.RBSheet.open()}>
              <View style={[{width: wp(12), height: wp(12), backgroundColor: '#6B4E37', borderRadius: wp(8), justifyContent: 'center', alignContent: 'center', alignItems: 'center'}]}>
                <Icon name="tune" size={wp(7)} color={'white'} />
              </View>
            </TouchableOpacity>
          </View>       
        {/* {productArr.length > 0 && searchQuery !== '' ? (
          <FlatList contentContainerStyle={styles.listContainer} data={productArr} keyExtractor={(item, index) => index} renderItem={renderSearchItem} />
        ) : (
          searchQuery !== '' && (
            <View style={{alignSelf: 'center', height: hp(30), backgroundColor: '#fff', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
              <Text style={{fontSize: wp(5), fontFamily: 'Poppins-Regular'}}>No Product Found</Text>
            </View>
          )
        )} */}

    
      </View>
      <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
      {allProductsArr.length > 0 && searchQuery !== '' ? (
          <FlatList contentContainerStyle={{alignSelf:'center'}} data={allProductsArr} keyExtractor={(item, index) => index} renderItem={renderSearchProductItem} />
        ) : (
          searchQuery !== '' && (
            <View style={{alignSelf: 'center', height: hp(30), display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
              <Text style={{fontSize: wp(5), fontFamily: 'Poppins-Regular'}}>No Product Found</Text>
            </View>
          )
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  imgsmall: {
    width: wp(6),
    height: hp(3),
  },

  container: {
    paddingHorizontal: wp(5),
    backgroundColor: 'white',
    display: 'flex',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOuter: {
    position: 'relative',
    marginRight: 5,
    borderWidth: 2,
    height: 26,
    width: 26,
    borderRadius: 20,
  },
  radioInner: {
    position: 'absolute',
    top: 6,
    left: 6,
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
  },
  
  SearchContainer: {
    width: wp(90),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: hp(0.1),
  },
});

const stylesSearch = StyleSheet.create({
  mainContainer: {
    backgroundColor: CustomColors.searchBackground,
    borderRadius: wp(10),
    flexDirection: 'row',
    width: wp(80),
    height:wp(13),
    padding: wp(0.5),
    borderColor: '#CDC2A1',
    borderWidth: wp(0.3),
  },
  iconContainer: {
    backgroundColor: CustomColors.mattBrownDark,
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(10),
  },
  iconImageStyle: {
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
});

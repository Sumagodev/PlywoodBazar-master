import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Slider from 'react-native-a11y-slider';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../assets/stylecomponents/Style';
import { getBrandApi } from '../services/brand.service';
import { getNestedCategories } from '../services/Category.service';
import { getCityApi } from '../services/city.service';
import { getAllProducts } from '../services/Product.service';
import { generateImageUrl } from '../services/url.service';
import { errorToast } from '../utils/toastutill';
import { getStates } from '../services/State.service';
import { getAllUsers, getDecodedToken } from '../services/User.service';
import { ROLES_CONSTANT } from '../utils/constants';
// import Header from '../navigation/customheader/Header';
import TypeWriter from 'react-native-typewriter'
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import Header from '../navigation/customheader/Header';
 const  Filtercategory = (props) =>  {

  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
  const [isloding, setIsloding] = useState(false);

  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [rating, setRating] = useState(0);
  const [qry, setQuery] = useState('');
  const focused = useIsFocused();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [productsArr, setProductsArr] = useState([]);
  const [statesArr, setStatesArr] = useState([]);
  const [citiesArr, setCitiesArr] = useState([]);
  const [cityLoading, setCityLoading] = useState(false);

  let rbsheefRef = useRef();
const [userObj, setUserObj] = useState({});
const [role, setRole] = useState("");
  const [manufacturersArr, setManufacturersArr] = useState([]);
  const [dealersArr, setDealersArr] = useState([]);
  const [distributorArr, setDistributorArr] = useState([]);

  const [usertypes, setUsertypes] = useState([]);




  const [statesDisplayArr, setStatesDisplayArr] = useState([]);
  const [citiesDisplayArr, setCitiesDisplayArr] = useState([]);

  const [brandArr, setBrandArr] = useState([]);


  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const nextPageIdentifierRef = useRef();
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);

  const handleGetProducts = async (source) => {
    setIsloding(true)
    try {

      let query = `role=${role}&perPage=${limit}`;
      query += `&page=${page}`;

      if (usertypes && usertypes.length > 0 && usertypes.filter(el => el.checked == true).length > 0) {
        let tempArr = usertypes.filter(el => el.checked == true)
        if (query == '') {
          query = `userTypes=${tempArr.map(el => el.name)}`;
        } else {
          let temArr = tempArr.map(el => el.name);

          query = `${query}&userTypes=${tempArr.map(el => el.name)}`;
        }
        // console.log(query, "queryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryqueryquery")
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
      if(role && role!=""){
        if (query == '') { 
            query = `role=${role}`;
        }
        else {
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
  
      console.log(query,'Request canceled');
      
      let { data: res } = await getAllUsers(query,source);
      if (res.data && res?.data?.length > 0) {
        Promise.resolve()
          .then(() => {
            // setProductsArr(res?.data);
            setTotal(res?.total);
             if(page > 1 && res?.data?.length > 0){
             nextPageIdentifierRef.current = page;
            setProductsArr([...productsArr, ...res?.data])

            } else {
            setProductsArr(res?.data)
              
            }
            setIsLoading(false);
            page == 1 && setIsFirstPageReceived(true);
          })
          .then(() => {
            setIsloding(false);
          });
      } else {
        Promise.resolve()
          .then(() => {
            setProductsArr([]);
            setTotal(0);
          })
          .then(() => {
            setIsloding(false);
          });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(error, "errorerrorerror");
      } else {
        setIsLoading(false);
        errorToast(error);
      }
    }
  };


  const fetchNextPage = () => {

    console.log("================================end===============================================",nextPageIdentifierRef)
    if (nextPageIdentifierRef.current == null) {
      // End of data.
      return;
    }

    setPage(pre => pre+1)
    // fetchData();
  };

  const [categoryData, setCategoryData] = useState([]);

  const [selected, setSelected] = useState([]);

  const getCategory = async () => {
    try {
      const { data: res } = await getNestedCategories();
      if (res) {
        let tempArr = res.data.map(el => ({ ...el, checked: false }));

        setCategoryData(tempArr);
        if (props?.route?.params?.data) {
          handleCheckCategoryOnRender(props?.route?.params?.data, tempArr);
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };
  const getBrands = async () => {
    try {
      const { data: res } = await getBrandApi();
      if (res) {
        setBrandArr(res.data.map(el => ({ ...el, checked: false })));
      }
    } catch (error) {
      toastError(error);
    }
  };


  const handleGetStates = async (queryString) => {
    try {
      let query = `page=${1}&perPage=${1000}`

      // if (queryString && queryString != "") {
      //   query = `${query}&q=${queryString}`
      // }
      let { data: res } = await getStates(query);
      if (res.data) {
        setStatesArr(res.data.map(el => ({ ...el, checked: false })));
        setStatesDisplayArr(res.data.map(el => ({ ...el, checked: false })));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (statesArr && statesArr.filter(el => el.checked == true).length > 0) {
  //     let tempArr = statesArr.filter(el => el.checked == true).map((elx) =>elx._id);
  //     let stateCityArr = citiesArr.filter((el) =>  tempArr.includes(el.stateId))
  //     // console.log(stateCityArr,"stateCityArrstateCityArrstateCityArr")
  //      setCitiesDisplayArr(stateCityArr);

  //     // let stateCityArr = mainCitiesArr.map((el) => {
  //     //   if(selectedStateArr.includes(el.stateId)){
  //     //     return el
  //     //   }
  //     // })

  //     // console.log(stateCityArr,"stateCityArrstateCityArrstateCityArr")
  //     //  setCitiesArr(stateCityArr)
  //   }


  // }, [statesArr]);
  const handleGetCities = async (queryString) => {
    try {
      setCityLoading(true)
      let query = `page=${1}&perPage=${10000}`
      if (queryString && queryString != "") {
        query = `${query}&stateId=${queryString}`
      }

      let { data: res } = await getCityApi(query);
      if (res.data) {
        // console.log(res.data)
        setCitiesArr(res.data.map(el => ({ ...el, checked: false })));
        if (props?.route?.params?.locationId) {
          handleCheckLocationOnRender(props?.route?.params?.locationId, res.data);
        }
        setCityLoading(false)
      }
    } catch (error) {
      console.log(error);
      setCityLoading(false)
    }
  };

  const handlegetUser =async() => {
    try{

      let userArr =[
        {
          name:ROLES_CONSTANT.MANUFACTURER,
          checked: false
        },
        {
          name: ROLES_CONSTANT.DISTRIBUTOR,
          checked: false
        },
        {
          name:ROLES_CONSTANT.DEALER,
          checked: false
        },
      ]
    
      let decoded =await getDecodedToken();
      console.log(decoded,"decodeddecodeddecoded")
      if(decoded && decoded.role){
        setUserObj(decoded)
        setRole(decoded?.role);
        let temotoleAee = userArr.filter((el) => el.name != role);
        setUsertypes(temotoleAee)
  
      // console.log(decoded,"decoded")
    }  else {
      setUsertypes(userArr)

    }
  }
    catch(err){
      toastError(err)
    }
  }

  useEffect(() => {
    if (focused) {
      handlegetUser()

      getCategory();
      getBrands();
      handleGetStates();

    }
  }, [focused]);

  const toggleSelected = id => {
    let arr = [];
    if (selected.some(el => el === id)) {
      arr = selected.filter(el => el !== id);
    } else {
      arr = [...selected, id];
    }

    setSelected(arr);
  };

  useEffect(() => {
    if (focused) {
      // let categoryArr = searchParams.get('categories').split(',')
      // setSelected(categoryArr)
    } else {
      // setSelected([])
    }
  }, [focused]);

  const renderproduct = ({ item, index }) => {

    // if (!isFirstPageReceived && isloding) {
    //   // Show loader at the end of list when fetching next page data.
    // return  <ShimmerPlaceHolder style={{width:wp(45), height:hp(20),marginBottom:10, borderRadius:10,}}    />
    // }

  if (!isFirstPageReceived && isloding) {
    // Show loader when fetching first page data.
    return <ActivityIndicator size={'small'} />;
  }
    return (
      <>

    {
      
        <TouchableOpacity onPress={() => navigation.navigate('Supplier', { data: item })} style={styles1.boxproduct}>
          {
            item.bannerImage && item.bannerImage!="" ?   <Image source={{ uri: generateImageUrl(item.bannerImage) }} style={[styles1.imgresponsives]} resizeMode='stretch' />:        <Image source={require('../../assets/img/profile1.png')}style={[styles1.imgresponsives]}  />
          }
          <View style={styles1.infoproduct}>
            <Text style={styles1.producthead}>{item.companyName} </Text>
            <Text style={styles1.sizesqure}>
              Products : {item.mainImage} <Text style={{ fontFamily: 'Manrope-Bold' }}>{item?.productsCount ? item?.productsCount : 'N.A.'}</Text>
            </Text>
            <Text style={styles1.pricearea}>
              Rating : <Text style={{ fontFamily: 'Manrope-Bold' }}>{item.rating ? item.rating : 0} <AntDesign name='star' size={13} color='#b08218' /> </Text>
            </Text>
          </View>
        </TouchableOpacity>
      }
      </>
    );
  };

  const handleCheckCategoryOnRender = (id, arr) => {
    let tempArr = [...arr];
    let indexValue = tempArr.findIndex(el => id == el._id);
    tempArr[indexValue].checked = !tempArr[indexValue].checked;
    tempArr[indexValue].subCategoryArr = tempArr[indexValue].subCategoryArr.map(el => ({ ...el, checked: false }));

    setCategoryData([...tempArr]);
  };

  const handleCheckLocationOnRender = (id, arr) => {
    let tempArr = [...arr];
    let indexValue = tempArr.findIndex(el => id == el._id);
    tempArr[indexValue].checked = !tempArr[indexValue].checked;


    setCitiesArr([...tempArr]);
  };
  const handleCheckCategory = (item,isSubcategory=false) => {
    let tempArr = categoryData;
    if(isSubcategory) {

      let indexValue = tempArr.findIndex(el => item.parentCategoryId == el._id);
      let indexValue2 = tempArr[indexValue].subCategoryArr.findIndex(el => item._id == el._id);
      tempArr[indexValue].subCategoryArr[indexValue2].checked = !tempArr[indexValue].subCategoryArr[indexValue2].checked
    } else {
      let indexValue = tempArr.findIndex(el => item._id == el._id);
      tempArr[indexValue].checked = !tempArr[indexValue].checked;
      tempArr[indexValue].subCategoryArr = tempArr[indexValue].subCategoryArr.map(el => ({ ...el, checked: false }));
    }
    setCategoryData([...tempArr]);
  };

  const handleVendorCheck = id => {
    let tempArr = [...brandArr];
    let indexCheck = tempArr.findIndex(el => el._id == id);
    if (indexCheck != -1) {
      tempArr[indexCheck].checked = !tempArr[indexCheck].checked;
    }
    setBrandArr(tempArr);
  };

  const handleLocationCheck = id => {
    let tempArr = [...citiesDisplayArr];
    let indexCheck = tempArr.findIndex(el => el._id == id);
    if (indexCheck != -1) {
      tempArr[indexCheck].checked = !tempArr[indexCheck].checked;
    }
    setCitiesDisplayArr(tempArr);
  };


  const handleUserTypeCheck = id => {
    let tempArr = [...usertypes];
    tempArr =    tempArr.filter(el => userObj.role ? (el.name.toLowerCase() != userObj.role.toLowerCase()) : true)
    console.log(tempArr,"tempArrtempArrtempArr",id)
    tempArr[id].checked = !tempArr[id].checked;
    setUsertypes(tempArr);
  };

  const handleStateCheck = id => {
    let tempArr = [...statesDisplayArr];
    // let indexCheck = tempArr.findIndex(el => el._id == id);
    // if (indexCheck != -1) {
    //   tempArr[indexCheck].checked = !tempArr[indexCheck].checked;
    // }

    let stateId ="";
    {tempArr.map((el,index)=>{
      if (el._id == id) {
        el.checked = true;
        stateId = el._id;
      }else{
        el.checked = false
      }
    })}


    handleGetCities(stateId)

    setStatesDisplayArr(tempArr);
  };

  const handleManufacturerCheck = id => {
    let tempArr = [...manufacturersArr];
    let indexCheck = tempArr.findIndex(el => el._id == id);
    if (indexCheck != -1) {
      tempArr[indexCheck].checked = !tempArr[indexCheck].checked;
    }
    setManufacturersArr(tempArr);
  };
  const handleDealerCheck = id => {
    let tempArr = [...dealersArr];
    let indexCheck = tempArr.findIndex(el => el._id == id);
    if (indexCheck != -1) {
      tempArr[indexCheck].checked = !tempArr[indexCheck].checked;
    }
    setDealersArr(tempArr);
  };
  const handleDistributorCheck = id => {
    let tempArr = [...distributorArr];
    let indexCheck = tempArr.findIndex(el => el._id == id);
    if (indexCheck != -1) {
      tempArr[indexCheck].checked = !tempArr[indexCheck].checked;
    }
    setDistributorArr(tempArr);
  };


  useEffect(() => {
    // const decodedToken = await getDecodedToken();
    // let role = "";
    
    // if(decodedToken){
    //     role  = decodedToken.role
    // }



    let source = axios.CancelToken.source();
    handleGetProducts(source);
    return function () {
      source.cancel();
  };

    
  }, [categoryData, minPrice, usertypes, maxPrice, qry, brandArr, citiesDisplayArr, statesDisplayArr, rating,role,page]);


  const HandleClearFilter = () => {
    setCategoryData(categoryData.map(el => ({ ...el, checked: false })))
    setUsertypes((prev) =>prev.map((el) =>({ ...el, checked: false })))
    setMinPrice(0);
    setMaxPrice(0)
    setQuery("");
    setBrandArr((prev) =>prev.map((el) =>({ ...el, checked: false })))
    setStatesDisplayArr(statesArr.map((el) =>({ ...el, checked: false })))
    setCitiesDisplayArr([])
    
    setRating(0);
    this.RBSheet.close()
  }


  const renderfilter = ({ item, index }) => {
    // console.log(item, "item")
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: (item.level - 1) * 10 }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleCheckCategory(item);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ color: "black", fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
         
         
          
        </View>
            {
            item.subCategoryArr && item.subCategoryArr.length > 0 &&  item.checked &&
                <FlatList data={item.subCategoryArr} nestedScrollEnabled={false} scrollEnabled={false} keyExtractor={(item, indexX) => `SubCategory${item._id}`} renderItem={renderCategory} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} /> 
            }
      </>
    );
  };

  const renderCategory = ({ item, index }) => {
    // console.log(item, "item")
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: (item.level - 1) * 10 }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleCheckCategory(item,true);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ color: "black", fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
         
         
          
        </View>
      </>
    );
  };
  const renderVendorFilter = ({ item, index }) => {
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleVendorCheck(item._id);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
        </View>
      </>
    );
  };
  const renderStateFilter = ({ item, index }) => {
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleStateCheck(item._id);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ color: "black", fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
        </View>
      </>
    );
  };
  const renderCityFilter = ({ item, index }) => {
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleLocationCheck(item._id);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ color: "black", fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
        </View>
      </>
    );
  };


  const renderUserTypes = ({ item, index }) => {
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleUserTypeCheck(index);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ color: "black", fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
        </View>
      </>
    );
  };






  const renderManufacturersFilter = ({ item, index }) => {
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleManufacturerCheck(item._id);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
        </View>
      </>
    );
  };

  const renderDealerFilter = ({ item, index }) => {
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleDealerCheck(item._id);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
        </View>
      </>
    );
  };

  const renderDistributorFilter = ({ item, index }) => {
    return (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleDistributorCheck(item._id);
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 13 }}>{item.name}</Text>
        </View>
      </>
    );
  };








  const handleSearchState = (val) => {
    let tempArr = statesArr.filter(el => `${el.name}`.toLowerCase().includes(`${val}`.toLowerCase()));
    setStatesDisplayArr([...tempArr]);
    // handleGetStates(val)
    setSearchState(val);
  }

  const handleSearchCity = (val) => {

    // handleGetCities(val)

    let tempArr = citiesArr.filter(el => `${el.name}`.toLowerCase().includes(`${val}`.toLowerCase()));
    setCitiesDisplayArr([...tempArr]);
    setSearchCity(val);
  }





  return (
    <>

    {/* <Header backbtnshowpage /> */}



    <Header stackHeader={true} screenName={'Shop'} rootProps={props} />
    <View style={[styles.padinghr, styles.bgwhite, {flex:1}]}>
      <View style={{ paddingBottom: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginTop:hp(2), justifyContent: 'space-between' }}>
          <View style={styles1.col8}>
          {/* <TypeWriter typing={1}> asdf asdf asdfa sdf asdfadffa asdf asdfaf</TypeWriter> */}
            <View style={styles1.serachborder}>
              <AntDesign name="search1" color="#B08218" size={20} />
              <TextInput onChangeText={e => setQuery(e)} value={qry} placeholder="Search Product" style={{ width: wp(65), height:hp(6), color:'#000', }} />
            </View>
          </View>
          <View style={[styles1.col2, {}]}>
            <TouchableOpacity onPress={() => this.RBSheet.open()}>
              <Image source={require('../../assets/img/filters.png')} style={{ width: wp(13), height: hp(6.5) }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>


    {
      productsArr && productsArr?.length > 0 ?
      <FlatList
      data={productsArr}
      keyExtractor={(item, index) => `${index}`}
      numColumns={2}
      renderItem={renderproduct}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      scrollEnabled={true}
      style={{ width: '100%' }}
      contentContainerStyle={[{ paddingVertical: 5, paddingBottom: 5, paddingTop: 5 }]}
      />
      
      :
      <>{
        qry !== "" && <View style={{height:wp(80), backgroundColor:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Text>No Shop Found</Text>
      </View>
      }</>
      


      }
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={700}
          openDuration={250}
          customStyles={{
            container: {
              marginHorizontal: 10,
              width: wp(95),
              padding: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            },
          }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            <Text style={{ color: '#000', fontFamily: 'Manrope-Bold', fontSize: 18, marginBottom: 20 }}>Filters</Text>
            <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>User Types</Text>

            <FlatList data={usertypes.filter(el => userObj.role ? (el.name.toLowerCase() != userObj.role.toLowerCase()) : true)} nestedScrollEnabled={false} scrollEnabled={false} keyExtractor={(item, index) => `UserType${index}`} renderItem={renderUserTypes} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} />
            <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>Category</Text>

            <FlatList data={categoryData} nestedScrollEnabled={false} scrollEnabled={false} keyExtractor={(item, index) => `Category${index}`} renderItem={renderfilter} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} />





            {/* <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>Manufacturers</Text>
            <FlatList data={manufacturersArr} scrollEnabled={false} keyExtractor={(item, index) => `${index}`} renderItem={renderManufacturersFilter} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} />

            <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>Dealer</Text>
            <FlatList data={dealersArr} scrollEnabled={false} keyExtractor={(item, index) => `${index}`} renderItem={renderDealerFilter} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} />

            <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>Distributor</Text>
            <FlatList data={distributorArr} scrollEnabled={false} keyExtractor={(item, index) => `${index}`} renderItem={renderDistributorFilter} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} /> */}





            <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>State</Text>

            <TextInput onChangeText={(val) => handleSearchState(val)} value={searchState} style={[styles1.textInput, {height:hp(6),}]} placeholder='Search State Here' />

            <FlatList data={statesDisplayArr} nestedScrollEnabled={false} scrollEnabled={false} keyExtractor={(item, index) => `State${index}`} renderItem={renderStateFilter} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} />



            <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>City</Text>
            <TextInput onChangeText={(val) => handleSearchCity(val)} value={searchCity} style={[styles1.textInput, {height:hp(6)}]} placeholder='Search City Here' />
            {
              cityLoading ?
                <ActivityIndicator color="#E7B84E" size={"large"} />
                :
                <FlatList data={citiesDisplayArr} nestedScrollEnabled={false} scrollEnabled={false} keyExtractor={(item, index) => `City${index}`} renderItem={renderCityFilter} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} />
            }









            {/* <div className="box">
              <h5 className="title">Dealers</h5>
              <ul className="list comm-list">
                {dealersArr &&
                  dealersArr.length > 0 &&
                  dealersArr.map((el, index) => {
                    return (
                      <li key={el._id}>
                        <label>
                          <input type="checkbox" onChange={(e) => toggleSelected(el?._id)} checked={isChecked(el._id)} className="form-check-input" />
                          {el?.name}
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="box">
              <h5 className="title">Distributors</h5>
              <ul className="list comm-list">
                {distributorArr &&
                  distributorArr.length > 0 &&
                  distributorArr.map((el, index) => {
                    return (
                      <li key={el._id}>
                        <label>
                          <input type="checkbox" onChange={(e) => toggleSelected(el?._id)} checked={isChecked(el._id)} className="form-check-input" />
                          {el?.name}
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </div> */}












            {/* <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>Brands</Text>

            <FlatList data={brandArr}  nestedScrollEnabled={false} scrollEnabled={false} keyExtractor={(item, index) => `${index}`} renderItem={renderVendorFilter} contentContainerStyle={{ paddingVertical: 5, paddingBottom: 10 }} /> */}

            {/* <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>Price Range</Text>
            <View style={{ paddingHorizontal: 15 }}>
              <Slider
                min={1}
                max={100}
                onChange={value => {
                  setMinPrice(value[0]);
                  setMaxPrice(value[1]);
                }}
                values={[0, 89]}
              />
            </View> */}
            <Text style={{ color: '#000', fontFamily: 'Manrope-Regular', fontSize: 15, marginBottom: 10 }}>Rating</Text>
           
            <Pressable onPress={() => setRating(4)} style={{ display: "flex", flexDirection: "row",alignItems:'center' }}>
            <Checkbox.Android
            status={rating ==4 ? 'checked' : 'unchecked'}
            onPress={() => {
              if (rating === 4) {
                  setRating(0)
              }else{
                setRating(4)
              }
            }}
            color="#B08218"
            borderColor="red"
          />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <Text style={{ marginLeft: 5 }}>& more</Text>
            </Pressable>
            <Pressable onPress={() => setRating(3)} style={{ display: "flex", flexDirection: "row",alignItems:'center'}}>
            <Checkbox.Android
            status={rating ==3 ? 'checked' : 'unchecked'}
            onPress={() => {
              if (rating === 3 ) {
                  setRating(0)
              }else{
                setRating(3)
              }
            }}
            color="#B08218"
            borderColor="red"
          />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <Text style={{ marginLeft: 5 }}>& more</Text>
            </Pressable>
            <Pressable onPress={() => setRating(2)} style={{ display: "flex", flexDirection: "row",alignItems:'center' }}>
            <Checkbox.Android
            status={rating ==2 ? 'checked' : 'unchecked'}
            onPress={() => {
              if (rating === 2) {
                setRating(0)
              }else{

                setRating(2)
              }
            }}
            color="#B08218"
            borderColor="red"
          />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <Text style={{ marginLeft: 5 }}>& more</Text>
            </Pressable>
            <Pressable onPress={() => setRating(1)} style={{ display: "flex", flexDirection: "row" ,alignItems:'center'}}>
            <Checkbox.Android
            status={rating ==1 ? 'checked' : 'unchecked'}
            onPress={() => {
              if(rating === 1){
                setRating(0)
              }else{
                setRating(1)
              }
              
            }}
            color="#B08218"
            borderColor="red"
          />
              <AntDesign color="#EEA829" name="star" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <Text style={{ marginLeft: 5 }}>& more</Text>
            </Pressable>
            {/* <Pressable onPress={() => setRating(0)} style={{ display: "flex", flexDirection: "row",alignItems:'center' }}>
            <Checkbox.Android
            status={rating ==0 ? 'checked' : 'unchecked'}
            onPress={() => {
              setRating(0)
            }}
            color="#B08218"
            borderColor="red"
          />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <AntDesign color="grey" name="staro" size={18} style={{ marginLeft: 5 }} />
              <Text style={{ marginLeft: 5 }}>& more</Text>
            </Pressable> */}
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:hp(5) }}>

              <TouchableOpacity
                style={{ backgroundColor: "#B08218", width: wp(42), borderRadius: 10, paddingVertical: 10, display: "flex", justifyContent: "center", alignItems: "center" }}
                onPress={() => HandleClearFilter()}
              >
                <Text style={{ color: "white" }}>Clear Filters</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{ backgroundColor: "#B08218", width: wp(42), borderRadius: 10, paddingVertical: 10, display: "flex", justifyContent: "center", alignItems: "center" }}
                onPress={() => this.RBSheet.close()}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    </View>

    </>

  );
}
const styles1 = StyleSheet.create({
  pricearea: {
    color: '#000',
    textAlign: 'center',
    // marginVertical:10,
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    paddingHorizontal:10,
  },
  sizesqure: {
    color: '#000',
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
  },
  producthead: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  imgresponsives: {
    width: wp(40),
    height: wp(25),
    borderRadius: 10,
  },
  imgfluid: {
    width: wp(45),
    height: hp(20),
    borderRadius: 10,
    // marginBottom:10,
  },
  col8: {
    width: wp(80),
    // backgroundColor:'red',
    borderColor: '#DADADA',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    paddingHorizontal: 10,
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
  col2: {
    width: wp(14),
    // backgroundColor:'green',
  },
  serachborder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 10,
    fontFamily: 'Manrope-Medium',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameheading: {
    color: '#000000',
    fontFamily: 'Manrope-Medium',
  },
  boxproduct: {
    backgroundColor: '#fff',
    marginBottom: 10,
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
});

export default Filtercategory;


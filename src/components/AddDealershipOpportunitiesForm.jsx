import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Pressable, Modal, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../navigation/customheader/Header';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CustomTextInputField from '../ReusableComponents/CustomTextInputField';
import {getDecodedToken, getUserById} from '../services/User.service';
import {getAllProductsBySupplierId} from '../services/Product.service';
import {ROLES_CONSTANT} from '../utils/constants';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DarkTheme, useIsFocused, useNavigation} from '@react-navigation/native';
import {getCityByStateApi, getCountriesApi, getStateByCountryApi} from '../services/location.service';
import {MultiSelect} from 'react-native-element-dropdown';
const AddDealershipOpportunitiesForm = props => {
  const focused = useIsFocused();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [brand, setBrand] = useState('');
  const [email, setEmail] = useState('');
  const [productsArray, setproductsArray] = useState([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState();
  const [selectedproductsArray, setSelectedproductsArray] = useState();
  const [countryArr, setcountryArr] = useState([]);
  const [stateArr, setstateArr] = useState([]);
  const [cityArr, setcityArr] = useState([]);
  const [countryId, setcountryId] = useState('648d5b79f79a9ff6f10a82fb');
  const [stateId, setstateId] = useState(null);
  const [cityId, setcityId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFor, setModalFor] = useState('Country');
  const [selected, setSelected] = useState([]);
  console.log('cityyyyy',cityArr);
  
  const [rolesArr, setRolesArr] = useState([
    {
      name: ROLES_CONSTANT.MANUFACTURER,
      checked: true,
    },
    {
      name: ROLES_CONSTANT.DISTRIBUTOR,
      checked: false,
    },
    {
      name: ROLES_CONSTANT.DEALER,
      checked: false,
    },
  ]);

  const handleGeyUserDetails = async id => {
    let decodedToken = await getDecodedToken();
    let res = await getUserById(decodedToken?.userId);
    if (res?.data) {
      setName(res.data.data.companyObj.name);
      setEmail(res.data.data.companyObj.email);
    }
  };

  const handleGetProdductsBySupplierId = async id => {
    let decodedToken = await getDecodedToken();
    let res = await getAllProductsBySupplierId(decodedToken?.userId);
    if (res?.data) {
      setBrand(res.data.data[0].createdByObj.brandNames);
      setproductsArray(res.data.data);
    } else {
      console.log('elsssssss');
    }
  };
  const handleGetCoutries = async () => {
    try {
      let {data: res} = await getCountriesApi();
      if (res.data) {
        setcountryArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStates = async countrysId => {
    try {
      let {data: res} = await getStateByCountryApi(`countryId=${countrysId}`);
      if (res.data) {
        console.log(res.data, 'asd');
        setstateArr(res.data);
      } else {
        setstateArr([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCities = async stateId => {
    try {
      let {data: res} = await getCityByStateApi(`stateId=${stateId}`);
      if (res.data) {
        setcityArr(res.data);
      } else {
        setcityArr([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (focused) {
      handleGetCoutries();
    }
  }, [focused, countryId]);
  useEffect(() => {
    if (countryId) {
      handleGetStates(countryId.value);
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      handleGetCities(stateId.value);
    }
  }, [stateId]);

  useEffect(() => {
    handleGeyUserDetails();
    handleGetProdductsBySupplierId();
  }, []);

  const handleSubmit = () => {
    // Basic validation
    if (!name || !type || !productName || !location || !brand || !email) {
      Alert.alert('Validation Error', 'All fields marked with * are required.');
      return;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    // If all validations pass, handle form submission logic here
    Alert.alert('Success', 'Dealership Opportunity Submitted Successfully');
    // Clear the form or send data to the backend
  };
  // const renderItem = item => {
  //   return (
  //     <View style={styles1.item}>
  //       <Text style={styles1.selectedTextStyle}>{item.name}</Text>
  //       {/* <AntDesign style={styles1.icon} color="black" name="Safety" size={20} /> */}
  //     </View>
  //   );
  // };
  const renderItem = item => {
    return (
      <View style={styles1.item}>
        <Text style={styles1.selectedTextStyle}>{item.name}</Text>
        {/* <AntDesign style={styles1.icon} color="black" name="Safety" size={20} /> */}
      </View>
    );
  };
  return (
    <>
      <Header normal={true} screenName={'Dealership Opportunities'} rootProps={props} />
      <ScrollView>
        <View style={styles1.containerForm}>
          <Text style={styles1.textStyle}>Add Dealership Opportunities</Text>
          <View style={styles1.textFieldContainer}>
            <View style={{height: wp(1)}} />
            <CustomTextInputField placeholder="Organization Name*" value={name} onChangeText={value => setName(value)} />
            <View style={{height: wp(1)}} />
            <View style={{height: wp(1)}} />
            <Dropdown
              style={styles1.dropdown}
              placeholderStyle={styles1.placeholderStyle}
              data={rolesArr}
              maxHeight={300}
              labelField="name"
              valueField="name" // Ensure this matches your data structure
              placeholder="Business Type *"
              search
              searchPlaceholder="Search..."
              value={selectedBusinessType} // Make sure this is the correct format (string or object)
              onChange={item => {
                console.log(item, 'uuuuu');

                setSelectedBusinessType(item.name); // Use `item.value` to match the `valueField`
              }}
            />
            <Dropdown
              style={styles1.dropdown}
              placeholderStyle={styles1.placeholderStyle}
              data={productsArray}
              maxHeight={300}
              labelField="name"
              valueField="name" // Ensure this matches your data structure
              placeholder="Product *"
              search
              searchPlaceholder="Search..."
              value={selectedproductsArray} // Make sure this is the correct format (string or object)
              onChange={item => {
                console.log(item, 'uuuuu');

                setSelectedproductsArray(item.name); // Use `item.value` to match the `valueField`
              }}
            />

            <View style={{height: wp(1)}} />
            <CustomTextInputField placeholder="Brand*" value={brand} onChangeText={value => setBrand(value)} />
            <View style={{height: wp(1)}} />
            <CustomTextInputField placeholder="Location*" onChangeText={value => setLocation(value)} />
            <View style={{height: wp(1)}} />
            <CustomTextInputField placeholder="Email*" value={email} onChangeText={value => setEmail(value)} />
            <View style={{height: wp(1)}} />
            <Pressable
              style={styles1.BorderedPressable}
              onPress={() => {
                setModalVisible(true);
                setModalFor('Country');
              }}>
              <Text style={styles1.borderedPressableText}>{countryId && countryId.value ? countryId.name : 'Country *'}</Text>
            </Pressable>
            <Pressable
              style={styles1.BorderedPressable}
              onPress={() => {
                setModalVisible(true);
                setModalFor('State');
              }}>
              <Text style={styles1.borderedPressableText}>{stateId && stateId.name ? stateId.name : ' State *'}</Text>
            </Pressable>
            <Pressable
              style={styles1.BorderedPressable}
              onPress={() => {
                setModalVisible(true);
                setModalFor('City');
              }}>
              <Text style={styles1.borderedPressableText}>{cityId && cityId.value ? cityId.name : 'City *'}</Text>
            </Pressable>
           

            {/* <MultiSelect
          style={styles1.dropdown}
          placeholderStyle={styles1.placeholderStyle}
          selectedTextStyle={styles1.selectedTextStyle}
          inputSearchStyle={styles1.inputSearchStyle}
          // iconStyle={styles1.iconStyle}
          data={cityArr}
          labelField="label"
          valueField="value"
          placeholder="Please Select Categories *"
          value={selected}
          search
          searchPlaceholder="Search..."
          
          onChange={item => {
            console.log(item, " CAT ITEM");
            // console.log(item.map((el) => ({...el, checked})))
            setSelected(item);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color="black"
          //     name="Safety"
          //     size={20}
          //   />
          // )}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item.name)}>
              <View style={styles1.selectedStyle}>
                <Text style={styles1.textSelectedStyle}>{item.name}</Text>
                <AntDesign color="black" name="delete" size={12} />
              </View>
            </TouchableOpacity>
          )}
        /> */}


          </View>
          <View style={styles1.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={{color: 'white', paddingVertical: wp(4), fontSize: wp(4), fontWeight: 'bold', width: '100%', textAlign: 'center'}}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles1.centeredView}>
              <View style={styles1.modalView}>
                {modalFor == 'Country' ? (
                  <>
                    <Text style={{fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold'}}>Country</Text>
                    <FlatList
                      data={countryArr}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setcountryId({name: item.name, value: item._id});
                              setModalVisible(false);
                            }}
                            style={[styles1.BorderedPressable, {width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5)}]}>
                            <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                          </Pressable>
                        );
                      }}
                    />
                  </>
                ) : modalFor == 'State' ? (
                  <>
                    <Text style={{fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold'}}>State</Text>
                    <FlatList
                      data={stateArr}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setstateId({name: item.name, value: item._id});
                              setModalVisible(false);
                              setcityId(null);
                            }}
                            style={[styles1.BorderedPressable, {width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5)}]}>
                            <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                          </Pressable>
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Text style={{fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold'}}>City</Text>
                    <FlatList
                      data={cityArr}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setcityId({name: item.name, value: item._id});
                              setModalVisible(false);
                            }}
                            style={[styles1.BorderedPressable, {width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5)}]}>
                            <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                          </Pressable>
                        );
                      }}
                    />
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};
const styles1 = StyleSheet.create({
  containerForm: {
    elevation: 5,
    backgroundColor: '#f4eddb',
    borderRadius: 25,
    width: wp(96),
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: wp(7),
  },
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: wp(5),
    marginTop: wp(8),
    marginBottom: wp(3),
  },
  textFieldContainer: {
    width: '95%',
    marginBottom: wp(15),
  },
  btnContainer: {
    position: 'absolute',
    backgroundColor: '#6c4f37',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
  },
  dropdown: {
    margin: 1,
    borderRadius: 25,
    padding: 12,
    elevation: 3,
    borderColor: CustomColors.searchBgColor,
    backgroundColor: CustomColors.mattBrownFaint,
    shadowColor: CustomColors.shadowColorGray,
    height: wp(11),
    borderWidth: 0.6,
    marginBottom: 4,
  },
  BorderedPressable: {
    backgroundColor: 'white',
    borderColor: '#B08218',
    paddingVertical: 15,
    paddingLeft: 15,
    marginTop: 15,
    borderWidth: 0,
    borderRadius: 25,
    elevation: 3,
  },
  borderedPressableText: {},
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  BorderedPressableText: {},
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 12,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AddDealershipOpportunitiesForm;

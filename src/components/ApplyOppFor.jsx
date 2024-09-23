import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Pressable, Modal, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Header from '../navigation/customheader/Header';

import CustomTextInputField from '../ReusableComponents/CustomTextInputField';
import { getDecodedToken, getUserById } from '../services/User.service';
import { getAllProductsBySupplierId } from '../services/Product.service';
import { ROLES_CONSTANT } from '../utils/constants';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DarkTheme, useIsFocused, useNavigation } from '@react-navigation/native';
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from '../services/location.service';
import MultiSelect from 'react-native-multiple-select';
import CustomColors from '../styles/CustomColors';
import styles from '../../assets/stylecomponents/Style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {  ApplyForDealershipOpportunitiy } from '../services/Advertisement.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
const ApplyOppFor = ({route,navigation}) => {
  const { Data } = route.params;
  console.log('Datax',Data);
  console.log('DataxCities',Data.cities);
  const State= Data.stateId

  
  const focused = useIsFocused();
  const [name, setName] = useState('');
  const [userID, setuserID] = useState('');
  console.log('userIDuserID',userID);
  
  const [type, setType] = useState('');
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [email, setEmail] = useState('');
  const [productsArray, setproductsArray] = useState([]);
  console.log('productsArray',productsArray);
  
  const [selectedBusinessType, setSelectedBusinessType] = useState(Data.Type);
  const [selectedproductsArray, setSelectedproductsArray] = useState();
  const [countryArr, setcountryArr] = useState([]);
  const [stateArr, setstateArr] = useState([]);
  const [cityArr, setcityArr] = useState([]);
  const [countryId, setcountryId] = useState('648d5b79f79a9ff6f10a82fb');
  const [stateId, setstateId] = useState(State);
  const [cityId, setcityId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFor, setModalFor] = useState('Country');
  const [selected, setSelected] = useState([]);
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  console.log('selectedproductsArray', selectedproductsArray);
  const debounceTimeout = useRef(null);

  const [selectedItems, setSelectedItems] = useState([]);
  console.log('selectedItems',selectedItems);
  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

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
    {
      name: ROLES_CONSTANT.RETAILER,
      checked: false,
    },
    {
      name: ROLES_CONSTANT.CONTRACTOR,
      checked: false,
    },
  ]);





  //setcityArr(Data.cities)



  const handleGeyUserDetails = async id => {
    let decodedToken = await getDecodedToken();
    let res = await getUserById(decodedToken?.userId);
    console.log('decodedToken?.userId',decodedToken?.userId);
    if (res?.data) {
     setuserID(res?.data.data._id);
      
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
  // const handleGetStates = async countrysId => {
  //   try {
  //     let {data: res} = await getStateByCountryApi(`countryId=${countrysId}`);
  //     if (res.data) {
  //       console.log(res.data, 'asd');
  //       setstateArr(res.data);
  //     } else {
  //       setstateArr([]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleGetStates = async (countrysId) => {
    try {
      let { data: res } = await getStateByCountryApi(`countryId=${countrysId}`);
      setstateArr(res.data || []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch states. Please try again.");
    }
  };
  const handleDebouncedGetStates = (countryId) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      handleGetStates(countryId);
    }, 300); // 300ms delay
  };

  useEffect(() => {
    if (countryId) {
      handleDebouncedGetStates(countryId);
    }
  }, [countryId]);

  const handleGetCities = async stateId => {
    try {
      let { data: res } = await getCityByStateApi(`stateId=${stateId}`);
      if (res.data) {
        setcityArr(res.data);
      } else {
        setcityArr([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (countryId) {
  //     handleGetStates(countryId);
  //   }
  // }, [countryId]);

  useEffect(() => {
    if (stateId) {
      console.log(stateId,'zzzz');
      //handleGetCities(stateId);
    }
  }, [stateId]);

  useEffect(() => {
    handleGeyUserDetails();
    handleGetProdductsBySupplierId();
  }, []);

  const validateForm = () => {
    if (!name || !selectedBusinessType || !selectedproductsArray || !brand || !stateId || !selectedItems) {
      return 'All fields marked with * are required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };

  const resetForm = () => {
    setName('');
    setType('');
    setProductName('');
    setBrand('');
    setEmail('');
    setSelectedBusinessType(null);
    setSelectedproductsArray(null);
    setSelectedItems([]);
  };

 
  const handleSubmit = async () => {
   
    try {
      if (`${name}` === '') {
        errorToast('Name is Required');
        return 0;
      }
     
      if (`${selectedBusinessType}` === '') {
        errorToast('Business Type is Required');
        return 0;
      }
      if (`${brand}` === '') {
        errorToast('Brand is Required');
        return 0;
      }
      if (`${selectedproductsArray}` === '') {
        errorToast('Product is Required');
        return 0;
      }
      if (`${selectedItems}` === '') {
        errorToast('City is Required');
        return 0;
      }
     
      let obj = {
        Organisation_name: name,
        Type: selectedBusinessType,
        dealershipOwnerId:Data._id,
        Brand:brand,
        productId:selectedproductsArray,
        userId:userID,
        cityId:selectedItems,
        stateId:stateId,
     
      };
      const { data: res } = await ApplyForDealershipOpportunitiy(obj);
      if (res) {
        toastSuccess(res.message);
        navigation.goBack();
        resetForm();
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const removeItem = (itemId) => {
    // Filter out the item that matches the itemId and update the state
    const updatedItems = selectedItems.filter((id) => id !== itemId);
    setSelectedItems(updatedItems);
  };
  return (
    <>
      <Header normal={true} screenName={'Dealership Opportunities'}  />
      <ScrollView>
        <View style={styles1.containerForm}>
          <Text style={styles1.textStyle}>Apply Dealership Opportunities</Text>
          <View style={styles1.textFieldContainer}>
            <View style={{ height: wp(1) }} />
            <TextInput style={styles1.BorderedPressable} placeholder="Organization Name*" value={name} onChangeText={value => setName(value)}    editable={false}
            />
            <View style={{ height: wp(1) }} />

            <TextInput style={styles1.BorderedPressable} placeholder="Business Type*" value={Data.Type}    editable={false}
            />
            <View style={{ height: wp(1) }} />
            <TextInput style={styles1.BorderedPressable} placeholder="Product*" value={Data.Product} onChangeText={value => setSelectedproductsArray(Data.Product)}    editable={false}
            />
            <View style={{ height: wp(1) }} />
        
           

            <TextInput style={styles1.BorderedPressable} placeholder="Brand*" value={brand} onChangeText={value => setBrand(value)}    editable={false}
            />
            <View style={{ height: wp(1) }} />
            <TextInput style={styles1.BorderedPressable} placeholder="Email*" value={email} onChangeText={value => setEmail(value)}    editable={false}/>
            <View style={{ height: wp(1) }} />
            <TextInput style={styles1.BorderedPressable} placeholder="State*" value={Data.stateName} onChangeText={value => setstateId(Data.stateName)}   editable={false}
 />
            <View style={{ height: wp(1) }} />

      
            <View style={{ marginVertical: wp(2) }}>
              <MultiSelect
                hideTags
                items={Data.cities}
                uniqueKey="cityId"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="     Select Cities"
                searchInputPlaceholderText="Search Cities..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#000"
                selectedItemTextColor="#000"
                selectedItemIconColor="#000"
                itemTextColor="#000"
                displayKey="cityName"
                searchInputStyle={{ color: '#CCC', paddingRight: wp(6), borderRadius: 25, color: '#000' }}
                submitButtonColor={CustomColors.mattBrownDark}
                submitButtonText="Select"
                styleDropdownMenuSubsection={stylesMul.multiSelect} // Style for the dropdown
                styleInputGroup={stylesMul.multiSelectInput} // Style for the input section
                styleItemsContainer={stylesMul.multiSelectItems} // Sty
              />
            </View>

            <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
              {selectedItems.length > 0 ? (
                selectedItems.map(itemId => {
                  const item = Data.cities.find(i => i.cityId === itemId);
                  return (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: wp(2) }}>
                      <Text key={itemId} style={{ marginHorizontal: wp(2) }}>
                        {item.cityName}
                      </Text>
                      <TouchableOpacity onPress={() => removeItem(itemId)}>
                        <AntDesign style={styles1.icon} color="black" name="delete" size={20} />
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text>No cities selected</Text>
              )}
            </View>

     
          </View>
          <View style={styles1.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={{ color: 'white', paddingVertical: wp(4), fontSize: wp(4), fontWeight: 'bold', width: '100%', textAlign: 'center' }}>SUBMIT</Text>
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
                    <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold' }}>Country</Text>
                    <FlatList
                      data={countryArr}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setcountryId({ name: item.name, value: item._id });
                              setModalVisible(false);
                            }}
                            style={[styles1.BorderedPressable, { width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5) }]}>
                            <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                          </Pressable>
                        );
                      }}
                    />
                  </>
                ) : modalFor == 'State' ? (
                  <>
                    <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold' }}>State</Text>
                    <FlatList
                      data={stateArr}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setstateId({ name: item.name, value: item._id });
                              setModalVisible(false);
                              setcityId(null);
                            }}
                            style={[styles1.BorderedPressable, { width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5) }]}>
                            <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                          </Pressable>
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold' }}>City</Text>
                    <FlatList
                      data={Data.cities}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setcityId({ name: item.name, value: item._id });
                              setModalVisible(false);
                            }}
                            style={[styles1.BorderedPressable, { width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5) }]}>
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
    width: wp(99),
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: wp(3),
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
    paddingTop:wp(-10),
    position: 'absolute',
    backgroundColor: '#cc8d19',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
  },
  dropdown: {
    margin: 1,
    borderRadius: 25,
    padding: 12,
    elevation: 4,
    borderColor: CustomColors.searchBgColor,
    backgroundColor: CustomColors.mattBrownFaint,
    shadowColor: CustomColors.shadowColorGray,
    height: wp(10),

    marginBottom: 4,
  },
  BorderedPressable: {
    backgroundColor: CustomColors.mattBrownFaint,
    borderColor: '#B08218',
    paddingVertical: wp(3),
    paddingLeft: 15,
    margin: 3,
    borderWidth: 0,
    borderRadius: 25,
    elevation: 3,
    color:'black'
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
  nameheading: {
    color: '#000000',
    fontSize: wp(4),
    fontFamily: 'Manrope-Bold',
    marginVertical: hp(1),
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

const stylesMul = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  multiSelect: {
    height: wp(14),
    borderRadius: 25, // Rounded borders
    borderWidth: 1,
    padding: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: wp(5),
    borderWidth: 0,
    borderRadius: 25,
    elevation: 3,
    borderColor: CustomColors.searchBgColor,
    backgroundColor: CustomColors.mattBrownFaint,
    marginBottom: wp(3)
  },
  multiSelectInput: {
    height: wp(14),
    borderRadius: 25, // Rounded borders for the input section
    marginTop: wp(2),
    paddingHorizontal: wp(5),
    elevation: 3,
    borderColor: CustomColors.searchBgColor,
    backgroundColor: CustomColors.mattBrownFaint,
  },
  multiSelectItems: {
    borderRadius: 25, // Rounded borders for the items container
    marginTop: wp(15),
    borderColor: CustomColors.searchBgColor,
  },
  selectedItem: {
    fontSize: 16,
    color: '#B08218',
    marginVertical: 10,
    borderColor: CustomColors.searchBgColor,
    backgroundColor: CustomColors.mattBrownFaint,
  },
});

export default ApplyOppFor;

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Pressable, Modal, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Header from '../navigation/customheader/Header';

import CustomTextInputField from '../ReusableComponents/CustomTextInputField';
import { getDecodedToken, getUserById } from '../services/User.service';
import { getAllProductsBySupplierId } from '../services/Product.service';
import { Banner_Type, ROLES_CONSTANT } from '../utils/constants';
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
import { AddDealershipOpportunities, UpdatBannerform, Updateopp } from '../services/Advertisement.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { getAllCategories } from '../services/Category.service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const EditBannerform = (props) => {
  console.log('loggg', props?.route?.params.data);
  const Data = props?.route?.params.data
  const prevSelectedCategory = Data.categories;
  const prevSelectedCities = Data.cities;
  const stateid = Data.stateId

  console.log('prevSelectedCities', prevSelectedCities);

  const Did = Data._id;
  const [name, setName] = useState(Data.Organisation_name);
  const [userID, setuserID] = useState('');
  const navigation = useNavigation();
  const [type, setType] = useState('');
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState(Data.Brand);
  const [email, setEmail] = useState('');
  const [productsArray, setproductsArray] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFor, setModalFor] = useState('Country');
 
  const [file, setFile] = useState(Data.image);
  const [fileBase64, setFileBase64] = useState(null);
  const debounceTimeout = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);


  const [selectedItemscate, setSelectedItemscate] = useState([]);
  console.log('cityArr', selectedItemscate);


  const [bannerImage, setBannerImage] = useState('');
  const [selectedType, setSelectedType] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userId, setuserid] = useState(null);
  const [selectedproductsArray, setSelectedproductsArray] = useState('');
  console.log('selectedType', selectedType);
  const focused = useIsFocused()
  const [Bannertype, setBannertype] = useState([
    {
      name: Banner_Type.PROFILE,
      checked: false,
      showname: 'PROFILE'
    },
    {
      name: Banner_Type.PRODUCT,
      checked: false,
      showname: 'PRODUCT'
    },


  ]);


  const handleGeyUserDetails = async id => {
    let decodedToken = await getDecodedToken();
    let res = await getUserById(decodedToken?.userId);
    console.log('decodedToken?.userId', decodedToken?.userId);
    if (res?.data) {
      setuserID(res?.data.data._id);

      // setName(res.data.data.companyObj.name);
      // setEmail(res.data.data.companyObj.email);
    }
  };

  const handleGetProdductsBySupplierId = async id => {
    let decodedToken = await getDecodedToken();
    setuserid(decodedToken?.userId)
    let res = await getAllProductsBySupplierId(decodedToken?.userId);
    if (res?.data) {
      // setBrand(res.data.data[0].createdByObj.brandNames);
      setproductsArray(res.data.data);
    } else {
      console.log('elsssssss');
    }
  };

  useEffect(() => {
    handleGeyUserDetails();
    handleGetProdductsBySupplierId();
    if(selectedType ==='profilebanner'){
      setSelectedproductsArray(null)
      setSelectedType(null)
    }
  }, [focused]);



  const resetForm = () => {


    setSelectedType(null);
    setuserid(null);
    setBannerImage('');
    setSelectedproductsArray('');
    // setSelectedItems([]);
  }

  const handleSelectType = (index) => {
    const updatedBannertype = Bannertype.map((item, i) => ({
      ...item,
      checked: i === index,
    }));
    setBannertype(updatedBannertype);
    setSelectedType(updatedBannertype[index].name);
  };
  console.log('selectedproductsArray', selectedproductsArray);




  const handleSubmit = async () => {
    try {
      // Validate if a name is provided
      // if (!name) {
      //   errorToast('Name is Required');
      //   return;
      // }

      if (`${selectedType}` === '') {
        errorToast('Select Type');
        return 0;
      }
      if (selectedType === 'productbanner') {
        if (`${selectedproductsArray}` === '') {
          errorToast('Product is Required');
          return 0;
        }
      }
 
      // Validate if an image is selected
      if (!fileBase64) {
        errorToast('Image is Required');
        return;
      }


    

      // Prepare the object
      let obj = {
        type: selectedType,
        userId: userId,
        image: fileBase64,
        ...(selectedType === 'productbanner' && {
          productId: selectedproductsArray?._id,
        }),

      };

      console.log('Submitting object:', obj);

      // Submit data
      const { data: res } = await UpdatBannerform(obj, Data._id);
      if (res) {
        toastSuccess(res.message);
        navigation.goBack();
        resetForm();
      }
    } catch (error) {
      errorToast('An error occurred while submitting.');
      console.log('Error:', error);
    }
  };

  const handleDocumentPicker = async () => {
    try {
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        cropping: true,
        freeStyleCropEnabled: true,

        includeBase64: true,
      }).then(image => {
        console.log(image, image.path.split('/')[image.path.split('/').length - 1]);
        setFile({ name: image.path.split('/')[image.path.split('/').length - 1] });
        setFileBase64(`data:${image.mime};base64,${image.data}`);
      });


    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles1.containerForm}>
          <Text style={styles1.textStyle}> Edit Banner</Text>
          <View style={styles1.textFieldContainer}>
          <Text style={styles1.nameheading}> Banner Type </Text>
            <View style={{ flexDirection: 'row', alignItems: "center", marginTop: wp(5) }}>

              {Bannertype.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles1.radioButtonContainer}
                  onPress={() => handleSelectType(index)}
                >
                  <View style={styles1.radioButton}>
                    {item.checked ? (
                      <FontAwesome name="circle" size={wp(6)} color={CustomColors.mattBrownDark} />
                    ) : (
                      <FontAwesome name="circle-o" size={wp(6)} color="#603200" />
                    )}
                  </View>
                  <Text style={styles1.radioLabel}>{item.showname}</Text>
                </TouchableOpacity>

              ))}
            </View>


            <View style={{ height: wp(1) }} />
            {
              selectedType === 'productbanner' ?
                <Dropdown
                  style={styles1.dropdown}
                  placeholderStyle={styles1.placeholderStyle}
                  data={productsArray}
                  maxHeight={300}
                  labelField="name"
                  valueField="name"// Ensure this matches your data structure
                  placeholder="Product *"
                  search
                  selectedTextStyle={{ fontSize: 13, }}
                  searchPlaceholder="Search..."
                  value={selectedproductsArray} // Make sure this is the correct format (string or object)
                  onChange={item => {
                    console.log(item, 'uuuuu');

                    setSelectedproductsArray(item); // Use `item.value` to match the `valueField`
                  }}
                />
                : null
            }

            {/*
            <View style={{ marginVertical: wp(2) }}>
              <MultiSelect
                hideTags
                items={CategoryArr}
                uniqueKey="_id"
                onSelectedItemsChange={onSelectedItemsChangeCate}
                selectedItems={selectedItemscate}
                selectText="     Select Categories"
                searchInputPlaceholderText="Search Category..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#000"
                selectedItemTextColor="#000"
                selectedItemIconColor="#000"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC', paddingRight: wp(6), borderRadius: 25, color: '#000' }}
                submitButtonColor={CustomColors.mattBrownDark}
                submitButtonText="Select"
                styleDropdownMenuSubsection={stylesMul.multiSelect} // Style for the dropdown
                styleInputGroup={stylesMul.multiSelectInput} // Style for the input section
                styleItemsContainer={stylesMul.multiSelectItems} // Sty
              />
            </View>

            <View style={{ marginTop: 5, flexDirection: 'row', flexWrap: 'wrap', left: wp(3) }}>
              {selectedItemscate ? (
                selectedItemscate.map(itemId => {
                  const item = CategoryArr.find(i => i._id === itemId);
                  return (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: wp(2) }}>
                      <Text key={itemId} style={{ marginHorizontal: wp(2) }}>
                        {item.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeItem1(itemId)}>
                        <AntDesign style={styles1.icon} color="black" name="delete" size={20} />
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text>No Category selected</Text>
              )}
            </View>
            <TextInput style={styles1.BorderedPressable} placeholder="Brand*" value={brand} onChangeText={value => setBrand(value)} />
            <View style={{ height: wp(1) }} />
            {/*  <TextInput style={styles1.BorderedPressable} placeholder="Email*" value={email} onChangeText={value => setEmail(value)} />
            <View style={{ height: wp(1) }} />
           

            <Pressable
              style={styles1.BorderedPressable}
              onPress={() => {
                setModalVisible(true);
                setModalFor('State');
              }}>
              <View style={{ height: wp(1.5) }} />
              <Text style={styles1.borderedPressableText}>{stateId && stateId.name ? Data.stateName : ' State *'}</Text>
              <View style={{ height: wp(1.5) }} />
            </Pressable>
            <View style={{ marginVertical: wp(2) }}>
              <MultiSelect
                hideTags
                items={cityArr}
                uniqueKey="_id"
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
                displayKey="name"
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
                  const item = cityArr.find(i => i._id === itemId);
                  return (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: wp(2) }}>
                      <Text key={itemId} style={{ marginHorizontal: wp(2) }}>
                        {item?.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeItem(itemId)}>
                        <AntDesign style={styles1.icon} color="black" name="delete" size={20} />
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text>No items selected</Text>
              )}
            </View>
             */}
            {/*
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
              selectedTextStyle={{ fontSize: 13, }}
              onChange={item => {
                console.log(item, 'uuuuu');

                setSelectedBusinessType(item.name); // Use `item.value` to match the `valueField`
              }}
            />
            */}

            <Text style={styles1.nameheading}> Image </Text>
            <Pressable
              style={[styles1.dropdownStyle, { paddingVertical: wp(3), paddingStart: wp(2), flexDirection: 'row', flex: 1, justifyContent: 'space-between' }]}
              onPress={() => {
                handleDocumentPicker();
              }}>
              <Text style={styles.borderedPressableText}>{file && file.name ? file?.name : 'Please Upload Image'}</Text>
              <FontAwesome5Icon style={{ right: wp(5) }} name="caret-square-up" size={wp(6)} color="black" />

            </Pressable>
          </View>
          <View style={styles1.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={{ color: 'white', paddingVertical: wp(4), fontSize: wp(4), fontWeight: 'bold', width: '100%', textAlign: 'center' }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
{/*
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
                      data={cityArr}
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
          */}
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
    // alignItems:'center'
  },
  btnContainer: {
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
    height: wp(15),

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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(2.5),
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  radioButton: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#603200',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2),
  },
  radioLabel: {
    fontSize: wp(4.3),
    color: '#000',
    fontWeight: "bold"
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

export default EditBannerform;

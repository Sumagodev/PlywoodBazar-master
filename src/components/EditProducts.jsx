import {Picker} from '@react-native-picker/picker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import {addBrandApi, getBrandApi} from '../services/brand.service';
import {getAllCategories} from '../services/Category.service';
import {AddProduct, getById, updateProductApi} from '../services/Product.service';
import {generateImageUrl} from '../services/url.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
import ImagePicker from 'react-native-image-crop-picker';
import CustomColors from '../styles/CustomColors';
import CustomButton from '../ReusableComponents/CustomButton';
export default function EditProduct(props) {
  const navigation = useNavigation();
  const focused = useIsFocused();

  const [brandModal, setBrandModal] = useState(false);
  const [brandName, setBrandName] = useState('');

  const [price, setPrice] = useState(0);
  const [productObj, setProductObj] = useState(null);
  const [brand, setbrand] = useState('');
  const [category, setcategory] = useState('');
  const [name, setname] = useState('');
  const [thickness, setthickness] = useState('');
  const [application, setapplication] = useState('');
  const [grade, setgrade] = useState('');
  const [color, setcolor] = useState('');
  const [size, setsize] = useState('');
  const [wood, setwood] = useState('');
  const [glue, setglue] = useState('');
  const [sellingprice, setsellingprice] = useState('');
  const [warranty, setwarranty] = useState('');
  const [shortDescription, setshortDescription] = useState('best');
  const [longDescription, setLongDescription] = useState();
  const [image, setimage] = useState();
  const [pricetype, setpricetype] = useState('per Nos/sheet');
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [status, setstatus] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [updateObj, setupdateObj] = useState({});
  const [imageArr, setimageArr] = useState([
    {
      image: '',
      prevImage: '',
    },
  ]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const handleBrandNameChange = e => {
    setBrandName(e);
    setIsSubmitDisabled(e.length <= 1); // Disable if brandName is 1 character or less
  };

  const [open, setOpen] = useState(false);
  const [endDatePickerModal, setEndDatePickerModal] = useState(false);

  const [categoryArr, setCategoryArr] = useState([]);
  const [brandArr, setBrandArr] = useState([]);

  const [prevImage, setPrevImage] = useState(null);

  const handleGetBrands = async () => {
    try {
      let {data: res} = await getBrandApi('status=true&page=1&perPage=1000');
      if (res.data) {
        setBrandArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetCategory = async () => {
    try {
      let {data: res} = await getAllCategories();
      if (res.data) {
        setCategoryArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleCreateFlashSale = async () => {
    try {
      if (`${name}` === '') {
        errorToast('Please Fill Name');
        return 0;
      }
      if (`${category}` === '') {
        errorToast('Please Fill Category');
        return 0;
      }
      if (`${sellingprice}` === '' || parseInt(sellingprice) <= 0) {
        errorToast('Please Fill Selling Price');
        return 0;
      }
      if (`${price}` === '' || parseInt(price) <= 0) {
        errorToast('Please Fill Price');
        return 0;
      }
      if (`${thickness}` === '') {
        errorToast('Please Fill Thickness');
        return 0;
      }
      if (`${application}` === '') {
        errorToast('Please Fill Application');
        return 0;
      }

      if (`${color}` === '') {
        errorToast('Please Fill Color');
        return 0;
      }

      // if (`${shortDescription}` === '') {
      //   errorToast('Please Fill shortDescription');
      //   return 0;
      // }

      if (`${fileBase64}` === '') {
        errorToast('Please add main imgae');
        return 0;
      }
      if (imageArr && imageArr.length > 1) {
        if (imageArr.some(el => !el.image || el.image == '')) {
          errorToast('canot upload blank image');
          return 0;
        }
      }

      let obj = {
        name: name,
        categoryId: category,
        brand: brand,
        price: price,
        sellingprice: sellingprice,
        specification: {
          thickness,
          application,
          grade,
          color,
          wood,
          glue,
          warranty,
        },
        shortDescription: 'shortDescription',
        longDescription: longDescription,
        status: status,
        image: image,
        // image:productObj?.mainImage,
        imageArr: imageArr,
        categoryArr: [{categoryId: category}],
      };
      let {data: res} = await updateProductApi(obj, productObj?._id);
      if (res) {
        toastSuccess(res.message);
        navigation.navigate('MyProducts');
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleCreateBrand = async () => {
    try {
      if (`${brandName}` === '') {
        errorToast('Please Fill Brand Name');
        return 0;
      }

      let obj = {
        name: brandName,
        status: true,
      };
      let {data: res} = await addBrandApi(obj);
      if (res) {
        toastSuccess(res.message);
        handleGetBrands();
        setBrandModal(false);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    if (focused) {
      handleGetBrands();
      handleGetCategory();
      getProductData();
    }
  }, [focused]);

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
        setFile({name: image.path.split('/')[image.path.split('/').length - 1]});
        setimage(`data:${image.mime};base64,${image.data}`);
      });

      // let file = await DocumentPicker.pickSingle({
      //   presentationStyle: 'fullScreen',

      //   type: DocumentPicker.types.images,
      // });
      // if (file) {
      //   console.log(file, 'file');
      //   let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
      //   if (base64) {
      //     console.log('SETTING BASE ^$', file);
      //     setFile(file);
      //     setimage(`data:${file.type};base64,${base64}`);
      //   }
      //   // getBase64(file, (result) => {
      //   //     setGstCertificateName(file);
      //   //     setgstCertificate(result);
      //   // })
      // }
    } catch (error) {
      handleError(error);
    }
  };
  const handleDocumentPickerArr = async index => {
    try {
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      }).then(image => {
        console.log(image, image.path.split('/')[image.path.split('/').length - 1]);
        let tempArr = imageArr;
        tempArr[index].image = `data:${image.mime};base64,${image.data}`;
        setimageArr([...tempArr]);
        // setFile({ name: image.path.split("/")[image.path.split("/").length - 1] });
        // setimage();
      });
      // let file = await DocumentPicker.pickSingle({
      //   presentationStyle: 'fullScreen',
      //   type: DocumentPicker.types.images,
      // });
      // if (file) {
      //   console.log(file, 'file');
      //   let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
      //   if (base64) {
      //     console.log('SETTING BASE ^$', file);
      //     let tempArr = imageArr
      //     tempArr[index].image = `data:${file.type};base64,${base64}`
      //     setimageArr([...tempArr])
      //   }
      // }
    } catch (error) {
      handleError(error);
    }
  };

  const handleDocumentMultiplePicker = async () => {
    try {
      let files = await DocumentPicker.pickMultiple({
        presentationStyle: 'fullScreen',

        type: DocumentPicker.types.images,
      });
      if (files && files.length > 0) {
        let tempArr = [];
        for (let el of files) {
          let base64 = await RNFetchBlob.fs.readFile(el.uri, 'base64');
          if (base64) {
            tempArr.push({image: `data:${file.type};base64,${base64}`});
          }
          console.log(tempArr);
          setimageArr(tempArr);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getProductData = async () => {
    try {
      if (props?.route?.params?.data) {
        const {data: res} = await getById(props.route.params.data);
        if (res) {
          setProductObj(res.data);
          prefillStates(res.data);
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const prefillStates = obj => {
    if (obj) {
      setname(obj?.name);
      setsellingprice(`${obj?.sellingprice}`);
      setPrice(`${obj?.price}`);
      setthickness(`${obj?.specification?.thickness}`);
      setapplication(`${obj?.specification?.application}`);
      setgrade(`${obj?.specification?.grade}`);
      setcolor(`${obj?.specification?.color}`);
      setwood(`${obj?.specification?.wood}`);
      setglue(`${obj?.specification?.glue}`);
      setwarranty(`${obj?.specification?.warranty}`);
      setshortDescription(`${obj.shortDescription}`);
      setLongDescription(`${obj.longDescription}`);
      if (obj?.categoryId) {
        setcategory(obj.categoryId);
      }
      if (obj?.brand) {
        setbrand(obj?.brand);
      }
      if (obj?.mainImage) {
        setimage(obj?.mainImage);
      }
      setimageArr(obj.imageArr);
    }
  };

  const handleAddImage = () => {
    if (imageArr.length < 3) {
      setimageArr([...imageArr, {image: ''}]);
    }
  };

  const handleRemoveImage = () => {
    if (imageArr.length - 1 > 0) {
      let tempArr = imageArr;
      tempArr = tempArr.filter((el, index) => index != tempArr.length - 1);
      setimageArr([...tempArr]);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Header normal={true} rootProps={props} />
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <ImageBackground style={styles1.cardContainer} source={require('../../assets/img/main_bg.jpg')}>
          <View style={styles1.card_main}>
            <Text style={{textAlign: 'center', fontSize: wp(6.0), fontWeight: 'bold'}}>Edit Product</Text>
            <Text style={styles1.nameheading}>Enter Name </Text>

            <TextInput onChangeText={e => setname(e)} value={name} placeholder="Name" paddingHorizontal={15} activeOutlineColor="transparent" outlineColor="white" outlineStyle={{borderRadius: 50}} underlineColor="transparent" backgroundColor="white" borderRadius={50} />
            <Text style={styles1.nameheading}>Select Type</Text>
            <View style={styles1.dropdownStyle}>
              <Picker selectedValue={pricetype} onValueChange={(itemValue, itemIndex) => setPrice(itemValue)}>
                <Picker.Item label="per Nos/sheet" value="per Nos/sheet" />
                <Picker.Item label="per sq.ft" value="per sq.ft" />
                <Picker.Item label="per sq.mt" value="per sq.mt" />
                <Picker.Item label=" per Rn.ft" value=" per Rn.ft" />
                <Picker.Item label="per Cu.ft" value="per Cu.ft" />
                <Picker.Item label="p per Cu.mt" value="p per Cu.mt" />
              </Picker>
            </View>

            <Text style={styles1.nameheading}>Category</Text>
            <View style={styles1.dropdownStyle}>
              {categoryArr && categoryArr.length > 0 && (
                <Picker selectedValue={category} onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}>
                  <Picker.Item label="Select Category" value="" />
                  {categoryArr.map((el, index) => {
                    return <Picker.Item key={index} label={el?.name} value={el?._id} />;
                  })}
                </Picker>
              )}
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
              <Text style={styles1.nameheading}>Brand</Text>
              <Pressable onPress={() => setBrandModal(true)}>
                <Text style={{color: CustomColors.glossBrownDark, borderBottomWidth: 1, borderBottomColor: CustomColors.glossBrownDark, fontSize: wp(4.5), fontWeight: 'bold'}}>Add new Brand</Text>
              </Pressable>
            </View>

            <View style={styles1.dropdownStyle}>
              {brandArr && brandArr.length > 0 && (
                <Picker selectedValue={brand} onValueChange={(itemValue, itemIndex) => setbrand(itemValue)}>
                  <Picker.Item label="Select Brand" value="" />
                  {brandArr.map((el, index) => {
                    return <Picker.Item key={index} label={el?.name} value={el?._id} />;
                  })}
                </Picker>
              )}
            </View>

            <Text style={styles1.nameheading}>Enter Price </Text>

            <TextInput
              onChangeText={e => setPrice(e)}
              keyboardType="number-pad"
              value={price}
              paddingHorizontal={15}
              placeholder="Price "
              mode="outlined"
              activeOutlineColor="transparent"
              outlineColor="white"
              outlineStyle={{borderRadius: 50}}
              underlineColor="transparent"
              backgroundColor="white"
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />
            <Text style={styles1.nameheading}>Enter Selling Price </Text>

            <TextInput
              keyboardType="numeric"
              onChangeText={e => setsellingprice(e)}
              value={sellingprice}
              placeholder="Selling Price "
              paddingHorizontal={15}
              mode="outlined"
              activeOutlineColor="transparent"
              outlineColor="white"
              outlineStyle={{borderRadius: 50}}
              underlineColor="transparent"
              backgroundColor="white"
              borderRadius={50}
            />
            <Text style={styles1.nameheading}>Enter Thickness </Text>

            <TextInput
              onChangeText={e => setthickness(e)}
              value={thickness}
              placeholder="Thickness"
              paddingHorizontal={15}
              mode="outlined"
              activeOutlineColor="transparent"
              outlineColor="white"
              outlineStyle={{borderRadius: 50}}
              underlineColor="transparent"
              backgroundColor="white"
              borderRadius={50}
            />

            <Text style={styles1.nameheading}>Enter Usage/Application </Text>

            <TextInput
              onChangeText={e => setapplication(e)}
              value={application}
              placeholder="Usage"
              mode="outlined"
              paddingHorizontal={15}
              activeOutlineColor="transparent"
              outlineColor="white"
              outlineStyle={{borderRadius: 50}}
              underlineColor="transparent"
              backgroundColor="white"
              borderRadius={50}
            />

            <Text style={styles1.nameheading}>Enter Grade </Text>

            <TextInput onChangeText={e => setgrade(e)} value={grade} placeholder="Grade" mode="outlined" paddingHorizontal={15} activeOutlineColor="transparent" outlineColor="white" outlineStyle={{borderRadius: 50}} underlineColor="transparent" backgroundColor="white" borderRadius={50} />

            <Text style={styles1.nameheading}>Enter Color </Text>

            <TextInput onChangeText={e => setcolor(e)} value={color} placeholder="Color" mode="outlined" paddingHorizontal={15} activeOutlineColor="transparent" outlineColor="white" outlineStyle={{borderRadius: 50}} underlineColor="transparent" backgroundColor="white" borderRadius={50} />

            <Text style={styles1.nameheading}>Enter Wood Type </Text>

            <TextInput onChangeText={e => setwood(e)} value={wood} placeholder="Wood" mode="outlined" paddingHorizontal={15} activeOutlineColor="transparent" outlineColor="white" outlineStyle={{borderRadius: 50}} underlineColor="transparent" backgroundColor="white" borderRadius={50} />

            <Text style={styles1.nameheading}>Enter Glue Used </Text>

            <TextInput onChangeText={e => setglue(e)} value={glue} placeholder="Glue" mode="outlined" paddingHorizontal={15} activeOutlineColor="transparent" outlineColor="white" outlineStyle={{borderRadius: 50}} underlineColor="transparent" backgroundColor="white" borderRadius={50} />

            <Text style={styles1.nameheading}>Enter Warranty </Text>

            <TextInput onChangeText={e => setwarranty(e)} value={warranty} placeholder="Warranty" mode="outlined" paddingHorizontal={15} activeOutlineColor="transparent" outlineColor="white" outlineStyle={{borderRadius: 50}} underlineColor="transparent" backgroundColor="white" borderRadius={50} />

            <Text style={styles1.nameheading}>Enter Long Description </Text>

            <TextInput
              onChangeText={e => setLongDescription(e)}
              value={longDescription}
              numberOfLines={3}
              multiline={true}
              mode="outlined"
              activeOutlineColor="transparent"
              placeholder="Long Description"
              outlineColor="white"
              paddingHorizontal={15}
              outlineStyle={{borderRadius: 20}}
              underlineColor="transparent"
              backgroundColor="white"
              borderRadius={50}
            />
            <Text style={styles1.nameheading}>Product Image </Text>

            <Pressable
              style={styles1.BorderedPressable}
              onPress={() => {
                handleDocumentPicker();
              }}>
              {image ? (
                <>{`${image}`.includes('base64') ? <Image style={{height: 200}} resizeMode="contain" source={{uri: image}} /> : <Image style={{height: 200}} resizeMode="contain" source={{uri: generateImageUrl(image)}} />}</>
              ) : (
                <Text style={styles.borderedPressableText}>Please Upload Image</Text>
              )}
            </Pressable>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
              <Text style={{color: 'black', fontSize: 17, marginLeft: 5}}>Product Multiple Images</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Pressable onPress={() => handleAddImage()} style={[styles.btnbg, {paddingVertical: 7, paddingHorizontal: 15, marginRight: 10}]}>
                  <Text style={{color: 'white', fontSize: 18}}>+</Text>
                </Pressable>
                <Pressable onPress={() => handleRemoveImage()} style={[styles.btnbg, {paddingVertical: 7, paddingHorizontal: 17, marginRight: 10}]}>
                  <Text style={{color: 'white', fontSize: 18}}>-</Text>
                </Pressable>
              </View>
            </View>
            {imageArr &&
              imageArr.length > 0 &&
              imageArr.map((el, index) => {
                return (
                  <Pressable
                    key={index}
                    style={styles1.BorderedPressable}
                    onPress={() => {
                      handleDocumentPickerArr(index);
                    }}>
                    {el && el.image ? (
                      <>{`${el.image}`.includes('base64') ? <Image style={{height: 200}} resizeMode="contain" source={{uri: el.image}} /> : <Image style={{height: 200}} resizeMode="contain" source={{uri: generateImageUrl(el.image)}} />}</>
                    ) : (
                      <Text style={styles.borderedPressableText}>Please Upload Image</Text>
                    )}
                  </Pressable>
                );
              })}

            <View style={{alignSelf: 'center', marginVertical: wp(5)}}>
              <CustomButton onPress={() => handleCreateFlashSale()} text={'UPDATE'} textSize={wp(5)} paddingHorizontal={wp(8)} paddingVertical={wp(3)} />
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={brandModal}
            onRequestClose={() => {
              setBrandModal(!brandModal);
              setBrandName('');
            }}>
            <View style={styles1.centeredView}>
              <View style={styles1.modalView}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles1.modalText}>Add Brand</Text>
                  <Pressable style={[{right: wp(-25)}]} onPress={() => setBrandModal(!brandModal)}>
                    <FontAwesome5Icon style={{}} name="times" size={wp(8)} color="black" />
                  </Pressable>
                </View>

                <Pressable
                  style={[styles1.button, styles1.buttonClose]}
                  onPress={() => {
                    setBrandModal(!brandModal), setBrandName('');
                  }}>
                  <TextInput
                    style={{width: wp(90), paddingLeft: wp(5)}}
                    onChangeText={e => handleBrandNameChange(e)}
                    value={brandName}
                    multiline={true}
                    placeholder="Brand Name"
                    mode="outlined"
                    activeOutlineColor="transparent"
                    outlineColor="white"
                    outlineStyle={{borderRadius: 50}}
                    underlineColor="transparent"
                    backgroundColor="white"
                    borderRadius={50}
                  />

                  {isSubmitDisabled && <Text style={{color: 'red', fontSize: wp(3), marginVertical: wp(2)}}>Please enter brand name.</Text>}

                  {!isSubmitDisabled ? (
                    <View style={{alignSelf: 'center', marginVertical: wp(5)}}>
                      {/* Button is active */}
                      <CustomButton onPress={handleCreateBrand} text={'SUBMIT'} textSize={wp(5)} paddingHorizontal={wp(8)} paddingVertical={wp(3)} />
                    </View>
                  ) : (
                    <View style={{alignSelf: 'center', marginVertical: wp(5), opacity: 0.5}}>
                      {/* Disabled button, with reduced opacity */}
                      <TouchableOpacity disabled={true}>
                        <View
                          style={{
                            backgroundColor: 'gray',
                            paddingVertical: wp(3),
                            paddingHorizontal: wp(8),
                            borderRadius: 10,
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: wp(5), color: '#fff'}}>SUBMIT</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}
const styles1 = StyleSheet.create({
  // new design
  centeredView: {
    height: hp(100),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    width: wp(95),
    backgroundColor: '#fff8ec',
    borderRadius: wp(10),
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
    fontWeight: '700',
  },
  cardContainer: {
    marginTop: wp(0),
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
    overflow: 'hidden',
  },
  card_main: {
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
    padding: wp(3),
  },
  nameheading: {
    color: '#000000',
    fontSize: wp(4),
    fontFamily: 'Manrope-Bold',
    marginVertical: hp(1),
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: wp(100),
  },
});

// import { Picker } from '@react-native-picker/picker';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { Image, Pressable, ScrollView, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import { TextInput } from 'react-native-paper';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import RNFetchBlob from 'rn-fetch-blob';
// import styles from '../../assets/stylecomponents/Style';
// import Header from '../navigation/customheader/Header';
// import { addBrandApi, getBrandApi } from '../services/brand.service';
// import { getAllCategories } from '../services/Category.service';
// import { AddProduct, getById, updateProductApi } from '../services/Product.service';
// import { generateImageUrl } from '../services/url.service';
// import { errorToast, toastSuccess } from '../utils/toastutill';
// import ImagePicker from 'react-native-image-crop-picker';

// export default function EditProduct(props) {
//   const navigation = useNavigation();
//   const focused = useIsFocused()

//   const [brandModal, setBrandModal] = useState(false);
//   const [brandName, setBrandName] = useState("");

//   const [price, setPrice] = useState(0);
//   const [productObj, setProductObj] = useState(null);
//   const [brand, setbrand] = useState('');
//   const [category, setcategory] = useState('');
//   const [name, setname] = useState('');
//   const [thickness, setthickness] = useState('');
//   const [application, setapplication] = useState('');
//   const [grade, setgrade] = useState('');
//   const [color, setcolor] = useState('');
//   const [size, setsize] = useState('');
//   const [wood, setwood] = useState('');
//   const [glue, setglue] = useState('');
//   const [sellingprice, setsellingprice] = useState('');
//   const [warranty, setwarranty] = useState('');
//   const [shortDescription, setshortDescription] = useState('');
//   const [longDescription, setLongDescription] = useState();
//   const [image, setimage] = useState();
//   const [file, setFile] = useState(null);
//   const [fileBase64, setFileBase64] = useState(null);
//   const [status, setstatus] = useState(false);
//   const [isUpdated, setisUpdated] = useState(false);
//   const [updateObj, setupdateObj] = useState({});
//   const [imageArr, setimageArr] = useState([
//     {
//       image: '',
//       prevImage: ''
//     },
//   ]);

//   const [open, setOpen] = useState(false);
//   const [endDatePickerModal, setEndDatePickerModal] = useState(false);

//   const [categoryArr, setCategoryArr] = useState([]);
//   const [brandArr, setBrandArr] = useState([]);

//   const [prevImage, setPrevImage] = useState(null);

//   const handleGetBrands = async () => {
//     try {
//       let { data: res } = await getBrandApi('status=true&page=1&perPage=1000');
//       if (res.data) {
//         setBrandArr(res.data);
//       }
//     } catch (err) {
//       errorToast(err);
//     }
//   };

//   const handleGetCategory = async () => {
//     try {
//       let { data: res } = await getAllCategories();
//       if (res.data) {
//         setCategoryArr(res.data);
//       }
//     } catch (err) {
//       errorToast(err);
//     }
//   };

//   const handleCreateFlashSale = async () => {
//     try {
//       if (`${name}` === '') {
//         errorToast('Please Fill Name');
//         return 0;
//       }
//       if (`${category}` === '') {
//         errorToast('Please Fill Category');
//         return 0;
//       }
//       if (`${sellingprice}` === '' || parseInt(sellingprice) <= 0) {
//         errorToast('Please Fill Selling Price');
//         return 0;
//       }
//       if (`${price}` === '' || parseInt(price) <= 0) {
//         errorToast('Please Fill Price');
//         return 0;
//       }
//       if (`${thickness}` === '') {
//         errorToast('Please Fill Thickness');
//         return 0;
//       }
//       if (`${application}` === '') {
//         errorToast('Please Fill Application');
//         return 0;
//       }

//       if (`${color}` === '') {
//         errorToast('Please Fill Color');
//         return 0;
//       }

//       if (`${shortDescription}` === '') {
//         errorToast('Please Fill shortDescription');
//         return 0;
//       }

//       if (`${fileBase64}` === '') {
//         errorToast('Please add main imgae');
//         return 0;
//       }
//       if (imageArr && imageArr.length > 1) {
//         if (imageArr.some(el => !el.image || el.image == '')) {
//           errorToast('canot upload blank image');
//           return 0;
//         }
//       }

//       let obj = {
//         name: name,
//         categoryId: category,
//         brand: brand,
//         price: price,
//         sellingprice: sellingprice,
//         specification: {
//           thickness,
//           application,
//           grade,
//           color,
//           wood,
//           glue,
//           warranty,
//         },
//         shortDescription: shortDescription,
//         longDescription: longDescription,
//         status: status,
//         : image,
//         // image:productObj?.mainImage,
//         imageArr: imageArr,
//         categoryArr: [{ categoryId: category }],
//       };
//       let { data: res } = await updateProductApi(obj, productObj?._id);
//       if (res) {
//         toastSuccess(res.message);
//         navigation.navigate("MyProducts")
//       }
//     } catch (error) {
//       errorToast(error);
//     }
//   };

//   const handleCreateBrand = async () => {
//     try {
//       if (`${brandName}` === '') {
//         errorToast('Please Fill Brand Name');
//         return 0;
//       }

//       let obj = {
//         name: brandName,
//         status: true
//       };
//       let { data: res } = await addBrandApi(obj);
//       if (res) {
//         toastSuccess(res.message);
//         handleGetBrands();
//         setBrandModal(false);
//       }
//     } catch (error) {
//       errorToast(error);
//     }
//   };

//   useEffect(() => {
//     if (focused) {
//       handleGetBrands();
//       handleGetCategory();
//       getProductData()
//     }
//   }, [focused]);

//   const handleDocumentPicker = async () => {
//     try {
//       ImagePicker.openPicker({
//         // width: 300,
//         // height: 400,
//         cropping: true,
//         freeStyleCropEnabled: true,
//         includeBase64: true
//       }).then(image => {
//         console.log(image, image.path.split("/")[image.path.split("/").length - 1]);
//         setFile({ name: image.path.split("/")[image.path.split("/").length - 1] });
//         setimage(`data:${image.mime};base64,${image.data}`);
//       });

//       // let file = await DocumentPicker.pickSingle({
//       //   presentationStyle: 'fullScreen',

//       //   type: DocumentPicker.types.images,
//       // });
//       // if (file) {
//       //   console.log(file, 'file');
//       //   let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
//       //   if (base64) {
//       //     console.log('SETTING BASE ^$', file);
//       //     setFile(file);
//       //     setimage(`data:${file.type};base64,${base64}`);
//       //   }
//       //   // getBase64(file, (result) => {
//       //   //     setGstCertificateName(file);
//       //   //     setgstCertificate(result);
//       //   // })
//       // }
//     } catch (error) {
//       handleError(error);
//     }
//   };
//   const handleDocumentPickerArr = async (index) => {
//     try {
//       ImagePicker.openPicker({
//         // width: 300,
//         // height: 400,
//         cropping: true,
//         freeStyleCropEnabled: true,
//         includeBase64: true
//       }).then(image => {
//         console.log(image, image.path.split("/")[image.path.split("/").length - 1]);
//         let tempArr = imageArr
//         tempArr[index].image = `data:${image.mime};base64,${image.data}`
//         setimageArr([...tempArr])
//         // setFile({ name: image.path.split("/")[image.path.split("/").length - 1] });
//         // setimage();
//       });
//       // let file = await DocumentPicker.pickSingle({
//       //   presentationStyle: 'fullScreen',
//       //   type: DocumentPicker.types.images,
//       // });
//       // if (file) {
//       //   console.log(file, 'file');
//       //   let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
//       //   if (base64) {
//       //     console.log('SETTING BASE ^$', file);
//       //     let tempArr = imageArr
//       //     tempArr[index].image = `data:${file.type};base64,${base64}`
//       //     setimageArr([...tempArr])
//       //   }
//       // }
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   const handleDocumentMultiplePicker = async () => {
//     try {
//       let files = await DocumentPicker.pickMultiple({
//         presentationStyle: 'fullScreen',

//         type: DocumentPicker.types.images,
//       });
//       if (files && files.length > 0) {
//         let tempArr = [];
//         for (let el of files) {
//           let base64 = await RNFetchBlob.fs.readFile(el.uri, 'base64');
//           if (base64) {
//             tempArr.push({ image: `data:${file.type};base64,${base64}` });
//           }
//           console.log(tempArr);
//           setimageArr(tempArr);
//         }

//       }
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   const getProductData = async () => {
//     try {
//       if (props?.route?.params?.data) {
//         const { data: res } = await getById(props.route.params.data);
//         if (res) {

//           setProductObj(res.data);
//           prefillStates(res.data)
//         }
//       }
//     } catch (error) {
//       errorToast(error)
//     }
//   }

//   const prefillStates = (obj) => {
//     if (obj) {
//       setname(obj?.name)
//       setsellingprice(`${obj?.sellingprice}`)
//       setPrice(`${obj?.price}`)
//       setthickness(`${obj?.specification?.thickness}`)
//       setapplication(`${obj?.specification?.application}`)
//       setgrade(`${obj?.specification?.grade}`)
//       setcolor(`${obj?.specification?.color}`)
//       setwood(`${obj?.specification?.wood}`)
//       setglue(`${obj?.specification?.glue}`)
//       setwarranty(`${obj?.specification?.warranty}`)
//       setshortDescription(`${obj.shortDescription}`)
//       setLongDescription(`${obj.longDescription}`)
//       if (obj?.categoryId) {
//         setcategory(obj.categoryId)
//       }
//       if (obj?.brand) {
//         setbrand(obj?.brand)
//       }
//       if (obj?.mainImage) {

//         setimage(obj?.mainImage)
//       }
//       setimageArr(obj.imageArr)
//     }
//   }

//   const handleAddImage = () => {
//     if (imageArr.length < 3) {
//       setimageArr([...imageArr, { image: "" }])
//     }
//   }

//   const handleRemoveImage = () => {
//     if ((imageArr.length - 1) > 0) {
//       let tempArr = imageArr
//       tempArr = tempArr.filter((el, index) => index != (tempArr.length - 1))
//       setimageArr([...tempArr])
//     }
//   }

//   return (
//     <ScrollView style={{backgroundColor:'#fff'}}>
//       <Header stackHeader={true} screenName={'Edit Product'} rootProps={props} />
//       <View style={styles1.card_main}>
//         <Text style={styles1.nameheading}>Enter Name </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setname(e)}
//           value={name}
//           label="Name"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Category</Text>

//         <View style={{borderColor:'#B08218', borderWidth:1, borderStyle:'solid', borderRadius:18,}}>
//         {categoryArr && categoryArr.length > 0 && (
//           <Picker selectedValue={category} onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}>
//             <Picker.Item label="Select Category" value="" />
//             {categoryArr.map((el, index) => {
//               return <Picker.Item key={index} label={el?.name} value={el?._id} />;
//             })}
//           </Picker>
//         )}

//         </View>

//         <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//           <Text style={styles1.nameheading}>Brand</Text>
//           <Pressable onPress={() => setBrandModal(true)} style={{marginVertical:10}}><Text style={{ color: "#B08218", borderBottomWidth: 1, borderBottomColor: "#B08218", }}>Add new Brand</Text></Pressable>
//         </View>
//         <View style={{borderColor:'#B08218', borderWidth:1, borderStyle:'solid', borderRadius:18,}}>
//         {brandArr && brandArr.length > 0 && (
//           <Picker selectedValue={brand} onValueChange={(itemValue, itemIndex) => setbrand(itemValue)}>
//             <Picker.Item label="Select Brand" value="" />
//             {brandArr.map((el, index) => {
//               return <Picker.Item key={index} label={el?.name} value={el?._id} />;
//             })}
//           </Picker>
//         )}
// </View>

//         <Text style={styles1.nameheading}>Enter Price </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setPrice(e)}
//           keyboardType="number-pad"
//           value={price}
//           label="Price "
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Selling Price </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           keyboardType="numeric"
//           onChangeText={e => setsellingprice(e)}
//           value={sellingprice}
//           label="Selling Price "
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Thickness </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setthickness(e)}
//           value={thickness}
//           label="Thickness"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Usage/Application </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setapplication(e)}
//           value={application}
//           label="Usage"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Grade </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setgrade(e)}
//           value={grade}
//           label="Grade"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Color </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setcolor(e)}
//           value={color}
//           label="Color"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Wood Type </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setwood(e)}
//           value={wood}
//           label="Wood"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Glue Used </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setglue(e)}
//           value={glue}
//           label="Glue"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Warranty </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setwarranty(e)}
//           value={warranty}
//           label="Warranty"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Short Description </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setshortDescription(e)}
//           value={shortDescription}
//           label="Short Description"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: 50,
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />

//         <Text style={styles1.nameheading}>Enter Long Description </Text>

//         <TextInput
//           style={styles1.mbboot}
//           mode="outlined"
//           onChangeText={e => setLongDescription(e)}
//           value={longDescription}
//           numberOfLines={3}
//           multiline={true}
//           label="Long Description"
//           outlineStyle={{
//             borderWidth: 0.8,
//             borderRadius: 16,
//             borderColor: '#B08218',
//             marginBottom: 15,
//             height: '100%',
//           }}
//           theme={{
//             colors: {
//               text: '#f5f5f5',
//               accent: '#ffffff',
//               primary: '#666666',
//               placeholder: '#f5f5f5',
//               background: '#fff',
//               borderWidth: '1',
//               fontSize: 8,
//             },
//           }}
//           underlineColor="#E7E7E8"
//           underlineColorAndroid="#E7E7E8"
//         />
//         <Text style={styles1.nameheading}>Product Image </Text>

//         <Pressable
//           style={styles1.BorderedPressable}
//           onPress={() => {
//             handleDocumentPicker();
//           }}>
//           {
//             image ?
//               <>
//                 {

//                   `${image}`.includes("base64") ?
//                     <Image style={{ height: 200 }} resizeMode='contain' source={{ uri: image }} />
//                     :

//                     <Image style={{ height: 200 }} resizeMode='contain' source={{ uri: generateImageUrl(image) }} />
//                 }
//               </>
//               :
//               <Text style={styles.borderedPressableText}>Please Upload Image</Text>
//           }
//         </Pressable>
//         {/* <Pressable
//           style={styles1.BorderedPressable}
//           onPress={() => {
//             handleDocumentPicker();
//           }}>
//           <Text style={styles.borderedPressableText}>{file && file.name ? file?.name : 'Please Upload Image'}</Text>
//         </Pressable> */}
//         {/* {
//               imagesArr && imagesArr.length > 0 && imagesArr.map((el, index) => {
//                 return (
//                   <Pressable
//                     key={index}
//                     style={styles1.BorderedPressable}
//                     onPress={() => {
//                       handleDocumentPicker(index);
//                     }}>
//                     {
//                       el && el.image ?
//                         <>
//                           {

//                             `${el.image}`.includes("base64") ?
//                               <Image style={{ height: 200 }} resizeMode='contain' source={{ uri: el.image }} />
//                               :

//                               <Image style={{ height: 200 }} resizeMode='contain' source={{ uri: generateImageUrl(el.image) }} />
//                           }
//                         </>
//                         :
//                         <Text style={styles.borderedPressableText}>Please Upload Image</Text>
//                     }
//                   </Pressable>

//                 )
//               })
//             } */}
//         {/* <Text style={styles1.nameheading}>Product Multiple Images</Text>

//         <Pressable
//           style={styles1.BorderedPressable}
//           onPress={() => {
//             handleDocumentMultiplePicker();
//           }}>
//           <Text style={styles.borderedPressableText}>{imageArr && imageArr.length > 0 ? `${imageArr.length} Files Selected` : 'Please Upload Multiple Image'}</Text>
//         </Pressable> */}
//         <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
//           <Text style={{ color: "black", fontSize: 17, marginLeft: 5 }}>Product Multiple Images</Text>
//           <View style={{ display: "flex", flexDirection: "row" }}>
//             <Pressable onPress={() => handleAddImage()} style={[styles.btnbg, { paddingVertical: 7, paddingHorizontal: 15, marginRight: 10 }]}><Text style={{ color: "white", fontSize: 18 }}>+</Text></Pressable>
//             <Pressable onPress={() => handleRemoveImage()} style={[styles.btnbg, { paddingVertical: 7, paddingHorizontal: 17, marginRight: 10 }]}><Text style={{ color: "white", fontSize: 18 }}>-</Text></Pressable>
//           </View>
//         </View>
//         {
//           imageArr && imageArr.length > 0 && imageArr.map((el, index) => {
//             return (
//               <Pressable
//                 key={index}
//                 style={styles1.BorderedPressable}
//                 onPress={() => {
//                   handleDocumentPickerArr(index);
//                 }}>
//                 {
//                   el && el.image ?
//                     <>
//                       {

//                         `${el.image}`.includes("base64") ?
//                           <Image style={{ height: 200 }} resizeMode='contain' source={{ uri: el.image }} />
//                           :

//                           <Image style={{ height: 200 }} resizeMode='contain' source={{ uri: generateImageUrl(el.image) }} />
//                       }
//                     </>
//                     :
//                     <Text style={styles.borderedPressableText}>Please Upload Image</Text>
//                 }
//               </Pressable>

//             )
//           })
//         }
//         <TouchableOpacity onPress={() => handleCreateFlashSale()} style={[styles.btnbg, { marginBottom: 15, marginTop: 20 }]}>
//           <Text style={styles.textbtn}>Update</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={brandModal}
//         onRequestClose={() => {
//           setBrandModal(!brandModal);
//         }}>
//         <View style={styles1.centeredView}>
//           <View style={styles1.modalView}>
//             <Text style={styles1.modalText}>Add Brand</Text>
//             <Pressable
//               style={[styles1.button, styles1.buttonClose]}
//               onPress={() => setBrandModal(!brandModal)}>

//               <TextInput
//                 style={{ width: wp(90) }}
//                 mode="outlined"
//                 onChangeText={e => setBrandName(e)}
//                 value={brandName}
//                 multiline={true}
//                 label="Brand Name"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: '100%',
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               />

//               <Pressable onPress={() => handleCreateBrand()} style={[styles.btnbg, { marginHorizontal: 20, marginBottom: 15, marginTop: 20 }]}>
//                 <Text style={styles.textbtn}>Submit</Text>
//               </Pressable>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }
// const styles1 = StyleSheet.create({
//   centeredView: {
//     height: hp(100),
//     width: wp(100),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: "rgba(0,0,0,0.7)"
//   },
//   modalView: {
//     margin: 20,
//     width: wp(95),
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     fontSize: 20,
//     marginBottom: 30,
//     color: "black",
//     fontWeight: "700"
//   },
//   flexbetween: {
//     display: 'flex',
//     flexDirection: 'row',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//   },
//   imgsmall: {
//     width: wp(6),
//     height: hp(3),
//   },
//   categry: {
//     fontSize: 18,
//     color: '#000',
//     fontFamily: 'Manrope-Medium',
//   },
//   imgfluid: {
//     width: wp(6),
//     height: hp(3),
//     marginRight: 10,
//   },
//   card_main: {
//     // borderWidth: 1,
//     // borderColor: '#D9D9D9',
//     // borderStyle: 'solid',
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     borderRadius: 5,
//     // width: wp(90),
//     // marginHorizontal: 20,
//   },
//   nameheading: {
//     color: '#000000',
//     fontSize: 12,
//     fontFamily: 'Manrope-Bold',
//     marginHorizontal: 10,
//     marginVertical: 5,
//   },
//   BorderedPressable: {
//     backgroundColor: 'white',
//     borderColor: '#B08218',
//     borderWidth: 1,
//     paddingVertical: 15,
//     paddingLeft: 15,
//     marginTop: 15,
//     borderRadius: 15,
//   },
//   BorderedPressableText: {
//     // backgroundColor: "white",
//     // borderColor: "#B08218",
//     // borderWidth: 1,
//     // paddingVertical: 15,
//     // paddingLeft: 15,
//     // marginTop: 15,
//     // borderRadius: 15,
//   },
// });

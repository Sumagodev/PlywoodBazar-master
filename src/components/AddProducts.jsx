import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View, Modal, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { addBrandApi, getBrandApi } from '../services/brand.service';
import { getAllCategories } from '../services/Category.service';
import { AddProduct } from '../services/Product.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import ImagePicker from 'react-native-image-crop-picker';
import CustomColors from '../styles/CustomColors';
import CustomButton from '../ReusableComponents/CustomButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function AddProducts(props) {

  const navigation = useNavigation();
  const [price, setPrice] = useState(0);
  const [brandModal, setBrandModal] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [brand, setbrand] = useState('');
  const [category, setcategory] = useState('');
  const [name, setname] = useState('');
  const [thickness, setthickness] = useState('');
  const [application, setapplication] = useState('');
  const [grade, setgrade] = useState('');
  const [color, setcolor] = useState('');
  const [wood, setwood] = useState('');
  const [glue, setglue] = useState('');
  const [sellingprice, setsellingprice] = useState('');
  const [warranty, setwarranty] = useState('');
  // const [shortDescription, setshortDescription] = useState('');
  const [longDescription, setLongDescription] = useState();
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [status, setstatus] = useState(false);
  const [imageArr, setimageArr] = useState([{ image: '' },]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [pricetype, setpricetype] = useState("per Nos/sheet");
  const [brandArr, setBrandArr] = useState([]);

  const handleGetBrands = async () => {
    try {
      let { data: res } = await getBrandApi('status=true&page=1&perPage=1000');
      if (res.data) {
        setBrandArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetCategory = async () => {
    try {
      let { data: res } = await getAllCategories();
      if (res.data) {
        setCategoryArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleCreateFlashSale = async () => {
    console.log('asdlfkhasdfh');
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
        pricetype,
        specification: {
          thickness,
          application,
          grade,
          color: color,
          wood,
          glue,
          warranty,
        },
        // shortDescription,
        longDescription: longDescription,
        status: status,
        image: fileBase64,
        imageArr: imageArr,
        categoryArr: [{ categoryId: category }],
      };
      let { data: res } = await AddProduct(obj);
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
      let { data: res } = await addBrandApi(obj);
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
    handleGetBrands();
    handleGetCategory();
  }, []);

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
      //     setFileBase64(`data:${file.type};base64,${base64}`);
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

  const handleDocumentMultiplePicker = async () => {
    try {
      let images = await ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        multiple: true,
        includeBase64: true,
      });

      console.log(JSON.stringify(images, null, 2), images.length, 'imagesArr');

      if (images.length > 3) {
        Alert.alert('You cannot select more than 3 images');
        return;
      }

      let tempArr = [];
      for (let el of images) {
        tempArr.push({ image: `data:${el.mime};base64,${el.data}` });
      }
      console.log(JSON.stringify(tempArr, null, 2));
      setimageArr(tempArr);
      // }

      // let files = await DocumentPicker.pickMultiple({
      //   presentationStyle: 'fullScreen',

      //   type: DocumentPicker.types.images,
      // });
      // if (files && files.length > 0 && files.length < 4) {
      //   let tempArr = [];
      //   for (let el of files) {
      //     let base64 = await RNFetchBlob.fs.readFile(el.uri, 'base64');
      //     if (base64) {
      //       tempArr.push({ image: `data:${file.type};base64,${base64}` });
      //     }
      //     console.log(tempArr);
      //     setimageArr(tempArr);
      //   }
      // }
      // else {
      //   Alert.alert("You cannot select more than 3 images")
      //   // errorToast("Cannot select more than 3 images")
      // }
    } catch (error) {
      handleError(error);
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <ScrollView>
      <Header normal={true} screenName={'Add Products'} rootProps={props} />

      <View style={{ backgroundColor: '#fff', flex: 1, }}>
        <ImageBackground style={styles1.cardContainer} source={require('../../assets/img/main_bg.jpg')}>
          <View style={styles1.card_main}>
            <Text style={{ textAlign: 'center', fontSize: wp(6.0), fontWeight: 'bold' }}>Add Product</Text>
            <Text style={styles1.nameheading}>Enter Name </Text>
            <TextInput
              onChangeText={e => setname(e)}
              value={name}
              placeholder="Name"
              selectionColor={CustomColors.mattBrownDark}
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
            />
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

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles1.nameheading}>Brand</Text>
              <Pressable onPress={() => setBrandModal(true)}>
                <Text style={{ color: CustomColors.glossBrownDark, borderBottomWidth: 1, borderBottomColor: CustomColors.glossBrownDark, fontSize: wp(4.5), fontWeight: 'bold' }}>Add new Brand</Text>
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
              placeholder="Price "
              mode='outlined'

              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}

            />

            <Text style={styles1.nameheading}>Enter Selling Price </Text>

            <TextInput
              keyboardType="numeric"
              onChangeText={e => setsellingprice(e)}
              value={sellingprice}
              placeholder="Selling Price "
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Enter Thickness </Text>

            <TextInput
              onChangeText={e => setthickness(e)}
              value={thickness}
              placeholder="Thickness"
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Enter Usage/Application </Text>

            <TextInput
              onChangeText={e => setapplication(e)}
              value={application}
              placeholder="Usage"
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Enter Grade </Text>

            <TextInput
              onChangeText={e => setgrade(e)}
              value={grade}
              placeholder="Grade"
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Enter Color </Text>

            <TextInput
              onChangeText={e => setcolor(e)}
              value={color}
              placeholder="Color"
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />
            <Text style={styles1.nameheading}>Enter Wood Type </Text>

            <TextInput
              onChangeText={e => setwood(e)}
              value={wood}
              placeholder="Wood"
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Enter Glue Used </Text>

            <TextInput
              onChangeText={e => setglue(e)}
              value={glue}
              placeholder="Glue"
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Enter Warranty </Text>

            <TextInput
              onChangeText={e => setwarranty(e)}
              value={warranty}
              placeholder="Warranty"
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Enter Long Description </Text>

            <TextInput
              onChangeText={e => setLongDescription(e)}
              value={longDescription}
              numberOfLines={3}
              multiline={true}
              mode='outlined'
              activeOutlineColor='transparent'
              placeholder="Long Description"
              outlineColor='white'
              outlineStyle={{ borderRadius: 20 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              selectionColor={CustomColors.mattBrownDark}
            />

            <Text style={styles1.nameheading}>Product Image </Text>
            <Pressable
              style={[styles1.dropdownStyle, { paddingVertical: wp(3), paddingStart: wp(2), flexDirection: 'row', flex: 1, justifyContent: 'space-between' }]}
              onPress={() => {
                handleDocumentPicker();
              }}>
              <Text style={styles.borderedPressableText}>{file && file.name ? file?.name : 'Please Upload Image'}</Text>
              <FontAwesome5Icon style={{ right: wp(5) }} name="caret-square-up" size={wp(6)} color="black" />

            </Pressable>
            <Text style={styles1.nameheading}>Product Multiple Images </Text>

            <Pressable
              style={[styles1.dropdownStyle, { paddingVertical: wp(3), paddingStart: wp(2), flexDirection: 'row', flex: 1, justifyContent: 'space-between' }]}
              onPress={() => {
                handleDocumentMultiplePicker();
              }}>
              <Text style={styles.borderedPressableText}>{imageArr && imageArr.length > 0 ? `${imageArr.length} Files Selected` : 'Please Upload Multiple Image'}</Text>
              <FontAwesome5Icon style={{ right: wp(5) }} name="caret-square-up" size={wp(6)} color="black" />
            </Pressable>
            <View style={{ alignSelf: 'center', marginVertical: wp(5) }}>
              <CustomButton onPress={() => handleCreateFlashSale()} text={'SUBMIT'} textSize={wp(5)} paddingHorizontal={wp(8)} paddingVertical={wp(3)} />
            </View>
          </View>
        </ImageBackground>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={brandModal}
        onRequestClose={() => {
          setBrandModal(!brandModal);
        }}>
        <View style={styles1.centeredView}>
          <View style={styles1.modalView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles1.modalText}>Add Brand</Text>
              <Pressable style={[{ right: wp(-25) }]} onPress={() => setBrandModal(!brandModal)}>
                <FontAwesome5Icon style={{}} name="times" size={wp(8)} color="black" />
              </Pressable>
            </View>

            <TextInput
              onChangeText={e => setBrandName(e)}
              value={brandName}
              placeholder="Brand Name"
              selectionColor={CustomColors.mattBrownDark}
              mode='outlined'
              activeOutlineColor='transparent'
              outlineColor='white'
              outlineStyle={{ borderRadius: 50 }}
              underlineColor='transparent'
              backgroundColor='white'
              borderRadius={50}
              style={{
                width: wp(90),

              }}
            />
            <View style={{ alignSelf: 'center', marginVertical: wp(5) }}>
              <CustomButton onPress={() => handleCreateBrand()} text={'SUBMIT'} textSize={wp(5)} paddingHorizontal={wp(8)} paddingVertical={wp(3)} />
            </View>


          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles1 = StyleSheet.create({
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
  }
});

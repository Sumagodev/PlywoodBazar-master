import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../navigation/customheader/Header';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { errorToast, toastSuccess } from '../utils/toastutill'; // Assuming this is your custom toast function.
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import { Banner_Type } from '../utils/constants';
import CustomColors from '../styles/CustomColors';
import { getDecodedToken } from '../services/User.service';
import { getAllProducts, getAllProductsBySupplierId } from '../services/Product.service';
import { Dropdown } from 'react-native-element-dropdown';
import { AddBaner } from '../services/Advertisement.service';
export default function AddBannerForm(props) {
  const navigation = useNavigation();
  const [bannerImage, setBannerImage] = useState('');
  const [productArr, setProductArr] = useState([]);
  const [selectedType, setSelectedType] = useState('');
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
  const [productsArray, setproductsArray] = useState([]);
  const handleSelectType = (index) => {
    const updatedBannertype = Bannertype.map((item, i) => ({
      ...item,
      checked: i === index,
    }));
    setBannertype(updatedBannertype);
    setSelectedType(updatedBannertype[index].name);
  };
  console.log('selectedType', selectedType);

  useEffect(() => {
    // Example of fetching some initial data or performing side effects
    const fetchInitialData = async () => {
      try {
        // Perform any necessary async data fetching here
      } catch (error) {
        errorToast(error.message);
      }
    };

    fetchInitialData();
    handleGetProdductsBySupplierId();
  }, [focused]);

  const handlePickBannerImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      });

      setBannerImage(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      errorToast(error.message);
    }
  };
  const resetForm = () => {


    setSelectedType(null);
    setuserid(null);
    setBannerImage('');
    setSelectedproductsArray('');
    // setSelectedItems([]);
  }

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

  const handleSubmit = async () => {

    try {
      if (`${selectedType}` === '') {
        errorToast('Select is Type');
        return 0;
      }

      if (`${bannerImage}` === '') {
        errorToast('Image is Required');
        return 0;
      }
      if (selectedType === 'productbanner') {
        if (`${selectedproductsArray}` === '') {
          errorToast('Product is Required');
          return 0;
        }
      }
      // if (`${CategoryArr}` === '') {
      //   errorToast('Categories is Required');
      //   return 0;
      // }
      // // if (`${selectedproductsArray}` === '') {
      // //   errorToast('Product is Required');
      // //   return 0;
      // // }
      // if (`${selectedItems}` === '') {
      //   errorToast('City is Required');
      //   return 0;
      // }

      let obj = {
        type: selectedType,
        userId: userId,
        image: bannerImage,
        ...(selectedType === 'productbanner' && {
          productId: selectedproductsArray?._id,
        }),

      };
      const { data: res } = await AddBaner(obj);
      if (res) {
        toastSuccess(res.message);
        navigation.goBack();
        resetForm();
      }
    } catch (error) {
      errorToast(error);
    }
  };
  return (
    <>
      <Header normal={true} rootProps={props} />
      <View source={require('../../assets/img/main_bg.jpg')} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Banner</Text>

          <View style={styles.imageContainer}>
            {bannerImage ? ( 
              <Image
                source={{ uri: bannerImage }}
                style={styles.image}
                resizeMode="center"
              />
            ) : (
              <Text style={styles.noImageText}>No Image Selected</Text>
            )}

            <TouchableOpacity
              style={styles.editButton}
              onPress={handlePickBannerImage}
            >
              <FontAwesome name="pencil" size={wp(5)} color="#603200" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: "center", marginTop: wp(5) }}>

            {Bannertype.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioButtonContainer}
                onPress={() => handleSelectType(index)}
              >
                <View style={styles.radioButton}>
                  {item.checked ? (
                    <FontAwesome name="circle" size={wp(6)} color={CustomColors.mattBrownDark} />
                  ) : (
                    <FontAwesome name="circle-o" size={wp(6)} color="#603200" />
                  )}
                </View>
                <Text style={styles.radioLabel}>{item.showname}</Text>
              </TouchableOpacity>

            ))}
          </View>
          {
            selectedType === 'productbanner' ?
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
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
                  setSelectedproductsArray(item); // Use `item.value` to match the `valueField`
                }}
              />
              : null
          }
          <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", margin: wp(4) }}>
            <CustomButtonNew text={'Submit'} paddingHorizontal={wp(7)} onPress={() => handleSubmit()} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#5647871a"
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: wp(6),
    marginVertical: wp(2),
    fontWeight: '800',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: wp(50),
    // backgroundColor: 'red',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black'
  },
  image: {
    height: '100%',
    borderRadius: 0,
  },
  noImageText: {
    color: '#000',
    textAlign: 'center',
    marginTop: wp(20),
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: wp(10),
    width: wp(10),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#603200',
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
  dropdown: {
    margin: 1,
    borderRadius: 25,
    padding: 12,
    elevation: 3,
    borderColor: CustomColors.searchBgColor,
    backgroundColor: CustomColors.mattBrownFaint,
    shadowColor: CustomColors.shadowColorGray,
    height: wp(13.5),
    borderWidth: 0.6,
    marginBottom: 4,
    width: '85%'
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

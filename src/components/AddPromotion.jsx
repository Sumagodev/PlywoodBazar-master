import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput, ScrollView ,ActivityIndicator} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import CustomColors from '../styles/CustomColors';
import CustomButton from '../ReusableComponents/CustomButton';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { AddAdvertisement } from '../services/Advertisement.service';
import { createFlashSales } from '../services/FlashSales.service';
import { getAllProducts } from '../services/Product.service';
import { getDecodedToken } from '../services/User.service';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { errorToast, toastSuccess } from '../utils/toastutill';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
export default function AddPromotions(props) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductObj, setSelectedProductObj] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [open, setOpen] = useState(false);
  const [endDatePickerModal, setEndDatePickerModal] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const handleGetProducts = async () => {
    try {
      let decodedToken = await getDecodedToken();
      let query = `page=${1}&perPage=${10000}&userId=${decodedToken?.userId}`;
      let { data: res } = await getAllProducts(query);
      if (res) {
        setProductArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);
  const resetForm = () => {
    setStartDate([]);
    setProductArr([]);
    setEndDate([]);
    setSelectedProductId('');
    setSelectedProductObj('');
    setMessage(null);
    setFile(null);
    setFileBase64([]);
  };
  const handleProductSelections = value => {
    let tempArr = [...productArr];
    let tempObj = tempArr.find(el => el._id == value);
    if (tempObj) {
      setSelectedProductId(value);
      setSelectedProductObj(tempObj);
    }
  }; 

  // const handleCreatePromotion = async () => {
  //   try {
  //     let decodedToken = await getDecodedToken();
  //     let obj = {
  //       userId: decodedToken?.userId,
  //       productId: selectedProductId,
  //       message,
  //       image: fileBase64,
  //       productSlug: selectedProductObj?.slug,
  //       endDate,
  //       startDate,
  //       isVideo
  //     };
  //     setIsLoading(true)
  //     let { data: res } = await AddAdvertisement(obj);
  //     if (res) {
  //       toastSuccess(res.message);
  //       setIsLoading(false)
  //       navigation.navigate('MyPromotions')
  //     }
  //   } catch (error) {
  //     errorToast(error);
  //     setIsLoading(false)
  //   }
  // };
const handleCreatePromotion = async () => {
  try {
    // Validate if a product ID is provided
    if (!selectedProductId) {
      errorToast('Product ID is required.');
      setIsLoading(false);
      return;
    }

    // Validate if a message is provided
    if (!message || message.trim().length === 0) {
      errorToast('Message is required.');
      setIsLoading(false);
      return;
    }

    // Validate if an image is provided
    if (!fileBase64) {
      errorToast('Image is required.');
      setIsLoading(false);
      return;
    }

    // Validate if a product slug is provided
    if (!selectedProductObj?.slug) {
      errorToast('Product is required.');
      setIsLoading(false);
      return;
    }

    // Validate if start date is provided
    if (!startDate) {
      errorToast('Start date is required.');
      setIsLoading(false);
      return;
    }

    // Validate if end date is provided
    if (!endDate) {
      errorToast('End date is required.');
      setIsLoading(false);
      return;
    }

    // Validate that end date is after start date
    if (new Date(startDate) >= new Date(endDate)) {
      errorToast('End date must be after start date.');
      setIsLoading(false);
      return;
    }

    // If all validations pass, proceed to create the promotion
    let decodedToken = await getDecodedToken();
    let obj = {
      userId: decodedToken?.userId,
      productId: selectedProductId,
      message,
      image: fileBase64,
      productSlug: selectedProductObj?.slug,
      endDate,
      startDate,
      isVideo,
    };

    setIsLoading(true); // Start loading
    let { data: res } = await AddAdvertisement(obj);
    if (res) {
      toastSuccess(res.message);
      navigation.navigate('MyPromotions');
      resetForm()
    }
  } catch (error) {
    errorToast(error);
  } finally {
    setIsLoading(false); // Ensure loading is stopped in both success and error cases
  }
};

  const handleDocumentPicker = async () => {
    try {
      let file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });
      if (file) {
        console.log(file, file.type, file.type.includes("video"), 'file');
        let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
        if (base64) {
          console.log('SETTING BASE ^$', file);
          setFile(file);
          // if (base64 && image.includes("base64")) {
          if (file.type.includes("video")) {
            setIsVideo(true)
          }
          else {
            setIsVideo(false)
          }
          // }
          setFileBase64(`data:${file.type};base64,${base64}`);
        }
        // getBase64(file, (result) => {
        //     setGstCertificateName(file);
        //     setgstCertificate(result);
        // })
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');

      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered');
    } else {
      throw err;
    }
    errorToast(err);
  };

  return (
    <>
      <Header normal={true} rootProps={props} />
      <View style={{ backgroundColor: '#fff', flex: 1 }}>

        <View style={styles1.cardContainer} >
          <ScrollView>
          <Text style={{fontSize: wp(6), marginVertical: wp(2), fontWeight: 600, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>Add Promotion</Text>

            <View style={[styles1.card_main,]}>
              <Text style={[styles1.nameheading,]}>Product</Text>

              <View style={styles1.dropdownStyle}>
                {productArr && productArr.length > 0 && (
                  <Picker selectedValue={selectedProductId} onValueChange={(itemValue, itemIndex) => handleProductSelections(itemValue)}>
                    <Picker.Item label="Select Product" value="" />
                    {productArr.map((el, index) => {
                      return <Picker.Item key={index} label={el?.name} value={el?._id} />;
                    })}
                  </Picker>
                )}
              </View>
              <Text style={styles1.nameheading}>Promotion Message </Text>


              <TextInput
                onChangeText={e => setMessage(e)}
                keyboardType="text"
                value={message}
                placeholder="Message "

                underlineColor='transparent'
                backgroundColor='white'
                placeholderTextColor={'#000'}
                borderRadius={25}
                paddingHorizontal={15}
                fontSize={wp(2.8)}
                selectionColor={CustomColors.mattBrownDark}
                maxLength={200}
                multiline={true}
                style={{
                  textAlignVertical: 'top', // Aligns text to the top in multiline mode
          
                    color: '#000',
                    height:wp(28),
                    fontSize:wp(4)
              
                }}

              />

              <Pressable onPress={() => setOpen(true)}>
                <Text style={styles1.nameheading}>Enter Start Date </Text>
                <TextInput
                  keyboardType="number-pad"

                  value={moment(startDate).format('DD-MM-YYYY')}
                  placeholder="Select Date"

                  underlineColor='transparent'
                  backgroundColor='white'
                  placeholderTextColor={'#000'}
                  borderRadius={50}
                  paddingHorizontal={15}
                  fontSize={wp(2.8)}
                  selectionColor={CustomColors.mattBrownDark}
                  editable={false}
                  style={{
                    color: '#000',
                    fontSize:wp(4),
                    height:wp(14)
                  }}
                />
              </Pressable>


              <Pressable onPress={() => setEndDatePickerModal(true)}>
                <Text style={styles1.nameheading}>Enter End Date </Text>

                <TextInput
                  keyboardType="number-pad"

                  value={moment(endDate).format('DD-MM-YYYY')}
                  placeholder="Select Date"

                  underlineColor='transparent'
                  backgroundColor='white'
                  placeholderTextColor={'#000'}
                  borderRadius={50}
                  paddingHorizontal={15}
                  fontSize={wp(2.8)}
                  selectionColor={CustomColors.mattBrownDark}
                  editable={false}
                  style={{
                    color: '#000',
                    height:wp(14),
                    fontSize:wp(4)
                  }}
                />
              </Pressable>

              <Text style={styles1.nameheading}>Product Image </Text>
              <Pressable
                style={[styles1.dropdownStyle, { paddingVertical: wp(2.1), paddingHorizontal:wp(4), paddingStart: wp(2), justifyContent: 'space-between' ,flexDirection:'row'}]}
                onPress={() => {
                  handleDocumentPicker();
                }}>
                <Text style={[styles.borderedPressableText,{marginHorizontal:wp(2),alignSelf:'center'}]}>{file && file.name ? file?.name : 'Please Upload Image'}</Text>

                <FontAwesome5 name="upload" color="#000" style={{alignSelf:'center'}} size={wp(6)} />

              </Pressable>


              <View style={{ alignSelf: 'center', marginVertical: wp(5) }}>
               {isLoading?<ActivityIndicator size="large" color={CustomColors.mattBrownDark}  style={{marginTop:wp(5),marginBottom:wp(5)}}/>
                    :
              <CustomButtonNew onPress={() => handleCreatePromotion()} text={'SUBMIT'} textSize={wp(4)} paddingHorizontal={wp(7)} paddingVertical={wp(3)} />

                    } 
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <DatePicker
        modal
        minimumDate={new Date()}
        mode="date"
        open={open}
        date={startDate}
        onConfirm={date => {
          setOpen(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        minimumDate={new Date()}
        mode="date"
        open={endDatePickerModal}
        date={endDate}
        onConfirm={date => {
          setEndDatePickerModal(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setEndDatePickerModal(false);
        }}
      />

    </>
  );

}
const styles1 = StyleSheet.create({
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
    // borderWidth: 1,
    // borderColor: '#D9D9D9',
    // borderStyle: 'solid',
    paddingHorizontal: 10,
    // paddingVertical: 12,
    // borderRadius: 5,
    // width: wp(90),
    // marginHorizontal: 20,
  },

  BorderedPressable: {
    // backgroundColor: 'white',
    // borderColor: '#B08218',
    // borderWidth: 1,
    // paddingVertical: 15,
    // paddingLeft: 15,
    // marginTop: 15,
    // borderRadius: 15,
  },
  BorderedPressableText: {
    // backgroundColor: "white",
    // borderColor: "#B08218",
    // borderWidth: 1,
    // paddingVertical: 15,
    // paddingLeft: 15,
    // marginTop: 15,
    // borderRadius: 15,
  },
  mbboot: {
    marginBottom: 10
  },

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
    height: '100%'
    ,backgroundColor:"#5647871a"
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
    height:wp(14)

  }
});
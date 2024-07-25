import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import { TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { AddAdvertisement } from '../services/Advertisement.service';
import { createFlashSales } from '../services/FlashSales.service';
import { getAllProducts } from '../services/Product.service';
import { getDecodedToken } from '../services/User.service';

import { errorToast, toastSuccess } from '../utils/toastutill';
export default function AddPromotions(props) {
  const navigation = useNavigation();

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

  const handleProductSelections = value => {
    let tempArr = [...productArr];
    let tempObj = tempArr.find(el => el._id == value);
    if (tempObj) {
      setSelectedProductId(value);
      setSelectedProductObj(tempObj);
    }
  };

  const handleCreatePromotion = async () => {
    try {
      let decodedToken = await getDecodedToken();
      let obj = {
        userId: decodedToken?.userId,
        productId: selectedProductId,
        message,
        image: fileBase64,
        productSlug: selectedProductObj?.slug,
        endDate,
        startDate,
        isVideo
      };
      let { data: res } = await AddAdvertisement(obj);
      if (res) {
        toastSuccess(res.message);
        navigation.navigate('MyPromotions')
      }
    } catch (error) {
      errorToast(error);
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
      <Header stackHeader={true} screenName={'Create Advertisement'} rootProps={props} />
      <View style={{backgroundColor:'#fff', flex:1}}>

     
      <View style={[styles1.card_main,]}>
        <Text style={[styles1.nameheading,]}>Product</Text>
    <View style={{borderColor:'#B08218', borderWidth:1, borderRadius:18,}}>

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
          style={styles1.mbboot}
          mode="outlined"
          onChangeText={e => setMessage(e)}
          value={message}
          label="Message"
          outlineStyle={{
            borderWidth: 0.8,
            borderRadius: 16,
            borderColor: '#B08218',
            marginBottom: 15,
            height: 50,
          }}
          theme={{
            colors: {
              text: '#f5f5f5',
              accent: '#ffffff',
              primary: '#666666',
              placeholder: '#f5f5f5',
              background: '#fff',
              borderWidth: '1',
              fontSize: 8,
            },
          }}
          underlineColor="#E7E7E8"
          underlineColorAndroid="#E7E7E8"
        />
        <Pressable onPress={() => setOpen(true)}>
          <Text style={styles1.nameheading}>Enter Start Date </Text>

          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            disabled
            value={moment(startDate).format('DD-MM-YYYY')}
            label="Start Date "
            outlineStyle={{
              borderWidth: 0.8,
              borderRadius: 16,
              borderColor: '#B08218',
              marginBottom: 15,
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#f5f5f5',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#E7E7E8"
            underlineColorAndroid="#E7E7E8"
          />
        </Pressable>
        <Pressable onPress={() => setEndDatePickerModal(true)}>
          <Text style={styles1.nameheading}>Enter End Date </Text>

          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            disabled
            value={moment(endDate).format('DD-MM-YYYY')}
            label="End Date "
            outlineStyle={{
              borderWidth: 0.8,
              borderRadius: 16,
              borderColor: '#B08218',
              marginBottom: 15,
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#f5f5f5',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#E7E7E8"
            underlineColorAndroid="#E7E7E8"
          />
        </Pressable>

        <Pressable
          style={styles1.BorderedPressable}
          onPress={() => {
            handleDocumentPicker();
          }}>
          <Text style={styles.borderedPressableText}>{file && file.name ? file?.name : 'Please Upload Image'}</Text>
        </Pressable>

        <TouchableOpacity onPress={() => handleCreatePromotion()} style={[styles.btnbg, { marginBottom: 15, marginTop: 20 }]}>
          <Text style={styles.textbtn}>Submit</Text>
        </TouchableOpacity>
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
  nameheading: {
    color: '#000000',
    fontSize:  12,
    fontFamily: 'Manrope-Bold',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  BorderedPressable: {
    backgroundColor: 'white',
    borderColor: '#B08218',
    borderWidth: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    marginTop: 15,
    borderRadius: 15,
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
  mbboot:{
    marginBottom:10
  }
});

import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import {createFlashSales, getFlashSalebyId, updateFlashSalebyId} from '../services/FlashSales.service';
import {getAllProducts} from '../services/Product.service';
import {getDecodedToken} from '../services/User.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
export default function EditFlashSale(props) {
  const navigation = useNavigation();

  const [discountType, setDiscountType] = useState('Percentage');
  const [productArr, setProductArr] = useState([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductObj, setSelectedProductObj] = useState(null);

  const [open, setOpen] = useState(false);
  const [endDatePickerModal, setEndDatePickerModal] = useState(false);
  const handleGetProducts = async () => {
    try {
      let decodedToken = await getDecodedToken();
      let query = `page=${1}&perPage=${10000}&userId=${decodedToken?.userId}`;
      let {data: res} = await getAllProducts(query);
      if (res) {
        setProductArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const getExistingFlashSale = async () => {
    try {
      const {data: res} = await getFlashSalebyId(props?.route?.params?.data);
      if (res) {
        console.log(JSON.stringify(res.data, null, 2));
        setPrice(`${res.data.price}`);
        setSalePrice(`${res.data.salePrice}`);
        setDiscountType(`${res.data.discountType}`);
        setDiscountValue(`${res.data.discountValue}`);
        setStartDate(new Date(res.data.startDate));
        setEndDate(new Date(res.data.endDate));
        setSelectedProductId(res?.data?.productId?._id);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
    getExistingFlashSale();
  }, []);

  const handleProductSelections = value => {
    let tempArr = [...productArr];
    let tempObj = tempArr.find(el => el._id == value);
    if (tempObj) {
      setSelectedProductId(value);
      setSelectedProductObj(tempObj);
      // setPrice(`${tempObj?.price}`);
    }
  };

  useEffect(() => {
    if (price && discountType && discountValue) {
      let tempPrice = parseInt(price);
      let tempDiscountValue = parseInt(discountValue);
      if (discountType == 'Percentage') {
        let tempCheck = tempPrice - tempPrice * (tempDiscountValue / 100);
        setSalePrice(`${tempCheck}`);
      } else {
        let tempCheck = tempPrice - tempDiscountValue;
        setSalePrice(`${tempCheck}`);
      }
    }
  }, [price, discountType, discountValue]);

  const handleCreateFlashSale = async () => {
    try {
      if (`${selectedProductId}` === '' || !selectedProductId) {
        errorToast({message: 'Please select a product'});
        return 0;
      }
      if (`${salePrice}` === '' || parseInt(salePrice) < 0) {
        errorToast({message: 'Please Fill Sale Price'});
        return 0;
      }
      if (`${price}` === '' || parseInt(price) < 0) {
        errorToast({message: 'Please Fill Price'});
        return 0;
      }
      if (discountType == 'Percentage' && parseInt(discountValue) > 100) {
        errorToast({message: 'Percentage discount cannot be more than 100%'});
        return 0;
      }
      if (discountType == 'Amount' && parseInt(discountValue) >= parseInt(price)) {
        errorToast({message: 'Amount discount cannot be more than price of the product'});
        return 0;
      }
      console.log('ECCE');
      let decodedToken = await getDecodedToken();
      let obj = {
        userId: decodedToken?.userId,
        productId: selectedProductId,
        price: price,
        discountType,
        discountValue,
        salePrice: `${salePrice}`,
        endDate,
        startDate,
      };
      let {data: res} = await updateFlashSalebyId(props.route.params.data, obj);
      if (res) {
        toastSuccess(res.message);
        navigation.navigate('MyFlashSales')


      }
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <>
      <Header stackHeader={true} screenName={'Edit Flash Sale'} rootProps={props} />

      <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal: 10}}>
        <View style={styles1.card_main}>
          <Text style={styles1.nameheading}>Product</Text>

          <View style={{borderColor: '#B08218', borderWidth: 1, borderStyle: 'solid', borderRadius: 18}}>
            {productArr && productArr.length > 0 && (
              <Picker selectedValue={selectedProductId} onValueChange={(itemValue, itemIndex) => handleProductSelections(itemValue)}>
                <Picker.Item label="Select Product" value="" />
                {productArr.map((el, index) => {
                  return <Picker.Item key={index} label={el?.name} value={el?._id} />;
                })}
              </Picker>
            )}
          </View>

          <Text style={styles1.nameheading}>Discount Type</Text>

          <View style={{borderColor: '#B08218', borderWidth: 1, borderStyle: 'solid', borderRadius: 18}}>
            <Picker selectedValue={discountType} onValueChange={(itemValue, itemIndex) => setDiscountType(itemValue)}>
              <Picker.Item label="Percentage" value="Percentage" />
              <Picker.Item label="Amount" value="Amount" />
            </Picker>
          </View>

          <Text style={styles1.nameheading}>Enter Discount Value</Text>

          <TextInput
            style={styles1.mbboot}
            keyboardType="number-pad"
            mode="outlined"
            onChangeText={e => setDiscountValue(e)}
            value={discountValue}
            label="Discount Value "
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
          <Text style={styles1.nameheading}>Enter Price </Text>

          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setPrice(e)}
            keyboardType="number-pad"
            value={price}
            label="Price "
            // disabled
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

          <Text style={styles1.nameheading}>Enter Sale Price </Text>

          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            keyboardType="numeric"
            // disabled
            onChangeText={e => setSalePrice(e)}
            value={salePrice}
            label="Sale Price "
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
              // disabled
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
              // disabled
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

          <TouchableOpacity onPress={() => handleCreateFlashSale()} style={[styles.btnbg, { marginBottom: 15, marginTop: 20}]}>
            <Text style={styles.textbtn}>Update</Text>
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
          console.log(date);
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
  // card_main: {
  //     borderWidth: 1,
  //     borderColor: '#D9D9D9',
  //     borderStyle: 'solid',
  //     paddingHorizontal: 10,
  //     paddingVertical: 12,
  //     borderRadius: 5,
  //     width: wp(90),
  //     marginHorizontal: 20,
  // },
  nameheading: {
    color: '#000000',
    fontSize: wp(3),
    fontFamily: 'Manrope-Bold',
    // marginHorizontal: 10,
    marginVertical: hp(1),
  },
});

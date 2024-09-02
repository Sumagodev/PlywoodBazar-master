import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ImageBackground, Pressable, ScrollView, StyleSheet,TextInput, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import {getAllProducts} from '../services/Product.service';
import {getDecodedToken} from '../services/User.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
import moment from 'moment';
import {createFlashSales} from '../services/FlashSales.service';
import {SuccessToast} from 'react-native-toast-message';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import { color } from '@rneui/base';
import CustomColors from '../styles/CustomColors';
export default function AddFlashSale(props) {
  const navigation = useNavigation();

  const [discountType, setDiscountType] = useState('Percentage');
  const [pricetype, setpricetype] = useState("per Nos/sheet");
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

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleProductSelections = value => {
    let tempArr = [...productArr];
    let tempObj = tempArr.find(el => el._id == value);
    if (tempObj) {
      setSelectedProductId(value);
      console.log(JSON.stringify(tempObj, null, 2), 'TEMPOBJ CEC');
      setSelectedProductObj(tempObj);
      setPrice(`${tempObj?.price}`);
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
      if (discountType == 'Percentage' && discountValue > 100) {
        errorToast({message: 'Percentage discount cannot be more than 100%'});
        return 0;
      }
      if (discountType == 'Amount' && parseInt(discountValue) > parseInt(price)) {
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
        pricetype,
        endDate,
        startDate,
      };
      let {data: res} = await createFlashSales(obj);
      if (res) {
        toastSuccess(res.message);
        navigation.navigate('MyFlashSales');
      }
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <>
      <Header normal={true} screenName={'Create Flash Sales'} rootProps={props} />

<ScrollView style={{backgroundColor:'#FFFFFF'}}>




      <View style={{flex: 1,borderTopLeftRadius:wp(10),borderTopRightRadius:wp(10),marginTop:wp(0), width:wp(100),overflow:'hidden'}}>
      <ImageBackground style={{flex: 1,borderRadius:wp(15)}} source={require('../../assets/img/temp_bg.png')}>
      <Text style={{fontSize:wp(5),fontWeight:800,alignSelf:'center',marginTop:wp(5)}}>Create a Flash Sale</Text>

        <View style={styles1.card_main}>
          <Text style={styles1.nameheading}>Product</Text>

          <View style={{backgroundColor:'white',height: 50,borderRadius:wp(5)}}>
            {productArr && productArr.length > 0 && ( 
              <Picker  style={{}} selectedValue={selectedProductId} onValueChange={(itemValue, itemIndex) => handleProductSelections(itemValue)}>
                <Picker.Item label="Select Product" value="" />
                {productArr.map((el, index) => {
                  return <Picker.Item key={index} label={el?.name} value={el?._id} />;
                })}
              </Picker>
            )}
          </View>
          <Text style={styles1.nameheading}>Discount Type</Text>

          <View style={{backgroundColor:'white',height: 50,borderRadius:wp(5)}}>
            <Picker selectedValue={discountType} onValueChange={(itemValue, itemIndex) => setDiscountType(itemValue)}>
              <Picker.Item label="Percentage" value="Percentage" />
              <Picker.Item label="Amount" value="Amount" />
            </Picker>
          </View>

          <Text style={styles1.nameheading}>Enter Discount Value</Text>

          <TextInput
            style={styles1.mbboot}
            keyboardType="number-pad"
            mode="flat"
            selectionColor={CustomColors.mattBrownDark}
            onChangeText={e => setDiscountValue(e)}
            value={discountValue}
            placeholder="Discount Value "
            outlineStyle={{
              borderRadius: 16,
              marginBottom: 15,
              borderColor:'white',
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#000000',
                background: '#fff',
                fontSize: 8,
                color:'#000000'
              },
            }}
            underlineColor="#FFFFFF"
            underlineColorAndroid="#FFFFFF"
          />
          <Text style={styles1.nameheading}>Enter Price </Text>

          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setPrice(e)}
            keyboardType="number-pad"
            value={price}
            placeholder="Price "
            selectionColor={CustomColors.mattBrownDark}

            // disabled
            outlineStyle={{
              
              borderColor:'white',
              backgroundColor:'white',
              height: 50,
              borderRadius:wp(5),
              marginBottom: 15,
              
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#000000',
                background: '#fff',
                fontSize: 8,
              },
            }}
            underlineColor="#FFFFFF"
            underlineColorAndroid="#FFFFFF"
          />

          <Text style={styles1.nameheading}>Enter Sale Price </Text>

          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            keyboardType="numeric"
            selectionColor={CustomColors.mattBrownDark}

            // disabled
            onChangeText={e => setSalePrice(e)}
            value={salePrice}
            placeholder="Sale Price "
            outlineStyle={{
              backgroundColor:'white',
              height: 50,
              borderRadius:wp(5),
              marginBottom: 15,
              borderColor:'white',
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#000000',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#FFFFFF"
            underlineColorAndroid="#FFFFFF"
          />

          <Text style={styles1.nameheading}>Select Type</Text>
          <View style={{borderRadius: 18,backgroundColor:'white'}}>
            <Picker selectedValue={pricetype} onValueChange={(itemValue, itemIndex) => setPrice(itemValue)}>
              <Picker.Item label="per Nos/sheet" value="per Nos/sheet" />
              <Picker.Item label="per sq.ft" value="per sq.ft" />
              <Picker.Item label="per sq.mt" value="per sq.mt" />
              <Picker.Item label=" per Rn.ft" value=" per Rn.ft" />
              <Picker.Item label="per Cu.ft" value="per Cu.ft" />
              <Picker.Item label="p per Cu.mt" value="p per Cu.mt" />
            </Picker>
          </View>

          <Pressable onPress={() => setOpen(true)}>
            <Text style={styles1.nameheading}>Enter Start Date </Text>

            <TextInput
              style={styles1.mbboot}
              mode="outlined"
              selectionColor={CustomColors.mattBrownDark}

              disabled
              value={moment(startDate).format('DD-MM-YYYY')}
              placeholder="Start Date "
              outlineStyle={{
                backgroundColor:'white',
                height: 50,
                borderRadius:wp(5),
                marginBottom: 15,
              }}
              theme={{
                colors: {
                  text: '#f5f5f5',
                  accent: '#ffffff',
                  primary: '#666666',
                  placeholder: '#000000',
                  background: '#fff',
                  borderWidth: '1',
                  fontSize: 8,
                },
              }}
              underlineColor="#FFFFFF"
              underlineColorAndroid="#FFFFFF"
            />
          </Pressable>
          <Pressable onPress={() => setEndDatePickerModal(true)}>
            <Text style={styles1.nameheading}>Enter End Date </Text>

            <TextInput
              style={styles1.mbboot}
              mode="outlined"
              selectionColor={CustomColors.mattBrownDark}

              disabled
              value={moment(endDate).format('DD-MM-YYYY')}
              placeholder="End Date "
              outlineStyle={{
                backgroundColor:'white',
              height: 50,
              borderRadius:wp(5),
              marginBottom: 15,
              }}
              theme={{
                colors: {
                  text: '#f5f5f5',
                  accent: '#ffffff',
                  primary: '#666666',
                  placeholder: '#000000',
                  background: '#fff',
                  borderWidth: '1',
                  fontSize: 8,
                },
              }}
              underlineColor="#FFFFFF"
              underlineColorAndroid="#FFFFFF"
            />
          </Pressable>

          <View style={{marginTop:wp(5),marginBottom:wp(7),alignSelf:'center'}}>
            <CustomButtonNew  paddingHorizontal={wp(5)} paddingVertical={wp(3.5)} buttonBgColor='#58402C' onPress={() => handleCreateFlashSale()} text={"Create a Flash Sale"}></CustomButtonNew>
          </View>
        </View>
      </ImageBackground>

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

</ScrollView>
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,    
    borderRadius:wp(15),
    
  },
  nameheading: {
    color: '#000000',
    fontSize: wp(3),
    fontFamily: 'Manrope-Bold',
    
    // marginHorizontal: 10,
    marginVertical: hp(1),
  },
  mbboot:{
    color:'#000000',
    backgroundColor:'white',
    borderRadius:18,
    paddingLeft:10,

  },
  pickerContainer: {
    backgroundColor: 'red', // Red background color
    borderRadius: 10,       // Rounded corners
    overflow: 'hidden',     // Ensures the picker stays within rounded corners
    padding: 10,            // Padding inside the container
  },
});

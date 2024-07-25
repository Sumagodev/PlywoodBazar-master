import {View, Text, ScrollView, Pressable, Image, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from '../../assets/stylecomponents/Style';
import Entypo from 'react-native-vector-icons/Entypo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Header from '../navigation/customheader/Header';

export default function Myorders(props) {
    const navigation = useNavigation()
  const [myorder, setmyorder] = useState([
    {
      status: 'In Transit',
      datetime: '26 Jan 2022, 09:45pm',
      orderid: '0AMIWBE12345',
      totalitem: '17 Items',
      totalprice:'₹337',
      type:1,
      bgcolor1:'#F2DAB4',
      textcolor:'#CC6932'
      
    },
    {
        status: 'Delivered',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:2,
        bgcolor1:'#CFF2B4',
        textcolor:'#32CC4B'
      },
      {
        status: 'Cencenlled',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:3,
        bgcolor1:'#CCC8BB',
        textcolor:'#000'
      },
      {
        status: 'In Transit',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:1,
        bgcolor1:'#F2DAB4',
        textcolor:'#CC6932'
      },
      {
        status: 'Delivered',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:2,
        bgcolor1:'#CFF2B4',
        textcolor:'#32CC4B'
      },
      {
        status: 'Cencenlled',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:3,
        bgcolor1:'#CCC8BB',
        textcolor:'#000'
      },
      {
        status: 'In Transit',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:1,
        bgcolor1:'#F2DAB4',
        textcolor:'#CC6932'
      },
      {
        status: 'Cencenlled',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:3,
        bgcolor1:'#CCC8BB',
        textcolor:'#000'
      },
      {
        status: 'In Transit',
        datetime: '26 Jan 2022, 09:45pm',
        orderid: '0AMIWBE12345',
        totalitem: '17 Items',
        totalprice:'₹337',
        type:1,
        bgcolor1:'#F2DAB4',
        textcolor:'#CC6932'
      },
  ]);

  const rendermyorder = ({item, index}) => {
    return (
      <>

        <View style={styles1.cardborder}>
          <View>
            <View style={{display: 'flex', gap: 15, flexDirection: 'row'}}>
              <Text style={[styles1.statusbar,{backgroundColor:item.bgcolor1, color:item.textcolor}]}>{item.status}</Text>
              <Text style={styles1.datetime}>{item.datetime}</Text>
            </View>
            <Text style={styles1.orderid}>{item.orderid}</Text>
            <View style={{display: 'flex', gap: 8, flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={styles1.itemvale}>{item.totalitem}</Text>
              <Text style={{height: 5, width: 5, backgroundColor: '#000', marginTop: -10, borderRadius: 50}}></Text>
              <Text style={styles1.itemvale}>{item.totalprice}</Text>
            </View>
          </View>
          <View>
            <Entypo name={'chevron-right'} size={30} color={'#EB8E24'} />
          </View>
        </View>
      </>
    );
  };
  return (

    <>
    
    <Header stackHeader={true} screenName={'My orders'} rootProps={props} />
    <View style={[styles.padinghr, styles.bgwhite]}>
      
      {/* <View style={styles1.flexbetween}>
        <Pressable onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
        </Pressable>
        <Text style={styles1.categry}>My Orders</Text>
        <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} />
      </View> */}

      <FlatList data={myorder} keyExtractor={(item, index) => `${index}`} renderItem={rendermyorder} scrollEnabled style={{maxHeight: hp(93),
         width: '100%'}} contentContainerStyle={{paddingVertical: 5,}} />
    </View>
      </>
  );
}
const styles1 = StyleSheet.create({
  datetime: {
    color: '#000',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  itemvale: {
    color: '#000',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  statusbar: {
    fontFamily: 'Manrope-Medium',
    backgroundColor: '#F2DAB4',
    color: '#CC6932',
    paddingHorizontal: 6,
    fontSize: 12,
    borderRadius: 5,
  },
  orderid: {
    color: '#000',
    fontFamily: 'Manrope-Bold',
    fontSize: 15,
    marginVertical: 10,
  },
  cardborder: {
    marginBottom:15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bgheaderimg: {
    width: wp(95),
    height: hp(24),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
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
});

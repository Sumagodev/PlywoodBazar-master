import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getAllCategories } from '../services/Category.service';
import { generateImageUrl } from '../services/url.service';
import { getHomePageBannersApi } from '../services/homepageBanners.service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { getDecodedToken, getToken } from '../services/User.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Header(props) {
  const navigate = useNavigation();

  const [categoryArr, setCategoryArr] = useState([]);
  const focused = useIsFocused()
  const [displayChat, setDisplayChat] = useState(false)
  const handleNestedcategories = async () => {
    try {
      let { data: res } = await getHomePageBannersApi();
      if (res.data && res.data?.length > 0) {
        setCategoryArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const checkAuth = async () => {
    let token = await AsyncStorage.getItem('AUTH_TOKEN')
    console.log(token, "qqq")
    if (token != null) {
      setDisplayChat(true)
    }
    else {
      setDisplayChat(false)
    }
  }

  checkAuth()
  useEffect(() => {
    // console.log(...categoryArr.map(el => generateImageUrl(`${el?.image}`)), '...categoryArr.map(el => generateImageUrl(`${el?.image}`))');
  }, [categoryArr]);
  useEffect(() => {
    handleNestedcategories();
  }, []);
  return (
    <>
      <View style={styles1.headermain}>
        <Image source={require('../../assets/img/logoheader.png')} style={styles1.logoheader} resizeMode="contain" />
        <View style={styles1.rowflex}>
          {displayChat ?
            <Ionicons onPress={()=>navigate.navigate("AllChats")} name="help-circle-outline" size={30} color="#e54d6b" />
            :
            <></>
          }
          {/* <Ionicons name="notifications-circle" size={25} color="#e54d6b" />
          <Pressable onPress={() => navigation.navigate("")}>
            <Entypo name="user" size={25} color="#e54d6b" />
          </Pressable> */}
        </View>
      </View>

      {props.slidersection && (
        <View style={styles1.sliderhome}>
          <SliderBox
            images={[...categoryArr.map(el => generateImageUrl(`${el?.image}`))]}
            sliderBoxHeight={150}
            autoplay={true}
            loop
          // onCurrentImagePressed={index => navigate.navigate('BottomBar', { screen: 'Shop', params: { data: categoryArr[index]?._id } })}
          />
        </View>
      )}
    </>
  );
}
const styles1 = StyleSheet.create({
  headermain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoheader: {
    width: wp(46),
    height: hp(8),
  },
  rowflex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  sliderhome: {
    marginVertical: 15,
  },
  headerslid: {
    width: wp(95),
    height: hp(25),
    borderRadius: 6,
  },
});
